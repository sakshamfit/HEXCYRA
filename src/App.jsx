import React, { lazy, Suspense } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Approach from './components/Approach.jsx'
import Intro from './components/Intro.jsx'
import Clients from './components/Clients.jsx'
import StaggerTestimonials from './components/ui/stagger-testimonials'
import About from './components/About.jsx'
import WorkContactBacklink from './components/WorkContactBacklink.jsx'
import Contact from './components/Contact.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import { useReveal } from './hooks.js'

/* Two bands are built on the motion runtime (~40 kB gzip on its own): the
   capabilities panel and the scroll-morph showcase. framer-motion is now the
   same package as motion, so importing either eagerly pulls the whole runtime
   into the first chunk. Both are split so the page paints immediately and the
   runtime is fetched once, in parallel, for the two of them. */
const Showcase = lazy(() => import('./components/Showcase.jsx'))
const Features = lazy(() => import('./components/Features.jsx'))

function ShowcaseFallback() {
  return (
    <section
      aria-hidden="true"
      className="flex h-screen min-h-[640px] w-full items-center justify-center bg-[#FAFAFA]"
    >
      <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-500" />
        Loading showcase
      </span>
    </section>
  )
}

function FeaturesFallback() {
  return (
    <section
      aria-hidden="true"
      className="w-full bg-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-12 w-2/3 animate-pulse rounded-2xl bg-slate-100" />
        <div className="mt-10 flex flex-col gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-50" />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   HEXCYRA — Technology. Security. Growth.
   UI: the digital-agency reference (playful, high-contrast, organic-modern).
   Content: the supplied HEXCYRA copy, in its original section order — no
   invented numbers, no external assets beyond Google Fonts.

   The home page is the front door: the hero, the capabilities that can be
   tried in place, the showcase, what we do and who we work with. Each
   numbered section of the document now has its own index page —
   /solutions/, /work/, /approach/, /about/, /contact/ — and the nav and the
   footer link to them as real documents.
   ========================================================================== */
export default function App() {
  useReveal()

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Suspense fallback={<FeaturesFallback />}>
          <Features />
        </Suspense>
        <Suspense fallback={<ShowcaseFallback />}>
          <Showcase />
        </Suspense>
        <Approach heading="h2" />
        <Intro />
        <Clients />
        <StaggerTestimonials />
        <About heading="h2" />
        <WorkContactBacklink />
      </main>

      <Contact />
      <SiteFooter />
    </div>
  )
}
