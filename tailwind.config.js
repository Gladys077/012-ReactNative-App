/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class", // el modo oscuro se va a activar usando una clase dark en algún elemento padre (ej. al final del cód.)
  theme: {
    extend: {
      fontFamily: {
        "Roboto-Regular": ["Roboto-Regular", "sans-serif"],
        "Roboto-Bold": ["Roboto-Bold", "sans-serif"],
        "Roboto-Medium": ["Roboto-Medium", "sans-serif"],
        "Roboto-Black": ["Roboto-Black", "sans-serif"],
      },
      spacing: {
        xs: 2,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        xxl: 24,
        9: 36,
      },
      borderRadius: {
        default: 8,
        sm: 4,
        xl: 20,
        full: 999,
      },
      fontSize: {
        sm: 12,
        base: 14,
        btn: 16,
        lg: 18,
        xl: 24,
      },
      colors: {
        // Colores principales
        "primary-common": "#5a32ea",
        "primary-buyer": "#3b49f8",
        "primary-seller": "#ea580c",

        // Botones secundarios
        "btn-secondary-background": "#dadbdc",
        "btn-secondary-text": "#374151",
        "btn-secondary-text-dark": "#ECEDEE",
        "btn-secondary-border": "#a7a7a7",

        "fill-default": "#374151",
        "fill-btn-secondary-text": "#374151",
        "fill-text-muted": "#6B7280", // Gris medio
        "fill-primary-seller": "#EA580C", // Naranja vendedor

        // Btns Google
        "btn-google-background": "#ffffff",
        "btn-google-background-dark": "#292b2f",
        "btn-google-text": "#1f1f1f",
        "btn-google-text-dark": "#e1e1e1",
        "btn-google-border": "#dadce0",
        "btn-google-border-dark": "#555",

        // Textos
        "text-default": "#374151", // texto principal
        "text-muted": "#6B7280", // Gris medio
        "text-error": "#EF4444", // Rojo para errores o * obligatorios
        "text-default-dark": "#ECEDEE",
        "text-on-color": "#ffffff",
        "text-primary-seller": "#EA580C", // Naranja vendedor

        // Headers
        "header-bg-light": "#ffffff",
        "header-bg-dark": "#292b2f",

        // Strokes (bordes)
        "stroke-muted": "#6B7280", // Gris medio
        "stroke-default": "#374151", // color texto principal
        "stroke-primary-buyer": "#3B49F8", // Azul comprador
        "stroke-primary-seller": "#EA580C", // Naranja vendedor
        "stroke-primary-common": "#5a32ea", // violeta common (como primary-common)

        "stroke-btn-secondary-text": "#374151",
        "stroke-text-default": "#374151",
        "stroke-text-muted": "#6B7280", // Gris medio

        // Otros tokens
        "border-default": "#ccc",
        "bg-muted": "#e5e7e8",
        "bg-error": "#EF4444", // fondo badge - fondo error
      },
    },
  },
  plugins: [],
};

/*Ejemplo del modo dark:
<View className="dark:bg-black bg-white">
  <Text className="dark:text-white text-black">Hola</Text>
</View>
*/
