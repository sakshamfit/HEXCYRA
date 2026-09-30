import React from 'react'
import { MinimalFooter } from './ui/minimal-footer'

/* ==========================================================================
   SITE FOOTER
   Renders the shared MinimalFooter primitive — one import used by the home
   page (App.jsx) and every index page, so the footer stays identical
   everywhere without touching each page.
   ========================================================================== */
export default function SiteFooter() {
  return <MinimalFooter />
}
