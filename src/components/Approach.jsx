import React, { useEffect, useState } from 'react'
import { ClipboardList, Code2, Search, TrendingUp } from 'lucide-react'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'
import { approach } from '../siteData.js'

/* Node icons for the orbital — the four steps of the process. */
const NODE_ICONS = {
  search: Search,
  plan: ClipboardList,
  code: Code2,
  improve: TrendingUp,
}

/* The original orbit is a fixed 200px radius, which overflows on phones.
   Scale it down responsively; 1024px and up keeps the untouched 200px. */
function useOrbitalRadius() {
  const [radius, setRadius] = useState(200)

  useEffect(() => {
    const update = () =>
      setRadius(Math.max(96, Math.min(200, Math.min(window.innerWidth, 1024) * 0.3)))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return radius
}

/* ==========================================================================
   03 / APPROACH
   The process is explained with the radial orbital timeline: each step is a
   node on the orbit, click a node to open its detail card, connected steps
   pulse and can be jumped to from the card.
   ========================================================================== */
export default function Approach({ heading: Heading = 'h2' }) {
  const radius = useOrbitalRadius()

  const timelineData = approach.timeline.map((item) => ({
    ...item,
    icon: NODE_ICONS[item.icon] ?? Search,
  }))

  return (
    <section id="approach" className="relative bg-black text-white">
      {/* Heading — the supplied section copy, in white on black. */}
      <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            {approach.kicker}
          </span>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <Heading className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:col-span-7">
              {approach.title}{' '}
              <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text pr-2 italic text-transparent">
                {approach.accent}
              </span>
            </Heading>
            <p className="max-w-xl text-base leading-relaxed text-white/60 lg:col-span-5">
              {approach.lead}
            </p>
          </div>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            Click a node to open the step
          </p>
        </div>
      </div>

      {/* Radial orbital timeline */}
      <RadialOrbitalTimeline timelineData={timelineData} radius={radius} />

      {/* Same four steps as a plain list for screen readers and search engines. */}
      <div className="sr-only">
        <h3>The four steps of how we work</h3>
        <ol>
          {approach.steps.map((step) => (
            <li key={step.no}>
              {step.no} · {step.title} — {step.desc}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
