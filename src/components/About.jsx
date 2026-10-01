import React from 'react'
import { academy, about, founders } from '../siteData.js'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'

/* ==========================================================================
   06 / ABOUT + FOUNDERS + 07 / ACADEMY
   Dark panel carrying the company story and its timeline, followed by the
   Founders spotlight using AnimatedTestimonials, then the Academy card in lime.
   ========================================================================== */
export default function About({ heading: Heading = 'h2' }) {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* 06 · About */}
        <div className="reveal overflow-hidden rounded-[3rem] bg-slate-900 p-7 text-white md:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                {about.kicker}
              </span>

              <Heading className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight md:text-6xl">
                {about.title}
                <br />
                <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text pr-3 pb-1 inline-block italic text-transparent">
                  {about.accent}
                </span>
              </Heading>
            </div>

            <div className="lg:col-span-6">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-5 text-base leading-relaxed text-white/65 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {about.timeline.map((item) => (
              <div key={item.year} className="flex items-baseline gap-4">
                <span className="font-display text-2xl font-black tracking-tight text-white">
                  {item.year}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Founders Leadership Spotlight */}
        <div className="reveal mt-12 overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-7 shadow-sm md:p-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
              Leadership · Founders
            </span>

            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-5xl">
              Meet the founders{' '}
              <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-3 pb-1 inline-block italic text-transparent">
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
        <div className="reveal mt-12 overflow-hidden rounded-[3rem] border-2 border-black bg-lime-300 p-7 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-800">
                {academy.kicker}
              </span>

              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-5xl">
                {academy.title}{' '}
                <span className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text pr-3 pb-1 inline-block italic text-transparent">
                  {academy.accent}
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-800">
                {academy.paragraph}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-3 rounded-full border-2 border-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-900">
              {academy.cta}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
