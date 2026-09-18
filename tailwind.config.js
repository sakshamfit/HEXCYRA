/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      /* No stock Tailwind font-sans: 'Inter' is the only face in the stack. */
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        ink: '#111213',
        bone: '#f4f2ed',
        flame: '#f06a18',
        ember: '#ff6a1a',
        paper: '#e9e7e1',
      },
      /* The reference markup uses off-scale opacity modifiers (bg-[#111213]/98),
         so the scale is widened instead of changing the class strings. */
      opacity: {
        2: '0.02',
        4: '0.04',
        8: '0.08',
        12: '0.12',
        18: '0.18',
        22: '0.22',
        28: '0.28',
        32: '0.32',
        38: '0.38',
        42: '0.42',
        48: '0.48',
        52: '0.52',
        58: '0.58',
        62: '0.62',
        68: '0.68',
        72: '0.72',
        78: '0.78',
        82: '0.82',
        88: '0.88',
        92: '0.92',
        96: '0.96',
        97: '0.97',
        98: '0.98',
        99: '0.99',
      },
      maxWidth: {
        shell: '1440px',
      },
      transitionTimingFunction: {
        glide: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'accordion-in': {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'cue-bob': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.55' },
          '50%': { transform: 'translateY(5px)', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.9' },
          '70%': { transform: 'scale(2.1)', opacity: '0' },
          '100%': { transform: 'scale(2.1)', opacity: '0' },
        },
      },
      animation: {
        'accordion-in': 'accordion-in 320ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'cue-bob': 'cue-bob 2.4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};
