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
} from 'lucide-react'

// Asset references from the older build
const ASSETS = {
  hero: '/img/hero.jpg',
  about: '/img/about.jpg',
  serviceManaged: '/img/svc-managed.jpg',
  serviceCloud: '/img/svc-cloud.jpg',
  serviceSecurity: '/img/svc-security.jpg',
  support: '/img/support.jpg',
  expertise: '/img/expertise.jpg',
  process1: '/img/process-1.jpg',
  process2: '/img/process-2.jpg',
  process3: '/img/process-3.jpg',
}

// HEXCYRA data from the older build
const HEXCYRA_DATA = {
  brand: 'HEXCYRA',
  badge: 'IT & Managed Services',
  h1Line1: 'Technology that',
  h1Line2: 'works while',
  h1Line3: 'you sleep.',
  paragraph:
    'HEXCYRA is your full-service IT partner — from managed infrastructure and cloud engineering to cybersecurity and round-the-clock support. We keep your business running, secure, and ready to scale.',
  ctaText: 'Explore Services',
  navLinks: [
    { id: 'services', label: 'Services' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'support', label: 'Support' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Reach Us' },
  ],
}

// Foldcraft template dataset for toggle preview
const FOLDCRAFT_DATA = {
  brand: 'Foldcraft',
  badge: 'Brand & Visual Storytelling',
  h1Line1: 'Shaping visual',
  h1Line2: 'narratives,',
  h1Line3: 'one pixel at a time.',
  paragraph:
    'Turning vision into reality through craft, motion, and an endless pursuit of beauty.',
  ctaText: 'Explore Work',
  navLinks: [
    { id: 'services', label: 'Home' },
    { id: 'expertise', label: 'Projects' },
    { id: 'support', label: 'Studio' },
    { id: 'contact', label: 'Reach Us' },
  ],
}

const SERVICES_DATA = [
  {
    id: 'managed',
    title: 'Managed IT',
    accent: 'Operations',
    price: '$1,200',
    unit: '/ mo',
    desc: 'End-to-end management of your devices, users, and networks with proactive monitoring and a responsive helpdesk.',
    features: [
      'Proactive workstation & server management',
      'Automated OS & application patch management',
      'Unified identity, SSO & zero-trust access',
      'Guaranteed 15-minute response SLA',
    ],
    img: ASSETS.serviceManaged,
    icon: Server,
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    accent: 'Engineering',
    price: '$2,400',
    unit: '/ mo',
    desc: 'Cloud migration, infrastructure-as-code, and CI/CD pipelines that help you ship faster and scale on demand.',
    features: [
      'Multi-cloud architecture (AWS, Azure, GCP)',
      'Infrastructure as Code with Terraform & Pulumi',
      'Kubernetes cluster orchestration & autoscaling',
      'Automated canary releases & zero-downtime deploys',
    ],
    img: ASSETS.serviceCloud,
    icon: Cloud,
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    accent: 'Hardening',
    price: '$1,800',
    unit: '/ mo',
    desc: 'Threat detection, compliance, and hardening that keep your data and customers protected around the clock.',
    features: [
      '24/7 SOC monitoring & real-time threat detection',
      'SOC 2, ISO 27001, and HIPAA compliance readiness',
      'Automated disaster recovery & ransomware shield',
      'Continuous vulnerability scanning & pen testing',
    ],
    img: ASSETS.serviceSecurity,
    icon: Shield,
  },
]

const EXPERTISE_DATA = [
  {
    title: 'Cloud Infrastructure',
    tags: 'AWS · Azure · GCP · Kubernetes · Terraform',
    desc: 'High-availability infrastructure engineered to scale automatically with zero downtime.',
    img: ASSETS.expertise,
    featured: true,
  },
  {
    title: 'App Development',
    tags: 'React · Node · Python · .NET',
    desc: 'Modern web platforms and cloud applications built for speed, stability, and scale.',
    img: ASSETS.serviceCloud,
    featured: false,
  },
  {
    title: 'Data & AI',
    tags: 'Pipelines, analytics & automation',
    desc: 'Intelligent automation pipelines and real-time business telemetry engines.',
    img: ASSETS.serviceSecurity,
    featured: false,
  },
]

const SUPPORT_DATA = [
  {
    icon: Headphones,
    text: '24/7 helpdesk with rapid response SLAs',
    detail: 'Direct access to certified systems engineers around the clock.',
  },
  {
    icon: Activity,
    text: 'Proactive monitoring & real-time alerting',
    detail: 'Continuous health checks and telemetry before incidents affect users.',
  },
  {
    icon: Shield,
    text: 'Patch management & security hardening',
    detail: 'Automated vulnerability scanning and zero-day patch deployments.',
  },
  {
    icon: Server,
    text: 'Automated backup & disaster recovery',
    detail: 'Multi-region snapshots and automated failover verification drills.',
  },
]

const PROCESS_DATA = [
  {
    step: '01',
    tag: 'Step · Assess',
    title: 'Discovery & Strategy',
    desc: 'We audit your environment, surface risks, and design a roadmap aligned to your business goals and budget.',
    img: ASSETS.process1,
  },
  {
    step: '02',
    tag: 'Step · Deliver',
    title: 'Build & Migrate',
    desc: 'We implement, migrate, and integrate with minimal disruption — clear milestones, clean handovers, no drama.',
    img: ASSETS.process2,
  },
  {
    step: '03',
    tag: 'Step · Operate',
    title: 'Manage & Optimize',
    desc: 'We monitor, support, and continuously improve your systems as a long-term partner invested in your uptime.',
    img: ASSETS.process3,
  },
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [isHexcyraData, setIsHexcyraData] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Managed IT',
    message: '',
  })

  const data = isHexcyraData ? HEXCYRA_DATA : FOLDCRAFT_DATA

  // Close modals on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleNavClick = (id) => {
    setMobileMenuOpen(false)
    setActiveModal(id)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setActiveModal(null)
      setFormState({
        name: '',
        email: '',
        company: '',
        service: 'Managed IT',
        message: '',
      })
    }, 2500)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover [object-position:70%_center]"
        style={{ objectPosition: '70% center' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
      />

      {/* Subtle overlay gradient to ensure high readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/60 pointer-events-none" />

      {/* Navbar (z-30) */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* Left side: Logo text followed by desktop nav links */}
        <div className="flex items-center gap-8 lg:gap-12">
          <button
            onClick={() => setActiveModal(null)}
            className="text-lg font-semibold tracking-tight text-white sm:text-xl flex items-center gap-2 text-left"
          >
            {isHexcyraData && (
              <span className="flex h-6 w-6 items-center justify-center rounded bg-white/10 border border-white/20">
                <Hexagon className="h-3.5 w-3.5 text-white" />
              </span>
            )}
            <span>{data.brand}</span>
          </button>

          {/* Desktop nav links (hidden on mobile, flex on md+) */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {data.navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right side (desktop & mobile) */}
        <div className="flex items-center gap-3">
          {/* Dataset Switcher toggle: Older Build (HEXCYRA) vs Foldcraft Preview */}
          <button
            onClick={() => setIsHexcyraData(!isHexcyraData)}
            title="Toggle data between older build (HEXCYRA) and Foldcraft"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:text-white hover:border-white/30 transition-all backdrop-blur-sm mr-1"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isHexcyraData ? 'bg-emerald-400' : 'bg-blue-400'
              }`}
            />
            <span>{isHexcyraData ? 'Older Data: HEXCYRA' : 'Foldcraft Preview'}</span>
          </button>

          {/* Right side (desktop): "Let's Talk" button */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden md:inline-block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform"
          >
            Let's Talk
          </button>

          {/* Right side (mobile): hamburger toggle button (40x40, z-50) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
          {/* Links: text-3xl font-medium text-white/90 hover:text-white */}
          <div className="flex flex-col gap-6">
            {data.navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleNavClick(link.id)
                }}
                className="text-left text-3xl font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Button: "Let's Talk" */}
          <div>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                handleNavClick('contact')
              }}
              className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile toggle for data */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/50">Active Dataset</span>
            <button
              onClick={() => setIsHexcyraData(!isHexcyraData)}
              className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full border border-white/15"
            >
              {isHexcyraData ? 'HEXCYRA Data' : 'Foldcraft Spec'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content (z-10) */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16 pointer-events-none">
        {/* Top Section (max-w-3xl) */}
        <div className="max-w-3xl pointer-events-auto">
          {/* Badge: text-xs sm:text-sm text-white/90 with animate-[fadeSlideUp_0.8s_ease_0.2s_both] margin-bottom 4 (sm:6) */}
          <div className="mb-4 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs sm:text-sm text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {data.badge}
            </span>
          </div>

          {/* Heading h1 with <br/> line breaks */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
            {data.h1Line1} <br />
            {data.h1Line2} <br />
            {data.h1Line3}
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="pointer-events-auto">
          {/* Paragraph */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            {data.paragraph}
          </p>

          {/* CTA Button Row */}
          <div className="flex flex-wrap items-center gap-4 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            <button
              onClick={() => handleNavClick('services')}
              className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              <span>{data.ctaText}</span>
              <ArrowRight size={16} />
            </button>

            {/* Quick Metrics from older build */}
            {isHexcyraData && (
              <div className="hidden sm:flex items-center gap-3.5 rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-md text-xs text-white/80">
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors"
                >
                  <span className="font-semibold text-white">320+</span> Projects
                </button>
                <span className="h-3 w-px bg-white/20" />
                <button
                  onClick={() => handleNavClick('support')}
                  className="hover:text-white transition-colors"
                >
                  <span className="font-semibold text-white">99.9%</span> SLA
                </button>
                <span className="h-3 w-px bg-white/20" />
                <button
                  onClick={() => handleNavClick('support')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-emerald-400">24/7</span> Active Ops
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Overlay / Drawer with Older Build Data (z-40) */}
      {activeModal && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-[fadeSlideUp_0.25s_ease_both]"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-white/15 bg-[#0a0a0a]/95 text-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/15 text-white">
                  <Hexagon className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-white flex items-center gap-2">
                    HEXCYRA — {activeModal.toUpperCase()}
                  </h2>
                  <p className="text-xs text-white/50">
                    Enterprise IT &amp; Managed Services Data
                  </p>
                </div>
              </div>

              {/* Navigation Tabs inside Modal */}
              <div className="hidden lg:flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-xs">
                {['services', 'expertise', 'support', 'process', 'contact', 'about'].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveModal(tab)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                        activeModal === tab
                          ? 'bg-white text-black font-medium'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-8">
              {/* SERVICES VIEW */}
              {activeModal === 'services' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                      What We Do
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                      Services built to <em>scale</em>
                    </h3>
                    <p className="text-sm text-white/60 mt-1 max-w-2xl">
                      Flexible engagements — from fully managed IT to project-based
                      engineering — tailored to how your business actually runs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {SERVICES_DATA.map((svc) => {
                      const IconComponent = svc.icon
                      return (
                        <div
                          key={svc.id}
                          className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/25 transition-all"
                        >
                          <div>
                            <div className="relative h-36 w-full rounded-lg overflow-hidden mb-4 border border-white/10">
                              <img
                                src={svc.img}
                                alt={svc.title}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-xs text-white/90">
                                <IconComponent className="h-3.5 w-3.5 text-emerald-400" />
                                <span>{svc.accent}</span>
                              </div>
                            </div>

                            <h4 className="text-lg font-semibold text-white">
                              {svc.title}
                            </h4>
                            <p className="text-xs text-white/60 mt-1 leading-relaxed">
                              {svc.desc}
                            </p>

                            <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-xs text-white/70">
                              {svc.features.map((feat) => (
                                <li key={feat} className="flex items-start gap-1.5">
                                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-4">
                            <div>
                              <span className="text-lg font-bold text-white">
                                {svc.price}
                              </span>
                              <span className="text-xs text-white/50">{svc.unit}</span>
                            </div>
                            <button
                              onClick={() => {
                                setFormState((prev) => ({
                                  ...prev,
                                  service: svc.title,
                                }))
                                setActiveModal('contact')
                              }}
                              className="rounded-md bg-white/10 hover:bg-white hover:text-black px-3 py-1.5 text-xs font-medium text-white transition-all flex items-center gap-1"
                            >
                              Get Started
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* EXPERTISE VIEW */}
              {activeModal === 'expertise' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                      Engineering Stack
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                      A stack we master
                    </h3>
                    <p className="text-sm text-white/60 mt-1 max-w-2xl">
                      From cloud platforms to modern application frameworks, our engineers
                      work fluently across the technologies your business runs on.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {EXPERTISE_DATA.map((exp, idx) => (
                      <div
                        key={exp.title}
                        className={`rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col justify-between ${
                          idx === 0 ? 'md:col-span-2' : ''
                        }`}
                      >
                        <div>
                          <div className="h-44 w-full rounded-lg overflow-hidden mb-4 border border-white/10 relative">
                            <img
                              src={exp.img}
                              alt={exp.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="absolute bottom-3 left-3">
                              <span className="text-xs text-emerald-400 font-mono">
                                {exp.tags}
                              </span>
                            </div>
                          </div>
                          <h4 className="text-xl font-semibold text-white">
                            {exp.title}
                          </h4>
                          <p className="text-xs text-white/60 mt-2 leading-relaxed">
                            {exp.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                          <span>Enterprise Stack</span>
                          <span className="text-emerald-400">Production Ready</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUPPORT VIEW */}
              {activeModal === 'support' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                      Managed Support
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                      Support that never sleeps
                    </h3>
                    <p className="text-sm text-white/60 mt-1 max-w-2xl">
                      Our operations center and helpdesk run 24/7/365. We catch issues
                      before they become outages and resolve tickets fast — with real
                      engineers, not scripts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {SUPPORT_DATA.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <div
                          key={item.text}
                          className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-white">
                              {item.text}
                            </h4>
                            <p className="text-xs text-white/60 mt-1 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="rounded-xl border border-white/10 bg-gradient-to-r from-emerald-950/20 via-black to-black p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-medium text-white">
                        Around The Clock
                      </h4>
                      <p className="text-xs text-white/60 mt-0.5">
                        "When your team logs off, we're still watching."
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveModal('contact')}
                      className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:scale-105 transition-transform"
                    >
                      Connect with NOC Team
                    </button>
                  </div>
                </div>
              )}

              {/* PROCESS VIEW */}
              {activeModal === 'process' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                      How We Work
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                      From strategy to steady state
                    </h3>
                    <p className="text-sm text-white/60 mt-1 max-w-2xl">
                      A clear, disciplined roadmap that minimizes friction and keeps your
                      systems running at peak reliability.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PROCESS_DATA.map((proc) => (
                      <div
                        key={proc.step}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="h-32 w-full rounded-lg overflow-hidden mb-4 border border-white/10 relative">
                            <img
                              src={proc.img}
                              alt={proc.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <span className="absolute top-2 left-2 text-xs font-mono px-2 py-0.5 rounded bg-black/70 text-white/80">
                              {proc.tag}
                            </span>
                            <span className="absolute bottom-2 right-2 text-3xl font-bold text-white/20">
                              {proc.step}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-white">
                            {proc.title}
                          </h4>
                          <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                            {proc.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CONTACT VIEW */}
              {activeModal === 'contact' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Perks & Direct Contact */}
                    <div className="lg:col-span-5 space-y-6">
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                          Contact &amp; Booking
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                          Let's build something <em>reliable</em>
                        </h3>
                        <p className="text-sm text-white/60 mt-2 leading-relaxed">
                          Tell us about your systems and goals. We'll respond within one
                          business day with a tailored plan — no obligation.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        {[
                          'Free initial IT assessment',
                          'No long-term lock-in contracts',
                          'A dedicated account engineer',
                        ].map((perk) => (
                          <div key={perk} className="flex items-center gap-2.5 text-xs text-white/80">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 text-white/70">
                          <Mail className="h-4 w-4 text-emerald-400" />
                          <span>hello@hexcyra.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Phone className="h-4 w-4 text-emerald-400" />
                          <span>+1 (000) 000-0000</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Clock className="h-4 w-4 text-emerald-400" />
                          <span>Remote &amp; On-site</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Interactive Consultation Form */}
                    <div className="lg:col-span-7">
                      <form
                        onSubmit={handleFormSubmit}
                        className="rounded-xl border border-white/15 bg-white/[0.04] p-6 space-y-4 shadow-xl"
                      >
                        {formSubmitted ? (
                          <div className="py-12 text-center space-y-3">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              <Check className="h-6 w-6" />
                            </span>
                            <h4 className="text-lg font-semibold text-white">
                              Consultation Request Received
                            </h4>
                            <p className="text-xs text-white/60 max-w-sm mx-auto">
                              Thank you! An engineer will review your environment and reply
                              within 1 business day.
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs text-white/70 mb-1">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formState.name}
                                  onChange={(e) =>
                                    setFormState({ ...formState, name: e.target.value })
                                  }
                                  placeholder="Your name"
                                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-white/70 mb-1">
                                  Work Email
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={formState.email}
                                  onChange={(e) =>
                                    setFormState({ ...formState, email: e.target.value })
                                  }
                                  placeholder="you@company.com"
                                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs text-white/70 mb-1">
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formState.company}
                                  onChange={(e) =>
                                    setFormState({ ...formState, company: e.target.value })
                                  }
                                  placeholder="Company name"
                                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-white/70 mb-1">
                                  Service Needed
                                </label>
                                <select
                                  value={formState.service}
                                  onChange={(e) =>
                                    setFormState({ ...formState, service: e.target.value })
                                  }
                                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3.5 py-2 text-xs text-white focus:border-white focus:outline-none"
                                >
                                  <option value="Managed IT">Managed IT ($1,200/mo)</option>
                                  <option value="Cloud & DevOps">
                                    Cloud &amp; DevOps ($2,400/mo)
                                  </option>
                                  <option value="Cybersecurity">
                                    Cybersecurity ($1,800/mo)
                                  </option>
                                  <option value="Full IT Solution">
                                    Full Enterprise Solution
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs text-white/70 mb-1">
                                Message (Optional)
                              </label>
                              <textarea
                                rows={3}
                                value={formState.message}
                                onChange={(e) =>
                                  setFormState({ ...formState, message: e.target.value })
                                }
                                placeholder="Describe your existing infrastructure or challenges..."
                                className="w-full rounded-lg border border-white/15 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-white focus:outline-none resize-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full rounded-lg bg-white py-2.5 text-xs font-semibold text-black hover:scale-[1.01] active:scale-98 transition-transform shadow-md shadow-white/10"
                            >
                              Request Free Consultation
                            </button>
                          </>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* ABOUT & STATS VIEW */}
              {activeModal === 'about' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                      Who We Are
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                      Enterprise IT, delivered with <em>precision</em>.
                    </h3>
                    <p className="text-sm text-white/60 mt-1 max-w-2xl">
                      HEXCYRA is an IT services company helping businesses design, build,
                      and manage the technology they depend on. We pair deep engineering
                      expertise with real accountability — no jargon, no surprises.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { val: '320+', label: 'Projects Delivered' },
                      { val: '99.9%', label: 'Uptime SLA' },
                      { val: '24/7', label: 'Monitoring & Support' },
                    ].map((st) => (
                      <div
                        key={st.label}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center"
                      >
                        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                          {st.val}
                        </div>
                        <div className="text-xs text-white/60 mt-1">{st.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
                    <h4 className="text-base font-semibold text-white">
                      From Startups to Established Enterprises
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed">
                      From fast-moving startups to established enterprises, we act as
                      your dedicated technology team: proactive, transparent, and always
                      on.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/10 px-6 py-3 bg-black/60 flex items-center justify-between text-xs text-white/50">
              <span>© {new Date().getFullYear()} HEXCYRA. All rights reserved.</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModal('contact')}
                  className="text-white hover:underline"
                >
                  Book Assessment
                </button>
                <span>·</span>
                <span>hello@hexcyra.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
