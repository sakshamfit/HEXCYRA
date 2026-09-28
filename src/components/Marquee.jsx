import React from 'react'
import { Star } from 'lucide-react'
import { marqueeItems } from '../siteData.js'

/* ==========================================================================
   MARQUEE
   Lime strip, border-y-2 border-black, tilted -1deg on the container and a
   continuous 20s linear translateX(0% → -50%) loop over a duplicated track.
   ========================================================================== */
export default function Marquee() {
  const track = [...marqueeItems, ...marqueeItems]

  return (
    <section aria-label="Capabilities" className="relative overflow-hidden py-10 md:py-14">
      <div className="-rotate-1 border-y-2 border-black bg-lime-300 py-4 md:py-6">
        <div className="flex w-max animate-marquee items-center">
          {track.map((item, i) => (
            <div key={`${item}-${i}`} className="flex shrink-0 items-center">
              <span className="px-6 font-display text-2xl font-extrabold uppercase tracking-tight text-slate-900 md:px-8 md:text-4xl">
                {item}
              </span>
              <Star className="h-4 w-4 shrink-0 fill-slate-900 text-slate-900 md:h-5 md:w-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
