import { FontSizes } from "@/constants/Tokens";
import { Text, TextProps } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface Props extends TextProps {
  variant?: "title" | "subtitle" | "body" | "caption";
  weight?: "regular" | "bold" | "medium" | "light";
  children: React.ReactNode;
}

export default function ThemedText({
  variant = "body",
  weight = "regular",
  style,
  ...rest
}: Props) {
  const { colors, fonts } = useTheme();

  // Mapeo directo a los tokens
  const fontSizeMap: Record<
    NonNullable<Props["variant"]>, //un obj con las claves title, subtitle, body, caption y valores de tipo number
    number
  > = {
    title: FontSizes.xl,
    subtitle: FontSizes.lg,
    body: FontSizes.base,
    caption: FontSizes.sm,
  };

  const fontFamilyMap: Record<
    NonNullable<Props["weight"]>,
    string
  > = {
    regular: fonts.robotoRegular,
    bold: fonts.robotoBold,
    medium: fonts.robotoMedium,
    light: fonts.robotoLight,
  };

  return (
    <Text
      style={[
        {
          color: colors.textDefault, // dinámico según theme
          fontSize: fontSizeMap[variant],
          fontFamily: fontFamilyMap[weight],
        },
        style,
      ]}
      {...rest}
    />
  );
}
