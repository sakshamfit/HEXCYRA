import React from 'react'
import GlyphPortal from '@/components/ui/glyph-portal'
import Marquee from './Marquee.jsx'
import { brand, whatWeDo } from '../siteData.js'

/* ==========================================================================
   GLYPH PORTAL — the passage under the hero
   The brand word is set enormous across the band. Pick a letter (the picker,
   a click on the word, or keys 1–7), then scroll: that glyph grows around its
   own centre until it covers the screen, and the lime capability strip is
   waiting on the far side. The band below the stage is painted with the same
   field colour, so arriving through the letter has no seam.

   The scroll is the page's own — the stage is sticky and 2.4 screens tall, so
   nothing is captured and reduced-motion visitors get the static layout.
   ========================================================================== */
export default function Portal() {
  return (
    <GlyphPortal
      id="portal"
      word={brand.name}
      scrollLength={2.4}
      enterLabel="Step inside"
      pickerLabel="Entry letter"
      hint={
        <>
          Scroll for a closer look <span aria-hidden="true">↓</span>
        </>
      }
      header={
        <span className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-lime-400" />
          <span className="font-display text-lg font-bold tracking-[-0.06em]">{brand.name}</span>
        </span>
      }
      front={
        <p className="gp-eyebrow gp-fade text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 md:text-xs">
          {brand.tagline}
        </p>
      }
      caption={
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          {whatWeDo.paragraph}
        </p>
      }
      field="linear-gradient(142deg, #0b0b0f 0%, #12112e 55%, #0b0b0f 100%)"
      fontFamily="Outfit, ui-sans-serif, system-ui, sans-serif"
      fontWeight={800}
      style={{ '--gp-paper': '#FAFAFA', '--gp-ink': '#0b0b0f' }}
    >
      {/* Far side of the passage — same colour as the inside of the glyph. */}
      <div className="relative overflow-hidden bg-[#0b0b0f] py-14 md:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[100px]" />
        <Marquee bare />
        <p className="sr-only">
          <h2>{brand.tagline}</h2>
          <p>{whatWeDo.paragraph}</p>
        </p>
      </div>
    </GlyphPortal>
  )
}
