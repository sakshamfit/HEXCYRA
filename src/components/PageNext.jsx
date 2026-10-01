import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { about, contact, routes, work } from '../siteData.js'

const NEXT = {
  [routes.solutions]: { href: routes.work, ...work },
  [routes.work]: { href: routes.about, ...about },
  [routes.about]: { href: routes.contact, ...contact },
}

export default function PageNext({ page }) {
  const next = NEXT[page]
  if (!next) return null

  return (
    <section aria-label="Next page" className="bg-transparent px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <a
          href={next.href}
          className="reveal group flex flex-col gap-6 rounded-[2.5rem] border border-slate-200 bg-white/50 p-7 backdrop-blur transition-transform duration-500 ease-pop hover:scale-[1.01] md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              {next.kicker}
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-4xl">
              {next.title}{' '}
              {next.accent && (
                <span className="inline-block pr-3 pb-1 italic text-slate-500">
                  {next.accent}
                </span>
              )}
            </h2>
          </div>

          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 ease-pop group-hover:rotate-45">
            <ArrowUpRight className="h-6 w-6" />
          </span>
        </a>
      </div>
    </section>
  )
}
