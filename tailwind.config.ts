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
        'gradient-text': 'gradient-text 8s ease infinite',
        floating: 'floating 4s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'aurora': 'aurora 20s linear infinite',
        'blob': 'blob 10s ease-in-out infinite',
        'grid-move': 'grid-move 15s linear infinite',
        'noise': 'noise 0.2s linear infinite',
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
        'gradient-text': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aurora: {
          '0%': { transform: 'translateX(-100%) translateY(0%)' },
          '25%': { transform: 'translateX(0%) translateY(-50%)' },
          '50%': { transform: 'translateX(100%) translateY(0%)' },
          '75%': { transform: 'translateX(0%) translateY(50%)' },
          '100%': { transform: 'translateX(-100%) translateY(0%)' },
        },
        blob: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px) scale(1)' },
          '33%': { transform: 'translateX(30px) translateY(-50px) scale(1.1)' },
          '66%': { transform: 'translateX(-20px) translateY(20px) scale(0.9)' },
        },
        'grid-move': {
          '0%': { transform: 'translateX(0px) translateY(0px)' },
          '50%': { transform: 'translateX(10px) translateY(-10px)' },
          '100%': { transform: 'translateX(0px) translateY(0px)' },
        },
        noise: {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-1px, -1px)' },
          '20%': { transform: 'translate(1px, -1px)' },
          '30%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, 1px)' },
          '50%': { transform: 'translate(-1px, -1px)' },
          '60%': { transform: 'translate(1px, -1px)' },
          '70%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
          '90%': { transform: 'translate(-1px, -1px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;