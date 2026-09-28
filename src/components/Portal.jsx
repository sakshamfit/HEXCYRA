import React from 'react'
import GlyphPortal from '@/components/ui/glyph-portal'
import Marquee from './Marquee.jsx'
import { brand, hero, marqueeItems, whatWeDo } from '../siteData.js'

/* ==========================================================================
   GLYPH PORTAL — the passage under the hero
   The brand word is the clip: the field is only visible through the
   letterforms, so every glyph is a window. Pick one (hover or tap a letter,
   arrow keys, or the picker on touch) and scroll — the camera flies into the
   largest patch of solid ink inside that letter, and the capability strip is
   waiting on the far side in the same colour as the field.

   The component owns the geometry, the camera, the scroll position and the
   reduced-motion layout. This file only supplies the palette, the opening
   frame, and what you land in.
   ========================================================================== */

const FRONT_CSS = `
.hexcyra-portal [data-gp-head]{position:absolute;inset:clamp(16px,4.4cqw,44px) clamp(20px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;font-family:inherit;}
.hexcyra-portal [data-gp-eyebrow]{position:absolute;inset:calc(var(--gp-word-top,50%) - 64px) 5cqw auto;margin:0;text-align:center;font:600 12px/1.5 inherit;letter-spacing:.2em;text-transform:uppercase;color:#7c817b;}
.hexcyra-portal [data-gp-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 30px) 5cqw auto;margin:0 auto;max-width:56ch;text-align:center;font:400 16px/1.6 inherit;color:#646a63;}
.hexcyra-portal [data-gp-hint]{font:600 11px/1.4 inherit;letter-spacing:.14em;text-transform:uppercase;color:#7c817b;}
.hexcyra-portal [data-gp-caption]{font-family:inherit;}
.hexcyra-portal [data-gp-enter]{gap:28px;min-height:46px;padding:0 20px;border:1px solid #0b0b0b;border-radius:10px;background:#0b0b0f;color:#fff;font:500 13px/1 inherit;transition:background .18s,box-shadow .18s;}
.hexcyra-portal [data-gp-enter]:hover{background:#241f63;box-shadow:0 3px 8px rgba(11,11,15,.16);}
.hexcyra-portal [data-gp-enter]:focus-visible{outline:2px solid #0b0b0f;outline-offset:4px;}
.hexcyra-portal [data-gp-select]{font-family:inherit;border-radius:10px;padding:0 12px;}
@media (max-width:640px){.hexcyra-portal [data-gp-eyebrow],.hexcyra-portal [data-gp-support]{inset-inline:20px;}.hexcyra-portal [data-gp-head]{inset-inline:20px;}.hexcyra-portal [data-gp-support]{font-size:14px;}}
`

/* The field behind the word. Same construction the component ships as its
   default — three radials over a linear base — in the site palette. */
const FIELD_BACKGROUND = (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      transform: 'scale(var(--gp-field-scale,1))',
      background: [
        'radial-gradient(circle at 18% 10%, rgba(99,102,241,.55), transparent 38%)',
        'radial-gradient(circle at 84% 22%, rgba(190,242,100,.16), transparent 30%)',
        'radial-gradient(circle at 48% 82%, rgba(217,70,239,.26), transparent 46%)',
        'linear-gradient(135deg,#0b0b0f 0%,#15143a 46%,#08080f 100%)',
      ].join(','),
    }}
  />
)

export default function Portal() {
  return (
    <>
      <style>{FRONT_CSS}</style>

      <GlyphPortal
        className="hexcyra-portal"
        word={brand.name}
        scrollLength={2.4}
        fontFamily="Outfit, ui-sans-serif, system-ui, sans-serif"
        fontWeight={800}
        enterLabel="Step inside"
        background={FIELD_BACKGROUND}
        front={
          <>
            <div data-gp-head>
              <span className="flex items-center gap-2.5 font-display text-[19px] font-semibold tracking-[-0.065em] text-slate-900">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                {brand.name}
              </span>
              <span className="text-xs leading-6 text-slate-400">{hero.badge}</span>
            </div>

            <p data-gp-eyebrow>{brand.tagline}</p>
            <p data-gp-support>{whatWeDo.paragraph}</p>
          </>
        }
        style={{
          '--gp-paper': '#FAFAFA',
          '--gp-ink': '#0b0b0f',
          '--gp-field': '#0b0b0f',
          '--gp-foreground': '#ffffff',
        }}
      >
        {/* The far side: the capability strip, on the field's own colour. */}
        <Marquee />
        <div className="sr-only">
          <h2>{brand.tagline}</h2>
          <ul>
            {marqueeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </GlyphPortal>
    </>
  )
}
