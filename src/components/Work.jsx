import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { work } from '../siteData.js'

/* Tile palettes — colour and type only, no screenshots. */
const TONES = {
  sand: 'border-black bg-[#E9E4DE] text-slate-900',
  indigo: 'border-black bg-indigo-600 text-white',
  rose: 'border-black bg-rose-500 text-white',
}

export default function Work() {
  const [first, second, third] = work.items

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
            {work.kicker}
          </span>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:col-span-7">
              {work.title}{' '}
              <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-2 italic text-transparent">
                {work.accent}
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:col-span-5">
              {work.lead}
            </p>
          </div>
        </div>

        {/* Bento grid — lg:grid-cols-12 gap-8 */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* 1 · Healthcare concept — typographic "report" card */}
          <article
            className={`hover-pop reveal group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 p-7 md:p-9 ${TONES[first.tone]} ${first.span} ${first.aspect}`}
          >
            <header className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-white/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-600 backdrop-blur">
                {first.label}
              </span>
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-slate-500">
                {first.code}
              </span>
            </header>

            <div className="mt-10">
              <h3 className="font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-slate-900 md:text-6xl">
                {first.headline}
                <br />
                <span className="bg-gradient-to-r from-teal-500 to-sky-500 bg-clip-text pr-2 italic text-transparent">
                  {first.headlineAccent}
                </span>
              </h3>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {first.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-900/15 bg-white/60 px-4 py-2 text-xs font-semibold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <footer className="mt-8 flex items-end justify-between gap-4 border-t border-slate-900/15 pt-5">
              <div>
                <p className="font-display text-lg font-extrabold tracking-tight">{first.title}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {first.meta}
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-white transition-transform duration-500 ease-pop group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </footer>
          </article>

          {/* 2 · Business presence — rotated wordmark at 10% opacity */}
          <article
            className={`hover-pop reveal group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 p-7 md:p-8 ${TONES[second.tone]} ${second.span} ${second.aspect}`}
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="-rotate-12 font-display text-[5.5rem] font-black uppercase leading-none tracking-tighter text-white/10 md:text-[7rem]">
                {second.word}
              </span>
            </div>

            <header className="relative flex items-start justify-between gap-4">
              <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                {second.meta}
              </span>
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-white/60">
                {second.code}
              </span>
            </header>

            <div className="relative mt-10">
              <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                {second.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">{second.desc}</p>
            </div>
          </article>

          {/* 3 · Security foundation — vertical display type */}
          <article
            className={`hover-pop reveal group relative overflow-hidden rounded-[2.5rem] border-2 p-7 md:p-8 ${TONES[third.tone]} ${third.span} ${third.aspect}`}
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="text-vertical rotate-180 font-display text-5xl font-black uppercase tracking-[0.35em] text-white/85 md:text-7xl">
                {third.word}
              </span>
            </div>

            <div className="relative flex h-full flex-col justify-between">
              <header className="flex items-start justify-between gap-4">
                <span className="w-fit rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                  {third.meta}
                </span>
                <span className="font-display text-[11px] font-bold uppercase tracking-widest text-white/60">
                  {third.code}
                </span>
              </header>
              <div>
                <h3 className="max-w-[14rem] font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                  {third.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">{third.desc}</p>
              </div>
            </div>
          </article>

          {/* 4 · Closing note — dark slate, lime accent */}
          <article className="hover-pop reveal group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-black bg-slate-900 p-7 text-white md:p-9 lg:col-span-7 aspect-[16/10]">
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />

            <span className="relative w-fit rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-lime-300">
              {work.kicker}
            </span>

            <div className="relative mt-10">
              <p className="max-w-xl font-display text-2xl font-extrabold leading-snug tracking-tight md:text-4xl">
                {work.lead}
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform duration-300 ease-pop hover:scale-105"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
