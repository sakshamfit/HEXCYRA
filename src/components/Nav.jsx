import React, { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { brand, navLinks, routes } from '../siteData.js'
import { useScrolled } from '../hooks.js'

/* ==========================================================================
   NAVIGATION
   Fixed wrapper (px-6 py-6) holding a centred white pill. The pill keeps
   backdrop-blur-md at all times and swaps bg-white/80 → bg-white/95 with a
   shadow increase once the page has scrolled past 50px.

   Every item is a real link now that each section is its own index page, so
   the nav works without JavaScript, and a section can be opened, copied and
   bookmarked. Clicking the page you are already on returns to its top.
   ========================================================================== */
export default function Nav() {
  const scrolled = useScrolled(50)
  const [open, setOpen] = useState(false)
  const here = window.location.pathname

  /* A real link everywhere except the page you are already on, where it is a
     return to the top. */
  const onLink = (path) => (event) => {
    setOpen(false)
    if (here === path) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-6 py-6">
      <header className="relative mx-auto max-w-7xl">
        <nav
          className={`flex items-center justify-between rounded-full border border-slate-100 bg-white/80 px-4 py-2.5 backdrop-blur-md transition-all duration-300 sm:px-6 ${
            scrolled ? 'bg-white/95 shadow-lg shadow-slate-900/5' : 'shadow-sm shadow-slate-900/5'
          }`}
        >
          {/* Brand — w-8 h-8 black badge with a white centred letter */}
          <a
            href={routes.home}
            onClick={onLink(routes.home)}
            className="flex items-center gap-3"
            aria-label={`${brand.name} home`}
            aria-current={here === routes.home ? 'page' : undefined}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-black font-display text-sm font-bold text-white">
              {brand.initial}
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
              {brand.name}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.path}
                onClick={onLink(link.path)}
                aria-current={here === link.path ? 'page' : undefined}
                className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                  here === link.path ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* CTA — fuchsia panel slides in from the left on hover */}
            <a
              href={routes.contact}
              onClick={onLink(routes.contact)}
              aria-current={here === routes.contact ? 'page' : undefined}
              className="group relative hidden overflow-hidden rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white md:inline-flex"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-fuchsia-500 transition-transform duration-500 ease-pop group-hover:scale-x-100" />
              <span className="relative flex items-center gap-2">
                Start a Project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>

            {/* Mobile trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="relative grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-white md:hidden"
            >
              <Menu
                className={`absolute h-5 w-5 transition-all duration-300 ${
                  open ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
              />
              <X
                className={`absolute h-5 w-5 transition-all duration-300 ${
                  open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile panel */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-pop md:hidden ${
            open ? 'mt-3 max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="rounded-[2rem] border border-slate-100 bg-white/95 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-md">
            <div className="no-scrollbar flex max-h-[60vh] flex-col overflow-y-auto">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={onLink(link.path)}
                  aria-current={here === link.path ? 'page' : undefined}
                  className="rounded-2xl px-4 py-3 font-display text-2xl font-semibold text-slate-900 transition-colors hover:bg-fuchsia-50"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={routes.contact}
              onClick={onLink(routes.contact)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-500"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}
