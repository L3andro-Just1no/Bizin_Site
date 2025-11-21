import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bizin/Neomarca color scheme from Figma
        primary: {
          DEFAULT: "#1c2544", // Dark blue from Figma
          50: "#f5f6f9",
          100: "#e9ebf1",
          200: "#d4d7e3",
          300: "#b4b9cf",
          400: "#8e96b5",
          500: "#71789d",
          600: "#5d6385",
          700: "#4d526c",
          800: "#42465b",
          900: "#1c2544",
        },
        secondary: {
          DEFAULT: "#87c76c", // Green from Figma
          50: "#f4faf1",
          100: "#e6f4e0",
          200: "#cee9c3",
          300: "#abd997",
          400: "#87c76c",
          600: "#6baa53",
          700: "#548741",
          800: "#456c36",
          900: "#3a5a2e",
        },
        accent: {
          blue: "#0066CC",
          lightGreen: "#f3f9f0",
          darkGray: "#5a5a5a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        roboto: ["var(--font-roboto)", "Roboto", "sans-serif"],
        manrope: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

