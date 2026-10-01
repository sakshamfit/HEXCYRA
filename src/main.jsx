import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { EnvironmentProvider } from './components/env/EnvironmentProvider.jsx'
import './fonts.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EnvironmentProvider>
      <App />
    </EnvironmentProvider>
  </React.StrictMode>,
)
