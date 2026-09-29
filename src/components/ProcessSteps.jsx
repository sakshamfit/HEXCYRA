import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { approach } from '../siteData.js'

/* ==========================================================================
   THE FOUR STEPS
   One list, two pages. On /work/ it is the control panel for the machine:
   picking a step focuses its station, and the machine reports back which step
   is open. On /approach/ it is the plain reading of the same process, and
   picking a step carries you to the machine with that step already open.

   The copy is `approach.steps` — one source, two presentations, so the two
   pages can never drift apart.
   ========================================================================== */
export default function ProcessSteps({ active = -1, onSelect, id = 'steps' }) {
  return (
    <section aria-labelledby={`${id}-heading`} className="relative bg-black py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            The process
          </span>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <h2
              id={`${id}-heading`}
              className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:col-span-7"
            >
              The same four steps,{' '}
              <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text pr-2 italic text-transparent">
                every time.
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/60 lg:col-span-5">
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
                  className={`reveal group flex h-full w-full flex-col justify-between rounded-[2rem] border p-7 text-left transition-all duration-300 ease-pop ${
                    isActive
                      ? 'border-lime-400 bg-white/10 shadow-lg shadow-lime-400/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                  }`}
                  style={{ '--reveal-delay': `${index * 80}ms` }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold tracking-widest text-lime-400">
                        {item.no}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-widest ${
                          isActive ? 'text-lime-400' : 'text-white/30'
                        }`}
                      >
                        {isActive ? 'Open' : 'View'}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white/50 transition-colors group-hover:text-lime-400">
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
