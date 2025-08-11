import { ComponentType, ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'google';
  section?: 'common' | 'buyer' | 'seller';
  height?: 'sm' | 'md' | 'lg' | number;
  width?: 'auto' | 'half' | 'full';
  disabled?: boolean;
  onPress?: () => void;
  icon?: ComponentType<SvgProps>;
  iconPosition?: 'left' | 'right';
}

export const Button = ({
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

  const variantClasses = {
    primary: 'text-text-on-color',
    secondary:
      'bg-btn-secondary-background text-btn-secondary-text border border-btn-secondary-border dark:bg-[#444] dark:text-btn-secondary-text-dark dark:border-[#666]',
    google:
      'bg-btn-google-background text-btn-google-text border border-btn-google-border shadow-md ' +
      'dark:bg-btn-google-background-dark dark:text-btn-google-text-dark dark:border-btn-google-border-dark',
  };

  const sectionClasses = {
    common: 'bg-primary-common',
    buyer: 'bg-primary-buyer',
    seller: 'bg-primary-seller',
  };

  const heightClasses = {
    sm: 'h-9', // 36px exacto
    md: 'h-10', // 40px
    lg: 'h-12', // 48px
  };

  const widthClasses = {
    auto: 'w-auto',
    half: 'w-1/2',
    full: 'w-full',
  };

  const baseClass = [
    'rounded', // borderRadius: 8px
    'font-semibold', // peso 600
    'text-btn', // 16px
    'px-4', // padding horizontal
    'shadow-md', // para primarios/secundarios
    variantClasses[variant],
    variant === 'primary' && sectionClasses[section],
    heightClasses[height as 'sm' | 'md' | 'lg'] ?? '',
    widthClasses[width],
    disabled && 'opacity-50',
  ]
    .filter(Boolean)
    .join(' ');

  const contentClass = [
    'flex-row',
    iconPosition === 'right' ? 'flex-row-reverse' : '',
    'items-center justify-center gap-2',
  ].join(' ');

  return (
    <Pressable className={baseClass} onPress={onPress} disabled={disabled}>
      {({ pressed }) => (
        <View
          className={contentClass}
          style={{
            transform: [{ scale: pressed ? 0.95 : 1 }],
            opacity: pressed ? 0.9 : 1,
          }}
        >
          {Icon && <Icon height={20} />}
          <Text className="font-semibold text-btn">{children}</Text>
        </View>
      )}
    </Pressable>
  );
};
