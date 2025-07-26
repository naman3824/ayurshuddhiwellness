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
        // Warm saffron/orange primary palette - Indian-inspired
        primary: {
          50: '#fffbf0',
          100: '#fef4d8',
          200: '#fde8b1',
          300: '#fbd97a',
          400: '#f8c441',
          500: '#f6b420', // Main saffron
          600: '#ea9a0a',
          700: '#c27d0b',
          800: '#9c6210',
          900: '#7e5011',
          950: '#472a05',
        },
        // Calming teal - for accent and balance
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Main teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Muted clay/terracotta - for secondary accents
        secondary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
          950: '#362318',
        },
        // Soft ivory variations - updated for reduced brightness
        ivory: {
          50: '#faf8f4',
          100: '#f5f3ef', // Soft ivory #F5F3EF
          200: '#f0edea',
          300: '#ebe8e4',
          400: '#e6e3df',
          500: '#f5f3ef', // Main soft ivory
          600: '#e0ddd9',
          700: '#d0cdc9',
          800: '#c0bdb9',
          900: '#b0ada9',
        },
        // Light sage variations - new addition
        sage: {
          50: '#f0f9f0',
          100: '#e1f2e1',
          200: '#c3e6c3',
          300: '#a4d9a4',
                     400: '#8ede84', // Light sage #8EDE84
          500: '#8ede84', // Corrected light sage
          600: '#7bc97b',
          700: '#68b468',
          800: '#559f55',
          900: '#428a42',
        },
      },
      fontFamily: {
        sans: [
          'Noto Sans', 
          'Poppins',
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        display: [
          'Poppins',
          'Noto Sans',
          'system-ui', 
          '-apple-system', 
          'sans-serif'
        ],
      },
      spacing: {
        '128': '32rem',
      },
      // Enhanced gradient utilities with new Indian colors
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-saffron': 'linear-gradient(to right, #f6b420, #ea9a0a)',
        'gradient-wellness': 'linear-gradient(to right, #f6b420, #14b8a6)', // Saffron to teal
        'gradient-teal': 'linear-gradient(to right, #14b8a6, #0d9488)',
        'gradient-clay': 'linear-gradient(to right, #bfa094, #846358)',
        'gradient-warm': 'linear-gradient(135deg, #f6b420, #14b8a6, #bfa094)', // Multi-color Indian gradient
        'pattern-dots': 'radial-gradient(#f6b420 1px, transparent 1px)',
        'pattern-dots-dark': 'radial-gradient(rgba(246, 180, 32, 0.3) 1px, transparent 1px)',
        'pattern-mandala': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f6b420\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      // Enhanced box shadow utilities with warm tones
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 15px rgba(246, 180, 32, 0.5)', // Saffron glow
        'glow-teal': '0 0 15px rgba(20, 184, 166, 0.5)',
        'glow-clay': '0 0 15px rgba(191, 160, 148, 0.5)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(246, 180, 32, 0.06)',
        'warm': '0 10px 25px -5px rgba(246, 180, 32, 0.1), 0 10px 10px -5px rgba(246, 180, 32, 0.04)',
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
        'mandala-rotate': 'mandalaRotate 20s linear infinite',
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
        mandalaRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
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