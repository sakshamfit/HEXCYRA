import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { brand, footer, routes } from '../siteData.js'
import { CrowdCanvas } from './ui/skiper39'

/* ==========================================================================
   SITE FOOTER
   The full Skiper39 street stage (Skiper39 by @reuno-ui): copy sits above,
   then the walking crowd runs along a lit street horizon — grounded by their
   contact shadows, fading out at both edges. The brand bar follows below.
   ========================================================================== */
export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Skiper39 Crowd Stage */}
      <div className="relative border-t border-white/10 bg-gradient-to-b from-black via-slate-950 to-black pt-12 md:pt-16">
        {/* Foreground banner — held above the crowd */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center pointer-events-none">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-lime-400 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
            {footer.location}
          </span>
          <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Building with teams worldwide.
          </h3>
          <p className="mt-2 text-xs text-white/50 max-w-md mx-auto">
            From local businesses to enterprise systems, our technology travels everywhere.
          </p>
        </div>

        {/* Street stage — the horizon strip plus the crowd walking on it */}
        <div className="relative mt-8 h-40 md:h-48">
          {/* Background Street Horizon (the strip the Skiper39 stage ships with) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 border-t border-white/10 bg-gradient-to-t from-white/[0.07] to-transparent" />

          {/* The crowd — edge-masked so walkers dissolve in and out instead
              of popping at the sides. Density is tuned up; narrow viewports
              thin out automatically inside CrowdCanvas. */}
          <div className="absolute inset-0 [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <CrowdCanvas density={44} />
          </div>
        </div>
      </div>

      {/* Main Footer Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black px-6 py-10 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
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
    </footer>
  )
}
