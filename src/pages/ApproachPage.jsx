import React, { useCallback } from 'react'
import Nav from '../components/Nav.jsx'
import Approach from '../components/Approach.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

export default function ApproachPage() {
  useReveal()

  const openOnMachine = useCallback((index) => {
    window.location.href = `/work/?step=${index + 1}`
  }, [])

  return (
    <div className="site-page min-h-screen w-full font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
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
