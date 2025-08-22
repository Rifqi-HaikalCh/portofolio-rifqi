import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        'poppins': ['Poppins', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'custom': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'custom-hover': '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #10B981, #059669)',
      },
      animation: {
        'floating': 'floating 3s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.6s ease forwards',
        'spin': 'spin 1s linear infinite',
        'ripple': 'ripple 0.6s linear',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ripple: {
          'to': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;