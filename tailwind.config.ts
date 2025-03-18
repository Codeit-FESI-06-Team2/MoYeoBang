import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [
          'var(--font-pretendard)',
          'sans-serif',
          'system-ui',
          'Apple SD Gothic Neo',
          'AppleGothic',
        ],
      },
      colors: {
        default: {
          primary: '#6659F4',
          secondary: '#E8E6FE',
          tertiary: '#252730',
          inverse: '#FFFFFF',
        },
        primary: {
          0: '#F6F5FE',
          5: '#E8E6FE',
          10: '#C9C4FC',
          20: '#A49DFB',
          30: '#887EFB',
          40: '#6659F4',
          50: '#4C41CD',
          60: '#3E35A6',
          70: '#302A80',
          80: '#282469',
        },
        secondary: {
          bg: '#17171C',
          0: '#F7F7FA',
          5: '#F7F7FA',
          10: '#F0F0F5',
          20: '#E8E8EE',
          30: '#E1E1E8',
          40: '#CDCED6',
          50: '#A9ABB8',
          60: '#858899',
          70: '#525463',
          80: '#3E404C',
          90: '#2B2D36',
          100: '#252730',
        },
        status: {
          hover: '#000000',
          focus: '#282469',
          danger: '#FF7171',
          disabled: '#A9ABB8',
          disabledAuth: '#282469',
        },
        text: {
          default: '#FFFFFF',
          secondary: '#E5E7EB',
          tertiary: '#CDCED6',
          disabled: '#A9ABB8',
        },
        border: {
          default: '#858899',
        },
        point: {
          label: '#1F2937',
          tag: '#252730',
          dropdown: '#252730',
        },
        badge: {
          default: '#887EFB80',
          secondary: '#F5F7FD',
        },
      },

      spacing: {
        '1/10': '10%',
        '1/5': '20%',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
      },
      borderRadius: {
        xs: '0.125rem', // 2px
        sm: '0.25rem', // 4px
        DEFAULT: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.5rem', // 24px
      },
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};

export default config;
