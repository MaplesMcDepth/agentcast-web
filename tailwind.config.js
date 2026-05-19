/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        moss: '#4CAF50',
        maples: '#FF9800',
        fern: '#2196F3',
        dark: '#1a1a2e',
        darker: '#16213e',
      },
    },
  },
  plugins: [],
}
