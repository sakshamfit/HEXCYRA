import { assets } from './assets.js'

/* ==========================================================================
   SITE DATA — all copy, imagery and links come from the previous HEXCYRA
   build (IT & Managed Services). Only the presentation layer changed.
   ========================================================================== */

export const brand = {
  name: 'HEXCYRA',
  initial: 'H',
  tagline: 'IT & Managed Services',
}

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'studio', label: 'Studio' },
  { id: 'process', label: 'Process' },
]

/* ------------------------------------------------------------------ Hero */
export const hero = {
  badge: 'IT & Managed Services',
  titleLines: ['Technology that', 'works while'],
  highlight: 'you sleep.',
  paragraph:
    'HEXCYRA is your full-service IT partner — from managed infrastructure and cloud engineering to cybersecurity and round-the-clock support. We keep your business running, secure, and ready to scale.',
  primaryCta: 'Explore Services',
  secondaryCta: 'See how we work',
  chips: ['99.9% Uptime SLA', '15-min Response', '24/7/365 NOC'],
}

/* --------------------------------------------------------------- Marquee */
export const marqueeItems = [
  'Managed IT',
  'Cloud & DevOps',
  'Cybersecurity',
  '24/7 Support',
  'Infrastructure as Code',
  'Automation',
]

/* ---------------------------------------------------------- Selected work */
export const workItems = [
  {
    id: 'northwind',
    client: 'Northwind Retail',
    category: 'Retail · Managed IT',
    title: '42 stores, one helpdesk.',
    desc: 'Proactive workstation, server and network management with a guaranteed 15-minute response SLA.',
    tone: 'sand',
    span: 'lg:col-span-8',
    aspect: 'aspect-[4/3]',
    img: assets.about,
    icon: 'layers',
  },
  {
    id: 'halo',
    client: 'Halo Audio',
    category: 'Media · Cloud Migration',
    title: 'Zero-downtime lift & shift.',
    desc: 'Multi-cloud architecture across AWS, Azure and GCP, delivered with declarative infrastructure.',
    tone: 'indigo',
    span: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
    word: 'SCALE',
    icon: 'music',
  },
  {
    id: 'meridian',
    client: 'Meridian Clinics',
    category: 'Healthcare · Cybersecurity',
    title: 'Compliance, quietly handled.',
    desc: 'HIPAA-ready controls, 24/7 SOC monitoring and automated immutable backups.',
    tone: 'rose',
    span: 'lg:col-span-5',
    aspect: 'aspect-square',
    word: 'SECURE',
    icon: 'shield',
  },
  {
    id: 'volt',
    client: 'Volt Logistics',
    category: 'Logistics · DevOps',
    title: '14× faster releases.',
    desc: 'Automated CI/CD pipelines, Kubernetes orchestration and canary releases with telemetry dashboards.',
    tone: 'dark',
    span: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
    img: assets.hero,
    emoji: '⚡',
    icon: 'code',
  },
]

/* -------------------------------------------------------------- Services */
export const services = [
  {
    id: 'managed',
    icon: 'layers',
    badge: 'Core Operations',
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
  },
  {
    id: 'cloud',
    icon: 'code',
    badge: 'High Growth',
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
    featured: true,
  },
  {
    id: 'security',
    icon: 'shield',
    badge: 'Enterprise Shield',
    title: 'Cybersecurity',
    accent: 'Defense',
    price: '$1,800',
    unit: '/ mo',
    desc: 'Continuous threat intelligence, regulatory compliance auditing, and perimeter defense that shield your systems around the clock.',
    features: [
      '24/7 SOC monitoring & real-time threat hunting',
      'SOC 2, ISO 27001, and HIPAA compliance readiness',
      'Immutable disaster backups & ransomware shields',
      'Continuous external attack surface auditing',
    ],
  },
]

/* --------------------------------------------------- Studio / About block */
export const studio = {
  eyebrow: 'Who We Are',
  title: 'Enterprise IT, delivered with',
  titleAccent: 'precision',
  paragraphs: [
    'HEXCYRA is an IT services company helping businesses design, build, and manage the technology they depend on. We pair deep engineering expertise with real accountability — no jargon, no surprises.',
    "From fast-moving venture startups to established enterprise networks, we act as your dedicated technology team: proactive, transparent, and always on. Systems don't keep office hours — and neither do we.",
  ],
  guarantees: [
    { title: 'Zero Vendor Lock-in', desc: 'Clean, open-source and native cloud architectures.' },
    { title: 'Direct NOC Access', desc: 'Real senior engineers in your team Slack channel.' },
    { title: 'Contractual SLAs', desc: '99.9% uptime and 15-minute response guarantees.' },
  ],
  image: assets.expertise,
  imageCaption: 'Hexcyra Operations Center',
  imageMeta: '24/7/365',
  expertise: [
    {
      title: 'Cloud Infrastructure & IaC',
      tags: 'AWS · Azure · GCP · Kubernetes · Terraform · Pulumi',
      desc: 'Fault-tolerant, multi-region architecture engineered with declarative infrastructure and automated testing.',
      img: assets.serviceCloud,
      icon: 'cloud',
    },
    {
      title: 'Full-Stack Engineering',
      tags: 'React · Next.js · Node · Python · Go · PostgreSQL',
      desc: 'Modern web platforms and cloud applications built for high concurrency and sub-50ms latency.',
      img: assets.serviceManaged,
      icon: 'code',
    },
    {
      title: 'Data Pipelines & Automation',
      tags: 'Kafka · Spark · Airflow · Analytics Telemetry',
      desc: 'Real-time telemetry collection and automated healing pipelines for enterprise workloads.',
      img: assets.process1,
      icon: 'activity',
    },
    {
      title: 'Enterprise Security Posture',
      tags: 'Zero-Trust · SOC 2 · ISO 27001 · SIEM · Pen Testing',
      desc: 'Comprehensive threat mitigation, hardened bastions, and automated identity governance.',
      img: assets.serviceSecurity,
      icon: 'shield',
    },
  ],
  onCall: {
    eyebrow: 'Managed Support',
    title: "When your team logs off, we're still watching.",
    desc: "Systems don't keep office hours — and neither do we. HEXCYRA monitors, patches, and defends your infrastructure through the night, so you wake up to business as usual.",
    image: assets.support,
    status: 'STATUS: OPTIMAL',
    features: [
      {
        icon: 'headphones',
        title: '24/7/365 Operations Desk',
        desc: 'Always staffed by certified systems engineers — no frustrating phone trees or generic scripts.',
      },
      {
        icon: 'activity',
        title: 'Real-Time Alerting & Telemetry',
        desc: 'Sub-second monitoring across CPU, memory, packet loss, and ingress traffic to resolve anomalies before outages happen.',
      },
      {
        icon: 'shield',
        title: 'Patch & Vulnerability Management',
        desc: 'Automated CVE scanning and non-disruptive deployment schedules to protect against zero-day exploits.',
      },
      {
        icon: 'server',
        title: 'Automated Disaster Recovery',
        desc: 'Multi-region immutable snapshots and automated failover verification drills to ensure business continuity.',
      },
    ],
    metrics: [
      '14ms Global Gateway Latency',
      '99.98% 30-Day Cluster Uptime',
      'Zero Unscheduled Downtime',
    ],
  },
}

/* --------------------------------------------------------------- Process */
export const processSteps = [
  {
    step: '01',
    tag: 'Step · Assess',
    title: 'Discovery & Strategy',
    desc: 'We audit your infrastructure, surface latent security gaps, and design an actionable roadmap aligned to your milestones and budget.',
    img: assets.process1,
  },
  {
    step: '02',
    tag: 'Step · Deliver',
    title: 'Build & Migrate',
    desc: 'We implement, migrate, and integrate with minimal friction — verified milestones, clean handovers, and zero business interruption.',
    img: assets.process2,
  },
  {
    step: '03',
    tag: 'Step · Operate',
    title: 'Manage & Optimize',
    desc: 'We monitor, support, and continuously optimize your systems as a long-term partner invested in your 99.9% uptime SLA.',
    img: assets.process3,
  },
]

/* ----------------------------------------------------------------- Stats */
// Each value carries the gradient treatment called out in the reference:
// blue-teal, purple-pink, orange-yellow, lime-green.
export const stats = [
  {
    value: '320+',
    label: 'Delivered Projects',
    sub: 'Across enterprise & high-growth tech',
    gradient: 'from-sky-500 to-teal-400',
  },
  {
    value: '99.9%',
    label: 'Uptime SLA',
    sub: 'Guaranteed by contractual commitments',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    value: '24/7/365',
    label: 'Active NOC Desk',
    sub: 'Real systems engineers, zero bot tiers',
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    value: '<15m',
    label: 'Incident Response',
    sub: 'Average critical triage velocity',
    gradient: 'from-lime-500 to-green-500',
  },
]

/* --------------------------------------------------------------- Contact */
export const contact = {
  eyebrow: 'Consultation',
  title: "Let's build something",
  titleAccent: 'reliable',
  desc: "Tell us about your systems and goals. We'll respond within one business day with a tailored engineering plan — no obligation.",
  perks: [
    'Free initial IT architecture & security audit',
    'No long-term lock-in contracts',
    'Dedicated senior account engineer & direct Slack channel',
  ],
  details: [
    { icon: 'mail', label: 'hello@hexcyra.com', href: 'mailto:hello@hexcyra.com' },
    { icon: 'phone', label: '+1 (000) 000-0000', href: 'tel:+10000000000' },
    { icon: 'clock', label: '24/7/365 NOC Response Center', href: null },
  ],
  serviceOptions: [
    'Managed IT',
    'Cloud & DevOps',
    'Cybersecurity',
    'Infrastructure Audit',
    'Full Enterprise Suite',
  ],
}

/* ---------------------------------------------------------------- Footer */
export const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Managed IT', target: 'services' },
      { label: 'Cloud & DevOps', target: 'services' },
      { label: 'Cybersecurity', target: 'services' },
      { label: 'App Development', target: 'studio' },
      { label: 'Infrastructure Audits', target: 'contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', target: 'studio' },
      { label: '24/7 Operations', target: 'studio' },
      { label: 'How We Work', target: 'process' },
      { label: 'Technology Stack', target: 'studio' },
      { label: 'Contact', target: 'contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'hello@hexcyra.com', href: 'mailto:hello@hexcyra.com' },
      { label: '+1 (000) 000-0000', href: 'tel:+10000000000' },
      { label: 'Remote & On-site Engagements' },
      { label: 'Guaranteed 99.9% Uptime SLA' },
    ],
  },
]
