import React from 'react'
import { Mail, Send } from 'lucide-react'
import { contact } from '../siteData.js'

/* ==========================================================================
   08 / CONTACT
   The black panel with the call to action. A single mailto button — no form,
   no photography. It closes the home page and is the whole of /contact/, where
   `heading="h1"` promotes it to the page title. The footer bar below it is
   SiteFooter, shared by every page.
   ========================================================================== */
export default function Contact({ heading: Heading = 'h2' }) {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-12 md:py-28"
    >
      {/* Blob — bottom right, heavily blurred, non-interactive */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-indigo-900/50 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-lime-300 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            {contact.kicker}
          </span>

          <Heading className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            {contact.title}{' '}
            <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text pr-2 italic text-transparent">
              {contact.accent}
            </span>
          </Heading>

          <p className="mt-5 text-base leading-relaxed text-white/60">{contact.paragraph}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={mailto}
              className="inline-flex items-center gap-3 rounded-full bg-fuchsia-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-transform duration-300 ease-pop hover:scale-[1.03]"
            >
              {contact.cta}
              <Send className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-white/75 transition-colors hover:border-white/50 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {contact.email}
            </a>
          </div>

          <p className="mt-5 text-xs text-white/45">{contact.note}</p>
        </div>
      </div>
    </section>
  )
}
