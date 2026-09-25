import { useMemo, useRef, useState } from 'react'
import { assets } from './assets.js'
import { useReveal, useScrollState, useCounter } from './hooks.js'

/* ============================ NAV ======================================== */
const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Support', href: '#support' },
  { label: 'Process', href: '#process' },
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
              <iconify-icon icon="lucide:hexagon"></iconify-icon>
            </span>
            HEXCYRA
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          <a className="nav-cta" href="#contact">
            Get a Quote
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
        <a className="nav-cta" href="#contact" onClick={close}>
          Get a Quote
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
        alt="Abstract technology network"
        style={{ transform: `translateY(${translate}px)` }}
      />
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <span className="hero-eyebrow">IT &amp; Managed Services</span>
        <h1 className="hero-title">HEXCYRA</h1>
        <p className="hero-subtitle">technology that works while you sleep</p>
        <p className="hero-desc">
          HEXCYRA is your full-service IT partner — from managed infrastructure
          and cloud engineering to cybersecurity and round-the-clock support. We
          keep your business running, secure, and ready to scale.
        </p>
        <a className="hero-cta" href="#contact">
          Book a Free Consultation
          <iconify-icon icon="lucide:arrow-right"></iconify-icon>
        </a>
      </div>

      <a className="hero-scroll" href="#about">
        Scroll
        <iconify-icon icon="lucide:chevron-down"></iconify-icon>
      </a>
    </header>
  )
}

/* ============================= ABOUT ==================================== */
const STATS = [
  { target: 320, suffix: '+', label: 'Projects Delivered' },
  { target: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
  { target: 24, suffix: '/7', label: 'Monitoring & Support' },
]

function Stat({ target, suffix, label, decimals = 0 }) {
  const { ref, display } = useCounter(target, { decimals })
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

function About() {
  return (
    <section className="philosophy" id="about">
      <div className="container philosophy-grid">
        <div className="philosophy-media reveal">
          <img src={assets.about} alt="The HEXCYRA team collaborating" />
        </div>

        <div className="philosophy-text">
          <span className="eyebrow reveal">Who We Are</span>
          <h2 className="section-title reveal delay-1">
            Enterprise IT, delivered with <em>precision</em>.
          </h2>
          <p className="reveal delay-2">
            HEXCYRA is an IT services company helping businesses design, build,
            and manage the technology they depend on. We pair deep engineering
            expertise with real accountability — no jargon, no surprises.
          </p>
          <p className="reveal delay-2">
            From fast-moving startups to established enterprises, we act as your
            dedicated technology team: proactive, transparent, and always on.
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

/* =========================== SERVICES =================================== */
const SERVICES = [
  {
    name: 'Managed',
    accent: 'IT',
    img: assets.serviceManaged,
    desc: 'End-to-end management of your devices, users, and networks with proactive monitoring and a responsive helpdesk.',
    price: '1,200',
  },
  {
    name: 'Cloud &',
    accent: 'DevOps',
    img: assets.serviceCloud,
    desc: 'Cloud migration, infrastructure-as-code, and CI/CD pipelines that help you ship faster and scale on demand.',
    price: '2,400',
  },
  {
    name: 'Cyber',
    accent: 'security',
    img: assets.serviceSecurity,
    desc: 'Threat detection, compliance, and hardening that keep your data and customers protected around the clock.',
    price: '1,800',
  },
]

function Services() {
  return (
    <section className="suites" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">What We Do</span>
          <h2 className="section-title reveal delay-1">
            Services built to <em>scale</em>
          </h2>
          <p className="reveal delay-2">
            Flexible engagements — from fully managed IT to project-based
            engineering — tailored to how your business actually runs.
          </p>
        </div>

        <div className="suites-grid">
          {SERVICES.map((s, i) => (
            <article className={`suite-card reveal delay-${i + 1}`} key={s.accent}>
              <div className="suite-media">
                <img src={s.img} alt={`${s.name} ${s.accent}`} />
              </div>
              <div className="suite-body">
                <h3 className="suite-name">
                  {s.name} <em>{s.accent}</em>
                </h3>
                <p className="suite-desc">{s.desc}</p>
                <div className="suite-meta">
                  <div className="suite-price">
                    ${s.price} <span>/ mo</span>
                  </div>
                  <a className="suite-link" href="#contact">
                    Learn More
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
        <span className="eyebrow reveal">Around The Clock</span>
        <h2 className="reveal delay-1">
          When your team logs off, <em>we&rsquo;re still watching</em>.
        </h2>
        <p className="reveal delay-2">
          Systems don&rsquo;t keep office hours — and neither do we. HEXCYRA
          monitors, patches, and defends your infrastructure through the night,
          so you wake up to business as usual.
        </p>
      </div>
    </section>
  )
}

/* ============================ SUPPORT ==================================== */
const SUPPORT_FEATURES = [
  { icon: 'lucide:headset', text: '24/7 helpdesk with rapid response SLAs' },
  { icon: 'lucide:activity', text: 'Proactive monitoring & real-time alerting' },
  { icon: 'lucide:shield-check', text: 'Patch management & security hardening' },
  { icon: 'lucide:database-backup', text: 'Automated backup & disaster recovery' },
]

function Support() {
  return (
    <section className="night-section wellness" id="support">
      <div className="night-glow"></div>
      <div className="container wellness-grid">
        <div className="wellness-media reveal">
          <img src={assets.support} alt="HEXCYRA network operations center" />
        </div>

        <div className="wellness-text">
          <span className="eyebrow reveal">Managed Support</span>
          <h2 className="section-title reveal delay-1">
            Support that never <em>sleeps</em>
          </h2>
          <p className="reveal delay-2">
            Our operations center and helpdesk run 24/7/365. We catch issues
            before they become outages and resolve tickets fast — with real
            engineers, not scripts.
          </p>
          <ul className="feature-list reveal delay-3">
            {SUPPORT_FEATURES.map((f) => (
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

/* =========================== EXPERTISE =================================== */
function Expertise() {
  return (
    <section className="night-section dining" id="expertise">
      <div className="night-glow"></div>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">Expertise</span>
          <h2 className="section-title reveal delay-1">
            A stack we <em>master</em>
          </h2>
          <p className="reveal delay-2">
            From cloud platforms to modern application frameworks, our engineers
            work fluently across the technologies your business runs on.
          </p>
        </div>

        <div className="bento reveal delay-1">
          <div className="bento-item bento-large">
            <img src={assets.expertise} alt="Cloud infrastructure engineering" />
            <div className="bento-overlay">
              <h3>
                Cloud <em>Infrastructure</em>
              </h3>
              <p>AWS · Azure · GCP · Kubernetes · Terraform</p>
            </div>
          </div>

          <div className="bento-item">
            <img src={assets.serviceCloud} alt="Application development" />
            <div className="bento-overlay">
              <h3>
                App <em>Development</em>
              </h3>
              <p>React · Node · Python · .NET</p>
            </div>
          </div>

          <div className="bento-item">
            <img src={assets.serviceSecurity} alt="Data and AI" />
            <div className="bento-overlay">
              <h3>
                Data &amp; <em>AI</em>
              </h3>
              <p>Pipelines, analytics & automation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ PROCESS =================================== */
const PROCESS = [
  {
    img: assets.process1,
    title: 'Discovery &',
    accent: 'Strategy',
    desc: 'We audit your environment, surface risks, and design a roadmap aligned to your business goals and budget.',
    tag: 'Step · Assess',
    icon: 'lucide:search',
  },
  {
    img: assets.process2,
    title: 'Build &',
    accent: 'Migrate',
    desc: 'We implement, migrate, and integrate with minimal disruption — clear milestones, clean handovers, no drama.',
    tag: 'Step · Deliver',
    icon: 'lucide:code-2',
  },
  {
    img: assets.process3,
    title: 'Manage &',
    accent: 'Optimize',
    desc: 'We monitor, support, and continuously improve your systems as a long-term partner invested in your uptime.',
    tag: 'Step · Operate',
    icon: 'lucide:refresh-cw',
  },
]

function Process() {
  return (
    <section className="night-section excursions" id="process">
      <div className="night-glow"></div>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">How We Work</span>
          <h2 className="section-title reveal delay-1">
            From strategy to <em>steady state</em>
          </h2>
        </div>

        <div className="excursion-list">
          {PROCESS.map((e, i) => (
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

/* ============================ CONTACT =================================== */
const CONTACT_PERKS = [
  'Free initial IT assessment',
  'No long-term lock-in contracts',
  'A dedicated account engineer',
]

function Contact() {
  const onSubmit = (e) => {
    e.preventDefault()
    e.currentTarget.reset()
    alert('Thanks! Our team will get back to you within one business day.')
  }

  return (
    <section className="reserve" id="contact">
      <div className="reserve-bg">
        <img src={assets.contact} alt="HEXCYRA offices at dusk" />
      </div>

      <div className="container reserve-grid">
        <div className="reserve-copy">
          <span className="eyebrow reveal">Contact</span>
          <h2 className="section-title reveal delay-1">
            Let&rsquo;s build something <em>reliable</em>
          </h2>
          <p className="reveal delay-2">
            Tell us about your systems and goals. We&rsquo;ll respond within one
            business day with a tailored plan — no obligation.
          </p>
          <ul className="reserve-perks reveal delay-3">
            {CONTACT_PERKS.map((p) => (
              <li key={p}>
                <iconify-icon icon="lucide:check"></iconify-icon>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <form className="reserve-card reveal delay-2" onSubmit={onSubmit}>
          <h3>
            Request a <em>consultation</em>
          </h3>
          <p>No obligation. We reply within 24 hours.</p>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" type="text" placeholder="Your name" required />
          </div>

          <div className="field">
            <label htmlFor="email">Work email</label>
            <input id="email" type="email" placeholder="you@company.com" required />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" type="text" placeholder="Company name" required />
            </div>
            <div className="field">
              <label htmlFor="service">Service</label>
              <select id="service" defaultValue="Managed IT">
                <option>Managed IT</option>
                <option>Cloud &amp; DevOps</option>
                <option>Cybersecurity</option>
                <option>Other / Not sure</option>
              </select>
            </div>
          </div>

          <button className="reserve-submit" type="submit">
            Request Consultation
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
                <iconify-icon icon="lucide:hexagon"></iconify-icon>
              </span>
              HEXCYRA
            </div>
            <p>
              HEXCYRA is an IT services company delivering managed
              infrastructure, cloud engineering, cybersecurity, and 24/7 support
              to growing businesses.
            </p>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Managed IT</a></li>
              <li><a href="#services">Cloud &amp; DevOps</a></li>
              <li><a href="#services">Cybersecurity</a></li>
              <li><a href="#expertise">Consulting</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@hexcyra.com">hello@hexcyra.com</a></li>
              <li><a href="tel:+10000000000">+1 (000) 000-0000</a></li>
              <li><a href="#contact">Remote &amp; On-site</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} HEXCYRA. All rights reserved.</span>
          <div className="footer-social">
            <a href="#top" aria-label="LinkedIn"><iconify-icon icon="lucide:linkedin"></iconify-icon></a>
            <a href="#top" aria-label="GitHub"><iconify-icon icon="lucide:github"></iconify-icon></a>
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
        <About />
        <Services />
        <Transition innerRef={transitionRef} />
        <Support />
        <Expertise />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
