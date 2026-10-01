import React from 'react'
import Nav from '../components/Nav.jsx'
import Contact from '../components/Contact.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

export default function ContactPage() {
  useReveal()

  return (
    <div className="site-page min-h-screen w-full font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <Nav />

      <main className="pt-28 md:pt-32">
        <Contact heading="h1" />
      </main>

      <PageNext page="/contact/" />
      <SiteFooter />
    </div>
  )
}
