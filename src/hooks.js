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
      els.forEach((el) => {
        el.classList.add('visible')
        el.setAttribute('data-visible', '')
      })
      return
    }

    // `data-visible` is what the CSS actually keys on. React rewrites the
    // className attribute whenever a component's class prop changes, which
    // would silently wipe an externally-added `.visible`; data-* attributes
    // React doesn't render itself are never touched.
    const reveal = (el) => {
      el.classList.add('visible')
      el.setAttribute('data-visible', '')
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
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
