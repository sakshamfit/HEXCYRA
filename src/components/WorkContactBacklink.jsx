import React from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { CursorBubble, CursorBubbleTarget } from '@/components/ui/cursor-bubble'
import { routes } from '../siteData.js'

export default function WorkContactBacklink({ className = '' }) {
  return (
    <section aria-label="Work and contact links" className={`relative py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <CursorBubble className="reveal group site-soft-panel relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[3rem] border-2 border-black p-10 text-center shadow-xl md:p-20">
          {/* Subtle Ambient Backdrops */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />

          {/* Kicker badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-700 shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" />
            Next Steps · Connect
          </span>

          {/* Primary "Our work" Target */}
          <a
            href={routes.work}
            className="group/work focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500"
            aria-label="Explore our selected work and portfolio"
          >
            <CursorBubbleTarget label="explore ↗" className="py-2">
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 underline underline-offset-8 decoration-fuchsia-500 decoration-4 transition-all duration-300 group-hover/work:text-fuchsia-600 group-hover/work:decoration-black inline-flex items-center gap-3">
                Our Work
                <ArrowUpRight className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400 group-hover/work:text-fuchsia-600 transition-colors" />
              </span>
            </CursorBubbleTarget>
          </a>

          {/* Secondary "Get in touch" Target */}
          <a
            href={routes.contact}
            className="group/contact focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500"
            aria-label="Get in touch to start a project"
          >
            <CursorBubbleTarget label="say hi ✉" className="py-2">
              <span className="font-display text-lg sm:text-2xl font-bold text-slate-600 hover:text-slate-950 transition-colors">
                Ready to transform your technology?{' '}
                <span className="border-b-2 border-slate-900 pb-0.5 text-slate-900 group-hover/contact:border-fuchsia-500 group-hover/contact:text-fuchsia-600 transition-colors">
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
