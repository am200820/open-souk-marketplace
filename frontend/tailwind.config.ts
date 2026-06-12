import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#f59e0b',
        danger: '#ef4444',
        success: '#10b981',
      },
      fontFamily: {
        'arabic': ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
