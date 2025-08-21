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

        // Btn Google
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
        background: "#f3f4f6",
        "background-dark": "#1f2937",

        border: "#E5E7EB",
        "border-dark": "#374151",

        "header-bg": "#ffffff",
        "header-bg-dark": "#292b2f",

        "card-bg": "#ffffff",
        "card-bg-dark": "#374151",

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
1) Con Tailwind directo
<View className="bg-background dark:bg-background-dark border border-border dark:border-border-dark">
  <Text className="text-text-default dark:text-text-default-dark">Hola</Text>
</View>

2) Con helper dinámico (ideal para usar con distintos roles)
<Text style={{ color: getColorByRole(user.role, theme) }}>Texto dinámico</Text>

3) Con getTailwindClass
<Text className={getTailwindClass(user.role, 'text', isDark)}>Texto dinámico</Text>

*/
