import React, { lazy, Suspense } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
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
      className="flex h-screen min-h-[640px] w-full items-center justify-center bg-transparent"
    >
      <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
        Loading showcase
      </span>
    </section>
  )
}

function FeaturesFallback() {
  return (
    <section
      aria-hidden="true"
      className="w-full bg-transparent py-24"
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

export default function App() {
  useReveal()

  return (
    <div className="site-page min-h-screen w-full font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <Nav />

      <main>
        <Hero />
        <Suspense fallback={<FeaturesFallback />}>
          <Features />
        </Suspense>
        <Suspense fallback={<ShowcaseFallback />}>
          <Showcase />
        </Suspense>
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
