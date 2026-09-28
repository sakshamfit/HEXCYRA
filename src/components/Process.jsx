import React from 'react'
import { processSteps } from '../siteData.js'

/* ==========================================================================
   PROCESS — from strategy to steady state, rendered as image-led steps in
   the same organic-modern language as the rest of the page.
   ========================================================================== */
export default function Process() {
  return (
    <section id="process" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
              How We Work
            </span>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
              From strategy to{' '}
              <span className="bg-gradient-to-r from-sky-500 to-teal-400 bg-clip-text pr-2 italic text-transparent">
                steady state
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600">
            A transparent, phased delivery model built to modernize enterprise technology without
            business disruption.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article
              key={step.step}
              style={{ '--reveal-delay': `${index * 80}ms` }}
              className="reveal hover-pop group relative flex flex-col overflow-hidden rounded-[2rem] border-2 border-black bg-white"
            >
              <div className="relative h-52 w-full overflow-hidden border-b-2 border-black">
                <img
                  src={step.img}
                  alt={step.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-pop group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-900">
                  {step.tag}
                </span>
                <span className="absolute bottom-3 right-5 font-display text-5xl font-black text-white/85">
                  {step.step}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-7">
                <div>
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
