# NEXCYRA — Independent Creative Studio

A single-page site for **NEXCYRA — Independent Creative Studio**, built with
**Tailwind CSS** and **vanilla JavaScript**. No frameworks, no build step at runtime: open
`index.html` and it works.

```
.
├── index.html              # the whole site — 9 sections in the exact reference order
├── assets/
│   ├── css/styles.css      # compiled Tailwind output (committed, served as-is)
│   └── js/main.js          # observers, header state, mobile menu, accordions
├── src/input.css           # Tailwind source: @tailwind directives + @layer base/components
├── tailwind.config.js      # Inter font stack, extended opacity scale, custom keyframes
└── package.json            # tailwindcss CLI scripts
```

## Run it

```bash
npm install          # installs the Tailwind CLI (devDependency)
npm run serve        # static server on http://0.0.0.0:8080
npm run dev:css      # rebuild assets/css/styles.css on every markup change
npm run build:css    # one-off minified production build
```

`assets/css/styles.css` is generated, but it is committed on purpose so the page can be
served as a plain static file with no build step. Re-run `npm run build:css` after editing
markup or `src/input.css`.

## Runtime dependencies (loaded from CDN by the browser)

| Dependency | URL |
| --- | --- |
| Lucide icons | `https://unpkg.com/lucide@latest` |
| Google Fonts — Inter 400 / 500 / 600 | imported at the top of `src/input.css` |

`lucide@latest` is now v1, which changed two things that this repo handles explicitly:

- `createIcons()` **throws** when called without an icons object, so `assets/js/main.js`
  calls `lucide.createIcons({ icons: lucide.icons })` (with a v0-style fallback and a
  `try/catch` so a blocked CDN can never break the rest of the page script).
- Brand icons (`instagram`, `linkedin`, `twitter`, `dribbble`) were **removed** from
  Lucide v1. Those four marks are drawn as inline SVG in Lucide's own 24×24 / 2px stroke
  grammar, tagged `data-brand-icon`.

## Fidelity notes (the quirks are intentional)

- **Palette is strictly hex:** `#111213` dark, `#f06a18` hero orange, `#e9e7e1` work
  off-white, `#ff6a1a` accent orange (never stock Tailwind `orange-*`).
- **`#work` is nested inside an `#e9e7e1` container** even though the site is dark themed:
  `<div class="bg-[#e9e7e1] text-[#111213]"><section id="work">…</section></div>`.
- **Navigation highlighting** uses an `IntersectionObserver` with
  `rootMargin: '-35% 0px -55% 0px'` — the active link swaps `text-white/45` →
  `text-[#f4f2ed]` and scales in its `#ff6a1a` underline.
- **Project index rows** layer hover colours with `text-white/45` +
  `group-hover:text-[#ff6a1a]/70` spans alongside a `group-hover:text-[#ff6a1a]` title.
- **Font is Inter only** — `fontFamily.sans` is overridden in `tailwind.config.js` and
  `body` also declares `font-family: 'Inter', …` in `@layer base`.
- **Skip link** stays `z-[100]` and `-translate-y-24`, sliding to `focus:translate-y-0`
  with `opacity-0 → focus:opacity-100`.
- **Selection colour** is `#ff6a1a` on black — via `selection:bg-[#ff6a1a]
  selection:text-black` on `<body>` and a `::selection` rule in CSS.
- **Hero** is `min-h-screen relative overflow-hidden`; the image layer uses
  `mix-blend-multiply` over `bg-[#f06a18]`, with an absolute
  `bg-gradient-to-b from-black/5 via-transparent to-black/40` overlay above it. Hero copy
  is bottom-aligned (`flex flex-col justify-end`, `pb-8 pt-28`) inside a `max-w-5xl` block.
- **Journal images** are `grayscale` by default and go `group-hover:grayscale-0` with a
  `group-hover:scale-[1.05]` over `duration-700`.
- **Process accordion allows exactly one open item**; the FAQ accordion toggles
  independently. Both swap a Lucide `plus` ↔ `minus` icon and keep `aria-expanded` /
  `aria-controls` / `role="region"` in sync.

## Interaction map (`assets/js/main.js`)

| Behaviour | Detail |
| --- | --- |
| Header on scroll | past `scrollY > 100`: adds `bg-[#111213]/90`, `backdrop-blur-md`, `border-white/15`; removes `border-transparent`. rAF-throttled passive listener. |
| Hero entrance | every `[data-hero]` goes `translateY(1.5rem) → 0` and `opacity 0 → 1` with a **105 ms** stagger. |
| Scroll reveals | every `[data-reveal]` goes `translateY(22px) → 0` and `opacity 0 → 1`, honouring per-element `data-reveal-delay`. |
| Mobile menu | `hidden` ↔ `flex` on `#mobile-menu`, `overflow-hidden` on `<body>`, `aria-expanded` + menu/close icon swap, closes on link click, `Escape`, and ≥1024 px resize. |
| Accordions | `.process-button` / `.faq-button` toggle their `.process-detail` / `.faq-answer` panels. |

## Accessibility & motion

- Landmarks and one `h1`, sections carry `scroll-mt-24` so anchors clear the fixed header.
- Accordions expose `aria-expanded`, `aria-controls` and `role="region"`.
- `prefers-reduced-motion: reduce` disables the reveal/hero transforms, collapses transition
  durations, and the JS skips the observers entirely (elements render visible immediately).
- Without JavaScript, `.no-js` in `src/input.css` reveals everything, so no content is
  stranded at `opacity: 0`.
- Focus rings use `#ff6a1a`, switching to `#111213` inside the off-white and orange
  sections where orange would disappear.

## Assets

Hero, four project images and three journal images are hot-linked from the reference asset
map (Supabase public storage) at their original `_3840w.png` URLs, with `loading="lazy"` +
`decoding="async"` below the fold and `fetchpriority="high"` on the hero.

## Verification

Two throwaway harnesses were used during development (they live outside the repo):

- **Class audit** — every class token in `index.html` and `main.js` (441 tokens) is checked
  against the compiled stylesheet, so no utility silently fails to generate. This is what
  caught `bg-[#111213]/98`: `98` is not in Tailwind's default opacity scale, so the scale is
  widened in `tailwind.config.js` rather than rewriting the reference class string.
- **jsdom behaviour suite** — 61 assertions covering icon rendering, the 105 ms hero
  stagger, both observers (including the exact `-35% 0px -55% 0px` root margin), header
  scroll classes, mobile-menu state, and both accordions; re-run under
  `prefers-reduced-motion` (59 assertions).
