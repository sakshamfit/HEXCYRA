import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/* The deployment host. It appears in canonicals, Open Graph URLs, the sitemap
   and robots.txt — nowhere else, and never in the React code. Override it at
   build time if the domain changes:  SITE_URL=https://… npm run build */
const SITE = process.env.SITE_URL || 'https://hexcyra.com'

/* One document per index page. The key is the built file, the value is the URL
   it answers on: every page is a directory index, so every URL ends in a
   slash and there is exactly one canonical form of each. */
const DOCUMENTS = {
  '/index.html': '/',
  '/solutions/index.html': '/solutions/',
  '/work/index.html': '/work/',
  '/approach/index.html': '/work/',
  '/about/index.html': '/about/',
  '/contact/index.html': '/contact/',
  '/404.html': '/404.html',
}

/* Only the pages that belong in a sitemap. */
const INDEXED = ['/', '/solutions/', '/work/', '/about/', '/contact/']
const THEME_PRELOAD = `<script>try{var m=localStorage.getItem('hexcyra.mode')==='day'?'day':'night',d=document.documentElement;d.dataset.mode=m;d.style.colorScheme=m==='night'?'dark':'light';var t=document.querySelector('meta[name="theme-color"]');if(t)t.content=m==='night'?'#0a0a0a':'#fafafa'}catch(e){document.documentElement.dataset.mode='night'}</script>`

/* ---------------------------------------------------------------------------
   Two build-time jobs Vite cannot do on its own:

   1. Vite rewrites every <link href> in an HTML entry as an asset reference
      and reads it from disk, so a directory-shaped URL such as /work/ fails
      the build with EISDIR. Injecting the canonical after that pass keeps the
      clean URL in the markup.
   2. sitemap.xml and robots.txt need absolute URLs, and every document carries
      a %SITE% placeholder rather than a host baked into the source.
   --------------------------------------------------------------------------- */
const sitePlugin = {
  name: 'hexcyra-site',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      const path = DOCUMENTS[ctx.path]
      if (!path) return html
      return html
        .replaceAll('%SITE%', SITE)
        .replace(
          '</head>',
          `    <link rel="canonical" href="${SITE}${path}" />\n    ${THEME_PRELOAD}\n  </head>`,
        )
    },
  },
  /* Both hooks register the middleware in front of Vite's own layers — the
     hooks run before the internal stack is installed, so an unknown page URL
     is answered before Vite ends the response with its empty 404. */
  configureServer(server) {
    /* In dev the404 body comes from the SOURCE document, run through
       transformIndexHtml — the built one points at /assets/*, which the
       dev server does not serve, so unknown URLs would render unstyled
       and log a fistful of 404s. */
    server.middlewares.use(
      pageFallback(path.resolve(dirname, 'dist'), {
        notFound: path.resolve(dirname, '404.html'),
        transform: (html) => server.transformIndexHtml('/404.html', html),
      })
    )
  },
  configurePreviewServer(server) {
    server.middlewares.use(pageFallback(path.resolve(dirname, 'dist')))
  },
  generateBundle() {
    const today = new Date().toISOString().slice(0, 10)
    const urls = INDEXED.map(
      (route) => `  <url>
    <loc>${SITE}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
    ).join('\n')

    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    })

    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`,
    })
  },
}

/* The servers should answer like the static host does:
     - /solutions redirects to /solutions/  (canonical form),
     - an unknown page URL gets 404.html with a 404 status,
     - missing assets keep their plain 404.
   Registered in front of Vite's own layers, which end a 404 response before
   anything added behind them can speak. Pages that exist are passed through
   untouched. */
const pageFallback = (distDir, dev404) => (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  const [pathname, query] = (req.url ?? '/').split('?')
  if (pathname === '/approach' || pathname === '/approach/') {
    res.statusCode = 301
    res.setHeader('Location', `/work/${query ? `?${query}` : ''}`)
    return res.end()
  }
  if (/\/[^/]*\.[^/]+$/.test(pathname)) return next()
  /* Vite's own dev modules are extensionless URLs (/@vite/client,
     /@react-refresh, /@fs/…, /@id/…) — without this pass-through they get
     swallowed here and every dev page loses HMR and React Refresh. */
  if (pathname.startsWith('/@') || pathname.startsWith('/__vite')) return next()
  const rel = pathname.replace(/^\/+/, '')
  const direct = path.join(distDir, rel)
  const index = path.join(direct, 'index.html')
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return next()
  if (fs.existsSync(index)) {
    if (rel && !pathname.endsWith('/')) {
      res.statusCode = 301
      res.setHeader('Location', `${pathname}/${query ? `?${query}` : ''}`)
      return res.end()
    }
    return next()
  }
  const notFound = dev404?.notFound ?? path.join(distDir, '404.html')
  if (!fs.existsSync(notFound)) return next()
  res.statusCode = 404
  if (dev404?.transform) {
    fs.readFile(notFound, 'utf8', (err, html) => {
      if (err) return res.end()
      Promise.resolve(dev404.transform(html))
        .then((out) => {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(out)
        })
        .catch(() => {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(html)
        })
    })
    return
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  fs.createReadStream(notFound).pipe(res)
}

// https://vitejs.dev/config/
export default defineConfig({
  /* A real multi-page site: an unknown URL has to reach 404.html, the way it
     does on the host, instead of falling back to the home page. */
  appType: 'mpa',
  plugins: [react(), sitePlugin],
  resolve: {
    // shadcn/ui convention: "@" points at ./src
    alias: {
      '@': path.resolve(dirname, './src'),
      'next/image': path.resolve(dirname, './src/components/ui/image.tsx'),
    },
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      /* Content documents share src/entry-page.jsx and therefore one chunk;
         the home page has its own entry. The retired /approach/ document is
         a lightweight redirect to /work/ and contains no app entry. */
      input: {
        index: path.resolve(dirname, 'index.html'),
        'solutions/index': path.resolve(dirname, 'solutions/index.html'),
        'work/index': path.resolve(dirname, 'work/index.html'),
        'approach/index': path.resolve(dirname, 'approach/index.html'),
        'about/index': path.resolve(dirname, 'about/index.html'),
        'contact/index': path.resolve(dirname, 'contact/index.html'),
        404: path.resolve(dirname, '404.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    // Allow the e2b live-preview proxy host (and any other host).
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
})
