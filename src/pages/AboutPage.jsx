import React from 'react'
import Nav from '../components/Nav.jsx'
import About from '../components/About.jsx'
import Clients from '../components/Clients.jsx'
import StaggerTestimonials from '../components/ui/stagger-testimonials'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

/* ==========================================================================
   /about/ — 06 / About + 07 / Academy + 05 / Who we work with + Stagger Testimonials
   The company story, founders, the Academy card, the client sectors,
   and staggered live feedback evidence.
   ========================================================================== */
export default function AboutPage() {
  useReveal()

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main className="pt-28 md:pt-32">
        <About heading="h1" />
        <Clients />
        <StaggerTestimonials />
      </main>

      <PageNext page="/about/" />
      <SiteFooter />
    </div>
  )
}
