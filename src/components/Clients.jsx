import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { clients, routes } from '../siteData.js'

/* ==========================================================================
   05 / WHO WE WORK WITH
   A divided list rather than a card wall — keeps the page quiet and minimal.
   ========================================================================== */
export default function Clients() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            {clients.kicker}
          </span>

          <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-6xl">
            {clients.title}{' '}
            <span className="inline-block pr-3 pb-1 italic text-slate-500">
              {clients.accent}
            </span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {clients.items.map((item, index) => (
            <a
              key={item}
              href={routes.contact}
              style={{ '--reveal-delay': `${index * 50}ms` }}
              className="reveal group flex items-center justify-between gap-4 border-b border-slate-200 py-6 transition-colors hover:border-slate-400"
            >
              <span className="font-display text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                {item}
              </span>
              <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-300 ease-pop group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-900" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
