import { Text, TextProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Props extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  weight?: 'regular' | 'bold' | 'medium' | 'light';
  children: React.ReactNode;
}

export default function ThemedText({
  variant = 'body',
  weight = 'regular',
  style,
  ...rest
}: Props) {
  const { colors, fonts } = useTheme();

  const fontSizeMap = {
    title: 24,
    subtitle: 18,
    body: 14,
    caption: 12,
  };

  const fontFamilyMap = {
    regular: fonts.robotoRegular,
    bold: fonts.robotoBold,
    medium: fonts.robotoMedium,
    light: fonts.robotoLight,
  };

  return (
    <Text
      style={[
        {
          color: colors.textDefault,
          fontSize: fontSizeMap[variant],
          fontFamily: fontFamilyMap[weight],
        },
        style,
      ]}
      {...rest}
    />
  );
}
