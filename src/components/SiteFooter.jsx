import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { brand, footer, routes } from '../siteData.js'

/* ==========================================================================
   SITE FOOTER
   One bar, every page: the mark, the five index pages, and the line at the
   bottom. The links are real documents, not scroll targets, so they work
   without JavaScript and can be opened in a new tab.
   ========================================================================== */
export default function SiteFooter() {
  return (
    <div className="relative overflow-hidden bg-black px-6 pb-12 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <a
              href={routes.home}
              className="flex items-center gap-3"
              aria-label={`${brand.name} home`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-display text-sm font-bold text-black">
                {brand.initial}
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">{brand.name}</span>
            </a>
            <span className="hidden text-xs text-white/45 sm:inline">{brand.tagline}</span>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
            {footer.links.map((link) => (
              <a
                key={link.label}
                href={link.path}
                className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-fuchsia-300"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          <div className="text-xs text-white/45">
            <span>{footer.copyright}</span>
            <span className="mx-2 text-white/20">·</span>
            <span>{footer.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
