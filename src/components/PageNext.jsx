import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { about, approach, contact, routes, work } from '../siteData.js'

/* ==========================================================================
   NEXT PAGE
   One band at the foot of every index page, pointing at the next one. The
   wording is that section's own kicker, title and accent out of the supplied
   document — nothing invented — so the pages hand each other over in the same
   voice the content is written in.
   ========================================================================== */
const NEXT = {
  [routes.solutions]: { href: routes.work, ...work },
  [routes.work]: { href: routes.approach, ...approach },
  [routes.approach]: { href: routes.about, ...about },
  [routes.about]: { href: routes.contact, ...contact },
}

export default function PageNext({ page }) {
  const next = NEXT[page]
  if (!next) return null

  return (
    <section aria-label="Next page" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <a
          href={next.href}
          className="reveal group flex flex-col gap-6 rounded-[2.5rem] border-2 border-black p-7 transition-transform duration-500 ease-pop hover:scale-[1.01] md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
              {next.kicker}
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-4xl">
              {next.title}{' '}
              {next.accent && (
                <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-3 pb-1 inline-block italic text-transparent">
                  {next.accent}
                </span>
              )}
            </h2>
          </div>

          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-slate-900 text-white transition-transform duration-500 ease-pop group-hover:rotate-45">
            <ArrowUpRight className="h-6 w-6" />
          </span>
        </a>
      </div>
    </section>
  )
}
