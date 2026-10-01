import React from 'react'
import { academy, about, founders } from '../siteData.js'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'

/* ==========================================================================
   06 / ABOUT + FOUNDERS + 07 / ACADEMY
   Minimal monochrome panels carrying the company story, Founders spotlight,
   and the Academy card, adapting seamlessly to both dark and bright modes.
   ========================================================================== */
export default function About({ heading: Heading = 'h2' }) {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* 06 · About */}
        <div className="reveal overflow-hidden rounded-[3rem] border border-slate-200 bg-white/70 p-7 text-slate-900 backdrop-blur md:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                {about.kicker}
              </span>

              <Heading className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-6xl">
                {about.title}
                <br />
                <span className="inline-block pr-3 pb-1 italic text-slate-500">
                  {about.accent}
                </span>
              </Heading>
            </div>

            <div className="lg:col-span-6">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-5 text-base leading-relaxed text-slate-600 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
            {about.timeline.map((item) => (
              <div key={item.year} className="flex items-baseline gap-4">
                <span className="font-display text-2xl font-black tracking-tight text-slate-900">
                  {item.year}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Founders Leadership Spotlight */}
        <div className="reveal mt-12 overflow-hidden rounded-[3rem] border border-slate-200 bg-white/70 p-7 shadow-sm backdrop-blur md:p-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              Leadership · Founders
            </span>

            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-5xl">
              Meet the founders{' '}
              <span className="inline-block pr-3 pb-1 italic text-slate-500">
                behind HEXCYRA.
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The leaders guiding our engineering standards, architecture, and client partnerships.
            </p>
          </div>

          <div className="mt-4">
            <AnimatedTestimonials
              testimonials={founders}
              autoplay={true}
              className="py-6 md:py-10"
            />
          </div>
        </div>

        {/* 07 · Academy */}
        <div className="reveal mt-12 overflow-hidden rounded-[3rem] border border-slate-200 bg-white/70 p-7 backdrop-blur md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
                {academy.kicker}
              </span>

              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-5xl">
                {academy.title}{' '}
                <span className="inline-block pr-3 pb-1 italic text-slate-500">
                  {academy.accent}
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-600">
                {academy.paragraph}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-200 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-900">
              {academy.cta}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
