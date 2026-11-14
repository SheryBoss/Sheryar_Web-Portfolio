/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#030712',
          deep: '#060818',
          void: '#02040a',
          card: 'rgba(11, 15, 36, 0.75)',
          border: 'rgba(56, 189, 248, 0.2)',
          surface: '#0d1330',
        },
        cyber: {
          cyan: '#00f0ff',
          blue: '#38bdf8',
          violet: '#8b5cf6',
          purple: '#a855f7',
          pink: '#ec4899',
          neon: '#00ffcc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Rajdhani', 'Orbitron', 'sans-serif'],
        gaming: ['"Chakra Petch"', 'Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'glow-violet': '0 0 25px rgba(139, 92, 246, 0.4)',
        'glow-subtle': '0 0 15px rgba(56, 189, 248, 0.15)',
        'holo': '0 8px 32px 0 rgba(0, 240, 255, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
