import { ComponentType, ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { BorderRadius } from '../../constants/Tokens';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' ;
  section?: 'common' | 'buyer' | 'seller';
  height?: 'sm' | 'md' | 'lg' | number;
  width?: 'auto' | 'half' | 'full';
  disabled?: boolean;
  onPress?: () => void;
  icon?: ComponentType<SvgProps>;
  iconPosition?: 'left' | 'right';
}

const Button = ({
  children,
  variant = 'primary',
  section = 'seller',
  height = 'lg',
  width = 'half',
  disabled = false,
  onPress,
  icon,
  iconPosition = 'left',
}: ButtonProps) => {
  const Icon = icon;

// Colores de fondo por sección (solo btns primary)
const sectionBg = {
  common: 'bg-brand-common',
  buyer: 'bg-brand-buyer',
  seller: 'bg-brand-seller',
};

const variants = {
  primary: {
    container: `${sectionBg[section]} shadow-md`,
    text: 'text-white font-medium',
    iconColor: '#ffffff', 

  },
  secondary: {
    container:
      'bg-btn-secondary-bg border border-btn-secondary-border shadow-md ' +
      'dark:bg-btn-secondary-bg-dark dark:border-btn-secondary-border-dark',
    text:
      'text-btn-secondary-text font-medium ' +
      'dark:text-text-secondary',
    iconColor: 'currentColor',      
  },
};

const styles = variants[variant] ?? variants.primary;

//Alturas
  const heightClasses = {
    sm: 'h-10', // 40px
    md: 'h-12', // 48px
    lg: 'h-14', // 56px
  };
// Anchos
  const widthClasses = {
    auto: 'w-auto',
    half: 'w-1/2',
    full: 'w-full',
  };

  // Base: solo estilos comunes (aplican siempre)
  const baseClass = [
    'px-4',
    'shadow-md',
    heightClasses[height as 'sm' | 'md' | 'lg'] ?? 
      (typeof height === 'number' ? `h-[${height}px]` : ''),
    widthClasses[width],
    disabled && 'opacity-50',
  ]
    .filter(Boolean)
    .join(' ');

  // Contenedor del botón
  const contentClass = [
    'flex-1',
    'flex-row',
    iconPosition === 'right' ? 'flex-row-reverse' : '',
    'items-center',
    'justify-center',
    'gap-2',
  ].join(' ');

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => (
        <View
          className={`${baseClass} ${styles.container}`}
          style={{
            borderRadius: BorderRadius.pillBtn,
            transform: [{ scale: pressed ? 0.95 : 1 }],
            opacity: pressed ? 0.9 : 1,
          }}
        >
          <View className={contentClass}>
            {Icon && (
              <Icon height={20} fill={styles.iconColor} stroke={styles.iconColor} />
            )}
            <Text className={styles.text}>{children}</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};
export default Button;