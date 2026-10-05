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
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        raised: 'rgb(var(--color-raised) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'primary-green': 'rgb(var(--color-accent) / <alpha-value>)',
        'secondary-green': 'rgb(var(--color-accent) / <alpha-value>)',
        'dark-green': 'rgb(var(--color-ink) / <alpha-value>)',
        'light-green': 'rgb(var(--color-raised) / <alpha-value>)',
        'text-dark': 'rgb(var(--color-ink) / <alpha-value>)',
        'text-light': 'rgb(var(--color-muted) / <alpha-value>)',
        'bg-white': 'rgb(var(--color-raised) / <alpha-value>)',
        'bg-light': 'rgb(var(--color-paper) / <alpha-value>)',
        /* Collapse the neon AI palette into oxide + warm ink. */
        emerald: {
          50: '#F8F4EF', 100: '#F3E8E3', 200: '#E6D0C8', 300: '#D4A89A',
          400: '#C17A68', 500: '#8C3A2F', 600: '#743028', 700: '#5C261F',
          800: '#3F1A15', 900: '#2A120F', 950: '#1A0B09',
        },
        blue: {
          50: '#F7F4EF', 100: '#EFEAE2', 200: '#E0D8CC', 300: '#C9BEB0',
          400: '#8F867C', 500: '#5C564E', 600: '#3F3A34', 700: '#2C2824',
          800: '#1F1C19', 900: '#141311', 950: '#0C0B0A',
        },
        indigo: {
          50: '#F7F4EF', 100: '#EFEAE2', 200: '#E0D8CC', 300: '#C9BEB0',
          400: '#8F867C', 500: '#5C564E', 600: '#3F3A34', 700: '#2C2824',
          800: '#1F1C19', 900: '#141311', 950: '#0C0B0A',
        },
        purple: {
          50: '#F8F4EF', 100: '#F3E8E3', 200: '#E4D3CC', 300: '#C9A89C',
          400: '#A56B5C', 500: '#6E4036', 600: '#5A332B', 700: '#3F241E',
          800: '#2C1915', 900: '#1C100E', 950: '#120A08',
        },
        violet: {
          50: '#F8F4EF', 100: '#F3E8E3', 200: '#E4D3CC', 300: '#C9A89C',
          400: '#A56B5C', 500: '#6E4036', 600: '#5A332B', 700: '#3F241E',
          800: '#2C1915', 900: '#1C100E', 950: '#120A08',
        },
        fuchsia: {
          50: '#F8F4EF', 100: '#F3E8E3', 200: '#E4D3CC', 300: '#C9A89C',
          400: '#A56B5C', 500: '#6E4036', 600: '#5A332B', 700: '#3F241E',
          800: '#2C1915', 900: '#1C100E', 950: '#120A08',
        },
        pink: {
          50: '#F8F4EF', 100: '#F3E8E3', 200: '#E4D3CC', 300: '#C9A89C',
          400: '#A56B5C', 500: '#6E4036', 600: '#5A332B', 700: '#3F241E',
          800: '#2C1915', 900: '#1C100E', 950: '#120A08',
        },
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'Source Sans 3', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        poppins: ['var(--font-source-sans)', 'Source Sans 3', 'sans-serif'],
        'jetbrains-mono': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        custom: '0 8px 24px rgba(27, 25, 22, 0.06)',
        'custom-hover': '0 12px 32px rgba(27, 25, 22, 0.08)',
        glow: '0 1px 2px rgba(27, 25, 22, 0.06)',
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