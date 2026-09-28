import React from 'react'
import { approach } from '../siteData.js'

/* ==========================================================================
   03 / APPROACH
   Four steps on a single rule — numbered, typographic, no imagery.
   ========================================================================== */
export default function Approach() {
  return (
    <section id="approach" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
            {approach.kicker}
          </span>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:col-span-7">
              {approach.title}{' '}
              <span className="bg-gradient-to-r from-sky-500 to-teal-400 bg-clip-text pr-2 italic text-transparent">
                {approach.accent}
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:col-span-5">
              {approach.lead}
            </p>
          </div>
        </div>

        {/* Process track — the line runs behind the step markers on desktop. */}
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-slate-200 md:block" />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {approach.steps.map((step, index) => (
              <article
                key={step.no}
                style={{ '--reveal-delay': `${index * 90}ms` }}
                className="reveal relative"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-black bg-lime-300 font-display text-sm font-black text-slate-900">
                  {step.no}
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
