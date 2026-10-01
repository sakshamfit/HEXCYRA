/*
 * Site atmosphere engine, adapted from sakshamfit/LIGHTTON's environmental
 * lighting model. Instead of flipping a binary theme, every site token travels
 * through five colour stops as the visitor moves from day to night.
 */
export const PHASES = ['Day', 'Early dusk', 'Dusk', 'Evening', 'Night']
export const STORAGE_KEY = 'hexcyra.mode'

const STOPS = [
  // Day — crisp, cool white with a little blue in the paper.
  {
    bg: 'rgba(248,250,253,1)',
    'bg-2': 'rgba(237,242,249,1)',
    surface: 'rgba(244,247,251,1)',
    panel: 'rgba(255,255,255,1)',
    fg: 'rgba(16,24,40,1)',
    'fg-2': 'rgba(71,84,103,1)',
    'fg-3': 'rgba(118,132,153,1)',
    line: 'rgba(16,24,40,0.11)',
    'line-strong': 'rgba(16,24,40,0.7)',
    inv: 'rgba(17,24,39,1)',
    'inv-fg': 'rgba(255,255,255,1)',
    horizon: 'rgba(196,214,244,0.12)',
    sky: 'rgba(220,232,250,1)',
    watermark: 'rgba(32,54,94,0.045)',
  },
  // Early dusk — cool light starts to soften, with a hint of violet warmth.
  {
    bg: 'rgba(226,231,241,1)',
    'bg-2': 'rgba(211,220,235,1)',
    surface: 'rgba(221,227,238,1)',
    panel: 'rgba(241,244,249,1)',
    fg: 'rgba(18,25,41,1)',
    'fg-2': 'rgba(59,71,92,1)',
    'fg-3': 'rgba(99,113,137,1)',
    line: 'rgba(18,25,41,0.13)',
    'line-strong': 'rgba(18,25,41,0.72)',
    inv: 'rgba(17,24,39,1)',
    'inv-fg': 'rgba(255,255,255,1)',
    horizon: 'rgba(206,164,220,0.18)',
    sky: 'rgba(195,207,231,1)',
    watermark: 'rgba(24,35,72,0.05)',
  },
  // Dusk — blue-grey atmosphere; foreground stays dark until the quick flip.
  {
    bg: 'rgba(151,164,187,1)',
    'bg-2': 'rgba(137,151,176,1)',
    surface: 'rgba(151,164,186,1)',
    panel: 'rgba(174,185,204,1)',
    fg: 'rgba(16,22,34,1)',
    'fg-2': 'rgba(35,45,63,1)',
    'fg-3': 'rgba(60,72,94,1)',
    line: 'rgba(16,22,34,0.17)',
    'line-strong': 'rgba(16,22,34,0.78)',
    inv: 'rgba(18,21,29,1)',
    'inv-fg': 'rgba(248,247,243,1)',
    horizon: 'rgba(214,145,191,0.2)',
    sky: 'rgba(115,132,164,1)',
    watermark: 'rgba(10,20,46,0.075)',
  },
  // Evening — contrast flips cleanly to warm-white type on a deep blue-charcoal.
  {
    bg: 'rgba(38,43,57,1)',
    'bg-2': 'rgba(31,36,49,1)',
    surface: 'rgba(45,51,66,1)',
    panel: 'rgba(52,59,75,1)',
    fg: 'rgba(244,242,236,1)',
    'fg-2': 'rgba(190,196,207,1)',
    'fg-3': 'rgba(143,152,168,1)',
    line: 'rgba(244,242,236,0.14)',
    'line-strong': 'rgba(244,242,236,0.72)',
    inv: 'rgba(242,241,236,1)',
    'inv-fg': 'rgba(22,25,33,1)',
    horizon: 'rgba(127,91,174,0.18)',
    sky: 'rgba(30,35,51,1)',
    watermark: 'rgba(244,242,236,0.035)',
  },
  // Night — deep ink with a restrained violet horizon and warm type.
  {
    bg: 'rgba(14,17,25,1)',
    'bg-2': 'rgba(19,23,33,1)',
    surface: 'rgba(25,30,42,1)',
    panel: 'rgba(30,35,48,1)',
    fg: 'rgba(246,244,238,1)',
    'fg-2': 'rgba(190,194,205,1)',
    'fg-3': 'rgba(139,146,163,1)',
    line: 'rgba(246,244,238,0.13)',
    'line-strong': 'rgba(246,244,238,0.68)',
    inv: 'rgba(244,243,238,1)',
    'inv-fg': 'rgba(16,19,26,1)',
    horizon: 'rgba(156,103,200,0.1)',
    sky: 'rgba(19,23,34,1)',
    watermark: 'rgba(246,244,238,0.03)',
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
  '--primary': 'inv',
  '--primary-foreground': 'inv-fg',
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
  root.style.setProperty('--aurora-opacity', (0.42 + env * 0.24).toFixed(3))
  root.style.colorScheme = env > 0.6 ? 'dark' : 'light'

  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) themeColor.setAttribute('content', tokens.bg)
}
