import React from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import { brand, contact, footer } from '../siteData.js'

/* ==========================================================================
   08 / CONTACT + FOOTER
   bg-black with rounded-t-[3rem] and the indigo blob bleeding out of the
   bottom-right corner. The call to action is a single mailto button — no
   form, no photography.
   ========================================================================== */
export default function Contact() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`

  return (
    <footer
      id="contact"
      className="relative mt-10 overflow-hidden rounded-t-[3rem] bg-black px-6 pb-12 pt-20 text-white md:px-12 md:pt-28"
    >
      {/* Footer blob — bottom right, heavily blurred, non-interactive */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-indigo-900/50 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-lime-300 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            {contact.kicker}
          </span>

          <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            {contact.title}{' '}
            <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text pr-2 italic text-transparent">
              {contact.accent}
            </span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/60">{contact.paragraph}</p>

          <a
            href={mailto}
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-fuchsia-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-transform duration-300 ease-pop hover:scale-[1.03]"
          >
            {contact.cta}
            <Send className="h-4 w-4" />
          </a>

          <p className="mt-5 text-xs text-white/45">{contact.note}</p>
        </div>

        {/* Link row */}
        <div className="mt-20 flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-display text-sm font-bold text-black">
              {brand.initial}
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">{brand.name}</span>
            <span className="hidden text-xs text-white/45 sm:inline">{brand.tagline}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {footer.links.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.target)}
                className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-fuchsia-300"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          <div className="text-xs text-white/45">
            <span>{footer.copyright}</span>
            <span className="mx-2 text-white/20">·</span>
            <span>{footer.location}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
