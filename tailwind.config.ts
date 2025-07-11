// tailwind.config.ts

// import type { Config } from 'tailwindcss'

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "#353535",
        primary: "#f0d6bb",
        secondary: "#BFA58A",
        accent: "#FF9F43",
        surface: "#424242",
      },
    },
  },
  plugins: [],
}

export default config
