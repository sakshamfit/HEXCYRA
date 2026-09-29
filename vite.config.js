import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/* Clean-URL canonicals.
   Vite rewrites every <link href> in an HTML entry as an asset reference and
   reads it from disk, so a directory-shaped URL such as `/work/` fails the
   build with EISDIR. Injecting the tag after that pass keeps the clean URL in
   the markup. The domain is never hard-coded: a relative canonical resolves
   against the deployment host, which is the one thing that is known. */
const CANONICAL = { '/work/index.html': '/work/' }
const canonicalPlugin = {
  name: 'hexcyra-canonical',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      const path = CANONICAL[ctx.path]
      if (!path) return html
      return html.replace('</head>', `    <link rel="canonical" href="${path}" />\n  </head>`)
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), canonicalPlugin],
  resolve: {
    // shadcn/ui convention: "@" points at ./src
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      /* Two documents. The /work/ index is its own HTML file so the machine
         (and the three.js chunk behind it) can never be preloaded by the home
         page — the boundary is in the build graph, not in runtime code.
         work/index.html builds to dist/work/index.html, i.e. the clean /work/. */
      input: {
        main: path.resolve(dirname, 'index.html'),
        work: path.resolve(dirname, 'work/index.html'),
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
