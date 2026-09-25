import { useEffect, useRef, useState, useCallback } from 'react'

/* -------------------------------------------------------------------------
   useReveal — attaches IntersectionObserver reveal behaviour to all elements
   carrying the `.reveal` class inside the given root (defaults to document).
   Adds `.visible` once an element crosses the viewport threshold, then unob-
   serves it so the transition only plays once.
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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
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

/* -------------------------------------------------------------------------
   useScrollState — single rAF-throttled scroll listener (via a `ticking`
   flag). Produces:
     - scrollY  : latest scroll offset (for hero parallax)
     - isScrolled: window scrolled past 60px
     - isNavDark : window scrolled past (transition section top - 200px)
   `transitionRef` points at the day→night transition section.
   ------------------------------------------------------------------------- */
export function useScrollState(transitionRef) {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavDark, setIsNavDark] = useState(false)
  const ticking = useRef(false)

  const update = useCallback(() => {
    const y = window.scrollY || window.pageYOffset
    setScrollY(y)
    setIsScrolled(y > 60)

    const node = transitionRef.current
    if (node) {
      const threshold = node.offsetTop - 200
      setIsNavDark(y > threshold)
    }
    ticking.current = false
  }, [transitionRef])

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Run once to establish initial state.
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [update])

  return { scrollY, isScrolled, isNavDark }
}
