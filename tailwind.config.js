/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-from-tl': 'radial-gradient(at 0% 0%, var(--tw-gradient-stops))',
        'gradient-radial-from-bl': 'radial-gradient(at 0% 100%, var(--tw-gradient-stops))',
        'gradient-radial-from-tr': 'radial-gradient(at 100% 0%, var(--tw-gradient-stops))',
        'gradient-radial-from-br': 'radial-gradient(at 100% 100%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
