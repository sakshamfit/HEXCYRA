import React, { Suspense, lazy, useCallback, useRef, useState } from 'react'
import { ArrowUpRight, MousePointerClick, Play, RotateCcw } from 'lucide-react'
import Nav from '../components/Nav.jsx'
import Work from '../components/Work.jsx'
import Contact from '../components/Contact.jsx'
import { approach } from '../siteData.js'
import { useReveal } from '../hooks.js'

/* ==========================================================================
   /work/ — the work index.
   The process is the point of this page, so the four steps of `approach` are
   rendered twice: once as the interactive machine, and once as a plain list
   of buttons. The list is the real navigation (it works without WebGL, with a
   keyboard and with a screen reader) and it drives the machine, and the
   machine drives it back. three.js stays in this route's lazy chunk.
   ========================================================================== */

const AgenticFactory3D = lazy(() => import('../components/ui/agentic-factory-3d'))

/* Station ids inside the scene, in the order of `approach.steps`. */
const STEP_STATION = ['cabinet', 'engine', 'admin', 'storefront']

/* Shown while the three.js chunk is still on its way. The scene replaces it
   with its own loading and error states as soon as it mounts. */
function MachinePoster() {
  return (
    <div
      aria-hidden="true"
      data-machine-poster=""
      className="flex h-full w-full items-center justify-center bg-black"
    >
      <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-white/50">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
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

  /* A step in the list → the matching station in the machine. */
  const focusStep = useCallback((index) => {
    setActive(index)
    window.__machine?.focusStation(STEP_STATION[index])
    machineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  /* A station in the machine → the matching step in the list. */
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

  const step = approach.steps[active]

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 antialiased selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Nav />

      <main>
        {/* ---------------------------------------------------------------
            Header — the approach copy, which is the process this page shows.
            ---------------------------------------------------------------- */}
        <section className="relative px-6 pb-10 pt-32 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                Work · How we work
              </span>

              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:col-span-7">
                  {approach.title}{' '}
                  <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-2 italic text-transparent">
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

        {/* ---------------------------------------------------------------
            The machine — lazy chunk, dark frame, poster until the first frame.
            ---------------------------------------------------------------- */}
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

              {/* `aria-disabled` rather than `disabled`: if WebGL is missing
                  these never become usable, and a control that is still in the
                  tab order can say so instead of silently disappearing. */}
              <div className="reveal flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => ready && runOrder()}
                  aria-disabled={!ready}
                  title={ready ? undefined : 'Available once the 3D scene has loaded.'}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-pop hover:scale-105 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:scale-100"
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
              className="reveal relative mt-8 overflow-hidden rounded-[2.5rem] border-2 border-black bg-black"
            >
              <div className="h-[clamp(520px,80vh,780px)] w-full">
                {/* The poster is the Suspense fallback, not an overlay: it has to
                    disappear the moment the scene takes over, otherwise it would
                    cover the loading and error states the scene draws itself. */}
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

        {/* ---------------------------------------------------------------
            The same four steps as a list of buttons. This is the accessible,
            WebGL-free way in, and it drives the machine both ways.
            ---------------------------------------------------------------- */}
        <section aria-labelledby="steps-heading" className="relative bg-black py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                The process
              </span>

              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                <h2
                  id="steps-heading"
                  className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:col-span-7"
                >
                  The same four steps,{' '}
                  <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text pr-2 italic text-transparent">
                    every time.
                  </span>
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-white/60 lg:col-span-5">
                  Step {step.no} is open on the machine above.
                </p>
              </div>
            </div>

            <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {approach.steps.map((item, index) => {
                const isActive = index === active
                return (
                  <li key={item.no} className="h-full">
                    <button
                      type="button"
                      onClick={() => focusStep(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`reveal group flex h-full w-full flex-col justify-between rounded-[2rem] border p-7 text-left transition-all duration-300 ease-pop ${
                        isActive
                          ? 'border-lime-400 bg-white/10 shadow-lg shadow-lime-400/10'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                      }`}
                      style={{ '--reveal-delay': `${index * 80}ms` }}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-bold tracking-widest text-lime-400">
                            {item.no}
                          </span>
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-widest ${
                              isActive ? 'text-lime-400' : 'text-white/30'
                            }`}
                          >
                            {isActive ? 'On the machine' : 'Open'}
                          </span>
                        </div>
                        <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight tracking-tight">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
                      </div>
                      <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white/50 transition-colors group-hover:text-lime-400">
                        See it on the machine
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* 04 / Selected work — the existing section, unchanged. */}
        <Work />
      </main>

      <Contact />
    </div>
  )
}
