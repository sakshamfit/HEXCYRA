import React from 'react'
import ReactDOM from 'react-dom/client'
import WorkPage from './pages/WorkPage.jsx'
import './index.css'

/* Separate entry point for the /work/ index. The machine pulls in three.js, so
   it must never be reachable from the home page's first chunk — one HTML
   document per route keeps that boundary in the build, not in runtime code. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkPage />
  </React.StrictMode>,
)
