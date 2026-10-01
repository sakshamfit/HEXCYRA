import React from 'react'
import Nav from '../components/Nav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { brand, navLinks } from '../siteData.js'
import { useReveal } from '../hooks.js'

export default function NotFoundPage() {
  useReveal()

  return (
    <div className="site-page min-h-screen w-full font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <Nav />

      <main className="px-6 pb-24 pt-40 md:pt-48">
        <div className="mx-auto max-w-7xl">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              404 · Not found
            </span>

            <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-7xl">
              This page is not part of{' '}
              <span className="inline-block pr-3 pb-1 italic text-slate-500">
                {brand.name}.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
              The address you followed does not exist. Everything the site has is on one of these
              pages.
            </p>
          </div>

          <nav aria-label="Site pages" className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={link.path}
                style={{ '--reveal-delay': `${index * 70}ms` }}
                className="reveal hover-pop flex items-center justify-between rounded-[2rem] border border-slate-200 bg-white/50 p-6 font-display text-xl font-extrabold tracking-tight text-slate-900 backdrop-blur"
              >
                {link.label}
                <span className="text-slate-500">↗</span>
              </a>
            ))}
          </nav>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
