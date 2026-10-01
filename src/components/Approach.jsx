import React from 'react'
import Timeline from '@/components/ui/timeline'
import { approach } from '../siteData.js'

export default function Approach({ heading: Heading = 'h2' }) {
  const categories = ['Discovery', 'Architecture', 'Engineering', 'Continuous Growth']

  const milestones = approach.steps.map((step, idx) => ({
    id: `step-${step.no}`,
    period: `Step ${step.no}`,
    date: step.title,
    title: `${step.title} Phase`,
    description: step.desc,
    category: categories[idx] || 'Execution',
    status: idx < 2 ? 'completed' : idx === 2 ? 'active' : 'upcoming',
    accentColor: '#8b7bff',
  }))

  return (
    <section id="approach" className="relative bg-black text-white">
      <Timeline
        id="process-timeline"
        title={approach.title}
        accent={approach.accent}
        headingTag={Heading}
        periodLabel={approach.kicker}
        lead={approach.lead}
        milestones={milestones}
        backgroundColor="#0b1430"
        textColor="#f4f7ff"
        mutedTextColor="#bdccef"
        activeColor="#2dd4bf"
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
