import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Blue uses CSS variables — light mode = maroon, dark mode = gold (set in globals.css)
        blue: {
          50:  'rgb(var(--blue-50) / <alpha-value>)',
          100: 'rgb(var(--blue-100) / <alpha-value>)',
          200: 'rgb(var(--blue-200) / <alpha-value>)',
          300: 'rgb(var(--blue-300) / <alpha-value>)',
          400: 'rgb(var(--blue-400) / <alpha-value>)',
          500: 'rgb(var(--blue-500) / <alpha-value>)',
          600: 'rgb(var(--blue-600) / <alpha-value>)',
          700: 'rgb(var(--blue-700) / <alpha-value>)',
          800: 'rgb(var(--blue-800) / <alpha-value>)',
          900: 'rgb(var(--blue-900) / <alpha-value>)',
          950: 'rgb(var(--blue-950) / <alpha-value>)',
        },
        // Override indigo with brand gold — all indigo-* classes update automatically
        indigo: {
          50:  '#fdfbf5',
          100: '#faf5e8',
          200: '#f4eacc',
          300: '#ecd9a3',
          400: '#d4be8a',
          500: '#c3ab73',  // brand gold
          600: '#a8925f',
          700: '#8a7549',
          800: '#6b5a38',
          900: '#4d4028',
          950: '#2e2618',
        },
        // Override yellow with brand gold
        yellow: {
          50:  '#fdfbf5',
          100: '#faf5e8',
          200: '#f4eacc',
          300: '#ecd9a3',
          400: '#d4be8a',
          500: '#c3ab73',  // brand gold
          600: '#a8925f',
          700: '#8a7549',
          800: '#6b5a38',
          900: '#4d4028',
          950: '#2e2618',
        },
        brand: {
          DEFAULT: '#70212c',
          light:   '#c94055',
          dark:    '#5a1a23',
          gold:    '#c3ab73',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
