/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.liquid', './**/*.js', './**/*.css'],
  safelist: [
    'hidden',
    'lg:block',
    'lg:hidden',
    'w-3',
    'h-3',
    'gap-2',
    'rounded-full',
    'border',
    'border-black',
    'border-gray-300',
    'flex',
    'justify-between',
    'items-center',
    'font-black',
    'capitalize',
    'block',
    'whitespace-nowrap',
  ],
  theme: {
    extend: {
      screens: {
        wide: '1441px',
      },
      spacing: {
        30: '120px',
        86: '344px',
        46: '184px',
        55: '220px',
        152: '152px',
      },
      width: {
        '[494]': '494px',
        '[720]': '720px',
        '[230]': '230px',
        '[148]': '148px',
      },
      height: {
        '[864]': '864px',
        '[437]': '437px',
        '[293]': '293px',
        '[310]': '310px',
        '[200]': '200px',
      },
      fontSize: {
        hero: '31.25px',
        link: '12.8px',
      },
      lineHeight: {
        hero: '130%',
        body: '160%',
      },
      fontFamily: {
        avant: ['"Poppins"', 'sans-serif'],
        avenir: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
