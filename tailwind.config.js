/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Body copy
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Headings / display
        display: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        // Poppy, slightly overshooting curve used by every hover interaction.
        pop: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        // Section 3 — continuous marquee, loops seamlessly at -50%.
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'marquee-slow': 'marquee 38s linear infinite',
        fadeSlideUp: 'fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        floaty: 'floaty 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
