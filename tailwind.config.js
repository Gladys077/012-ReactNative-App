/** @type {import('tailwindcss').Config} */
const { Spacing, BorderRadius, FontSizes } = require("./constants/Tokens");

module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "Roboto-Regular": ["Roboto-Regular", "sans-serif"],
        "Roboto-Bold": ["Roboto-Bold", "sans-serif"],
        "Roboto-Medium": ["Roboto-Medium", "sans-serif"],
        "Roboto-Black": ["Roboto-Black", "sans-serif"],
      },
      spacing: Spacing,
      borderRadius: BorderRadius,
      fontSize: FontSizes,
      colors: {
        // Marca (solo nombres semánticos)
        "brand-common": "#5a32ea", // violet
        "brand-buyer": "#2563eb", // blue
        "brand-seller": "#ea580c", // orange

        "brand-common-dark": "#8b5cf6", // violet
        "brand-buyer-dark": "#3b82f6", // blue
        "brand-seller-dark": "#c43e00", // orange

        // Sistema específico (no cubierto por Tailwind default)
        "google-bg": "#ffffff",
        "google-text": "#374151",
        "google-border": "#dddddd",

        "google-bg-dark": "#202124",
        "google-text-dark": "#505050",
        "google-border-dark": "#444444",

        // Botones secundarios
        "btn-secondary-bg": "#dadbdc",
        "btn-secondary-border": "#a7a7a7",

        "btn-secondary-bg-dark": "#636363",
        "btn-secondary-border-dark": "#a7a7a7",

        // Superficies
        "header-bg": "#ffffff",
        "card-bg": "#ffffff",
        "background-muted": "#f3f4f6", // gray-100

        // Textos
        "text-default": "#374151", // gray-700
        "text-muted": "#6b7280", // gray-500
        "text-error": "#ef4444", // red-500
        "text-on-color": "#ffffff",
        "text-secondary": "#ffd700", // amarillo ejemplo

        "text-default-dark": "#ECEDEE",
        "text-muted-dark": "#9ca3af", // gray-400
        "text-error-dark": "#f87171", // red-400
        "text-on-color-dark": "#ffffff",
        "text-secondary-dark": "#ffd700",
      },
    },
  },
  plugins: [],
};

/* EJEMPLOS DE USO:
1- className={`text-brand-seller`}                --> Funciona
2- className={getTailwindClass('seller', 'text')} --> Dinámico y funciona  
3- style={{ color: getColorByRole('buyer') }}     --> Garantizado que funciona

*En componentes:
<View className="bg-btn-secondary-bg border border-btn-secondary-border">
  <Text className="text-btn-secondary-text">Secundario</Text>
</View>

*/
