/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#00172a',
          800: '#0b2440',
          900: '#010f2e',
        },
        brand: {
          DEFAULT: '#0052cc',
          hover: '#0047b3',
          deep: '#003d9b',
          100: '#e6eefa',
          50: '#f2f6fc',
        },
        ghost: '#f8fafc',
        slateSoft: '#64748b',
        slateBody: '#526079',
        line: {
          DEFAULT: '#e2e8f0',
          soft: '#eaeff5',
        },
        heroLow: '#b8cdf5',
        skyline: '#7ea8f5',
        mist: '#9dbdf7',
      },
      fontFamily: {
        sans: ['Gilroy', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        brand: '8px',
        card: '16px',
        panel: '24px',
      },
      boxShadow: {
        lvl1: '0 1px 2px rgb(0 23 42 / 0.04), 0 4px 6px -1px rgb(0 23 42 / 0.07)',
        lvl2: '0 6px 16px -4px rgb(0 61 155 / 0.14), 0 24px 48px -16px rgb(0 23 42 / 0.18)',
      },
      maxWidth: {
        shell: '1200px',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
