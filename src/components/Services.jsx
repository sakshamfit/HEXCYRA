import React from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { services } from '../siteData.js'
import { Icon } from '../icons.jsx'

/* ==========================================================================
   SECTION 5 — SERVICES
   Three cards: white / rounded-[2rem] with a hover shadow. The middle card
   (Cloud & DevOps, the "development" slot) is intentionally dark and offset
   upward on desktop via md:-translate-y-4 to break the grid alignment.
   ========================================================================== */
export default function Services() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
            What We Do
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
            Services built to{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text pr-2 italic text-transparent">
              scale
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            Flexible engagements — from fully managed IT to project-based engineering — tailored to
            how your business actually runs.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-16 lg:grid-cols-3">
          {services.map((service, index) => {
            const featured = Boolean(service.featured)

            return (
              <article
                key={service.id}
                style={{ '--reveal-delay': `${index * 80}ms` }}
                className={`reveal hover-pop group relative flex flex-col justify-between rounded-[2rem] p-7 md:p-8 ${
                  featured
                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 md:-translate-y-4'
                    : 'bg-white text-slate-900 shadow-sm shadow-slate-900/5 ring-1 ring-slate-100 hover:shadow-2xl hover:shadow-slate-900/10'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 ease-pop group-hover:-rotate-6 ${
                        featured ? 'bg-fuchsia-500 text-white' : 'bg-slate-900 text-white'
                      }`}
                    >
                      <Icon name={service.icon} className="h-6 w-6" />
                    </span>

                    <span
                      className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                        featured
                          ? 'bg-white/10 text-white/80'
                          : 'bg-fuchsia-50 text-fuchsia-700'
                      }`}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                    {service.title}
                  </h3>
                  <p className={`text-xs font-semibold uppercase tracking-widest ${featured ? 'text-lime-300' : 'text-slate-400'}`}>
                    {service.accent}
                  </p>

                  <p className={`mt-4 text-sm leading-relaxed ${featured ? 'text-white/70' : 'text-slate-600'}`}>
                    {service.desc}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-fuchsia-400' : 'text-fuchsia-500'}`}
                        />
                        <span className={`text-xs leading-relaxed ${featured ? 'text-white/80' : 'text-slate-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`mt-8 flex items-center justify-between border-t pt-6 ${
                    featured ? 'border-white/10' : 'border-slate-100'
                  }`}
                >
                  <div>
                    <span className="font-display text-3xl font-extrabold tracking-tight">
                      {service.price}
                    </span>
                    <span className={`text-xs ${featured ? 'text-white/50' : 'text-slate-400'}`}>
                      {service.unit}
                    </span>
                  </div>

                  <button
                    onClick={() => go('contact')}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-300 ease-pop hover:scale-105 ${
                      featured
                        ? 'bg-white text-slate-900'
                        : 'bg-slate-900 text-white hover:bg-fuchsia-500'
                    }`}
                  >
                    Enquire
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
