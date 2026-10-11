import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display: Cormorant Garamond — ultra high-fashion editorial
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        // Body: Outfit — clean geometric sans
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        // Mono accents: DM Mono
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        ink: '#0a0a0a',
        paper: '#fafafa',
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        gold: '#c9a96e',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
        '128': '32rem',
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '9xl': ['8rem', { lineHeight: '0.95', letterSpacing: '-0.05em' }],
        '10xl': ['10rem', { lineHeight: '0.9', letterSpacing: '-0.06em' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.03em',
        widest: '0.25em',
        wider: '0.15em',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'circ-out': 'cubic-bezier(0, 0.55, 0.45, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
