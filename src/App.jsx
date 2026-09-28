import React, { lazy, Suspense } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Portal from './components/Portal.jsx'
import Intro from './components/Intro.jsx'
import Solutions from './components/Solutions.jsx'
import Approach from './components/Approach.jsx'
import Work from './components/Work.jsx'
import Clients from './components/Clients.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { useReveal } from './hooks.js'

/* The showcase band carries framer-motion (~90 kB gzip). Splitting it keeps
   that weight out of the critical path so the page paints immediately. */
const Showcase = lazy(() => import('./components/Showcase.jsx'))

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

/* ==========================================================================
   HEXCYRA — Technology. Security. Growth.
   UI: the digital-agency reference (playful, high-contrast, organic-modern).
   Content: the supplied HEXCYRA copy, in its original section order —
   hero · glyph portal (marquee) · showcase · 01 what we do · 02 solutions ·
   03 approach ·
   04 selected work · 05 who we work with · 06 about · 07 academy ·
   08 contact. No invented numbers, no external assets beyond Google Fonts.
   ========================================================================== */
export default function App() {
  useReveal()

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main>
        <Hero />
        <Portal />
        <Suspense fallback={<ShowcaseFallback />}>
          <Showcase />
        </Suspense>
        <Intro />
        <Solutions />
        <Approach />
        <Work />
        <Clients />
        <About />
      </main>

      <Contact />
    </div>
  )
}
