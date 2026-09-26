import React, { useState, useEffect } from 'react'
import {
  ArrowRight,
  Menu,
  X,
  Hexagon,
  Check,
  Shield,
  Cloud,
  Server,
  Headphones,
  Activity,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Lock,
  Terminal,
  Cpu,
  Globe,
  Sparkles,
  Radio,
  Layers,
  Zap,
} from 'lucide-react'

// Minimal, dark, decent images generated for each section
const ASSETS = {
  // Services
  svcManaged: '/img/svc-managed-minimal.jpg',
  svcCloud: '/img/svc-cloud-minimal.jpg',
  svcSecurity: '/img/svc-security-minimal.jpg',
  // Overview / Expertise
  about: '/img/about-minimal.jpg',
  expertise: '/img/expertise-minimal.jpg',
  support: '/img/support-minimal.jpg',
  // Process
  process1: '/img/process-1-minimal.jpg',
  process2: '/img/process-2-minimal.jpg',
  process3: '/img/process-3-minimal.jpg',
}

// Hero datasets
const HEXCYRA_HERO = {
  brand: 'HEXCYRA',
  badge: 'IT & Managed Services',
  h1: ['Technology that', 'works while', 'you sleep.'],
  paragraph:
    'HEXCYRA is your full-service IT partner — from managed infrastructure and cloud engineering to cybersecurity and round-the-clock support. We keep your business running, secure, and ready to scale.',
  ctaText: 'Explore Services',
}

const FOLDCRAFT_HERO = {
  brand: 'Foldcraft',
  badge: 'Brand & Visual Storytelling',
  h1: ['Shaping visual', 'narratives,', 'one pixel at a time.'],
  paragraph:
    'Turning vision into reality through craft, motion, and an endless pursuit of beauty.',
  ctaText: 'Explore Work',
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'support', label: 'Support' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Reach Us' },
]

const STATS = [
  { val: '320+', label: 'Delivered Projects', sub: 'Across enterprise & high-growth tech' },
  { val: '99.9%', label: 'Uptime SLA', sub: 'Guaranteed by contractual commitments' },
  { val: '24/7/365', label: 'Active NOC Desk', sub: 'Real systems engineers, zero bot tiers' },
  { val: '<15m', label: 'Incident Response', sub: 'Average critical triage velocity' },
]

const SERVICES = [
  {
    id: 'managed',
    title: 'Managed IT',
    accent: 'Infrastructure',
    price: '$1,200',
    unit: '/ mo',
    desc: 'End-to-end management of your devices, workstations, and networks with continuous health monitoring and rapid tier-3 helpdesk.',
    features: [
      'Proactive workstation & server management',
      'Automated OS, firmware & kernel patch cadence',
      'Unified identity, SSO & Zero-Trust endpoint security',
      'Guaranteed 15-minute response SLA',
    ],
    img: ASSETS.svcManaged,
    icon: Server,
    badge: 'Core Operations',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    accent: 'Engineering',
    price: '$2,400',
    unit: '/ mo',
    desc: 'Cloud migrations, infrastructure-as-code, and automated CI/CD pipelines engineered for zero downtime and effortless scale.',
    features: [
      'Multi-cloud architecture across AWS, Azure & GCP',
      'Declarative Infrastructure as Code (Terraform & Pulumi)',
      'Kubernetes cluster orchestration & autoscaling',
      'Automated canary releases & telemetry dashboards',
    ],
    img: ASSETS.svcCloud,
    icon: Cloud,
    badge: 'High Growth',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    accent: 'Defense',
    price: '$1,800',
    unit: '/ mo',
    desc: 'Continuous threat intelligence, regulatory compliance auditing, and perimeter defense that shield your systems around the clock.',
    features: [
      '24/7 SOC monitoring & real-time threat hunting',
      'SOC 2, ISO 27001, and HIPAA compliance readiness',
      'Automated immutable disaster backups & ransomware shields',
      'Continuous external attack surface auditing',
    ],
    img: ASSETS.svcSecurity,
    icon: Shield,
    badge: 'Enterprise Shield',
  },
]

const SUPPORT_FEATURES = [
  {
    icon: Headphones,
    title: '24/7/365 Operations Desk',
    desc: 'Always staffed by certified systems engineers — no frustrating phone trees or generic scripts.',
  },
  {
    icon: Activity,
    title: 'Real-Time Alerting & Telemetry',
    desc: 'Sub-second monitoring across CPU, memory, packet loss, and ingress traffic to resolve anomalies before outages happen.',
  },
  {
    icon: Shield,
    title: 'Patch & Vulnerability Management',
    desc: 'Automated CVE scanning and non-disruptive deployment schedules to protect against zero-day exploits.',
  },
  {
    icon: Server,
    title: 'Automated Disaster Recovery',
    desc: 'Multi-region immutable snapshots and automated failover verification drills to ensure business continuity.',
  },
]

const EXPERTISE_ITEMS = [
  {
    title: 'Cloud Infrastructure & IaC',
    tags: 'AWS · Azure · GCP · Kubernetes · Terraform · Pulumi',
    desc: 'Fault-tolerant, multi-region architecture engineered with declarative infrastructure and automated testing.',
    img: ASSETS.expertise,
    span: 'lg:col-span-8',
    highlight: true,
  },
  {
    title: 'Full-Stack Engineering',
    tags: 'React · Next.js · Node · Python · Go · PostgreSQL',
    desc: 'Modern web platforms and cloud applications built for high concurrency and sub-50ms latency.',
    img: ASSETS.svcCloud,
    span: 'lg:col-span-4',
    highlight: false,
  },
  {
    title: 'Data Pipelines & Automation',
    tags: 'Kafka · Spark · Airflow · Analytics Telemetry',
    desc: 'Real-time telemetry collection and automated healing pipelines for enterprise workloads.',
    img: ASSETS.svcSecurity,
    span: 'lg:col-span-4',
    highlight: false,
  },
  {
    title: 'Enterprise Security Posture',
    tags: 'Zero-Trust · SOC 2 · ISO 27001 · SIEM · Pen Testing',
    desc: 'Comprehensive threat mitigation, hardened bastions, and automated identity governance.',
    img: ASSETS.about,
    span: 'lg:col-span-8',
    highlight: false,
  },
]

const PROCESS_STEPS = [
  {
    step: '01',
    tag: 'Step · Assess',
    title: 'Discovery & Strategy',
    desc: 'We audit your infrastructure, surface latent security gaps, and design an actionable roadmap aligned to your milestones and budget.',
    img: ASSETS.process1,
  },
  {
    step: '02',
    tag: 'Step · Deliver',
    title: 'Build & Migrate',
    desc: 'We implement, migrate, and integrate with minimal friction — verified milestones, clean handovers, and zero business interruption.',
    img: ASSETS.process2,
  },
  {
    step: '03',
    tag: 'Step · Operate',
    title: 'Manage & Optimize',
    desc: 'We monitor, support, and continuously optimize your systems as a long-term partner invested in your 99.9% uptime SLA.',
    img: ASSETS.process3,
  },
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [useOlderBuildData, setUseOlderBuildData] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Managed IT',
    message: '',
  })

  const heroData = useOlderBuildData ? HEXCYRA_HERO : FOLDCRAFT_HERO

  // Scroll listener for sticky glass navbar
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'Managed IT',
        message: '',
      })
    }, 3500)
  }

  return (
    <div className="min-h-screen w-full bg-black font-geist text-white selection:bg-white selection:text-black">
      {/* =========================================================================
          HERO VIEWPORT SECTION (Full Viewport Height)
          ========================================================================= */}
      <section className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-between">
        {/* Looping Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover [object-position:70%_center]"
          style={{ objectPosition: '70% center' }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
        />

        {/* Cinematic subtle dark gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60 pointer-events-none" />

        {/* Navbar (z-30) */}
        <nav
          className={`relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16 transition-all duration-300 ${
            isScrolled
              ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl'
              : ''
          }`}
        >
          {/* Left side: Logo text followed by desktop nav links */}
          <div className="flex items-center gap-8 lg:gap-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-lg font-semibold tracking-tight text-white sm:text-xl flex items-center gap-2.5 text-left group"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur-sm group-hover:scale-105 transition-transform">
                <Hexagon className="h-4 w-4 stroke-[2.2]" />
              </span>
              <span>{heroData.brand}</span>
            </button>

            {/* Desktop nav links (hidden on mobile, flex on md+) */}
            <div className="hidden items-center gap-6 md:flex lg:gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side (desktop & mobile) */}
          <div className="flex items-center gap-3">
            {/* Quick Toggle for Hero Copy */}
            <button
              onClick={() => setUseOlderBuildData(!useOlderBuildData)}
              title="Toggle between HEXCYRA Data and Foldcraft Preview"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:text-white hover:border-white/30 transition-all backdrop-blur-sm mr-1"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  useOlderBuildData ? 'bg-emerald-400' : 'bg-cyan-400'
                }`}
              />
              <span>{useOlderBuildData ? 'HEXCYRA Data' : 'Foldcraft Spec'}</span>
            </button>

            {/* Right side (desktop): "Let's Talk" button */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:inline-block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform shadow-md shadow-white/10"
            >
              Let's Talk
            </button>

            {/* Right side (mobile): hamburger toggle button (40x40, z-50) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden z-50 active:scale-90 transition-transform bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                <Menu
                  className={`absolute h-6 w-6 transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'rotate-90 opacity-0 scale-75'
                      : 'rotate-0 opacity-100 scale-100'
                  }`}
                />
                <X
                  className={`absolute h-6 w-6 transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'rotate-0 opacity-100 scale-100'
                      : '-rotate-90 opacity-0 scale-75'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu (z-20) */}
        <div
          className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-[height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? 'h-screen opacity-100'
              : 'h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`flex h-full flex-col justify-center px-8 transition-all duration-500 delay-100 ${
              mobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-3xl font-medium text-white/90 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div>
              <button
                onClick={() => scrollTo('contact')}
                className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform shadow-lg shadow-white/10"
              >
                Let's Talk
              </button>
            </div>
          </div>
        </div>

        {/* Hero Content (z-10) */}
        <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16 pointer-events-none">
          {/* Top Section (max-w-3xl) */}
          <div className="max-w-3xl pointer-events-auto">
            {/* Badge */}
            <div className="mb-4 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs sm:text-sm text-white/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {heroData.badge}
              </span>
            </div>

            {/* Heading h1 */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
              {heroData.h1[0]} <br />
              {heroData.h1[1]} <br />
              {heroData.h1[2]}
            </h1>
          </div>

          {/* Bottom Section */}
          <div className="pointer-events-auto">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
              {heroData.paragraph}
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
              <button
                onClick={() => scrollTo('services')}
                className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-lg shadow-white/10"
              >
                <span>{heroData.ctaText}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => scrollTo('about')}
                className="rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-white transition-all inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <span>Discover Systems</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollTo('about')}
          aria-label="Scroll down"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors pointer-events-auto"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </section>

      {/* =========================================================================
          SECTION 1: ABOUT & LIVE METRICS
          ========================================================================= */}
      <section id="about" className="relative py-24 sm:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
                Enterprise IT, delivered with <em className="italic text-white/90">precision</em>.
              </h2>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                HEXCYRA is an IT services company helping businesses design, build, and manage the technology they depend on. We pair deep engineering expertise with real accountability — no jargon, no surprises.
              </p>
              <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                From fast-moving venture startups to established enterprise networks, we act as your dedicated technology team: proactive, transparent, and always on. Systems don't keep office hours — and neither do we.
              </p>

              {/* Three Core Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { title: 'Zero Vendor Lock-in', desc: 'Clean, open-source and native cloud architectures.' },
                  { title: 'Direct NOC Access', desc: 'Real senior engineers in your team Slack channel.' },
                  { title: 'Contractual SLAs', desc: '99.9% uptime and 15-minute response guarantees.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal Image for About */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-white/15 bg-white/[0.03] p-2.5 overflow-hidden shadow-2xl group">
                <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={ASSETS.about}
                    alt="HEXCYRA Engineering Studio"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Hexcyra Operations Center</span>
                    </div>
                    <span className="font-mono text-white/50">24/7/365</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">{s.val}</div>
                <div className="text-sm font-medium text-white/90 mt-1.5">{s.label}</div>
                <div className="text-xs text-white/50 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SERVICES (With Clean Minimal Images)
          ========================================================================= */}
      <section id="services" className="relative py-24 sm:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10 bg-[#060606]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              What We Do
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
              Services built to <em className="italic text-white/90">scale</em>
            </h2>
            <p className="text-base text-white/60">
              Flexible engagements — from fully managed IT to project-based engineering — tailored to how your business actually runs.
            </p>
          </div>

          {/* Services Cards Grid with Decent Minimal Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s) => {
              const IconComp = s.icon
              return (
                <div
                  key={s.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/25 transition-all duration-300 hover:shadow-2xl hover:shadow-white/5 overflow-hidden"
                >
                  <div>
                    {/* Minimal Image Container */}
                    <div className="relative h-48 sm:h-52 w-full rounded-xl overflow-hidden mb-6 border border-white/10">
                      <img
                        src={s.img}
                        alt={`${s.title} ${s.accent}`}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                          {s.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-white/90 font-medium bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
                        <IconComp className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{s.accent}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                      {s.desc}
                    </p>

                    <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
                      <div className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                        Included Capabilities
                      </div>
                      <ul className="space-y-2 text-xs text-white/70">
                        {s.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">{s.price}</span>
                      <span className="text-xs text-white/50">{s.unit}</span>
                    </div>
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, service: s.title }))
                        scrollTo('contact')
                      }}
                      className="rounded-lg bg-white/10 hover:bg-white hover:text-black px-4 py-2 text-xs font-semibold text-white transition-all duration-200 inline-flex items-center gap-1.5"
                    >
                      <span>Inquire</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: AROUND THE CLOCK / TRANSITION BANNER
          ========================================================================= */}
      <section className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/10 bg-gradient-to-b from-black via-[#080c14] to-black overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-400">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            Active NOC Telemetry · 24/7/365
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
            When your team logs off, <br />
            <em className="italic text-white/90">we're still watching</em>.
          </h2>

          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Systems don't keep office hours — and neither do we. HEXCYRA monitors, patches, and defends your infrastructure through the night, so you wake up to business as usual.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/70">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-emerald-400">●</span> 14ms Global Gateway Latency
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-emerald-400">●</span> 99.98% 30-Day Cluster Uptime
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-emerald-400">●</span> Zero Unscheduled Downtime
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MANAGED SUPPORT (24/7 Operations)
          ========================================================================= */}
      <section id="support" className="relative py-24 sm:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Minimal Image for Support */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl border border-white/15 bg-white/[0.03] p-2.5 overflow-hidden shadow-2xl group">
                <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={ASSETS.support}
                    alt="HEXCYRA Network Operations Center Monitor"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Telemetry Desk</span>
                    </div>
                    <span className="font-mono text-emerald-400">STATUS: OPTIMAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Copy & Feature Cards */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Managed Support
                </span>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
                  Support that never <em className="italic text-white/90">sleeps</em>
                </h2>
                <p className="text-base text-white/60 leading-relaxed">
                  Our operations center and helpdesk run 24/7/365. We catch issues before they become outages and resolve tickets fast — with real engineers, not scripts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUPPORT_FEATURES.map((item) => {
                  const IconComp = item.icon
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-all"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  )
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => scrollTo('contact')}
                  className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black hover:scale-105 transition-transform shadow-md shadow-white/10"
                >
                  Connect with NOC Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: EXPERTISE (Bento Grid)
          ========================================================================= */}
      <section id="expertise" className="relative py-24 sm:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10 bg-[#060606]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Expertise
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
              A stack we <em className="italic text-white/90">master</em>
            </h2>
            <p className="text-base text-white/60">
              From cloud platforms to modern application frameworks, our engineers work fluently across the technologies your business runs on.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {EXPERTISE_ITEMS.map((item) => (
              <div
                key={item.title}
                className={`${item.span} group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col justify-between`}
              >
                <div>
                  <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden mb-6 border border-white/10">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-400 text-[11px] sm:text-xs">
                        {item.tags}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <span>Battle-Tested</span>
                  <span className="text-emerald-400 font-medium">Production Hardened</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: PROCESS (How We Work)
          ========================================================================= */}
      <section id="process" className="relative py-24 sm:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              How We Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
              From strategy to <em className="italic text-white/90">steady state</em>
            </h2>
            <p className="text-base text-white/60">
              A transparent, phased delivery model built to modernize enterprise technology without business disruption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((proc) => (
              <div
                key={proc.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/25 transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 border border-white/10">
                    <img
                      src={proc.img}
                      alt={proc.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-mono px-2.5 py-1 rounded bg-black/70 text-white/80 border border-white/10">
                      {proc.tag}
                    </span>
                    <span className="absolute bottom-3 right-3 text-4xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                      {proc.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white">{proc.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CONTACT / CONSULTATION
          ========================================================================= */}
      <section id="contact" className="relative py-24 sm:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side: Perks and info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Consultation
                </span>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
                  Let's build something <em className="italic text-white/90">reliable</em>
                </h2>
                <p className="text-base text-white/60 leading-relaxed">
                  Tell us about your systems and goals. We'll respond within one business day with a tailored engineering plan — no obligation.
                </p>
              </div>

              {/* Consultation Perks */}
              <div className="space-y-3.5 pt-2">
                {[
                  'Free initial IT architecture & security audit',
                  'No long-term lock-in contracts',
                  'Dedicated senior account engineer & direct Slack channel',
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Direct Info */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3 text-xs text-white/70">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>hello@hexcyra.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>+1 (000) 000-0000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>24/7/365 NOC Response Center</span>
                </div>
              </div>
            </div>

            {/* Right side: Interactive Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-md"
              >
                {formSubmitted ? (
                  <div className="py-16 text-center space-y-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Check className="h-7 w-7" />
                    </span>
                    <h3 className="text-2xl font-semibold text-white">
                      Consultation Request Received
                    </h3>
                    <p className="text-sm text-white/60 max-w-md mx-auto">
                      Thank you! An engineer has been notified and will reply within 1 business day with a customized roadmap.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-white">
                      Request a <em>consultation</em>
                    </h3>
                    <p className="text-xs text-white/50 -mt-3">
                      No obligation. We reply within 24 hours.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@company.com"
                          className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Acme Corp"
                          className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none transition-colors"
                        >
                          <option value="Managed IT">Managed IT ($1,200/mo)</option>
                          <option value="Cloud & DevOps">Cloud &amp; DevOps ($2,400/mo)</option>
                          <option value="Cybersecurity">Cybersecurity ($1,800/mo)</option>
                          <option value="Complete Infrastructure">Full Enterprise Suite</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1.5">
                        Existing Stack or Goals (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your team size, cloud environment, or challenges..."
                        className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-white py-3 text-xs font-semibold text-black hover:scale-[1.01] active:scale-98 transition-transform shadow-lg shadow-white/10"
                    >
                      Request Consultation
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: COMPREHENSIVE FOOTER
          ========================================================================= */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-12 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Brand & Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white">
                  <Hexagon className="h-4 w-4 stroke-[2.2]" />
                </span>
                <span>HEXCYRA</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm">
                HEXCYRA is an IT services company delivering managed infrastructure, cloud engineering, cybersecurity, and 24/7 support to growing businesses.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>NOC Active · All Systems Operational</span>
              </div>
            </div>

            {/* Services Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Services
              </h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li><button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Managed IT</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Cloud &amp; DevOps</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Cybersecurity</button></li>
                <li><button onClick={() => scrollTo('expertise')} className="hover:text-white transition-colors">App Development</button></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Infrastructure Audits</button></li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li><button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollTo('support')} className="hover:text-white transition-colors">24/7 Operations</button></li>
                <li><button onClick={() => scrollTo('process')} className="hover:text-white transition-colors">How We Work</button></li>
                <li><button onClick={() => scrollTo('expertise')} className="hover:text-white transition-colors">Technology Stack</button></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>

            {/* Direct Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Connect
              </h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li><a href="mailto:hello@hexcyra.com" className="hover:text-white transition-colors">hello@hexcyra.com</a></li>
                <li><a href="tel:+10000000000" className="hover:text-white transition-colors">+1 (000) 000-0000</a></li>
                <li className="text-white/40">Remote &amp; On-site Engagements</li>
                <li className="text-white/40">Guaranteed 99.9% Uptime SLA</li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div>
              © {new Date().getFullYear()} HEXCYRA. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Terms of Service</button>
              <button onClick={() => scrollTo('support')} className="hover:text-white transition-colors">Security Commitments</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
