import React from 'react'
import { Mail, Send } from 'lucide-react'
import { contact } from '../siteData.js'

/* ==========================================================================
   08 / CONTACT
   Minimal monochrome panel with the call to action, adapting cleanly to
   dark and bright modes over the wavy shader background.
   ========================================================================== */
export default function Contact({ heading: Heading = 'h2' }) {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-20 text-slate-900 md:px-12 md:py-28"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="reveal rounded-[3rem] border border-slate-200 bg-white/70 p-8 backdrop-blur md:p-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              {contact.kicker}
            </span>

            <Heading className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-6xl">
              {contact.title}{' '}
              <span className="inline-block pr-3 pb-1 italic text-slate-500">
                {contact.accent}
              </span>
            </Heading>

            <p className="mt-5 text-base leading-relaxed text-slate-600">{contact.paragraph}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={mailto}
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-300 ease-pop hover:scale-[1.03]"
              >
                {contact.cta}
                <Send className="h-4 w-4" />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-4 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            </div>

            <p className="mt-5 text-xs text-slate-500">{contact.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
