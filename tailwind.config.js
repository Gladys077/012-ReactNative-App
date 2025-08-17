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
        "brand-buyer": "#3b49f8", // blue-600 #2563eb
        "brand-seller": "#ea580c", // orange-600 #ea580c
        "brand-common": "#5a32ea", // violet-600 #7c3aed

        "brand-buyer-dark": "#5C6CFF", // blue-500
        "brand-seller-dark": "#FF7A3C", // orange-500
        "brand-common-dark": "#7C5EFF", // violet-500

        // Sistema específico (no cubierto por Tailwind default)
        "google-bg": "#ffffff",
        "google-text": "#374151",
        "google-border": "#dddddd",

        "google-bg-dark": "#202124",
        "google-text-dark": "#505050",
        "google-border-dark": "#444444",

        // Botones secundarios
        "btn-secondary-bg": "#dadbdc",
        "btn-secondary-border": "#cccccc",

        "btn-secondary-bg-dark": "#3A3B3D",
        "btn-secondary-border-dark": "#666666",
        "btn-secondary-text-dark": "#FF7A3C",

        // Superficies
        "surface-card": "#ffffff",
        "surface-muted": "#f3f4f6",

        // Textos
        "text-default": "gray-700",
        "text-muted": "gray-500",
        "text-error": "red-500",
        "text-on-color": "#ffffff",
        "text-secondary": "yellow-500",
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
