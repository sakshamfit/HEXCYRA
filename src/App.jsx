import { useMemo, useRef, useState } from 'react'
import { assets } from './assets.js'
import { useReveal, useScrollState, useCounter } from './hooks.js'

/* ============================ NAV ======================================== */
const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Suites', href: '#suites' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Dining', href: '#dining' },
  { label: 'Excursions', href: '#excursions' },
]

function Nav({ isScrolled, isNavDark }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Precedence: dark (night) > scrolled (glass) > transparent (initial).
  const state = isNavDark ? 'dark' : isScrolled ? 'scrolled' : 'transparent'

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`nav ${state}`}>
        <div className="container nav-inner">
          <a className="nav-logo" href="#top">
            <span className="mark">
              <iconify-icon icon="lucide:sun"></iconify-icon>
            </span>
            Sirocco
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          <a className="nav-cta" href="#reserve">
            Reserve
          </a>

          <button
            className={`nav-hamburger ${menuOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <a className="nav-cta" href="#reserve" onClick={close}>
          Reserve
        </a>
      </div>
    </>
  )
}

/* ============================ HERO ======================================= */
function Hero({ scrollY }) {
  // Parallax: 0.25 speed.
  const translate = scrollY * 0.25

  return (
    <header className="hero" id="top">
      <img
        className="hero-bg"
        src={assets.hero}
        alt="Sculpted desert dunes at golden hour"
        style={{ transform: `translateY(${translate}px)` }}
      />
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <span className="hero-eyebrow">A Luxury Desert Retreat</span>
        <h1 className="hero-title">Sirocco</h1>
        <p className="hero-subtitle">where the sands keep their silence</p>
        <p className="hero-desc">
          Suspended between endless dunes and a sky thick with stars, Sirocco is
          a sanctuary for those who seek stillness, warmth, and the slow luxury
          of the desert.
        </p>
        <a className="hero-cta" href="#reserve">
          Reserve Your Escape
          <iconify-icon icon="lucide:arrow-right"></iconify-icon>
        </a>
      </div>

      <a className="hero-scroll" href="#philosophy">
        Scroll
        <iconify-icon icon="lucide:chevron-down"></iconify-icon>
      </a>
    </header>
  )
}

/* ========================= PHILOSOPHY ==================================== */
const STATS = [
  { target: 42, suffix: '', label: 'Private Suites' },
  { target: 1200, suffix: 'ha', label: 'Protected Dunes' },
  { target: 24, suffix: '/7', label: 'Personal Concierge' },
]

function Stat({ target, suffix, label }) {
  const { ref, display } = useCounter(target)
  return (
    <div className="stat">
      <div className="stat-num" ref={ref} data-count={target}>
        {display}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function Philosophy() {
  return (
    <section className="philosophy" id="philosophy">
      <div className="container philosophy-grid">
        <div className="philosophy-media reveal">
          <img src={assets.philosophy} alt="Quiet luxury interior open to the dunes" />
        </div>

        <div className="philosophy-text">
          <span className="eyebrow reveal">Our Philosophy</span>
          <h2 className="section-title reveal delay-1">
            Luxury measured in <em>silence</em>, not excess.
          </h2>
          <p className="reveal delay-2">
            Sirocco was shaped by the desert itself — its patience, its light,
            its vast and generous quiet. Every suite, every ritual, every meal
            is an invitation to slow down until time loosens its grip.
          </p>
          <p className="reveal delay-2">
            We built less so you could feel more: rammed-earth walls, hand-woven
            textiles, and windows framed around nothing but horizon.
          </p>

          <div className="stats reveal delay-3">
            {STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ SUITES ===================================== */
const SUITES = [
  {
    name: 'The',
    accent: 'Dune',
    img: assets.suiteDune,
    desc: 'A crescent of rammed earth folded into the sand, with a private plunge pool facing the dawn.',
    price: '1,200',
  },
  {
    name: 'The',
    accent: 'Oasis',
    img: assets.suiteOasis,
    desc: 'Shaded by date palms around a spring-fed courtyard — the most verdant refuge in the retreat.',
    price: '1,650',
  },
  {
    name: 'The',
    accent: 'Riad',
    img: assets.suiteRiad,
    desc: 'A two-storey sanctuary with a rooftop majlis, carved screens, and a hammam of its own.',
    price: '2,400',
  },
]

function Suites() {
  return (
    <section className="suites" id="suites">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">The Suites</span>
          <h2 className="section-title reveal delay-1">
            Three ways to <em>disappear</em>
          </h2>
          <p className="reveal delay-2">
            Forty-two suites, each carved into the landscape so that the desert
            is never a view but a room you can step into.
          </p>
        </div>

        <div className="suites-grid">
          {SUITES.map((s, i) => (
            <article className={`suite-card reveal delay-${i + 1}`} key={s.accent}>
              <div className="suite-media">
                <img src={s.img} alt={`The ${s.accent} suite`} />
              </div>
              <div className="suite-body">
                <h3 className="suite-name">
                  {s.name} <em>{s.accent}</em>
                </h3>
                <p className="suite-desc">{s.desc}</p>
                <div className="suite-meta">
                  <div className="suite-price">
                    ${s.price} <span>/ night</span>
                  </div>
                  <a className="suite-link" href="#reserve">
                    Reserve
                    <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========================== TRANSITION =================================== */
function Transition({ innerRef }) {
  // 70 stars with randomized position / duration / delay, generated once.
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, () => ({
        top: 35 + Math.random() * 60, // 35% – 95%
        left: Math.random() * 100,
        dur: 2 + Math.random() * 4, // 2s – 6s
        del: Math.random() * 5, // 0s – 5s
        size: Math.random() < 0.2 ? 3 : 2,
      })),
    [],
  )

  return (
    <section className="transition" ref={innerRef}>
      <div className="stars">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.del}s`,
            }}
          />
        ))}
      </div>

      <div className="transition-content">
        <span className="eyebrow reveal">As Night Falls</span>
        <h2 className="reveal delay-1">
          The desert exhales, and the sky <em>ignites</em>.
        </h2>
        <p className="reveal delay-2">
          When the sun slips beneath the dunes, Sirocco becomes something else
          entirely — a place of firelight, fragrant smoke, and ten thousand
          stars close enough to touch.
        </p>
      </div>
    </section>
  )
}

/* =========================== WELLNESS ==================================== */
const WELLNESS_FEATURES = [
  { icon: 'lucide:flame', text: 'Traditional hammam & sand rituals' },
  { icon: 'lucide:flower-2', text: 'Botanical spa drawn from desert flora' },
  { icon: 'lucide:sunrise', text: 'Sunrise yoga on the high dune' },
  { icon: 'lucide:moon', text: 'Sound baths beneath the open sky' },
]

function Wellness() {
  return (
    <section className="night-section wellness" id="wellness">
      <div className="night-glow"></div>
      <div className="container wellness-grid">
        <div className="wellness-media reveal">
          <img src={assets.wellness} alt="Candlelit desert spa" />
        </div>

        <div className="wellness-text">
          <span className="eyebrow reveal">Wellness</span>
          <h2 className="section-title reveal delay-1">
            Rituals as old as the <em>sand</em>
          </h2>
          <p className="reveal delay-2">
            Our spa borrows from centuries of desert wisdom — heat, salt, oil,
            and stillness — to unwind the body and quiet the mind.
          </p>
          <ul className="feature-list reveal delay-3">
            {WELLNESS_FEATURES.map((f) => (
              <li key={f.text}>
                <iconify-icon icon={f.icon}></iconify-icon>
                {f.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ============================ DINING ===================================== */
function Dining() {
  return (
    <section className="night-section dining" id="dining">
      <div className="night-glow"></div>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">Dining</span>
          <h2 className="section-title reveal delay-1">
            A table beneath the <em>stars</em>
          </h2>
          <p className="reveal delay-2">
            Fire-cooked feasts, foraged desert botanicals, and vintages chosen
            to meet the cool of the night.
          </p>
        </div>

        <div className="bento reveal delay-1">
          <div className="bento-item bento-large">
            <img src={assets.dining} alt="Open-fire desert dining" />
            <div className="bento-overlay">
              <h3>
                The <em>Fire</em> Table
              </h3>
              <p>Whole-lamb mechoui roasted over embers at dusk</p>
            </div>
          </div>

          <div className="bento-item">
            <img src={assets.suiteOasis} alt="Botanical cocktails" />
            <div className="bento-overlay">
              <h3>
                Desert <em>Botanica</em>
              </h3>
              <p>Foraged infusions & rare spirits</p>
            </div>
          </div>

          <div className="bento-item">
            <img src={assets.philosophy} alt="Private dune dinner" />
            <div className="bento-overlay">
              <h3>
                Dune <em>Suppers</em>
              </h3>
              <p>Private tables set upon the sand</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================== EXCURSIONS =================================== */
const EXCURSIONS = [
  {
    img: assets.caravan,
    title: 'Camel',
    accent: 'Caravan',
    desc: 'Trace the ancient trade routes at golden hour aboard our heritage caravan, guided by Bedouin storytellers.',
    tag: '3 hours · Sunset',
    icon: 'lucide:footprints',
  },
  {
    img: assets.stargazing,
    title: 'Desert',
    accent: 'Stargazing',
    desc: 'An astronomer-led night beneath one of the darkest skies on earth, with telescopes and warm spiced tea.',
    tag: '2 hours · Nightly',
    icon: 'lucide:telescope',
  },
  {
    img: assets.sandboarding,
    title: 'Dune',
    accent: 'Sandboarding',
    desc: 'Carve down the great western dunes on hand-waxed boards, with a champagne pause at the summit.',
    tag: '2 hours · Morning',
    icon: 'lucide:wind',
  },
]

function Excursions() {
  return (
    <section className="night-section excursions" id="excursions">
      <div className="night-glow"></div>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">Excursions</span>
          <h2 className="section-title reveal delay-1">
            Venture into the <em>vast</em>
          </h2>
        </div>

        <div className="excursion-list">
          {EXCURSIONS.map((e, i) => (
            <article className="excursion-card reveal" key={e.accent}>
              <div className="excursion-media">
                <img src={e.img} alt={`${e.title} ${e.accent}`} />
              </div>
              <div className="excursion-body">
                <span className="excursion-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>
                  {e.title} <em>{e.accent}</em>
                </h3>
                <p>{e.desc}</p>
                <span className="excursion-tag">
                  <iconify-icon icon={e.icon}></iconify-icon>
                  {e.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ RESERVE ==================================== */
const RESERVE_PERKS = [
  'Private airport transfer by 4x4',
  'Daily desert breakfast & sunset ritual',
  'Dedicated personal concierge',
]

function Reserve() {
  const onSubmit = (e) => {
    e.preventDefault()
    e.currentTarget.reset()
    alert('Thank you — our concierge will be in touch to confirm your escape.')
  }

  return (
    <section className="reserve" id="reserve">
      <div className="reserve-bg">
        <img src={assets.reserve} alt="Sirocco at dusk" />
      </div>

      <div className="container reserve-grid">
        <div className="reserve-copy">
          <span className="eyebrow reveal">Reserve</span>
          <h2 className="section-title reveal delay-1">
            Begin your <em>descent</em> into the sands
          </h2>
          <p className="reveal delay-2">
            Availability is intentionally limited so that stillness is never
            crowded. Share your dates and our concierge will craft the rest.
          </p>
          <ul className="reserve-perks reveal delay-3">
            {RESERVE_PERKS.map((p) => (
              <li key={p}>
                <iconify-icon icon="lucide:check"></iconify-icon>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <form className="reserve-card reveal delay-2" onSubmit={onSubmit}>
          <h3>
            Request an <em>invitation</em>
          </h3>
          <p>No payment required to enquire.</p>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" type="text" placeholder="Your name" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@email.com" required />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="arrival">Arrival</label>
              <input id="arrival" type="date" required />
            </div>
            <div className="field">
              <label htmlFor="suite">Suite</label>
              <select id="suite" defaultValue="Dune">
                <option>The Dune</option>
                <option>The Oasis</option>
                <option>The Riad</option>
              </select>
            </div>
          </div>

          <button className="reserve-submit" type="submit">
            Request Invitation
          </button>
        </form>
      </div>
    </section>
  )
}

/* ============================ FOOTER ===================================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <span className="mark">
                <iconify-icon icon="lucide:sun"></iconify-icon>
              </span>
              Sirocco
            </div>
            <p>
              A luxury desert retreat where sculpted dunes, starlit skies, and
              quiet indulgence meet. Reserve your escape into the sands.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#philosophy">Philosophy</a></li>
              <li><a href="#suites">Suites</a></li>
              <li><a href="#wellness">Wellness</a></li>
              <li><a href="#dining">Dining</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Visit</h4>
            <ul>
              <li><a href="#excursions">Excursions</a></li>
              <li><a href="#reserve">Reserve</a></li>
              <li><a href="#reserve">Private Events</a></li>
              <li><a href="#reserve">Journal</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:concierge@sirocco.desert">concierge@sirocco.desert</a></li>
              <li><a href="tel:+000000000">+000 000 0000</a></li>
              <li><a href="#reserve">The Western Erg</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sirocco Desert Retreat. All rights reserved.</span>
          <div className="footer-social">
            <a href="#top" aria-label="Instagram"><iconify-icon icon="lucide:instagram"></iconify-icon></a>
            <a href="#top" aria-label="Facebook"><iconify-icon icon="lucide:facebook"></iconify-icon></a>
            <a href="#top" aria-label="Twitter"><iconify-icon icon="lucide:twitter"></iconify-icon></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================== APP ===================================== */
export default function App() {
  const transitionRef = useRef(null)
  const { scrollY, isScrolled, isNavDark } = useScrollState(transitionRef)
  useReveal()

  return (
    <>
      <Nav isScrolled={isScrolled} isNavDark={isNavDark} />
      <main>
        <Hero scrollY={scrollY} />
        <Philosophy />
        <Suites />
        <Transition innerRef={transitionRef} />
        <Wellness />
        <Dining />
        <Excursions />
        <Reserve />
      </main>
      <Footer />
    </>
  )
}
