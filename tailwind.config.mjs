/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#050505',
          card: '#0a0a0c',
          surface: '#111114',
          light: '#f6f6f4',
        },
        brand: {
          amber: '#ff9d24',
          yellow: '#feed7a',
          orange: '#ff8400',
          purple: '#df91f7',
          magenta: '#e056fd',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Syne Variable"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
