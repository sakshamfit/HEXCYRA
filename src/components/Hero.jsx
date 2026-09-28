import React from 'react'
import { ArrowDown } from 'lucide-react'
import { hero } from '../siteData.js'

/* ==========================================================================
   SECTION 2 — HERO
   Type-led, blob-backed opening: purple blob top-right (animate-pulse) and
   lime blob bottom-left, both blur-3xl at 40% opacity. No imagery — the
   "system" panel is built purely from borders, gradients and type.
   ========================================================================== */
export default function Hero() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      {/* Hero blobs */}
      <div className="pointer-events-none absolute -right-24 -top-20 h-[26rem] w-[26rem] animate-pulse rounded-full bg-purple-200 opacity-40 blur-3xl md:h-[34rem] md:w-[34rem]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[22rem] w-[22rem] rounded-full bg-lime-200 opacity-40 blur-3xl md:h-[30rem] md:w-[30rem]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold text-orange-700 ring-1 ring-orange-200/70">
              <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500" />
              {hero.badge}
            </span>

            {/* Headline */}
            <h1 className="mt-7 font-display text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.95] tracking-tight text-slate-900">
              {hero.titleLines[0]}
              <br />
              <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-4 italic text-transparent">
                {hero.highlight}
              </span>
              <br />
              {hero.titleTail}
            </h1>
          </div>

          {/* Copy / call-to-action column */}
          <div className="lg:col-span-4">
            <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              {hero.paragraph}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => go('contact')}
                className="rounded-full bg-fuchsia-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-transform duration-300 ease-pop hover:scale-105"
              >
                {hero.primaryCta}
              </button>

              <button
                onClick={() => go('solutions')}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-900 backdrop-blur transition-colors hover:border-slate-900"
              >
                {hero.secondaryCta}
                <ArrowDown className="h-4 w-4 text-fuchsia-500 transition-transform duration-300 ease-pop group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Minimal system panel — type, rules and the three numbered chips */}
        <div className="reveal mt-14 rounded-[2.5rem] border-2 border-black bg-white/60 p-6 backdrop-blur md:mt-20 md:p-8">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span>HX / System 01</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-500" />
              Live build
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t-2 border-black pt-6 sm:grid-cols-3">
            {hero.chips.map((chip) => (
              <div key={chip.no} className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-black tracking-tight text-slate-300">
                  {chip.no}
                </span>
                <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
                  {chip.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => go('solutions')}
            className="mt-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-900"
          >
            {hero.scrollCue}
            <span className="h-px w-10 bg-slate-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
