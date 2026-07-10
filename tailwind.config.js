/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        paper: '#F7F3EE',
        ink: '#3D3833',
        rose: '#D78A8A',
        moss: '#8CA982',
        amber: '#E8C89A',
        dusk: '#6B5B5B',
        mist: '#E8E2D9',
      },
      fontFamily: {
        display: ['"ZCOOL XiaoWei"', '"LXGW WenKai"', 'serif'],
        body: ['"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        pixel: '4px 4px 0px 0px rgba(61,56,51,0.12)',
        'pixel-sm': '2px 2px 0px 0px rgba(61,56,51,0.08)',
        'pixel-hover': '6px 6px 0px 0px rgba(61,56,51,0.16)',
      },
    },
  },
  plugins: [],
};
