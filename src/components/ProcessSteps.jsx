import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { approach } from '../siteData.js'

/* ==========================================================================
   THE FOUR STEPS
   Minimal monochrome control panel for the 3D machine on /work/, adapting
   cleanly to both dark and bright modes over the wavy background.
   ========================================================================== */
export default function ProcessSteps({ active = -1, onSelect, id = 'steps' }) {
  return (
    <section aria-labelledby={`${id}-heading`} className="relative py-20 text-slate-900 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            The process
          </span>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2
              id={`${id}-heading`}
              className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-5xl lg:col-span-7"
            >
              The same four steps,{' '}
              <span className="inline-block pr-3 pb-1 italic text-slate-500">
                every time.
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:col-span-5">
              {active >= 0
                ? `Step ${approach.steps[active].no} is open on the machine.`
                : approach.lead}
            </p>
          </div>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {approach.steps.map((item, index) => {
            const isActive = index === active
            return (
              <li key={item.no} className="h-full">
                <button
                  type="button"
                  onClick={() => onSelect?.(index)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`reveal group flex h-full w-full flex-col justify-between rounded-[2rem] border p-7 text-left backdrop-blur transition-all duration-300 ease-pop ${
                    isActive
                      ? 'border-black bg-white/90 shadow-lg shadow-black/5'
                      : 'border-slate-200 bg-white/60 hover:border-slate-400'
                  }`}
                  style={{ '--reveal-delay': `${index * 80}ms` }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold tracking-widest text-slate-700">
                        {item.no}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-widest ${
                          isActive ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {isActive ? 'Open' : 'View'}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors group-hover:text-slate-900">
                    See it on the machine
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
