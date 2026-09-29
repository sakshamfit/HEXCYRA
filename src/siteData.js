/* ==========================================================================
   SITE DATA — every string below comes from the supplied HEXCYRA content.
   No invented copy, no invented numbers, no imagery.
   ========================================================================== */

export const brand = {
  name: 'HEXCYRA',
  initial: 'H',
  tagline: 'Technology. Security. Growth.',
}

/* One index page per section of the supplied document. `id` is the section
   anchor (the home page used to carry every section at once), `path` is the
   page it now lives on. */
export const navLinks = [
  { id: 'solutions', label: 'Solutions', path: '/solutions/' },
  { id: 'work', label: 'Work', path: '/work/' },
  { id: 'approach', label: 'Approach', path: '/approach/' },
  { id: 'about', label: 'About', path: '/about/' },
]

/* The page that carries each section, for the nav, the footer and the audits. */
export const routes = {
  home: '/',
  solutions: '/solutions/',
  work: '/work/',
  approach: '/approach/',
  about: '/about/',
  contact: '/contact/',
}

/* ------------------------------------------------------------------ Hero */
export const hero = {
  badge: 'DIGITAL · TECHNOLOGY · SECURITY',
  titleLines: ['Technology that'],
  highlight: 'moves business',
  titleTail: 'forward.',
  paragraph:
    'We design, build and secure the technology that helps businesses work better, look sharper and grow with confidence.',
  primaryCta: 'Start a Project',
  secondaryCta: 'Explore Solutions',
  scrollCue: 'Scroll to explore',
  chips: [
    { no: '01', label: 'Strategy' },
    { no: '02', label: 'Build' },
    { no: '03', label: 'Secure' },
  ],
}

/* --------------------------------------------------------------- Marquee */
export const marqueeItems = [
  'Web Development',
  'SEO & Digital Growth',
  'IT Services',
  'Cybersecurity',
  'Business Technology',
  'HEXCYRA Academy',
]

/* -------------------------------------------------------- 01 / What we do */
export const whatWeDo = {
  kicker: '01 / What we do',
  title: 'Digital work should',
  accent: 'solve real problems.',
  paragraph:
    'From your first website to the systems behind your operations, HEXCYRA brings strategy, design, technology and security together in one practical approach.',
  principles: [
    { no: '01', title: 'Clear thinking', desc: 'Start with the business problem, not a technology trend.' },
    { no: '02', title: 'Useful technology', desc: 'Build things people can actually use, maintain and grow.' },
    { no: '03', title: 'Security by design', desc: 'Protect the work as it moves from idea to everyday use.' },
  ],
}

/* -------------------------------------------------------- 02 / Solutions */
export const solutions = {
  kicker: '02 / Solutions',
  title: 'Built around what',
  accent: 'your business needs.',
  lead: 'Choose a capability to see how we can help. Everything stays connected to the same goal: better digital operations.',
  items: [
    {
      no: '01',
      icon: 'code',
      title: 'Web Development',
      desc: 'Websites and digital experiences designed for clarity, speed and conversion.',
    },
    {
      no: '02',
      icon: 'trending',
      title: 'SEO & Digital Growth',
      desc: 'Make your business easier to find, understand and choose online.',
      featured: true,
    },
    {
      no: '03',
      icon: 'server',
      title: 'IT Services',
      desc: 'Practical technology support for the systems your business depends on.',
    },
    {
      no: '04',
      icon: 'shield',
      title: 'Cybersecurity',
      desc: 'Security guidance and controls that reduce avoidable digital risk.',
    },
    {
      no: '05',
      icon: 'layers',
      title: 'Business Technology',
      desc: 'Technology planning and management that keeps your work moving.',
    },
    {
      no: '06',
      icon: 'academy',
      title: 'HEXCYRA Academy',
      desc: 'Practical learning, internships and technology skills for the next generation.',
    },
  ],
}

/* --------------------------------------------------------- 03 / Approach */
export const approach = {
  kicker: '03 / Approach',
  title: 'A straightforward way',
  accent: 'to build better.',
  lead: 'No unnecessary layers. We understand the requirement, shape the solution, show you what it could look like, then build and support it.',
  steps: [
    { no: '01', title: 'Understand', desc: 'Business context, audience, current setup and goals.' },
    { no: '02', title: 'Plan', desc: 'Scope, structure, priorities and a clear route forward.' },
    { no: '03', title: 'Build', desc: 'Design and development with regular, visible progress.' },
    { no: '04', title: 'Improve', desc: 'Launch, measure, secure and keep making it better.' },
  ],
}

/* ----------------------------------------------------- 04 / Selected work */
export const work = {
  kicker: '04 / Selected work',
  title: 'A small portfolio.',
  accent: 'Real direction.',
  lead: 'These early concepts show how we think. As client work grows, this space will become a record of the work we are actually proud to ship.',
  items: [
    {
      code: 'HX-HEALTH-01',
      title: 'Healthcare Website Redesign',
      meta: 'Concept / Web Development',
      label: 'healthplus / diagnostics',
      headline: 'Accurate reports.',
      headlineAccent: 'Healthier tomorrow.',
      tags: ['Pathology', 'Imaging', 'Home Sample'],
      img: '/img/work-health.jpg',
      tone: 'sand',
      span: 'lg:col-span-8',
      aspect: 'aspect-[4/3]',
    },
    {
      code: 'HX-BUSINESS-01',
      title: 'Business Digital Presence',
      meta: 'Concept / Digital Growth',
      desc: 'Website + local discovery + lead journey.',
      img: '/img/work-business.jpg',
      word: 'GROW',
      tone: 'indigo',
      span: 'lg:col-span-4',
      aspect: 'aspect-[3/4]',
    },
    {
      code: 'HX-SECURITY-01',
      title: 'Security Foundation',
      meta: 'Concept / Cybersecurity',
      desc: 'Security-first setup for a growing digital business.',
      img: '/img/work-security.jpg',
      word: 'SECURE',
      tone: 'rose',
      span: 'lg:col-span-5',
      aspect: 'aspect-square',
    },
  ],
}

/* ------------------------------------------------- 05 / Who we work with */
export const clients = {
  kicker: '05 / Who we work with',
  title: 'Different businesses.',
  accent: 'Same need for clarity.',
  items: [
    'Startups',
    'Local & Growing Businesses',
    'Professional Services',
    'Healthcare',
    'Education',
    'Emerging Enterprises',
  ],
}

/* ------------------------------------------------------------- 06 / About */
export const about = {
  kicker: '06 / About HEXCYRA',
  title: 'A new company.',
  accent: 'Built on real experience.',
  paragraphs: [
    'HEXCYRA was founded in 2026, built on years of hands-on experience in technology, digital solutions and security since 2021.',
    'We are starting intentionally: focused work, honest communication and a portfolio that grows through actual projects rather than inflated numbers.',
  ],
  timeline: [
    { year: '2021', label: 'Experience & Journey' },
    { year: '2026', label: 'HEXCYRA Founded' },
    { year: 'Next', label: 'Products & Partnerships' },
  ],
}

/* ---------------------------------------------------------- Founders */
export const founders = [
  {
    name: 'Anshuman Pandey',
    designation: 'CTO · Co-Founder',
    quote:
      'Technology should solve real business challenges, not create new ones. At HEXCYRA, we engineer resilient systems, modern digital infrastructure, and security-first architectures that allow ambitious companies to scale with absolute confidence.',
    src: '/img/founder-anshuman.jpg',
  },
  {
    name: 'Utkarsh Tiwari',
    designation: 'CEO · Co-Founder',
    quote:
      'We founded HEXCYRA to bridge strategy, design, and dependable engineering. Our focus is delivering purposeful digital transformation with complete transparency, uncompromising quality, and long-term value for every client.',
    src: '/img/founder-utkarsh.jpg',
  },
]

/* ---------------------------------------------------------- 07 / Academy */
export const academy = {
  kicker: '07 / HEXCYRA Academy',
  title: 'Learn by',
  accent: 'building.',
  paragraph:
    'Practical technology learning, internships and project-led exposure for people who want skills they can actually use.',
  cta: 'Academy updates coming soon',
}

/* ---------------------------------------------------------- 08 / Contact */
export const contact = {
  kicker: '08 / Start a conversation',
  title: 'Have a project',
  accent: 'in mind?',
  paragraph:
    'Tell us what you are trying to build, fix or improve. We will figure out the next practical step with you.',
  cta: 'Start a Conversation',
  email: 'hello@hexcyra.com',
  subject: 'HEXCYRA Project Enquiry',
  note: 'No complicated brief required. A simple message is enough to begin.',
}

/* ------------------------------------------------------------- Footer */
export const footer = {
  links: [
    { label: 'Solutions', path: '/solutions/' },
    { label: 'Work', path: '/work/' },
    { label: 'Approach', path: '/approach/' },
    { label: 'About', path: '/about/' },
    { label: 'Contact', path: '/contact/' },
  ],
  copyright: '© 2026 HEXCYRA',
  location: 'Gorakhpur · India · Beyond',
}
