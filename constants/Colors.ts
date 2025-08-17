export const Colors = {
  light: {
    // Textos
    textDefault: 'gray-700',
    textMuted: 'gray-500',
    textError: 'red-500',
    textOnColor: '#ffffff',
    textSecondary: '#ffd700', // amarillo ejemplo

    // Botones secundarios
    textSecondaryBg: '#dadbdc',
    textSecondaryBorder: '#a7a7a7',

    // Primarios por rol
    primaryCommon: 'violet-600',
    primaryBuyer: 'blue-600',
    primarySeller: 'orange-600',

    // Superficies
    headerBg: '#ffffff',
    cardBg: '#ffffff',
    backgroundMuted: 'gray-100',
  },
  dark: {
    // Textos
    textDefault: '#ECEDEE',
    textMuted: 'gray-400',
    textError: 'red-400',
    textOnColor: '#ffffff',
    textSecondary: '#ffd700', // mismo amarillo si quieres mantener

    // Botones secundarios
    textSecondaryBg: '#636363',
    textSecondaryBorder: '#a7a7a7',

    // Primarios por rol
    primaryCommon: 'violet-500',
    primaryBuyer: 'blue-500',
    primarySeller: 'orange-500',

    // Superficies
    headerBg: '#292b2f',
    cardBg: 'gray-700',
    backgroundMuted: 'gray-800',
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
      return themeColors.primaryBuyer;
    case 'seller':
      return themeColors.primarySeller;
    default:
      return themeColors.primaryCommon;
  }
};

// Texto de botón secundario
export const getSecondaryTextColor = (theme: 'light' | 'dark' = 'light'): string => {
  return Colors[theme].textSecondary;
};

export const getSecondaryBgColor = (theme: 'light' | 'dark' = 'light'): string => {
  return Colors[theme].textSecondaryBg;
};

// ✅ Helper para obtener colores Tailwind equivalentes
export const getTailwindColorByRole = (role: 'buyer' | 'seller' | 'common'): string => {
  switch (role) {
    case 'buyer':
      return 'brand-buyer';
    case 'seller': 
      return 'brand-seller';
    default:
      return 'brand-common';
  }
};

// ✅ Helper para clases Tailwind dinámicas
export const getTailwindClass = (
  role: 'buyer' | 'seller' | 'common',
  property: 'text' | 'bg' | 'border' = 'text'
): string => {
  return `${property}-${getTailwindColorByRole(role)}`;
};

/* 
MODO DE USO MEJORADO:

✅ Para casos donde Tailwind funciona:
<Text className={getTailwindClass('seller', 'text')}>Vendedor</Text>
Resultado: className="text-orange-600"

✅ Para casos donde necesitamoss color directo (SVG, etc):
<Icon color={getColorByRole('seller', 'light')} />
Resultado: color="#ea580c"

✅ Combinado (lo mejor de ambos):
<Text 
  className="text-base font-medium" 
  style={{ color: getColorByRole('buyer') }}
>
  Comprador
</Text>
*/