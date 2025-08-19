export const Colors = {
  light: {
    // Textos
    textDefault: '#374151',    // gray-700
    textMuted: '#6b7280',      // gray-500  
    textError: '#ef4444',      // red-500
    textOnColor: '#ffffff',
    textSecondary: '#ffd700',  // amarillo ejemplo

    // Botones secundarios
    textSecondaryBg: '#dadbdc',
    textSecondaryBorder: '#a7a7a7',

    // Primarios por rol
    brandCommon: '#5a32ea',  // violet-600
    brandBuyer: '#2563eb',   // blue-600
    brandSeller: '#ea580c',  // orange-600

    // Superficies
    headerBg: '#ffffff',
    cardBg: '#ffffff',
    backgroundMuted: '#f3f4f6', // gray-100
  },
  dark: {
    // Textos
    textDefault: '#ECEDEE',
    textMuted: '#9ca3af',       // gray-400
    textError: '#f87171',       // red-400
    textOnColor: '#ffffff',
    textSecondary: '#ffd700',   // mismo amarillo si quieres mantener

    // Botones secundarios
    textSecondaryBg: '#636363',
    textSecondaryBorder: '#a7a7a7',

    // Primarios por rol
    brandCommon: '#8b5cf6',   // violet-500
    brandBuyer: '#3b82f6',    // blue-500
    brandSeller: '#c43e00',   // orange-500

    // Superficies
    headerBg: '#292b2f',
    cardBg: '#374151',          // gray-700
    backgroundMuted: '#1f2937', // gray-800
  },
};

// Helpers
export const getColorByRole = (
  role: 'buyer' | 'seller' | 'common',
  theme: 'light' | 'dark' = 'light'
): string => {
  const themeColors = Colors[theme];
  switch (role) {
    case 'buyer':
      return themeColors.brandBuyer;
    case 'seller':
      return themeColors.brandSeller;
    default:
      return themeColors.brandCommon;
  }
};

// Texto de botón secundario
export const getSecondaryTextColor = (theme: 'light' | 'dark' = 'light'): string => {
  return Colors[theme].textSecondary;
};

export const getSecondaryBgColor = (theme: 'light' | 'dark' = 'light'): string => {
  return Colors[theme].textSecondaryBg;
};

// Helper para obtener colores Tailwind equivalentes
export const getTailwindColorByRole = (role: 'buyer' | 'seller' | 'common', isDark: boolean = false): string => {
  const suffix = isDark ? '-dark' : '';
  switch (role) {
    case 'buyer':
      return `brand-buyer${suffix}`;
    case 'seller': 
      return `brand-seller${suffix}`;
    default:
      return `brand-common${suffix}`;
  }
};

//Helper para clases Tailwind dinámicas
export const getTailwindClass = (
  role: 'buyer' | 'seller' | 'common',
  property: 'text' | 'bg' | 'border' = 'text',
  isDark: boolean = false
): string => {
  return `${property}-${getTailwindColorByRole(role, isDark)}`;
};

/* 
MODO DE USO MEJORADO:

--> Para casos donde Tailwind funciona:
<Text className={getTailwindClass('seller', 'text', isDark)}>Vendedor</Text>
Resultado modo claro: className="text-brand-seller"
Resultado modo oscuro: className="text-brand-seller-dark"

-->  Para casos donde necesitamos color directo (SVG, etc):
<Icon color={getColorByRole('seller', 'light')} />
Resultado: color="#ea580c"

--> Combinado (lo mejor de ambos):
<Text 
  className="text-base font-medium" 
  style={{ color: getColorByRole('buyer', isDark ? 'dark' : 'light') }}
>
  Comprador
</Text>
*/