import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { solutions } from '../siteData.js'
import { Icon } from '../icons.jsx'

/* ==========================================================================
   02 / SOLUTIONS
   Six capability cards. The grid keeps the reference quirk: the middle
   column sits a little higher on desktop (md:-translate-y-4) so the rows
   never line up perfectly, and one card is inverted to slate-900.
   ========================================================================== */
export default function Solutions() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="solutions" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
            {solutions.kicker}
          </span>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:col-span-7">
              {solutions.title}{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text pr-2 italic text-transparent">
                {solutions.accent}
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:col-span-5">
              {solutions.lead}
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 lg:grid-cols-3">
          {solutions.items.map((item, index) => {
            const featured = Boolean(item.featured)
            // Second column lifts on desktop — the signature grid offset.
            const middleColumn = index % 3 === 1

            return (
              <article
                key={item.no}
                style={{ '--reveal-delay': `${(index % 3) * 80}ms` }}
                className={`reveal hover-pop group flex flex-col justify-between rounded-[2rem] p-7 md:p-8 ${
                  featured
                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20'
                    : 'bg-white text-slate-900 shadow-sm shadow-slate-900/5 ring-1 ring-slate-100 hover:shadow-2xl hover:shadow-slate-900/10'
                } ${middleColumn ? 'lg:-translate-y-4' : ''}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 ease-pop group-hover:-rotate-6 ${
                        featured ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                      }`}
                    >
                      <Icon name={item.icon} className="h-6 w-6" />
                    </span>

                    <span
                      className={`font-display text-3xl font-black tracking-tight ${
                        featured ? 'text-white/20' : 'text-slate-200'
                      }`}
                    >
                      {item.no}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                    {item.title}
                  </h3>
                  <p className={`mt-4 text-sm leading-relaxed ${featured ? 'text-white/70' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={() => go('contact')}
                  className={`mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    featured ? 'text-lime-300 hover:text-white' : 'text-slate-500 hover:text-fuchsia-600'
                  }`}
                >
                  Explore
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-pop group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
