export const Sizes = {
  headerHeight: 56, // Cambiado a number para RN
  icon: {
    sm: 16,   // 16px
    md: 24,   // 24px (default)
    lg: 32,   // 32px  
    xl: 48,   // 48px
  },
  button: {
    height: 44,
    minWidth: 100,
  }
};

export const Spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  9: 36,  // Para casos específicos w-9 h-9
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  full: 999,
  pillBtn: 24, // para btns estilo Material 3
  inputAuth: 16, // inputs en login/registro/perfil
};

export const FontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  btn: 14,   // Específico para botones
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 8,
  },
};

// ✅ HELPERS para Tailwind
export const getSpacingClass = (size: keyof typeof Spacing): string => {
  return `${Spacing[size]}`;
};

export const getIconSizeClass = (size: 'sm' | 'md' | 'lg' | 'xl'): string => {
  const sizeMap = {
    sm: 'w-4 h-4',   // 16px
    md: 'w-6 h-6',   // 24px  
    lg: 'w-8 h-8',   // 32px
    xl: 'w-12 h-12', // 48px
  };
  return sizeMap[size];
};

// ✅ HELPERS para posicionar Badges
export const getIconPixelSize = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': return 16;
    case 'md': return 24;
    case 'lg': return 32;
    default: return 24;
  }
};


/* 
MODO DE USO ACTUALIZADO:

✅ Directo (como siempre):
style={{ 
  padding: Spacing.md, 
  borderRadius: BorderRadius.default,
  fontSize: FontSizes.base 
}}

✅ Con Tailwind:
<View className={`p-${Spacing.md} ${getIconSizeClass('md')}`}>
  <Icon className={getIconSizeClass('lg')} />
</View>

✅ Híbrido (lo mejor):
<View 
  className="rounded-lg bg-white"
  style={{ 
    padding: Spacing.md,
    ...shadows.sm 
  }}
>
  Contenido
</View>
*/