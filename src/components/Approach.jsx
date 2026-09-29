import React from 'react'
import Timeline from '@/components/ui/timeline'
import { approach } from '../siteData.js'

/* ==========================================================================
   03 / APPROACH
   The process is explained with the horizontal scroll Timeline animation
   (inspired by @hyperiux/components/timeline):
   Milestone cards glide horizontally, stems illuminate, and each phase
   reveals its details as the user advances through the four steps.
   ========================================================================== */
export default function Approach({ heading: Heading = 'h2' }) {
  const accents = ['#a3e635', '#38bdf8', '#d946ef', '#f59e0b']
  const categories = ['Discovery', 'Architecture', 'Engineering', 'Continuous Growth']

  const milestones = approach.steps.map((step, idx) => ({
    id: `step-${step.no}`,
    period: `Step ${step.no}`,
    date: step.title,
    title: `${step.title} Phase`,
    description: step.desc,
    category: categories[idx] || 'Execution',
    status: idx < 2 ? 'completed' : idx === 2 ? 'active' : 'upcoming',
    accentColor: accents[idx] || '#a3e635',
  }))

  return (
    <section id="approach" className="relative bg-black text-white">
      <Timeline
        id="process-timeline"
        title={approach.title}
        periodLabel={approach.kicker}
        lead={approach.lead}
        milestones={milestones}
        backgroundColor="#000000"
        activeColor="#a3e635"
      />

      {/* Accessible text list for screen readers and SEO crawlers */}
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
