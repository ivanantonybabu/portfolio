/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-bg, #0a0a0a)',
          elevated: 'var(--color-bg-elevated, #111111)',
          surface: 'var(--color-bg-surface, #181818)',
        },
        text: {
          primary: 'var(--color-text-primary, #f5f5f5)',
          secondary: 'var(--color-text-secondary, #999999)',
          tertiary: 'var(--color-text-tertiary, #666666)',
        },
        border: {
          DEFAULT: 'var(--color-border, #222222)',
          hover: 'var(--color-border-hover, #383838)',
        },
        electric: {
          DEFAULT: 'var(--color-electric, #0066ff)',
          light: 'var(--color-electric-light, #3385ff)',
          dark: 'var(--color-electric-dark, #0052cc)',
          glow: 'var(--color-electric-glow, rgba(0, 102, 255, 0.2))',
        }
      },
      fontFamily: {
        clash: ['"Clash Display"', 'sans-serif'],
        sans: ['"General Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.98)' },
          '50%': { opacity: '0.45', transform: 'scale(1.02)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
