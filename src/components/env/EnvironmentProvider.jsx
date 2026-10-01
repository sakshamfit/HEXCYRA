import React, {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { applyEnvironment, phaseAt, readStoredMode, STORAGE_KEY, TIMELINE, writeStoredMode } from '@/lib/environment.js'

const WavyBackground = lazy(() => import('@/components/ui/blue-meshy-background'))

const EnvironmentContext = createContext(null)

export function useEnvironment() {
  const value = useContext(EnvironmentContext)
  if (!value) throw new Error('useEnvironment must be used inside EnvironmentProvider')
  return value
}

const clamp = (value) => Math.min(1, Math.max(0, value))
const easeSine = (value) => -(Math.cos(Math.PI * value) - 1) / 2
const easeOut = (value) => 1 - Math.pow(1 - value, 3)

export function EnvironmentProvider({ children }) {
  const [mode, setModeState] = useState(readStoredMode)
  const [phase, setPhase] = useState(() => (mode === 'night' ? 'Night' : 'Day'))
  const [transitioning, setTransitioning] = useState(false)
  const initialMode = useRef(mode)
  const current = useRef({
    env: mode === 'night' ? 1 : 0,
    lamp: mode === 'night' ? 1 : 0,
    ambient: mode === 'night' ? 1 : 0,
  })
  const phaseRef = useRef(phase)
  const frameRef = useRef(0)

  const apply = useCallback((env, lamp, ambient) => {
    current.current = { env, lamp, ambient }
    applyEnvironment(env, lamp, ambient)

    const nextPhase = phaseAt(env)
    if (nextPhase !== phaseRef.current) {
      phaseRef.current = nextPhase
      setPhase(nextPhase)
    }
  }, [])

  // The matching data-mode is also stamped by a tiny head script, so the
  // correct resting palette is present before React starts painting.
  useEffect(() => {
    const restingMode = initialMode.current
    const progress = restingMode === 'night' ? 1 : 0
    apply(progress, progress, progress)
    document.documentElement.dataset.mode = restingMode

    return () => cancelAnimationFrame(frameRef.current)
  }, [apply])

  const animateTo = useCallback(
    (target) => {
      cancelAnimationFrame(frameRef.current)
      const { env: fromEnv, lamp: fromLamp, ambient: fromAmbient } = current.current
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const mobileScale = window.innerWidth < 768 ? TIMELINE.mobileScale : 1
      const to = target === 'night' ? 1 : 0
      let channels

      if (reduceMotion) {
        const duration = TIMELINE.reducedMotion
        channels = {
          env: { from: fromEnv, to, delay: 0, duration, ease: easeSine },
          lamp: { from: fromLamp, to, delay: 0, duration, ease: easeSine },
          ambient: { from: fromAmbient, to, delay: 0, duration, ease: easeSine },
        }
      } else if (target === 'night') {
        const forward = TIMELINE.forward
        const remaining = 1 - fromEnv
        channels = {
          env: {
            from: fromEnv,
            to: 1,
            delay: 0,
            duration: forward.env[1] * Math.max(remaining, 0.15) * mobileScale,
            ease: easeSine,
          },
          lamp: {
            from: fromLamp,
            to: 1,
            delay: forward.lamp[0] * remaining * mobileScale,
            duration: forward.lamp[1] * (1 - fromLamp * 0.8) * mobileScale,
            ease: easeSine,
          },
          ambient: {
            from: fromAmbient,
            to: 1,
            delay: forward.ambient[0] * remaining * mobileScale,
            duration: forward.ambient[1] * (1 - fromAmbient * 0.8) * mobileScale,
            ease: easeOut,
          },
        }
      } else {
        const reverse = TIMELINE.reverse
        channels = {
          lamp: {
            from: fromLamp,
            to: 0,
            delay: 0,
            duration: reverse.lamp[1] * Math.max(fromLamp, 0.2) * mobileScale,
            ease: easeSine,
          },
          ambient: {
            from: fromAmbient,
            to: 0,
            delay: 0,
            duration: reverse.ambient[1] * Math.max(fromAmbient, 0.2) * mobileScale,
            ease: easeSine,
          },
          env: {
            from: fromEnv,
            to: 0,
            delay: reverse.env[0] * fromLamp * mobileScale,
            duration: reverse.env[1] * Math.max(fromEnv, 0.15) * mobileScale,
            ease: easeSine,
          },
        }
      }

      const root = document.documentElement
      root.dataset.transition = target
      setTransitioning(true)
      const startedAt = performance.now()
      const valueAt = (channel, now) => {
        const t = clamp((now - startedAt - channel.delay) / Math.max(channel.duration, 1))
        return channel.from + (channel.to - channel.from) * channel.ease(t)
      }
      const finishAfter = Math.max(...Object.values(channels).map((channel) => channel.delay + channel.duration))

      const tick = (now) => {
        apply(
          valueAt(channels.env, now),
          valueAt(channels.lamp, now),
          valueAt(channels.ambient, now),
        )

        if (now - startedAt < finishAfter) {
          frameRef.current = requestAnimationFrame(tick)
          return
        }

        apply(to, to, to)
        root.dataset.mode = target
        delete root.dataset.transition
        setTransitioning(false)
      }

      frameRef.current = requestAnimationFrame(tick)
    },
    [apply],
  )

  const setMode = useCallback(
    (nextMode) => {
      if (nextMode === mode) return
      setModeState(nextMode)
      writeStoredMode(nextMode)
      animateTo(nextMode)
    },
    [animateTo, mode],
  )

  const toggle = useCallback(() => {
    setMode(mode === 'day' ? 'night' : 'day')
  }, [mode, setMode])

  // Keep open tabs in sync if the saved preference changes elsewhere.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY) return
      const nextMode = event.newValue === 'day' ? 'day' : 'night'
      setModeState(nextMode)
      animateTo(nextMode)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [animateTo])

  const value = useMemo(
    () => ({ mode, phase, transitioning, toggle, setMode }),
    [mode, phase, transitioning, toggle, setMode],
  )

  return (
    <>
      <Suspense fallback={<div aria-hidden="true" className="animated-shader-background" />}>
        <WavyBackground className="animated-shader-background fixed inset-0 pointer-events-none z-0" />
      </Suspense>
      <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>
    </>
  )
}
