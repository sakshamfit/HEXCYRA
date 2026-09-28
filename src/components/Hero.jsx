import React from 'react'
import { PlayCircle, Star } from 'lucide-react'
import { hero, brand } from '../siteData.js'

/* ==========================================================================
   SECTION 2 — HERO
   Type-led, blob-backed opening: purple/blob top-right (animate-pulse) and
   lime blob bottom-left, both blur-3xl at 40% opacity.
   ========================================================================== */
export default function Hero() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
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
              {hero.titleLines[1]}{' '}
              <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-4 italic text-transparent">
                {hero.highlight}
              </span>
            </h1>
          </div>

          {/* Copy / call-to-action column */}
          <div className="lg:col-span-4">
            <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              {hero.paragraph}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => go('services')}
                className="rounded-full bg-fuchsia-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-transform duration-300 ease-pop hover:scale-105"
              >
                {hero.primaryCta}
              </button>

              <button
                onClick={() => go('process')}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-900 backdrop-blur transition-colors hover:border-slate-900"
              >
                <PlayCircle className="h-5 w-5 text-fuchsia-500 transition-transform duration-300 ease-pop group-hover:scale-110" />
                {hero.secondaryCta}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Trusted by 320+ infrastructure teams · {brand.tagline}
              </span>
            </div>
          </div>
        </div>

        {/* Metric chips */}
        <div className="no-scrollbar mt-14 flex items-center gap-3 overflow-x-auto pb-1 md:mt-20">
          {hero.chips.map((chip, i) => (
            <span
              key={chip}
              className={`shrink-0 rounded-full px-5 py-3 text-xs font-semibold tracking-tight ${
                i === 1
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-600'
              }`}
            >
              {chip}
            </span>
          ))}
          <span className="hidden shrink-0 rounded-full bg-lime-300 px-5 py-3 text-xs font-semibold tracking-tight text-slate-900 md:inline-block">
            Zero unscheduled downtime
          </span>
        </div>
      </div>
    </section>
  )
}
