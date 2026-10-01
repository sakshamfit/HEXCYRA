import React, { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { brand, navLinks, routes } from '../siteData.js'
import { useScrolled } from '../hooks.js'
import DayNightToggle from './env/DayNightToggle.jsx'

/* ==========================================================================
   NAVIGATION
   Fixed wrapper holding a frosted, theme-aware pill. The day/night control
   remains in view at every breakpoint while page links adapt to screen size.
   Clicking the page you are already on returns to its top.
   ========================================================================== */
export default function Nav() {
  const scrolled = useScrolled(50)
  const [open, setOpen] = useState(false)
  const here = window.location.pathname

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
          className={`flex items-center justify-between rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 backdrop-blur-md transition-all duration-300 sm:px-6 ${
            scrolled ? 'bg-white/95 shadow-lg shadow-black/5' : 'shadow-sm shadow-black/5'
          }`}
        >
          {/* Brand — monochrome badge */}
          <a
            href={routes.home}
            onClick={onLink(routes.home)}
            className="flex items-center gap-3"
            aria-label={`${brand.name} home`}
            aria-current={here === routes.home ? 'page' : undefined}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
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
            <DayNightToggle />

            {/* CTA — minimal monochrome pill */}
            <a
              href={routes.contact}
              onClick={onLink(routes.contact)}
              aria-current={here === routes.contact ? 'page' : undefined}
              className="group relative hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground md:hidden"
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
          <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-4 shadow-xl shadow-black/5 backdrop-blur-md">
            <div className="no-scrollbar flex max-h-[60vh] flex-col overflow-y-auto">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={onLink(link.path)}
                  aria-current={here === link.path ? 'page' : undefined}
                  className="rounded-2xl px-4 py-3 font-display text-2xl font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={routes.contact}
              onClick={onLink(routes.contact)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
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
