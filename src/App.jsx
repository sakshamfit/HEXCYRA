import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Work from './components/Work.jsx'
import Services from './components/Services.jsx'
import Stats from './components/Stats.jsx'
import Studio from './components/Studio.jsx'
import Process from './components/Process.jsx'
import Footer from './components/Footer.jsx'
import { useReveal } from './hooks.js'

/* ==========================================================================
   HEXCYRA — IT & Managed Services
   UI recreated to the "digital agency" reference (playful, high-contrast,
   organic-modern) while every piece of copy, pricing and imagery still comes
   from the previous build's data set (src/siteData.js + /public/img).
   ========================================================================== */
export default function App() {
  useReveal()

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Stats />
        <Studio />
        <Process />
      </main>

      <Footer />
    </div>
  )
}
