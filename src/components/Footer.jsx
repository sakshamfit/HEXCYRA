import React, { useState } from 'react'
import { CheckCircle2, Clock, Mail, Megaphone, Phone, Send, Star } from 'lucide-react'
import { brand, contact, footerColumns, hero } from '../siteData.js'

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  service: contact.serviceOptions[0],
  message: '',
  interests: [],
}

/* ==========================================================================
   SECTION 7 — FOOTER & CONTACT
   bg-black with rounded-t-[3rem], an indigo blob bleeding out of the
   bottom-right corner, and a glass contact form whose controls all focus
   with a fuchsia ring.
   ========================================================================== */
export default function Footer() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [sent, setSent] = useState(false)

  const update = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const toggleInterest = (perk) =>
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(perk)
        ? prev.interests.filter((item) => item !== perk)
        : [...prev.interests, perk],
    }))

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
    setForm(EMPTY_FORM)
    window.setTimeout(() => setSent(false), 4000)
  }

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const inputClass =
    'w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/40'

  return (
    <footer id="contact" className="relative mt-10 overflow-hidden rounded-t-[3rem] bg-black px-6 pb-12 pt-20 text-white md:px-12 md:pt-28">
      {/* Footer blob — bottom right, heavily blurred, non-interactive */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-indigo-900/50 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ------------------------------------------------------- CTA + form */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-lime-300 ring-1 ring-white/10">
              <Megaphone className="h-3.5 w-3.5" />
              {contact.eyebrow}
            </span>

            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              {contact.title}{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text pr-2 italic text-transparent">
                {contact.titleAccent}
              </span>
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">{contact.desc}</p>

            <div className="mt-8 flex flex-col gap-4">
              {contact.details.map((detail) => {
                const Cmp = detail.icon === 'phone' ? Phone : detail.icon === 'clock' ? Clock : Mail
                const inner = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-lime-300 ring-1 ring-white/10">
                      <Cmp className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-white/75">{detail.label}</span>
                  </>
                )

                return detail.href ? (
                  <a key={detail.label} href={detail.href} className="flex items-center gap-3 transition-colors hover:text-white">
                    {inner}
                  </a>
                ) : (
                  <div key={detail.label} className="flex items-center gap-3">
                    {inner}
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-white/50">{hero.chips.join(' · ')}</span>
            </div>
          </div>

          {/* Form */}
          <div className="reveal lg:col-span-7">
            <form
              onSubmit={submit}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-fuchsia-500/20 text-fuchsia-300 ring-1 ring-fuchsia-400/40">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="font-display text-2xl font-extrabold">Request received</h3>
                  <p className="max-w-sm text-sm text-white/60">
                    Thanks! A senior engineer has been notified and will reply within one business
                    day with a tailored roadmap.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">
                    Request a{' '}
                    <span className="italic text-fuchsia-400">consultation</span>
                  </h3>
                  <p className="mt-1.5 text-xs text-white/50">
                    No obligation. We reply within 24 hours.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-white/60">Full Name</span>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={update('name')}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-white/60">Work Email</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-white/60">Company</span>
                      <input
                        required
                        type="text"
                        value={form.company}
                        onChange={update('company')}
                        placeholder="Acme Corp"
                        className={inputClass}
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-white/60">Service Needed</span>
                      <select value={form.service} onChange={update('service')} className={inputClass}>
                        {contact.serviceOptions.map((option) => (
                          <option key={option} value={option} className="bg-slate-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="mt-4 flex flex-col gap-2">
                    <span className="text-xs font-semibold text-white/60">
                      Existing Stack or Goals (optional)
                    </span>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Tell us about your team size, cloud environment, or challenges…"
                      className={`${inputClass} resize-none`}
                    />
                  </label>

                  {/* Custom pill checkboxes — peer-checked turns them fuchsia */}
                  <fieldset className="mt-6">
                    <legend className="text-xs font-semibold text-white/60">
                      What should we look at first?
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {contact.perks.map((perk) => (
                        <label key={perk} className="cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={form.interests.includes(perk)}
                            onChange={() => toggleInterest(perk)}
                          />
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70 transition-all duration-300 ease-pop hover:border-white/30 peer-checked:border-fuchsia-400 peer-checked:bg-fuchsia-500 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-fuchsia-500/50">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {perk}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-fuchsia-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-transform duration-300 ease-pop hover:scale-[1.02]"
                  >
                    Request Consultation
                    <Send className="h-4 w-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* ------------------------------------------------------ Link columns */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-white/10 pt-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-display text-sm font-bold text-black">
                {brand.initial}
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">{brand.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              HEXCYRA is an IT services company delivering managed infrastructure, cloud
              engineering, cybersecurity, and 24/7 support to growing businesses.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold text-lime-300 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
              NOC Active · All Systems Operational
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white/50">
                {column.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-fuchsia-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <button
                        onClick={() => go(link.target)}
                        className="text-left text-sm text-white/60 transition-colors hover:text-fuchsia-300"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------- Bottom row */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button onClick={() => go('services')} className="transition-colors hover:text-white">
              Privacy Policy
            </button>
            <button onClick={() => go('services')} className="transition-colors hover:text-white">
              Terms of Service
            </button>
            <button onClick={() => go('studio')} className="transition-colors hover:text-white">
              Security Commitments
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
