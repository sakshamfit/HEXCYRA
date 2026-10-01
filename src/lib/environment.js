/*
 * Site atmosphere engine, adapted from sakshamfit/LIGHTTON's environmental
 * lighting model. Instead of flipping a binary theme, every site token travels
 * through five colour stops as the visitor moves from day to night.
 */
export const PHASES = ['Day', 'Early dusk', 'Dusk', 'Evening', 'Night']
export const STORAGE_KEY = 'hexcyra.mode'

const STOPS = [
  // Day — a bright periwinkle canvas with a warm, high-energy accent system.
  {
    bg: 'rgba(247,248,255,1)',
    'bg-2': 'rgba(238,242,255,1)',
    surface: 'rgba(232,238,255,1)',
    panel: 'rgba(255,255,255,0.92)',
    fg: 'rgba(17,24,50,1)',
    'fg-2': 'rgba(55,65,95,1)',
    'fg-3': 'rgba(102,113,148,1)',
    line: 'rgba(79,70,229,0.18)',
    'line-strong': 'rgba(79,70,229,0.72)',
    inv: 'rgba(79,70,229,1)',
    'inv-fg': 'rgba(255,255,255,1)',
    horizon: 'rgba(99,102,241,0.08)',
    sky: 'rgba(224,231,255,1)',
    watermark: 'rgba(79,70,229,0.07)',
    brand: 'rgba(79,70,229,1)',
    'brand-deep': 'rgba(67,56,202,1)',
    'brand-foreground': 'rgba(255,255,255,1)',
    'accent-color': 'rgba(13,148,136,1)',
    'accent-2': 'rgba(234,88,12,1)',
    'accent-3': 'rgba(219,39,119,1)',
  },
  // Early dusk — lavender surfaces with the same indigo, teal and coral energy.
  {
    bg: 'rgba(231,234,252,1)',
    'bg-2': 'rgba(220,226,250,1)',
    surface: 'rgba(212,220,248,1)',
    panel: 'rgba(246,247,255,0.94)',
    fg: 'rgba(20,28,62,1)',
    'fg-2': 'rgba(53,62,96,1)',
    'fg-3': 'rgba(96,108,143,1)',
    line: 'rgba(67,56,202,0.2)',
    'line-strong': 'rgba(67,56,202,0.76)',
    inv: 'rgba(67,56,202,1)',
    'inv-fg': 'rgba(255,255,255,1)',
    horizon: 'rgba(79,70,229,0.1)',
    sky: 'rgba(199,210,254,1)',
    watermark: 'rgba(67,56,202,0.08)',
    brand: 'rgba(67,56,202,1)',
    'brand-deep': 'rgba(55,48,163,1)',
    'brand-foreground': 'rgba(255,255,255,1)',
    'accent-color': 'rgba(13,148,136,1)',
    'accent-2': 'rgba(234,88,12,1)',
    'accent-3': 'rgba(190,24,93,1)',
  },
  // Dusk — a saturated twilight bridge, never a flat grey transition.
  {
    bg: 'rgba(91,92,154,1)',
    'bg-2': 'rgba(77,79,142,1)',
    surface: 'rgba(100,102,170,1)',
    panel: 'rgba(143,145,205,0.92)',
    fg: 'rgba(14,20,52,1)',
    'fg-2': 'rgba(34,42,82,1)',
    'fg-3': 'rgba(62,72,118,1)',
    line: 'rgba(27,24,78,0.26)',
    'line-strong': 'rgba(27,24,78,0.78)',
    inv: 'rgba(27,24,78,1)',
    'inv-fg': 'rgba(248,250,255,1)',
    horizon: 'rgba(251,146,60,0.12)',
    sky: 'rgba(67,56,140,1)',
    watermark: 'rgba(255,255,255,0.08)',
    brand: 'rgba(27,24,78,1)',
    'brand-deep': 'rgba(15,23,65,1)',
    'brand-foreground': 'rgba(255,255,255,1)',
    'accent-color': 'rgba(20,184,166,1)',
    'accent-2': 'rgba(251,146,60,1)',
    'accent-3': 'rgba(244,114,182,1)',
  },
  // Evening — deep blue replaces charcoal, with brighter electric accents.
  {
    bg: 'rgba(18,27,58,1)',
    'bg-2': 'rgba(22,32,70,1)',
    surface: 'rgba(28,40,84,1)',
    panel: 'rgba(35,49,101,0.94)',
    fg: 'rgba(242,246,255,1)',
    'fg-2': 'rgba(190,204,238,1)',
    'fg-3': 'rgba(137,157,202,1)',
    line: 'rgba(147,164,255,0.2)',
    'line-strong': 'rgba(169,183,255,0.74)',
    inv: 'rgba(129,115,255,1)',
    'inv-fg': 'rgba(248,250,255,1)',
    horizon: 'rgba(45,212,191,0.1)',
    sky: 'rgba(15,23,65,1)',
    watermark: 'rgba(160,174,255,0.08)',
    brand: 'rgba(129,115,255,1)',
    'brand-deep': 'rgba(91,78,211,1)',
    'brand-foreground': 'rgba(255,255,255,1)',
    'accent-color': 'rgba(45,212,191,1)',
    'accent-2': 'rgba(251,146,60,1)',
    'accent-3': 'rgba(244,114,182,1)',
  },
  // Night — a rich navy base; vivid colour remains visible instead of collapsing to black and white.
  {
    bg: 'rgba(7,13,31,1)',
    'bg-2': 'rgba(11,20,45,1)',
    surface: 'rgba(16,29,61,1)',
    panel: 'rgba(20,35,72,0.94)',
    fg: 'rgba(244,247,255,1)',
    'fg-2': 'rgba(189,204,239,1)',
    'fg-3': 'rgba(132,154,204,1)',
    line: 'rgba(129,115,255,0.22)',
    'line-strong': 'rgba(170,187,255,0.76)',
    inv: 'rgba(139,123,255,1)',
    'inv-fg': 'rgba(10,16,38,1)',
    horizon: 'rgba(45,212,191,0.12)',
    sky: 'rgba(10,22,50,1)',
    watermark: 'rgba(153,164,255,0.09)',
    brand: 'rgba(139,123,255,1)',
    'brand-deep': 'rgba(91,78,211,1)',
    'brand-foreground': 'rgba(255,255,255,1)',
    'accent-color': 'rgba(45,212,191,1)',
    'accent-2': 'rgba(251,146,60,1)',
    'accent-3': 'rgba(244,114,182,1)',
  },
]

export const TOKENS = Object.keys(STOPS[0])
const SHARP_TOKENS = new Set(['fg', 'fg-2', 'fg-3', 'line', 'line-strong', 'inv', 'inv-fg'])
const parse = (color) => color.match(/[\d.]+/g).map(Number)
const PARSED_STOPS = STOPS.map((stop) => TOKENS.map((token) => parse(stop[token])))

const smooth = (t) => t * t * (3 - 2 * t)
const clamp = (n) => Math.min(1, Math.max(0, n))

export function tokensAt(progress) {
  const p = clamp(progress) * (STOPS.length - 1)
  const index = Math.min(STOPS.length - 2, Math.floor(p))
  const tBase = smooth(p - index)
  // Flip foreground polarity over a short window to avoid low-contrast grey text.
  const tSharp = index === 2 ? smooth(clamp((p - index - 0.4) / 0.2)) : tBase
  const from = PARSED_STOPS[index]
  const to = PARSED_STOPS[index + 1]
  const result = {}

  TOKENS.forEach((token, tokenIndex) => {
    const [r1, g1, b1, a1] = from[tokenIndex]
    const [r2, g2, b2, a2] = to[tokenIndex]
    const t = SHARP_TOKENS.has(token) ? tSharp : tBase
    result[token] = `rgba(${Math.round(r1 + (r2 - r1) * t)},${Math.round(
      g1 + (g2 - g1) * t,
    )},${Math.round(b1 + (b2 - b1) * t)},${+(a1 + (a2 - a1) * t).toFixed(3)})`
  })

  return result
}

export function phaseAt(progress) {
  return PHASES[Math.round(clamp(progress) * (PHASES.length - 1))]
}

// Day → night: the page atmosphere shifts first, then the UI catches up.
export const TIMELINE = {
  forward: { env: [0, 3400], lamp: [2600, 1600], ambient: [2900, 1500] },
  reverse: { lamp: [0, 1100], ambient: [0, 900], env: [400, 3000] },
  mobileScale: 0.8,
  reducedMotion: 600,
}

export function readStoredMode() {
  if (typeof window === 'undefined') return 'night'
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'day' ? 'day' : 'night'
  } catch {
    return 'night'
  }
}

export function writeStoredMode(mode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // The theme still works for this visit when storage is unavailable.
  }
}

function rgbToHsl(color) {
  const [red, green, blue, alpha = 1] = parse(color)
  const r = red / 255
  const g = green / 255
  const b = blue / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let hue = 0
  let saturation = 0
  const lightness = (max + min) / 2

  if (delta > 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1))
    if (max === r) hue = ((g - b) / delta) % 6
    else if (max === g) hue = (b - r) / delta + 2
    else hue = (r - g) / delta + 4
    hue *= 60
    if (hue < 0) hue += 360
  }

  const channels = `${hue.toFixed(1)} ${(saturation * 100).toFixed(1)}% ${(lightness * 100).toFixed(1)}%`
  return alpha < 1 ? `${channels} / ${alpha}` : channels
}

const SHADCN_TOKENS = {
  '--background': 'bg',
  '--foreground': 'fg',
  '--card': 'panel',
  '--card-foreground': 'fg',
  '--popover': 'panel',
  '--popover-foreground': 'fg',
  '--primary': 'brand',
  '--primary-foreground': 'brand-foreground',
  '--secondary': 'bg-2',
  '--secondary-foreground': 'fg',
  '--muted': 'surface',
  '--muted-foreground': 'fg-2',
  '--accent': 'surface',
  '--accent-foreground': 'fg',
  '--border': 'line',
  '--input': 'line',
  '--ring': 'fg',
}

const RGB_TOKENS = {
  '--bg-rgb': 'bg',
  '--surface-rgb': 'surface',
  '--panel-rgb': 'panel',
  '--fg-rgb': 'fg',
  '--inv-rgb': 'inv',
  '--inv-fg-rgb': 'inv-fg',
}

export function applyEnvironment(env, lamp, ambient) {
  const root = document.documentElement
  const tokens = tokensAt(env)

  for (const token of TOKENS) {
    root.style.setProperty(`--${token}`, tokens[token])
  }

  for (const [property, token] of Object.entries(SHADCN_TOKENS)) {
    root.style.setProperty(property, rgbToHsl(tokens[token]))
  }

  for (const [property, token] of Object.entries(RGB_TOKENS)) {
    const [r, g, b] = parse(tokens[token])
    root.style.setProperty(property, `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`)
  }

  root.style.setProperty('--env', env.toFixed(4))
  root.style.setProperty('--lamp-g', lamp.toFixed(4))
  root.style.setProperty('--ambient-g', ambient.toFixed(4))
  root.style.setProperty('--aurora-opacity', (0.32 + env * 0.12).toFixed(3))
  root.style.colorScheme = env > 0.6 ? 'dark' : 'light'

  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) themeColor.setAttribute('content', tokens.bg)
}
