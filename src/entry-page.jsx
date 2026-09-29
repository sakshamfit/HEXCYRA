import React from 'react'
import ReactDOM from 'react-dom/client'
import WorkPage from './pages/WorkPage.jsx'
import SolutionsPage from './pages/SolutionsPage.jsx'
import ApproachPage from './pages/ApproachPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './index.css'

/* ==========================================================================
   One entry for all five index pages and the 404.
   Each has its own HTML document — its own title, description, canonical and
   JSON-LD — but they share this module, so the build emits a single chunk for
   them. The machine stays behind a lazy import inside the work page, so no
   other route can reach three.js.
   ========================================================================== */
const PAGES = {
  work: WorkPage,
  solutions: SolutionsPage,
  approach: ApproachPage,
  about: AboutPage,
  contact: ContactPage,
  notFound: NotFoundPage,
}

const key = document.body.dataset.page
const Page = PAGES[key]

if (!Page) {
  throw new Error(`entry-page: no page registered for "${key}"`)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
