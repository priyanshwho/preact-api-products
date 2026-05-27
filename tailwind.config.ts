import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 32px 90px -55px rgba(183, 152, 145, 0.45)',
      },
    },
  },
} satisfies Config
