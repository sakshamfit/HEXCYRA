import React from 'react'
import ScrollMorphHero from '@/components/ui/scroll-morph-hero'
import { brand, hero, marqueeItems, solutions } from '../siteData.js'

/* Six minimal photographs, cycled across twenty tiles. Each is ~11-14 kB and
   they are fetched lazily, after the showcase chunk itself has arrived.
   Card fronts show the photo; card backs carry the tile number and the
   capability name. */
const DECK_IMAGES = [
  '/img/deck-1.jpg',
  '/img/deck-2.jpg',
  '/img/deck-3.jpg',
  '/img/deck-4.jpg',
  '/img/deck-5.jpg',
  '/img/deck-6.jpg',
]

const DECK = Array.from({ length: 20 }, (_, i) => ({
  no: String(i + 1).padStart(2, '0'),
  src: DECK_IMAGES[i % DECK_IMAGES.length],
  label: marqueeItems[i % marqueeItems.length],
}))

/* ==========================================================================
   SHOWCASE — scroll-morph hero
   A full-height band where the deck scatters, snaps into a line, rings up,
   then settles into a bottom arc while the headline fades into the
   "Explore Solutions" reveal. Wheel/touch are captured only while the band
   is the dominant thing on screen and released at both ends, so the page
   still scrolls normally. `prefers-reduced-motion` skips to the final arc.
   ========================================================================== */
export default function Showcase() {
  return (
    <section id="showcase" aria-label="Capability showcase" className="relative">
      <div className="h-screen min-h-[640px] w-full">
        <ScrollMorphHero
          items={DECK}
          introTitle={brand.tagline}
          introCue={hero.scrollCue}
          arcTitle={hero.secondaryCta}
          arcBody={solutions.lead}
        />
      </div>

      {/* Text equivalent for screen readers and crawlers. */}
      <div className="sr-only">
        <h2>{brand.tagline}</h2>
        <p>{solutions.lead}</p>
        <p>{hero.scrollCue}</p>
      </div>
    </section>
  )
}
