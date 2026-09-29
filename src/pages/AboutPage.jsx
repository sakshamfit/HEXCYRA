import React from 'react'
import Nav from '../components/Nav.jsx'
import About from '../components/About.jsx'
import Clients from '../components/Clients.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

/* ==========================================================================
   /about/ — 06 / About + 07 / Academy + 05 / Who we work with
   The company story, the Academy card and the list of the kinds of business
   it is built for. The section components are the ones the home page used to
   carry; only the heading level changes.
   ========================================================================== */
export default function AboutPage() {
  useReveal()

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main className="pt-28 md:pt-32">
        <About heading="h1" />
        <Clients />
      </main>

      <PageNext page="/about/" />
      <SiteFooter />
    </div>
  )
}
