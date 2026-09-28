import React from 'react'
import { ArrowUpRight, Star } from 'lucide-react'
import { studio } from '../siteData.js'
import { Icon } from '../icons.jsx'

/* ==========================================================================
   STUDIO — the "about / who we are" block carrying the previous build's
   company copy, guarantees and expertise stack (data only; UI is new).
   ========================================================================== */
export default function Studio() {
  return (
    <section id="studio" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Copy */}
          <div className="reveal lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
              {studio.eyebrow}
            </span>

            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
              {studio.title}{' '}
              <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text pr-2 italic text-transparent">
                {studio.titleAccent}
              </span>
              .
            </h2>

            {studio.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-5 text-base leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}

            {/* Three core guarantees */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {studio.guarantees.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5 transition-colors hover:border-fuchsia-200 hover:bg-fuchsia-50/60"
                >
                  <h3 className="font-display text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Imagery */}
          <div className="reveal lg:col-span-5">
            <div className="hover-pop relative overflow-hidden rounded-[2.5rem] border-2 border-black">
              <img
                src={studio.image}
                alt={studio.imageCaption}
                loading="lazy"
                className="h-[24rem] w-full object-cover sm:h-[30rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4 text-white">
                <span className="inline-flex items-center gap-2 text-xs font-semibold">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
                  {studio.imageCaption}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur">
                  {studio.imageMeta}
                </span>
              </div>
            </div>

            {/* Rating strip */}
            <div className="mt-6 flex items-center gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-medium text-slate-500">
                Rated 4.9/5 by 180+ operations leads
              </span>
            </div>
          </div>
        </div>

        {/* Expertise — dark strip, image cards, high contrast */}
        <div className="mt-16 rounded-[3rem] bg-slate-900 p-6 text-white md:p-12">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                Expertise
              </span>
              <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                A stack we{' '}
                <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text pr-2 italic text-transparent">
                  master
                </span>
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/60">
              From cloud platforms to modern application frameworks, our engineers work fluently
              across the technologies your business runs on.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {studio.expertise.map((item, index) => (
              <article
                key={item.title}
                style={{ '--reveal-delay': `${index * 60}ms` }}
                className="reveal hover-pop group flex flex-col overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10 backdrop-blur"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-pop group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
                    <Icon name={item.icon} className="h-3.5 w-3.5 text-lime-300" />
                    {item.title}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="font-display text-lg font-extrabold tracking-tight">{item.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/65">{item.desc}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-lime-300">
                      {item.tags}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition-transform duration-300 ease-pop group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* On-call / 24-7 support */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <div className="hover-pop relative overflow-hidden rounded-[2.5rem] border-2 border-black">
              <img
                src={studio.onCall.image}
                alt="HEXCYRA network operations centre"
                loading="lazy"
                className="h-[22rem] w-full object-cover sm:h-[26rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-xs font-semibold text-white">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
                  Live Telemetry Desk
                </span>
                <span className="text-lime-300">{studio.onCall.status}</span>
              </div>
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
              {studio.onCall.eyebrow}
            </span>

            <h3 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
              {studio.onCall.title}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              {studio.onCall.desc}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {studio.onCall.features.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 ease-pop hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-display text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {studio.onCall.metrics.map((metric) => (
                <span
                  key={metric}
                  className="rounded-full border border-slate-200 px-4 py-2 text-[11px] font-semibold text-slate-600"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
