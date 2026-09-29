import React from 'react'
import Nav from '../components/Nav.jsx'
import Contact from '../components/Contact.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

/* ==========================================================================
   /contact/ — 08 / Start a conversation
   One panel, one address, one action. The last page of the route, so nothing
   follows it but the footer.
   ========================================================================== */
export default function ContactPage() {
  useReveal()

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main className="pt-28 md:pt-32">
        <Contact heading="h1" />
      </main>

      <PageNext page="/contact/" />
      <SiteFooter />
    </div>
  )
}
