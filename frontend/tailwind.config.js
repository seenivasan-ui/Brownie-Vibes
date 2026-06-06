/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F0', 'cream-dark': '#F5ECD8',
        'brown-900': '#1A0A00','brown-800': '#2C1507','brown-700': '#4A2010','brown-600': '#6B3520',
        caramel: '#C17F24', gold: '#D4A853', 'gold-light': '#F0CC7A',
        pink: '#E8637A', 'pink-light': '#FDE8EC',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond','serif'],
        outfit: ['Outfit','sans-serif'],
        dancing: ['Dancing Script','cursive'],
      },
    },
  },
  plugins: [],
}
