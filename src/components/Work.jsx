import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { workItems } from '../siteData.js'
import { Icon } from '../icons.jsx'

/* Per-card palettes. The reference intentionally breaks the grid: the
   "Development"-equivalent dark card is offset, and each tile carries its own
   background instead of a shared neutral. */
const TONES = {
  sand: 'border-black bg-[#E9E4DE] text-slate-900',
  indigo: 'border-black bg-indigo-600 text-white',
  rose: 'border-black bg-rose-500 text-white',
  dark: 'border-black bg-slate-900 text-white',
}

function Chip({ children, dark }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
        dark ? 'bg-white/15 text-white backdrop-blur' : 'bg-white/70 text-slate-700 backdrop-blur'
      }`}
    >
      {children}
    </span>
  )
}

export default function Work() {
  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
              Selected Work
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-900 md:text-6xl">
              Projects where uptime was{' '}
              <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-2 italic text-transparent">
                the whole point
              </span>
            </h2>
          </div>

          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-pop group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 md:mt-16">
          {workItems.map((item, index) => {
            const dark = item.tone === 'indigo' || item.tone === 'rose' || item.tone === 'dark'

            return (
              <article
                key={item.id}
                className={`hover-pop reveal group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 p-6 md:p-8 ${TONES[item.tone]} ${item.span} ${item.aspect}`}
                style={{ '--reveal-delay': `${index * 60}ms` }}
              >
                {/* Card 1 — photo-backed sand tile */}
                {item.tone === 'sand' && (
                  <div className="relative mt-6 flex-1 overflow-hidden rounded-[1.75rem] border-2 border-black/10">
                    <img
                      src={item.img}
                      alt={`${item.client} — ${item.category}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-pop group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5">
                      <h3 className="font-display text-2xl font-extrabold text-white md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-xs leading-relaxed text-white/80 md:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )}

                {/* Card 2 — oversized rotated wordmark at 10% opacity */}
                {item.tone === 'indigo' && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="-rotate-12 font-display text-[6rem] font-black uppercase leading-none tracking-tighter text-white/10 md:text-[7.5rem]">
                      {item.word}
                    </span>
                  </div>
                )}

                {/* Card 3 — centred white vertical type */}
                {item.tone === 'rose' && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="text-vertical rotate-180 font-display text-5xl font-black uppercase tracking-[0.35em] text-white/90 md:text-7xl">
                      {item.word}
                    </span>
                  </div>
                )}

                {/* Card 4 — dark slate with the lightning mark */}
                {item.tone === 'dark' && (
                  <>
                    <img
                      src={item.img}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="animate-floaty text-6xl drop-shadow-[0_0_40px_rgba(250,204,21,0.45)] md:text-8xl">
                        {item.emoji}
                      </span>
                    </div>
                  </>
                )}

                {/* Shared header row */}
                <header className="relative flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <Chip dark={dark}>{item.category}</Chip>
                    <span
                      className={`font-display text-sm font-bold tracking-tight ${
                        dark ? 'text-white/70' : 'text-slate-500'
                      }`}
                    >
                      {item.client}
                    </span>
                  </div>

                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-500 ease-pop ${
                      dark ? 'bg-white text-slate-900' : 'bg-black text-white'
                    } group-hover:rotate-45`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </header>

                {/* Sand card copy lives over the photo; the others sit low. */}
                {item.tone !== 'sand' && (
                  <div className="relative mt-10">
                    <Icon
                      name={item.icon}
                      className={`mb-4 h-6 w-6 ${dark ? 'text-lime-300' : 'text-slate-900'}`}
                    />
                    <h3 className="max-w-md font-display text-2xl font-extrabold leading-tight md:text-3xl">
                      {item.title}
                    </h3>
                    <p className={`mt-2 max-w-sm text-xs leading-relaxed md:text-sm ${dark ? 'text-white/75' : 'text-slate-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
