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
    primary: 'text-white',
    secondary: 'text-black border border-black',
    google: 'bg-white border border-gray-300 text-black',
  };

  const sectionClasses = {
    common: 'bg-purple-700',
    buyer: 'bg-blue-600',
    seller: 'bg-orange-500',
  };

  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const widthClasses = {
    auto: 'w-auto',
    half: 'w-1/2',
    full: 'w-full',
  };

  const contentClass = 'flex-row items-center justify-center gap-2 px-4';

  const classes = [
    'rounded-full', 
    variantClasses[variant],
    sectionClasses[section],
    heightClasses[height],
    widthClasses[width],
    disabled && 'opacity-50',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Pressable className={classes} onPress={onPress} disabled={disabled}>
      <View className={contentClass}>
        {Icon && iconPosition === 'left' && <Icon width={20} height={20} />}
        <Text className="font-medium">{children}</Text>
        {Icon && iconPosition === 'right' && <Icon width={20} height={20} />}
      </View>
    </Pressable>
  );
};
