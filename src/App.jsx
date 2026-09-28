import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Showcase from './components/Showcase.jsx'
import Intro from './components/Intro.jsx'
import Solutions from './components/Solutions.jsx'
import Approach from './components/Approach.jsx'
import Work from './components/Work.jsx'
import Clients from './components/Clients.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { useReveal } from './hooks.js'

/* ==========================================================================
   HEXCYRA — Technology. Security. Growth.
   UI: the digital-agency reference (playful, high-contrast, organic-modern).
   Content: the supplied HEXCYRA copy, in its original section order —
   hero · marquee · showcase · 01 what we do · 02 solutions · 03 approach ·
   04 selected work · 05 who we work with · 06 about · 07 academy ·
   08 contact.
   No imagery, no invented numbers.
   ========================================================================== */
export default function App() {
  useReveal()

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Showcase />
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
