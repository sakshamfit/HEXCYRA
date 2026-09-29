import React from 'react'
import Nav from '../components/Nav.jsx'
import Solutions from '../components/Solutions.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

/* ==========================================================================
   /solutions/ — 02 / Solutions
   The six capabilities, the way the supplied document states them. The
   interactive capabilities panel stays on the home page, where it introduces
   the site; this page is the full reference and nothing else.
   ========================================================================== */
export default function SolutionsPage() {
  useReveal()

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main className="pt-28 md:pt-32">
        <Solutions heading="h1" />
      </main>

      <PageNext page="/solutions/" />
      <SiteFooter />
    </div>
  )
}
