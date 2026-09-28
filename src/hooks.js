import { useEffect, useRef, useState, useCallback } from 'react'

/* -------------------------------------------------------------------------
   useReveal — attaches IntersectionObserver reveal behaviour to all elements
   carrying the `.reveal` class. Adds `.visible` once an element crosses the
   viewport threshold, then unobserves it so the transition only plays once.
   ------------------------------------------------------------------------- */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })
}

/* -------------------------------------------------------------------------
   useScrolled — rAF-throttled scroll listener. Flips to true once the page
   passes `threshold` px, which is what swaps the nav pill from
   bg-white/80 to bg-white/95 + shadow-lg.
   ------------------------------------------------------------------------- */
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)
  const ticking = useRef(false)

  const update = useCallback(() => {
    setScrolled((window.scrollY || window.pageYOffset) > threshold)
    ticking.current = false
  }, [threshold])

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [update])

  return scrolled
}

/* -------------------------------------------------------------------------
   useCounter — animates a number from 0 to `target` once its element enters
   the viewport. Cubic ease-out: 1 - (1 - p)^3, over 1800ms, driven by
   requestAnimationFrame.
   ------------------------------------------------------------------------- */
export function useCounter(target, { duration = 1800, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (startedRef.current) return
      startedRef.current = true
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(target * eased)
        if (progress < 1) requestAnimationFrame(tick)
        else setValue(target)
      }
      requestAnimationFrame(tick)
    }

    if (!('IntersectionObserver' in window)) {
      run()
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()

  return { ref, display }
}
