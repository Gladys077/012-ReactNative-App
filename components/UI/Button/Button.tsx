import { BorderRadius, Spacing } from '@/constants/Tokens';
import { ComponentType, ReactNode } from 'react';
import { Pressable, Text, useColorScheme, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  section?: 'common' | 'buyer' | 'seller';
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;
  width?: 'auto' | 'half' | 'full';
  align?: 'left' | 'center' | 'right'; 
  disabled?: boolean;
  onPress?: () => void;
  icon?: ComponentType<SvgProps>;
  iconPosition?: 'left' | 'right';
  styleAdd?: ViewStyle;
}

const Button = ({
  children,
  variant = 'primary',
  section = 'seller',
  height = 'lg',
  width = 'half',
  align = 'left',
  disabled = false,
  onPress,
  icon,
  iconPosition = 'left',
  styleAdd,
}: ButtonProps) => {
  const scheme = useColorScheme();
  const Icon = icon;

  // Colores por sección
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
      text: 'text-black font-medium dark:text-white',
      iconColor: scheme === 'dark' ? '#ffffff' : '#000000',
    },
  };

  const styles = variants[variant] ?? variants.primary;

  // Alturas
  const heightClasses = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14',
    xl: 'h-20',
    xxl: 'h-30',
  };

  // Anchos
  const widthClasses = {
    auto: 'w-auto',
    half: 'w-1/2',
    full: 'w-full',
  };

  // Base
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

  const contentClass = [
    'flex-1',
    'flex-row',
    iconPosition === 'right' ? 'flex-row-reverse' : '',
    'items-center',
    'justify-center',
    'gap-2',
  ].join(' ');

  // Wrapper alignment (para centrar el botón sin tocar su propio width)
  const alignStyle: ViewStyle =
    align === 'center'
      ? { alignItems: 'center' }
      : align === 'right'
      ? { alignItems: 'flex-end' }
      : { alignItems: 'flex-start' };

  return (
    <View style={[{ marginTop: Spacing.lg }, alignStyle]}>
      <Pressable onPress={onPress} disabled={disabled}>
        {({ pressed }) => (
          <View
            className={`${baseClass} ${styles.container}`}
            style={[
          {
            borderRadius: BorderRadius.pillBtn,
            transform: [{ scale: pressed ? 0.95 : 1 }],
            opacity: pressed ? 0.9 : 1,
          },
          styleAdd, // permite personalizar el estilo desde fuera
        ]}
          >
            <View className={contentClass}>
              {Icon && (
                <Icon
                  height={20}
                  fill={styles.iconColor}
                  stroke={styles.iconColor}
                />
              )}
              <Text className={styles.text}>{children}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
