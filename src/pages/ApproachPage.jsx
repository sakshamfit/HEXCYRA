import React, { useCallback } from 'react'
import Nav from '../components/Nav.jsx'
import Approach from '../components/Approach.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

/* ==========================================================================
   /approach/ — 03 / Approach
   The process as an orbit, then the same four steps as a list. Picking a step
   here carries you to /work/ with that step already open on the machine, so
   the two pages are one process seen two ways.
   ========================================================================== */
export default function ApproachPage() {
  useReveal()

  const openOnMachine = useCallback((index) => {
    window.location.href = `/work/?step=${index + 1}`
  }, [])

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main className="pt-28 md:pt-32">
        <Approach heading="h1" />
        <ProcessSteps onSelect={openOnMachine} id="approach-steps" />
      </main>

      <PageNext page="/approach/" />
      <SiteFooter />
    </div>
  )
}
