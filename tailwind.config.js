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
        // White text color for all text elements
        white: '#ffffff',
        // Primary wellness colors - enhanced for better contrast
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d', // Darker for better contrast
          800: '#166534', // Much darker for text
          900: '#14532d', // Very dark for high contrast
          950: '#052e16',
        },
        // Accent colors for highlights - improved contrast
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04', // Darker for better readability
          700: '#a16207', // Much darker for text
          800: '#854d0e', // Very dark for high contrast
          900: '#713f12',
          950: '#422006',
        },
        // Secondary colors for depth - enhanced contrast
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569', // Darker for better contrast
          700: '#334155', // Much darker for text
          800: '#1e293b', // Very dark for high contrast
          900: '#0f172a',
          950: '#020617',
        },
        // Warm ivory tones - improved for light mode
        ivory: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#faf4e6',
          300: '#f5ead1',
          400: '#eed9b3',
          500: '#e4c28a',
          600: '#d4a574', // Darker for better contrast
          700: '#b8845a', // Much darker for text
          800: '#9a6b47', // Very dark for high contrast
          900: '#7d5539',
          950: '#422b1c',
        },
        // Sage green for natural feel - enhanced contrast
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7a8f7a',
          500: '#5c735c',
          600: '#485a48', // Darker for better contrast
          700: '#3c4a3c', // Much darker for text
          800: '#333d33', // Very dark for high contrast
          900: '#2c342c',
          950: '#161b16',
        },
        // Text colors - all set to white for dark mode only
        text: {
          'DEFAULT': '#ffffff',
          'white': '#ffffff',
          'primary': '#ffffff',
          'secondary': '#ffffff',
          'accent': '#ffffff',
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
        'gradient-saffron': 'linear-gradient(to right, #226644, #1e5a3a)',
        'gradient-wellness': 'linear-gradient(to right, #226644, #14b8a6)', // Dark green to teal
        'gradient-teal': 'linear-gradient(to right, #14b8a6, #0d9488)',
        'gradient-clay': 'linear-gradient(to right, #bfa094, #846358)',
        'gradient-warm': 'linear-gradient(135deg, #226644, #14b8a6, #bfa094)', // Multi-color Indian gradient
        'pattern-dots': 'radial-gradient(#226644 1px, transparent 1px)',
        'pattern-dots-dark': 'radial-gradient(rgba(34, 102, 68, 0.3) 1px, transparent 1px)',
        'pattern-mandala': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23226644\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        // Responsive background images
        'hero-tree': 'linear-gradient(to bottom right, rgba(255, 253, 245, 0.05), rgba(255, 253, 245, 0.03), rgba(245, 245, 220, 0.05)), url("/images/hero/tree.jpg")',
        'hero-tree-dark': 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.08), rgba(31, 41, 55, 0.05), rgba(17, 24, 39, 0.08)), url("/images/hero/tree.jpg")',
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '100%': '100%',
        // Responsive background sizes
        'mobile-contain': 'contain',
        'mobile-cover': 'cover',
        'desktop-cover': 'cover',
        'desktop-contain': 'contain',
      },
      backgroundPosition: {
        'bottom': 'bottom',
        'center': 'center',
        'left': 'left',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        'right': 'right',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
        'top': 'top',
        // Custom percentage positions
        'top-10': 'center 10%',
        'top-20': 'center 20%',
        'top-30': 'center 30%',
        'top-40': 'center 40%',
        'bottom-10': 'center 90%',
        'bottom-20': 'center 80%',
        'bottom-30': 'center 70%',
        // Mobile-specific positions
        'mobile-top': 'center top',
        'mobile-center': 'center center',
        'mobile-20': 'center 20%',
        'desktop-center': 'center center',
      },
      // Enhanced box shadow utilities with warm tones
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 15px rgba(34, 102, 68, 0.5)', // Dark green glow
        'glow-teal': '0 0 15px rgba(20, 184, 166, 0.5)',
        'glow-clay': '0 0 15px rgba(191, 160, 148, 0.5)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(34, 102, 68, 0.06)',
        'warm': '0 10px 25px -5px rgba(34, 102, 68, 0.1), 0 10px 10px -5px rgba(34, 102, 68, 0.04)',
      },
      // All animations removed for clean design
      animation: {},
      keyframes: {},
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