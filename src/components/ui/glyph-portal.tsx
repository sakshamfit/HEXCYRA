import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/* -------------------------------------------------------------------------
   Glyph Portal — Christian Katzmann (ktzm.dk), MIT, via 21st.dev.

   A word is set enormous across the viewport. You choose one of its letters,
   then scroll: that glyph scales up around its own centre until its ink
   covers the screen, and the section underneath arrives as the far side of
   the passage. Nothing is hijacked — the scroll is the page's own, so the
   band is a tall `position: sticky` stage and the browser does the rest.

   Structure, matching the reference:
     · --gp-paper      stage background (what surrounds the word)
     · --gp-field      colour inside the letterforms AND the colour the next
                       section starts on, so the passage has no seam
     · --gp-ink        type that sits on the paper
     · --gp-word-top / --gp-word-bottom
                       measured ink box of the word, as stage percentages, so
                       the eyebrow and caption can sit tight to it
     · --gp-p          0 → 1 scroll progress; drives every fade
     · --gp-scale      written per frame from JS; the glyph zoom

   The field is a CSS background value clipped to the text
   (`background-clip: text`), so a gradient or photograph runs continuously
   across all the letters and zooms with them. A canvas or video field would
   need a mask built from the same glyph outlines; the reference ships that,
   this build does not — pass a gradient or an image.

   `prefers-reduced-motion: reduce` gets the complete static layout: the word
   sits still, nothing scrolls away, and the section simply follows it.
   ------------------------------------------------------------------------- */

export interface GlyphPortalProps {
  /** The word. Any of its letters can be chosen as the entry. */
  word: string
  id?: string
  /** Left-hand slot of the stage header — usually the brand. */
  header?: React.ReactNode
  /** Extra overlay content, absolutely positioned by the caller. */
  front?: React.ReactNode
  /** Content placed under the word, anchored to its measured ink box. */
  caption?: React.ReactNode
  enterLabel?: string
  hint?: React.ReactNode
  pickerLabel?: string
  /** Stage height in viewport heights. The reference default is 2.4. */
  scrollLength?: number
  /** Letter picker, click-to-pick on the word, and the number keys. */
  interactive?: boolean
  /** CSS background value painted inside the letterforms. */
  field?: string
  fontFamily?: string
  fontWeight?: number
  className?: string
  style?: React.CSSProperties
  /** The section you land in. Give it `var(--gp-field)` for a seamless exit. */
  children?: React.ReactNode
}

type Box = { x: number; y: number; w: number; h: number }
type Geo = { wordW: number; wordH: number; stageW: number; stageH: number; boxes: Box[] }

/** Scroll progress at which the glyph starts growing, and where it stops. */
const ZOOM_IN = 0.12
const ZOOM_OUT = 0.94
/** Grow a little past the viewport so the letter has no visible edge. */
const OVERSHOOT = 1.12

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

const CSS = `
.gp-root { position: relative; height: calc(var(--gp-scroll, 2.4) * 100svh); background: var(--gp-paper, #fff); }
.gp-stage { position: sticky; top: 0; height: 100svh; overflow: hidden; container-type: inline-size; background: var(--gp-paper, #fff); }

.gp-wordwrap { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 0 2vw; }
.gp-word {
  display: inline-block; white-space: nowrap; text-transform: uppercase;
  font-family: var(--gp-font, inherit); font-weight: var(--gp-weight, 800);
  font-size: 20cqw; line-height: 0.8; letter-spacing: -0.055em; margin-right: -0.055em;
  background-image: var(--gp-field-image); background-size: 190% 190%; background-position: 28% 42%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  transform: translate(var(--gp-shift-x, 0px), var(--gp-shift-y, 0px)) scale(var(--gp-scale, 1));
  transform-origin: var(--gp-origin-x, 50%) var(--gp-origin-y, 50%);
  will-change: transform;
}
.gp-root:not(.is-reduced) .gp-word { animation: gp-drift 24s ease-in-out infinite alternate; }
@keyframes gp-drift { from { background-position: 22% 38%; } to { background-position: 78% 62%; } }

.gp-header { position: absolute; inset: clamp(18px, 4.2cqw, 44px) clamp(18px, 4.6cqw, 48px) auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.gp-eyebrow { position: absolute; inset: calc(var(--gp-word-top, 50%) - 64px) 5cqw auto; margin: 0; text-align: center; }
.gp-caption { position: absolute; inset: calc(var(--gp-word-bottom, 50%) + 26px) clamp(20px, 6cqw, 72px) auto; margin: 0; text-align: center; opacity: 0.68; }
.gp-enter { position: absolute; inset: auto auto 6% 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 14px; }
.gp-hint { margin: 0; text-align: center; opacity: 0.5; }

/* Everything except the word leaves before the passage gets going. */
.gp-fade { opacity: clamp(0, calc(1 - (var(--gp-p, 0) - 0.015) * 7), 1); }

.gp-picker { display: flex; align-items: center; gap: 6px; }
.gp-picker-label { margin: 0 8px 0 0; font: 600 11px/1 var(--gp-font, inherit); letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.5; }
.gp-picker-key { display: grid; place-items: center; min-width: 30px; height: 30px; padding: 0 6px; border: 1px solid color-mix(in srgb, var(--gp-ink, #0b0b0f) 22%, transparent); border-radius: 8px; background: transparent; color: var(--gp-ink, #0b0b0f); font: 700 13px/1 var(--gp-font, inherit); cursor: pointer; transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease; }
.gp-picker-key:hover { border-color: var(--gp-ink, #0b0b0f); }
.gp-picker-key:focus-visible { outline: 2px solid var(--gp-ink, #0b0b0f); outline-offset: 2px; }
.gp-picker-key[aria-pressed='true'] { background: var(--gp-ink, #0b0b0f); border-color: var(--gp-ink, #0b0b0f); color: var(--gp-paper, #fff); }
.gp-picker-key sup { margin-left: 3px; font-size: 8px; opacity: 0.55; }
.gp-word-hit { cursor: pointer; }

@media (any-pointer: coarse) {
  .gp-header { inset: clamp(16px, 5cqw, 44px) clamp(16px, 5cqw, 40px) auto; }
  .gp-header .gp-picker { position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%); z-index: 5; }
  .gp-picker-label { display: none; }
  .gp-hint { bottom: 13%; }
}

@media (max-width: 640px) {
  .gp-word { font-size: 23cqw; }
  .gp-eyebrow, .gp-caption { inset-inline: 20px; }
  .gp-enter { display: none; }
}

/* Reduced motion: the complete static layout. The word simply sits there and
   the section follows, with no sticky stage and nothing to scroll through. */
.gp-root.is-reduced { height: auto; }
.gp-root.is-reduced .gp-stage { position: relative; height: auto; min-height: 86svh; padding: 16svh 0 13svh; }
.gp-root.is-reduced .gp-word { animation: none; --gp-scale: 1; }
.gp-root.is-reduced .gp-wordwrap { position: relative; inset: auto; }
.gp-root.is-reduced .gp-hint, .gp-root.is-reduced .gp-enter { display: none; }
.gp-root.is-reduced .gp-fade { opacity: 1; }

/* Belt and braces: if the class never lands (no JS, no matchMedia) the CSS
   still refuses to move anything. */
@media (prefers-reduced-motion: reduce) {
  .gp-word { animation: none; transform: none; }
  .gp-stage { position: relative; height: auto; min-height: 86svh; padding: 16svh 0 13svh; }
  .gp-wordwrap { position: relative; inset: auto; }
  .gp-hint, .gp-enter { display: none; }
  .gp-fade { opacity: 1; }
}
`

const DEFAULT_FIELD = 'linear-gradient(142deg, #0b0b0f 0%, #241f63 52%, #0b0b0f 100%)'

export default function GlyphPortal({
  word,
  id,
  header,
  front,
  caption,
  enterLabel = 'Step inside',
  hint,
  pickerLabel = 'Entry letter',
  scrollLength = 2.4,
  interactive = true,
  field = DEFAULT_FIELD,
  fontFamily,
  fontWeight = 800,
  className = '',
  style,
  children,
}: GlyphPortalProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const wordRef = useRef<HTMLSpanElement | null>(null)
  const [active, setActive] = useState(0)
  const [geo, setGeo] = useState<Geo | null>(null)
  const [reduced, setReduced] = useState(false)

  const letters = word.split('')

  /* ------------------------------------------------------ reduced motion */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  /* ------------------------------------------------------------ measuring
     Range rects give the exact ink box of every letter without splitting the
     word into elements, which would break the continuous field. The word is
     un-transformed for the duration of the measurement so the numbers are
     pre-zoom, and the transform goes straight back. */
  const measure = useCallback(() => {
    const wordEl = wordRef.current
    const stage = stageRef.current
    if (!wordEl || !stage) return

    const previous = wordEl.style.transform
    wordEl.style.transform = 'none'
    const wordRect = wordEl.getBoundingClientRect()
    const stageRect = stage.getBoundingClientRect()

    const boxes: Box[] = []
    const node = wordEl.firstChild
    // Range geometry is the one thing this needs from layout. If an engine
    // does not implement it the word still renders — it just stays still.
    if (node && node.nodeType === 3 && typeof document.createRange === 'function') {
      const range = document.createRange()
      if (typeof range.getBoundingClientRect !== 'function') return
      for (let i = 0; i < word.length; i += 1) {
        range.setStart(node, i)
        range.setEnd(node, i + 1)
        const rect = range.getBoundingClientRect()
        if (rect.width > 0) {
          boxes.push({
            x: rect.left - wordRect.left,
            y: rect.top - wordRect.top,
            w: rect.width,
            h: rect.height,
          })
        }
      }
    }
    wordEl.style.transform = previous

    if (boxes.length === 0) return
    setGeo({
      wordW: wordRect.width,
      wordH: wordRect.height,
      stageW: stageRect.width,
      stageH: stageRect.height,
      boxes,
    })
  }, [])

  useEffect(() => {
    measure()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const observer = new ResizeObserver(measure)
    if (stageRef.current) observer.observe(stageRef.current)
    // The webfont lands after first paint; until it does, the ink boxes are
    // measured against the fallback face and the zoom would be wrong.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    if (fonts?.ready) fonts.ready.then(measure).catch(() => {})
    return () => observer.disconnect()
  }, [measure, word])

  /* -------------------------------------------------------------- targets */
  const target = useMemo(() => {
    const fallback = { originX: '50%', originY: '50%', shiftX: 0, shiftY: 0, max: 1, top: 50, bottom: 50 }
    if (!geo || geo.boxes.length === 0) return fallback
    const box = geo.boxes[Math.min(active, geo.boxes.length - 1)]
    const inkTop = Math.min(...geo.boxes.map((b) => b.y))
    const inkBottom = Math.max(...geo.boxes.map((b) => b.y + b.h))
    const wordTop = (geo.stageH - geo.wordH) / 2
    return {
      originX: `${((box.x + box.w / 2) / geo.wordW) * 100}%`,
      originY: `${((box.y + box.h / 2) / geo.wordH) * 100}%`,
      // Scaling about the letter's own centre leaves that centre where it is;
      // this constant shift walks it onto the middle of the stage, which is
      // what makes an off-centre letter grow to cover the screen.
      shiftX: geo.stageW / 2 - ((geo.stageW - geo.wordW) / 2 + box.x + box.w / 2),
      shiftY: geo.stageH / 2 - (wordTop + box.y + box.h / 2),
      max: Math.max(geo.stageW / box.w, geo.stageH / box.h) * OVERSHOOT,
      top: ((wordTop + inkTop) / geo.stageH) * 100,
      bottom: ((wordTop + inkBottom) / geo.stageH) * 100,
    }
  }, [geo, active])

  const targetRef = useRef(target)
  targetRef.current = target

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    stage.style.setProperty('--gp-origin-x', target.originX)
    stage.style.setProperty('--gp-origin-y', target.originY)
    stage.style.setProperty('--gp-shift-x', `${target.shiftX.toFixed(2)}px`)
    stage.style.setProperty('--gp-shift-y', `${target.shiftY.toFixed(2)}px`)
    stage.style.setProperty('--gp-word-top', `${target.top}%`)
    stage.style.setProperty('--gp-word-bottom', `${target.bottom}%`)
  }, [target])

  /* --------------------------------------------------------- the passage */
  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage || reduced) return

    let frame = 0
    let onScreen = false

    const update = () => {
      frame = 0
      if (!onScreen) return
      const rect = root.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const p = travel > 0 ? clamp01(-rect.top / travel) : 0
      const eased = easeInOutCubic(clamp01((p - ZOOM_IN) / (ZOOM_OUT - ZOOM_IN)))
      const scale = 1 + (targetRef.current.max - 1) * eased
      stage.style.setProperty('--gp-p', p.toFixed(4))
      stage.style.setProperty('--gp-scale', scale.toFixed(4))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting
            if (onScreen) schedule()
          })
    if (observer) observer.observe(root)
    else onScreen = true

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [reduced, word])

  /* ------------------------------------------------------------ choosing */
  const choose = useCallback(
    (index: number) => {
      if (index >= 0 && index < letters.length) setActive(index)
    },
    [letters.length],
  )

  const onWordClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!interactive || !geo || !wordRef.current) return
    const rect = wordRef.current.getBoundingClientRect()
    const scale = rect.width / geo.wordW || 1
    const x = (event.clientX - rect.left) / scale
    const y = (event.clientY - rect.top) / scale
    const hit = geo.boxes.findIndex(
      (box) => x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h,
    )
    if (hit >= 0) choose(hit)
  }

  useEffect(() => {
    if (!interactive) return
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const el = event.target as HTMLElement | null
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
      const index = Number(event.key) - 1
      if (Number.isInteger(index) && index >= 0 && index < letters.length) choose(index)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [interactive, letters.length, choose])

  const enter = () => {
    const root = rootRef.current
    if (!root) return
    const top = root.getBoundingClientRect().top + window.scrollY + root.offsetHeight - window.innerHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const rootStyle: React.CSSProperties = {
    '--gp-scroll': scrollLength,
    '--gp-field-image': field,
    ...(fontFamily ? { '--gp-font': fontFamily } : null),
    '--gp-weight': fontWeight,
    ...style,
  } as React.CSSProperties

  return (
    <section
      ref={rootRef}
      id={id}
      className={`gp-root${reduced ? ' is-reduced' : ''}${className ? ` ${className}` : ''}`}
      style={rootStyle}
      aria-label={`${word} portal — choose a letter, then scroll through it`}
    >
      <style>{CSS}</style>

      <div ref={stageRef} className="gp-stage">
        <div className="gp-wordwrap">
          <span
            ref={wordRef}
            className={`gp-word${interactive ? ' gp-word-hit' : ''}`}
            onClick={onWordClick}
            aria-hidden="true"
          >
            {word}
          </span>
        </div>

        {(header || interactive) && (
          <div className="gp-header gp-fade">
            <div className="gp-brand">{header}</div>
            {interactive && (
              <div className="gp-picker" role="group" aria-label={pickerLabel}>
                <p className="gp-picker-label">{pickerLabel}</p>
                {letters.map((letter, index) => (
                  <button
                    key={`${letter}-${index}`}
                    type="button"
                    className="gp-picker-key"
                    aria-pressed={index === active}
                    aria-label={`Enter through ${letter}`}
                    onClick={() => choose(index)}
                  >
                    {letter}
                    <sup>{index + 1}</sup>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {front}

        {caption != null && <div className="gp-caption gp-fade">{caption}</div>}

        {!reduced && enterLabel && (
          <div className="gp-enter gp-fade">
            {hint != null && <p className="gp-hint">{hint}</p>}
            <button
              type="button"
              onClick={enter}
              className="inline-flex min-h-[46px] items-center gap-7 rounded-[10px] border border-black bg-slate-900 px-5 text-[13px] font-medium text-white transition-[background,box-shadow] duration-200 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
            >
              {enterLabel}
              <span aria-hidden="true">↘</span>
            </button>
          </div>
        )}
      </div>

      {/* The far side of the passage. */}
      {children}
    </section>
  )
}
