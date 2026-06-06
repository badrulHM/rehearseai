/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface:  '#ffffff',
        surface2: '#f2f1ee',
        bdr:      '#e8e6e1',
        text1:    '#1a1917',
        text2:    '#6b6860',
        text3:    '#9e9b94',
        bg:       '#f8f7f4',
        green:    '#2d9e6b',
        'green-l':'#e8f7f1',
        amber:    '#d97706',
        'amber-l':'#fef3c7',
        danger:   '#dc2626',
        'danger-l':'#fef2f2',
      },
      borderRadius: { card: '14px' },
      boxShadow:    { card: '0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.06)' },
    },
  },
  plugins: [],
}

