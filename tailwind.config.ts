import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-green': '#10B981',
        'secondary-green': '#059669',
        'dark-green': '#047857',
        'light-green': '#D1FAE5',
        'text-dark': '#1F2937',
        'text-light': '#6B7280',
        'bg-white': '#FFFFFF',
        'bg-light': '#F9FAFB',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        'jetbrains-mono': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        custom: '0 10px 25px rgba(0, 0, 0, 0.1)',
        'custom-hover': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 15px rgba(16, 185, 129, 0.5), 0 0 5px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'gradient-bg': 'gradient-bg 15s ease infinite',
        floating: 'floating 4s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'background-pan': 'backgroundPan 15s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease forwards',
        spin: 'spin 1s linear infinite',
        'spin-slow': 'spin 10s linear infinite',
        ripple: 'ripple 0.6s linear',
        rotate: 'rotate 10s linear infinite',
      },
      keyframes: {
        'gradient-bg': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        textReveal: {
          '0%': { transform: 'translate(0, 100%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        backgroundPan: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ripple: {
          to: {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;