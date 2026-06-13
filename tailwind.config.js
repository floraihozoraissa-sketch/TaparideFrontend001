/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#10075C',
          50: '#F4F3FC',
          100: '#E7E5F7',
          200: '#C6C0EC',
          300: '#9A90DC',
          400: '#6B5FC9',
          500: '#3F2FA8',
          600: '#2A1A8C',
          700: '#1C0F75',
          800: '#150A63',
          900: '#10075C',
          950: '#0A0540',
        },
        brand: {
          DEFAULT: '#10075C',
          dark: '#0A0540',
          soft: '#2A1A8C',
        },
        flame: {
          DEFAULT: '#EA580C',
          50: '#FFF4ED',
          100: '#FFE6D5',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        mist: '#F5F4FF',
        haze: '#F2F1FB',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 40px -12px rgba(16, 7, 92, 0.15)',
        soft: '0 4px 24px -8px rgba(16, 7, 92, 0.12)',
        glow: '0 20px 60px -20px rgba(16, 7, 92, 0.45)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
