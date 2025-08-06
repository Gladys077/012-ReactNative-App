/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "Roboto-Regular": ["Roboto-Regular", "sans-serif"],
        "Roboto-Bold": ["Roboto-Bold", "sans-serif"],
        "Roboto-Medium": ["Roboto-Medium", "sans-serif"],
        "Roboto-Black": ["Roboto-Black", "sans-serif"],
      },
      colors: {
        // Páginas compartidas
        "primary-common": "#5a32ea",

        // Por rol
        "primary-buyer": "#3b49f8",
        "primary-seller": "#ea580c",

        // Botones secundarios
        "btn-secondary-background": "#dadbdc",
        "btn-secondary-text": "#374151",
        "btn-secondary-border": "#a7a7a7",

        // Textos
        "text-base": "#374151",
        "text-on-color": "#ffffff",

        // Fondo de headers
        "header-bg-light": "#ffffff",
        "header-bg-dark": "#292b2f",
      },
    },
  },
  plugins: [],
};
