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
        midnight: {
          DEFAULT: '#0B1020',
          primary: '#0B1020',
          secondary: '#10182D',
          card: '#151F38',
          surface: '#1B2642',
          border: 'rgba(139, 108, 255, 0.22)',
          50: '#F4F6FB',
          100: '#E4E8F5',
          200: '#C2CDE8',
          300: '#94A6D5',
          400: '#5F7ABF',
          500: '#3D5AA5',
          600: '#2C4282',
          700: '#1F2F61',
          800: '#141E40',
          900: '#0B1020',
        },
        indigo: {
          deep: '#17143A',
          subtle: '#211D4E',
        },
        violet: {
          electric: '#8B6CFF',
          hover: '#9E85FF',
          soft: '#C7B8FF',
          glow: 'rgba(139, 108, 255, 0.35)',
        },
        cyan: {
          vivid: '#39D9F5',
          hover: '#5CE4FC',
          glow: 'rgba(57, 217, 245, 0.35)',
        },
        warm: {
          white: '#F5F7FF',
          card: '#151F38',
          tint: '#10182D',
          border: 'rgba(139, 108, 255, 0.22)',
        },
        slate: {
          muted: '#A8B4D0',
          subtle: '#818EA8',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'origami-sm': '0 4px 20px -2px rgba(11, 16, 32, 0.4), 0 2px 6px -1px rgba(139, 108, 255, 0.08)',
        'origami-md': '0 12px 32px -4px rgba(11, 16, 32, 0.6), 0 4px 12px -2px rgba(139, 108, 255, 0.16)',
        'origami-lg': '0 20px 48px -6px rgba(11, 16, 32, 0.8), 0 8px 24px -4px rgba(139, 108, 255, 0.25)',
        'glow-violet': '0 0 35px -5px rgba(139, 108, 255, 0.45)',
        'glow-cyan': '0 0 35px -5px rgba(57, 217, 245, 0.45)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'float-ambient': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -20px) scale(1.08)' },
          '100%': { transform: 'translate(-20px, 20px) scale(0.96)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee 40s linear infinite reverse',
        'pulse-subtle': 'pulse-subtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'float-ambient': 'float-ambient 24s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
