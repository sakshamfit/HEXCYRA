import React from 'react'
import Nav from '../components/Nav.jsx'
import Solutions from '../components/Solutions.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { useReveal } from '../hooks.js'

export default function SolutionsPage() {
  useReveal()

  return (
    <div className="site-page min-h-screen w-full font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <Nav />

      <main className="pt-28 md:pt-32">
        <Solutions heading="h1" />
      </main>

      <PageNext page="/solutions/" />
      <SiteFooter />
    </div>
  )
}
