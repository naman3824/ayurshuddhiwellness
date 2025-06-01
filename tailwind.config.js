/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Balanced primary color palette (teal/green) - works well in both light/dark
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Warm accent color (amber) - provides nice contrast in both themes
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Secondary accent (purple) for additional highlights
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      // Enhanced gradient utilities with new colors
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-wellness': 'linear-gradient(to right, #14b8a6, #0d9488)',
        'gradient-accent': 'linear-gradient(to right, #f59e0b, #d97706)',
        'gradient-secondary': 'linear-gradient(to right, #a855f7, #7e22ce)',
        'pattern-dots': 'radial-gradient(#14b8a6 1px, transparent 1px)',
        'pattern-dots-dark': 'radial-gradient(rgba(94, 234, 212, 0.3) 1px, transparent 1px)',
      },
      // Enhanced box shadow utilities
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 15px rgba(20, 184, 166, 0.5)',
        'glow-accent': '0 0 15px rgba(245, 158, 11, 0.5)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(20, 184, 166, 0.06)',
      },
      // Enhanced animation utilities
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'fade-in-down': 'fadeInDown 0.7s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'fade-in-left': 'fadeInLeft 0.7s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'fade-in-right': 'fadeInRight 0.7s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.27, 0.01, 0.38, 1.06)',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      // Add border radius utilities
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.27, 0.01, 0.38, 1.06)',
      },
    },
  },
  plugins: [],
}

module.exports = config 