import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { routes, work } from '../siteData.js'

/* Tile treatment: rich colour washes over each photograph so the grid feels
   like one cohesive visual system without muting the source imagery. */
const TONES = {
  sand: 'border-slate-200 bg-neutral-900 text-white',
  indigo: 'border-slate-200 bg-neutral-900 text-white',
  rose: 'border-slate-200 bg-neutral-900 text-white',
}

const WASH = {
  sand: 'bg-gradient-to-t from-amber-950/85 via-orange-950/25 to-transparent',
  indigo: 'bg-gradient-to-t from-indigo-950/90 via-indigo-900/28 to-transparent',
  rose: 'bg-gradient-to-t from-fuchsia-950/90 via-rose-900/25 to-transparent',
}

function TileImage({ item, priority }) {
  return (
    <img
      src={item.img}
      alt={`${item.title} — ${item.meta}`}
      width={900}
      height={672}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover saturate-125 contrast-[1.04] transition-transform duration-700 ease-pop group-hover:scale-105"
    />
  )
}

export default function Work() {
  const [first, second, third] = work.items

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            {work.kicker}
          </span>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-6xl lg:col-span-7">
              {work.title}{' '}
              <span className="inline-block pr-3 pb-1 italic text-slate-500">
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
          {/* 1 · Healthcare concept */}
          <article
            className={`hover-pop reveal group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border p-7 md:p-9 ${TONES[first.tone]} ${first.span} ${first.aspect}`}
          >
            <TileImage item={first} priority />
            <div className={`pointer-events-none absolute inset-0 ${WASH[first.tone]}`} />

            <header className="relative flex items-start justify-between gap-4">
              <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                {first.label}
              </span>
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-white/80">
                {first.code}
              </span>
            </header>

            <div className="relative mt-10">
              <h3 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl">
                {first.headline}
                <br />
                <span className="inline-block pr-3 pb-1 italic text-white/70">
                  {first.headlineAccent}
                </span>
              </h3>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {first.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <footer className="relative mt-8 flex items-end justify-between gap-4 border-t border-white/25 pt-5">
              <div>
                <p className="font-display text-lg font-extrabold tracking-tight text-white">
                  {first.title}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  {first.meta}
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black transition-transform duration-500 ease-pop group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </footer>
          </article>

          {/* 2 · Business presence */}
          <article
            className={`hover-pop reveal group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border p-7 md:p-8 ${TONES[second.tone]} ${second.span} ${second.aspect}`}
          >
            <TileImage item={second} />
            <div className={`pointer-events-none absolute inset-0 ${WASH[second.tone]}`} />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="-rotate-12 font-display text-[5.5rem] font-black uppercase leading-none tracking-tighter text-white/15 md:text-[7rem]">
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
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">{second.desc}</p>
            </div>
          </article>

          {/* 3 · Security foundation */}
          <article
            className={`hover-pop reveal group relative overflow-hidden rounded-[2.5rem] border p-7 md:p-8 ${TONES[third.tone]} ${third.span} ${third.aspect}`}
          >
            <TileImage item={third} />
            <div className={`pointer-events-none absolute inset-0 ${WASH[third.tone]}`} />

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

          {/* 4 · Closing note — minimal black */}
          <article className="hover-pop reveal group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/15 bg-black p-7 text-white md:p-9 lg:col-span-7 aspect-[16/10]">
            <span className="relative w-fit rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70">
              {work.kicker}
            </span>

            <div className="relative mt-10">
              <p className="max-w-xl font-display text-2xl font-extrabold leading-snug tracking-tight md:text-4xl">
                {work.lead}
              </p>
              <a
                href={routes.contact}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 ease-pop hover:scale-105"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
