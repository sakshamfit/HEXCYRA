import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { MousePointerClick, Play, RotateCcw } from 'lucide-react'
import Nav from '../components/Nav.jsx'
import Work from '../components/Work.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'
import PageNext from '../components/PageNext.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { approach } from '../siteData.js'
import { useReveal } from '../hooks.js'

const AgenticFactory3D = lazy(() => import('../components/ui/agentic-factory-3d'))

const STEP_STATION = ['cabinet', 'engine', 'admin', 'storefront']

function MachinePoster() {
  return (
    <div
      aria-hidden="true"
      data-machine-poster=""
      className="flex h-full w-full items-center justify-center bg-black"
    >
      <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-white/50">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        Assembling the machine
      </span>
    </div>
  )
}

export default function WorkPage() {
  useReveal()
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(0)
  const machineRef = useRef(null)

  const focusStep = useCallback((index) => {
    setActive(index)
    window.__machine?.focusStation(STEP_STATION[index])
    machineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const handleStation = useCallback((id) => {
    const index = STEP_STATION.indexOf(id)
    if (index >= 0) setActive(index)
  }, [])

  const runOrder = useCallback(() => {
    window.__machine?.setMode('order')
    machineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const resetMachine = useCallback(() => {
    window.__machine?.setMode('assembled')
  }, [])

  useEffect(() => {
    if (!ready) return
    const requested = Number(new URLSearchParams(window.location.search).get('step'))
    if (!Number.isInteger(requested) || requested < 1 || requested > approach.steps.length) return
    const index = requested - 1
    setActive(index)
    window.__machine?.focusStation(STEP_STATION[index])
  }, [ready])

  return (
    <div className="site-page min-h-screen w-full font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <Nav />

      <main>
        <section className="relative px-6 pb-10 pt-32 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                Work · How we work
              </span>

              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                <h1 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-6xl lg:col-span-7">
                  {approach.title}{' '}
                  <span className="inline-block pr-3 pb-1 italic text-slate-500">
                    {approach.accent}
                  </span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:col-span-5">
                  {approach.lead}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="machine-heading" className="relative px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="reveal max-w-xl">
                <h2
                  id="machine-heading"
                  className="font-display text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-3xl"
                >
                  Four stations. One brief, travelling end to end.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Drag to rotate, scroll to zoom, and click a station to look at it. Run one
                  project through the machine to see the four steps in order.
                </p>
              </div>

              <div className="reveal flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => ready && runOrder()}
                  aria-disabled={!ready}
                  title={ready ? undefined : 'Available once the 3D scene has loaded.'}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 ease-pop hover:scale-105 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:scale-100"
                >
                  <Play className="h-4 w-4" />
                  Run one project
                </button>
                <button
                  type="button"
                  onClick={() => ready && resetMachine()}
                  aria-disabled={!ready}
                  title={ready ? undefined : 'Available once the 3D scene has loaded.'}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 aria-disabled:cursor-not-allowed aria-disabled:opacity-40"
                >
                  <RotateCcw className="h-4 w-4" />
                  Back to the machine
                </button>
              </div>
            </div>

            <p role="status" className="sr-only">
              {ready
                ? 'The interactive process machine is ready. Choose a step, or click a station on the machine.'
                : 'Loading the interactive process machine. The four steps are listed below.'}
            </p>

            <div
              ref={machineRef}
              className="reveal relative mt-8 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-black"
            >
              <div className="h-[clamp(520px,80vh,780px)] w-full">
                <Suspense fallback={<MachinePoster />}>
                  <AgenticFactory3D
                    height="100%"
                    onStation={handleStation}
                    onReady={() => setReady(true)}
                  />
                </Suspense>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
              Everything here is drawn in the browser — no images, no models. The four steps
              below carry the same process as plain text.
            </p>
          </div>
        </section>

        <ProcessSteps active={active} onSelect={focusStep} id="work-steps" />

        <Work />
      </main>

      <PageNext page="/work/" />
      <SiteFooter />
    </div>
  )
}
