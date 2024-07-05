import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        color1: "#51AFF7",
        color2: "#94D9DA",
        color3: "#B5E1E0",
        color4: "#FBDEC2",
        color5: "#E3A55E",
        color6: "#012E4A",
        color7: "#036280",
        color8: "#378BA4",
        color9: "#81BECE",
        color10: "#E8EDE7",
        color11: "#e76f3d",
        color12: "#9bcfe0",
        color13: "#9bcfe0",
        color14: "#E9EDEC",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config