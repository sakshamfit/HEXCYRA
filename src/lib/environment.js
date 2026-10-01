/*
 * Site atmosphere engine, adapted from sakshamfit/LIGHTTON's environmental
 * lighting model. Instead of flipping a binary theme, every site token travels
 * through five colour stops as the visitor moves from day to night.
 */
export const PHASES = ['Day', 'Early dusk', 'Dusk', 'Evening', 'Night']
export const STORAGE_KEY = 'hexcyra.mode'

const STOPS = [
  // Day — crisp, minimal white with neutral grayscale contrast.
  {
    bg: 'rgba(250,250,250,1)',
    'bg-2': 'rgba(242,242,242,1)',
    surface: 'rgba(245,245,245,1)',
    panel: 'rgba(255,255,255,1)',
    fg: 'rgba(15,15,15,1)',
    'fg-2': 'rgba(72,72,72,1)',
    'fg-3': 'rgba(120,120,120,1)',
    line: 'rgba(15,15,15,0.12)',
    'line-strong': 'rgba(15,15,15,0.72)',
    inv: 'rgba(15,15,15,1)',
    'inv-fg': 'rgba(255,255,255,1)',
    horizon: 'rgba(0,0,0,0.03)',
    sky: 'rgba(240,240,240,1)',
    watermark: 'rgba(0,0,0,0.04)',
  },
  // Early dusk — daylight begins to soften into warm neutral stone.
  {
    bg: 'rgba(228,228,228,1)',
    'bg-2': 'rgba(216,216,216,1)',
    surface: 'rgba(222,222,222,1)',
    panel: 'rgba(242,242,242,1)',
    fg: 'rgba(18,18,18,1)',
    'fg-2': 'rgba(64,64,64,1)',
    'fg-3': 'rgba(104,104,104,1)',
    line: 'rgba(18,18,18,0.14)',
    'line-strong': 'rgba(18,18,18,0.74)',
    inv: 'rgba(18,18,18,1)',
    'inv-fg': 'rgba(255,255,255,1)',
    horizon: 'rgba(0,0,0,0.05)',
    sky: 'rgba(210,210,210,1)',
    watermark: 'rgba(0,0,0,0.05)',
  },
  // Dusk — neutral mid-grey atmosphere; foreground stays dark until the quick flip.
  {
    bg: 'rgba(156,156,156,1)',
    'bg-2': 'rgba(142,142,142,1)',
    surface: 'rgba(150,150,150,1)',
    panel: 'rgba(176,176,176,1)',
    fg: 'rgba(16,16,16,1)',
    'fg-2': 'rgba(38,38,38,1)',
    'fg-3': 'rgba(68,68,68,1)',
    line: 'rgba(16,16,16,0.18)',
    'line-strong': 'rgba(16,16,16,0.78)',
    inv: 'rgba(16,16,16,1)',
    'inv-fg': 'rgba(248,248,248,1)',
    horizon: 'rgba(0,0,0,0.08)',
    sky: 'rgba(128,128,128,1)',
    watermark: 'rgba(0,0,0,0.07)',
  },
  // Evening — contrast flips cleanly to crisp white type on deep charcoal.
  {
    bg: 'rgba(36,36,36,1)',
    'bg-2': 'rgba(28,28,28,1)',
    surface: 'rgba(44,44,44,1)',
    panel: 'rgba(50,50,50,1)',
    fg: 'rgba(245,245,245,1)',
    'fg-2': 'rgba(192,192,192,1)',
    'fg-3': 'rgba(144,144,144,1)',
    line: 'rgba(245,245,245,0.14)',
    'line-strong': 'rgba(245,245,245,0.72)',
    inv: 'rgba(245,245,245,1)',
    'inv-fg': 'rgba(18,18,18,1)',
    horizon: 'rgba(255,255,255,0.04)',
    sky: 'rgba(28,28,28,1)',
    watermark: 'rgba(245,245,245,0.035)',
  },
  // Night — minimal deep black with clean monochrome contrast.
  {
    bg: 'rgba(10,10,10,1)',
    'bg-2': 'rgba(16,16,16,1)',
    surface: 'rgba(22,22,22,1)',
    panel: 'rgba(26,26,26,1)',
    fg: 'rgba(246,246,246,1)',
    'fg-2': 'rgba(190,190,190,1)',
    'fg-3': 'rgba(138,138,138,1)',
    line: 'rgba(246,246,246,0.13)',
    'line-strong': 'rgba(246,246,246,0.68)',
    inv: 'rgba(246,246,246,1)',
    'inv-fg': 'rgba(12,12,12,1)',
    horizon: 'rgba(255,255,255,0.03)',
    sky: 'rgba(16,16,16,1)',
    watermark: 'rgba(246,246,246,0.03)',
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
  root.style.setProperty('--aurora-opacity', (0.32 + env * 0.12).toFixed(3))
  root.style.colorScheme = env > 0.6 ? 'dark' : 'light'

  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) themeColor.setAttribute('content', tokens.bg)
}
