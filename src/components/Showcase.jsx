import React from 'react'
import ScrollMorphHero from '@/components/ui/scroll-morph-hero'
import { brand, hero, marqueeItems, solutions } from '../siteData.js'

/* Twenty tiles in the site's own palette. `no` is the only text on the front
   face; the back shows the brand mark. No photography.
   To use photos instead, add `src` to any tile — the card then renders it
   exactly like the original component:
     { no: '01', src: 'https://…/photo.jpg', label: 'Details' }
   Steps 1-3 below are what the deck does on entry: scatter → line → circle,
   then it morphs into the bottom arc as you keep scrolling. */
const TONES = [
  'from-fuchsia-500 to-indigo-600',
  'from-indigo-500 to-sky-500',
  'from-lime-300 to-emerald-400',
  'from-rose-500 to-fuchsia-500',
  'from-orange-400 to-amber-300',
  'from-teal-400 to-sky-500',
  'from-violet-500 to-purple-600',
  'from-slate-700 to-slate-900',
  'from-amber-300 to-lime-300',
  'from-sky-400 to-indigo-500',
]

/* 20 tiles — six come from the capability list, so the deck carries the
   site's own words on its card backs. */
const DECK = Array.from({ length: 20 }, (_, i) => ({
  no: String(i + 1).padStart(2, '0'),
  tone: TONES[i % TONES.length],
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
