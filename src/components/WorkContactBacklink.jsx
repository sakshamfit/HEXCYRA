import React from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { CursorBubble, CursorBubbleTarget } from '@/components/ui/cursor-bubble'
import { routes } from '../siteData.js'

export default function WorkContactBacklink({ className = '' }) {
  return (
    <section aria-label="Work and contact links" className={`relative py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <CursorBubble className="reveal group site-soft-panel relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[3rem] border border-slate-200 p-10 text-center shadow-sm md:p-20">
          {/* Kicker badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-700 shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-slate-900" />
            Next Steps · Connect
          </span>

          {/* Primary "Our work" Target */}
          <a
            href={routes.work}
            className="group/work focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-400"
            aria-label="Explore our selected work and portfolio"
          >
            <CursorBubbleTarget label="explore ↗" className="py-2">
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 underline underline-offset-8 decoration-slate-300 decoration-2 transition-all duration-300 group-hover/work:decoration-slate-900 inline-flex items-center gap-3">
                Our Work
                <ArrowUpRight className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400 group-hover/work:text-slate-900 transition-colors" />
              </span>
            </CursorBubbleTarget>
          </a>

          {/* Secondary "Get in touch" Target */}
          <a
            href={routes.contact}
            className="group/contact focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-400"
            aria-label="Get in touch to start a project"
          >
            <CursorBubbleTarget label="say hi ✉" className="py-2">
              <span className="font-display text-lg sm:text-2xl font-bold text-slate-600 hover:text-slate-950 transition-colors">
                Ready to transform your technology?{' '}
                <span className="border-b border-slate-400 pb-0.5 text-slate-900 group-hover/contact:border-slate-900 transition-colors">
                  Get in touch &rarr;
                </span>
              </span>
            </CursorBubbleTarget>
          </a>

          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-slate-400">
            Hover to test the elastic cursor bubble
          </p>
        </CursorBubble>
      </div>
    </section>
  )
}
