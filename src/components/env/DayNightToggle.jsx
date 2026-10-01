import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useEnvironment } from './EnvironmentProvider.jsx'

/** LIGHTTON-style control: its thumb follows the live environment progress. */
export default function DayNightToggle({ className = '' }) {
  const { mode, phase, transitioning, toggle } = useEnvironment()
  const night = mode === 'night'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={night}
      aria-label={night ? 'Switch to day' : 'Switch to night'}
      title={night ? 'Switch to daylight' : 'Switch to night'}
      className={`theme-toggle group inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 ${className}`}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <Sun className="theme-toggle-sun" size={14} />
        <Moon className="theme-toggle-moon" size={14} />
        <span className="theme-toggle-thumb">
          {night ? <Moon size={13} /> : <Sun size={13} />}
        </span>
      </span>
      <span className="hidden min-w-[3.6rem] text-left text-[10px] font-bold uppercase tracking-[0.16em] lg:inline" aria-live="polite">
        {transitioning ? phase : night ? 'Night' : 'Day'}
      </span>
    </button>
  )
}
