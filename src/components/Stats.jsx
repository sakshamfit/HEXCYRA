import React from 'react'
import { stats } from '../siteData.js'
import { useCounter } from '../hooks.js'

/* -------------------------------------------------------------------------
   Stat value with a live count-up. Handles prefixed ("<15m") and suffixed
   ("99.9%", "320+") values without losing their formatting.
   ------------------------------------------------------------------------- */
function Counter({ value, gradient }) {
  const raw = String(value).replace(/,/g, '')
  const match = raw.match(/^([^0-9]*)([0-9]*\.?[0-9]+)(.*)$/)
  const numeric = match ? Number(match[2]) : 0
  const prefix = match ? match[1] : ''
  const suffix = match ? match[3] : raw
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0

  const { ref, display } = useCounter(numeric, { duration: 1600, decimals })

  return (
    <span
      ref={ref}
      className={`bg-gradient-to-r ${gradient} bg-clip-text font-display text-4xl font-extrabold leading-none tracking-tight text-transparent md:text-5xl`}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/* ==========================================================================
   SECTION 6 — STATS
   Four-up grid, each figure filled with its own bg-clip-text gradient:
   blue-teal, purple-pink, orange-yellow, lime-green.
   ========================================================================== */
export default function Stats() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Soft blob backdrop keeps the strip feeling organic rather than tabular */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-100 opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal grid grid-cols-1 gap-8 rounded-[3rem] border-2 border-black bg-white/80 p-8 backdrop-blur sm:grid-cols-2 md:grid-cols-4 md:p-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <Counter value={stat.value} gradient={stat.gradient} />
              <span className="mt-4 font-display text-base font-bold tracking-tight text-slate-900">
                {stat.label}
              </span>
              <span className="mt-1.5 text-xs leading-relaxed text-slate-500">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
