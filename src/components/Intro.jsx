import React from 'react'
import { whatWeDo } from '../siteData.js'

/* ==========================================================================
   01 / WHAT WE DO
   Split heading + the three principles. Minimal monochrome typography.
   ========================================================================== */
export default function Intro() {
  return (
    <section id="what-we-do" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            {whatWeDo.kicker}
          </span>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-6xl lg:col-span-7">
              {whatWeDo.title}{' '}
              <span className="inline-block pr-3 pb-1 italic text-slate-500">
                {whatWeDo.accent}
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:col-span-5">
              {whatWeDo.paragraph}
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-slate-200 pt-10 md:grid-cols-3">
          {whatWeDo.principles.map((item, index) => (
            <div
              key={item.no}
              style={{ '--reveal-delay': `${index * 70}ms` }}
              className="reveal hover-pop"
            >
              <span className="font-display text-4xl font-black tracking-tight text-slate-200">
                {item.no}
              </span>
              <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
