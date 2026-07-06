/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f3ff',
          100: '#e9e6ff',
          200: '#d5ceff',
          300: '#b4a8ff',
          400: '#8c76ff',
          500: '#633eff',
          600: '#5220fa',
          700: '#4410e5',
          800: '#380cbd',
          900: '#2f0b9c',
          950: '#1b046c',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.08)',
          dark: 'rgba(15, 23, 42, 0.6)',
          border: 'rgba(255, 255, 255, 0.12)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
