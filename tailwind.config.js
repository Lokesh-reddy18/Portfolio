/** @type {import('tailwindcss').Config} */

// Colours are Material 3 tonal roles defined as CSS variables in src/index.css,
// so light/dark switching swaps the variables instead of every class needing a `dark:` twin.
const role = (name) => `rgb(var(--md-${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: role('primary'),
        'on-primary': role('on-primary'),
        'primary-container': role('primary-container'),
        'on-primary-container': role('on-primary-container'),
        secondary: role('secondary'),
        'secondary-container': role('secondary-container'),
        'on-secondary-container': role('on-secondary-container'),
        surface: role('surface'),
        'surface-low': role('surface-low'),
        'surface-container': role('surface-container'),
        'surface-high': role('surface-high'),
        'surface-card': role('surface-card'),
        'on-surface': role('on-surface'),
        'on-surface-variant': role('on-surface-variant'),
        outline: role('outline'),
        'outline-variant': role('outline-variant'),
        error: role('error'),
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(0.6em)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-1deg)' },
        },
        phoneIn: {
          from: { opacity: '0', transform: 'translateY(60px) rotate(-8deg) scale(0.92)' },
          to: { opacity: '1', transform: 'translateY(0) rotate(-2deg) scale(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        ripple: {
          from: { transform: 'scale(0)', opacity: '0.35' },
          to: { transform: 'scale(1)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.2, 0, 0, 1) both',
        float: 'float 6s ease-in-out infinite',
        'phone-in': 'phoneIn 1s cubic-bezier(0.2, 0, 0, 1) both',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 46s linear infinite reverse',
        ripple: 'ripple 600ms cubic-bezier(0.2, 0, 0, 1) forwards',
        fadeIn: 'fadeIn 0.25s ease-out both',
      },
    },
  },
  plugins: [],
}
