/** @type {import('tailwindcss').Config} */
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
        // Evitamos prefijos como "fill-" "stroke-" que NativeWind puede ignorar

        // Marca (solo nombres semánticos)
        "brand-buyer": "#2563eb", // blue-600
        "brand-seller": "#ea580c", // orange-600
        "brand-common": "#7c3aed", // violet-600

        // Superficies específicas de la app
        "surface-card": "#ffffff",
        "surface-muted": "#f3f4f6",

        // Contenido específico
        "content-primary": "#111827",
        "content-secondary": "#6b7280",

        // Sistema específico (no cubierto por Tailwind default)
        "google-bg": "#ffffff",
        "google-bg-dark": "#292b2f",
        "google-text": "#1f1f1f",
        "google-text-dark": "#e1e1e1",
        "google-border": "#dadce0",
        "google-border-dark": "#555",
      },
    },
  },
  plugins: [],
};

/*
ESTRATEGIA PRO:

1. ✅ USAR: brand-seller, brand-buyer (nombres semánticos)
2. ❌ EVITAR: fill-brand-seller, stroke-brand-buyer (prefijos que NativeWind puede ignorar)
3. ✅ APLICAR: Usar helpers de JS para generar "text-brand-seller" dinámicamente
4. ✅ FALLBACK: Usar colores directos via style cuando Tailwind falle

EJEMPLO DE USO:
- className={`text-brand-seller`} ✅ Funciona
- className={getTailwindClass('seller', 'text')} ✅ Dinámico y funciona  
- style={{ color: getDirectColor('seller') }} ✅ Garantizado que funciona
*/
