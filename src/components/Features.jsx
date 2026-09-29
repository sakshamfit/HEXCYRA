import React from 'react'
import FeaturesWithPanel from '@/components/ui/features-with-panel'
import { brand, solutions } from '../siteData.js'

/* Six minimal photographs, one per capability, in the order the supplied
   content lists them. 900x491, 21-56 kB, generated locally and served from
   /img — nothing is fetched from a CDN. */
const MEDIA = [
  '/img/feat-web.jpg',
  '/img/feat-growth.jpg',
  '/img/feat-it.jpg',
  '/img/feat-security.jpg',
  '/img/feat-business.jpg',
  '/img/feat-academy.jpg',
]

const ITEMS = solutions.items.map((item, index) => ({
  title: item.title,
  alt: item.desc,
  content: MEDIA[index],
}))

/* ==========================================================================
   CAPABILITIES — features with a panel
   The six capabilities as a numbered list; picking one swaps the media in the
   sticky panel beside it. On phones the panel is hidden and the media expands
   under the row that is active instead.
   ========================================================================== */
export default function Features() {
  return (
    <FeaturesWithPanel
      id="capabilities"
      title={brand.tagline}
      listLabel="Capabilities"
      items={ITEMS}
    />
  )
}
