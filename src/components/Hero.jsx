import React from 'react'
import { ArrowDown } from 'lucide-react'
import AnimatedHero from '@/components/ui/animated-hero'
import { hero, marqueeItems, routes } from '../siteData.js'

/* ==========================================================================
   SECTION 2 — HERO
   Type-led opening backed by the colourful meshy shader.
   ========================================================================== */
export default function Hero() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge — minimal monochrome */}
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-slate-900" />
          {hero.badge}
        </span>

        {/* Headline */}
        <h1 className="mt-7 font-display text-[clamp(1.5rem,7.4vw,6.5rem)] font-extrabold leading-[1.04] tracking-tight text-slate-900">
          {hero.titleLines[0]}
          <br />
          <span className="inline-block pb-1 italic text-slate-500">
            {hero.highlight}
          </span>{' '}
          {hero.titleTail}
        </h1>

        <div className="mt-10 grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatedHero
              staticText="Expertise in"
              words={marqueeItems}
              interval={2400}
              headingClassName="text-2xl sm:text-4xl md:text-5xl leading-snug text-slate-900"
              rollingClassName="h-[1.55em]"
            />
          </div>

          {/* Copy / call-to-action column */}
          <div className="lg:col-span-4">
            <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              {hero.paragraph}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={routes.contact}
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 ease-pop hover:scale-105"
              >
                {hero.primaryCta}
              </a>

              <a
                href={routes.solutions}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-900 backdrop-blur transition-colors hover:border-slate-900"
              >
                {hero.secondaryCta}
                <ArrowDown className="h-4 w-4 text-slate-900 transition-transform duration-300 ease-pop group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Minimal system panel — type, rules and the three numbered chips */}
        <div className="reveal mt-14 rounded-[2.5rem] border border-slate-200 bg-white/60 p-6 backdrop-blur md:mt-20 md:p-8">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span>HX / System 01</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-900" />
              Live build
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
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
            onClick={() => go('what-we-do')}
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
