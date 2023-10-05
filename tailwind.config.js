/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
  prefix: "",
};
