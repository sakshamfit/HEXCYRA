import React from 'react'
import Nav from '../components/Nav.jsx'
import About from '../components/About.jsx'
import Clients from '../components/Clients.jsx'
import StaggerTestimonials from '../components/ui/stagger-testimonials'
import WorkContactBacklink from '../components/WorkContactBacklink.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

export default function AboutPage() {
  useReveal()

  return (
    <div className="site-page min-h-screen w-full font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <Nav />

      <main className="pt-28 md:pt-32">
        <About heading="h1" />
        <Clients />
        <StaggerTestimonials />
        <WorkContactBacklink />
      </main>

      <PageNext page="/about/" />
      <SiteFooter />
    </div>
  )
}
