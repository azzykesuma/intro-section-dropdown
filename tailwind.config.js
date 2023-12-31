/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'almost-white' : 'hsl(0, 0%, 98%)',
        'medium-gray' : 'hsl(0, 0%, 41%)',
        'almost-black' : 'hsl(0, 0%, 8%)'
      },
      screens: {
        'sm' : '345px'
      }
    },
  },
  plugins: [],
}
