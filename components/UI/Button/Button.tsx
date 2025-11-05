import { BorderRadius, shadows, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { ComponentType, ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  section?: "common" | "buyer" | "seller";
  height?: "sm" | "md" | "lg" | "xl" | "xxl" | number;
  width?: "auto" | "half" | "full";
  align?: "left" | "center" | "right";
  disabled?: boolean;
  onPress?: () => void;
  icon?: ComponentType<SvgProps>;
  iconPosition?: "left" | "right";
  styleAdd?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  section = "seller",
  height = "lg",
  width = "half",
  align = "left",
  disabled = false,
  onPress,
  icon,
  iconPosition = "left",
  styleAdd,
}) => {
  const { colors } = useTheme();
  const Icon = icon;

  ///Alturas
  const heightClasses: Record<string, number> = {
    sm: 40, // h-10
    md: 48, // h-12
    lg: 56, // h-14
    xl: 80, // h-20
    xxl: 120, // h-30
  };

  // Si el height recibido es string, busca en heightClasses, sino usa el número directamente
  const resolvedHeight =
    typeof height === "string" ? heightClasses[height] || 48 : height;

  // Ancho
  const widthClasses = {
    auto: 'w-auto',
    half: 'w-1/2',
    full: 'w-full',
  };



  // colores según variant + sección (usa useTheme)
  const sectionBgMap = {
    common: colors.brandCommon,
    buyer: colors.brandBuyer,
    seller: colors.brandSeller,
  } as const;

  const primaryBg = sectionBgMap[section];
  const primaryTextColor = colors.textOnColor;

  const secondaryBg = colors.textSecondaryBg;
  const secondaryBorder = colors.textSecondaryBorder;
  const secondaryTextColor = colors.textDefault;

  const containerColors =
    variant === "primary"
      ? { backgroundColor: primaryBg, borderColor: "transparent", textColor: primaryTextColor, iconColor: primaryTextColor }
      : { backgroundColor: secondaryBg, borderColor: secondaryBorder, textColor: secondaryTextColor, iconColor: secondaryTextColor };

  // ===== alignment wrapper (se aplica al contenedor externo: fuera del btn)
  // const alignWrapperStyle = (
  //   width === "full"
  //     ? { alignSelf: "stretch" } // asegura que el contenedor se estire al máximo
  //     : align === "center"
  //     ? { alignItems: "center" }
  //     : align === "right"
  //     ? { alignItems: "flex-end" }
  //     : { alignItems: "flex-start" }
  // ) as ViewStyle;


  // ===== botón estilos base (inline, Android-friendly)
  const baseButtonStyle: ViewStyle = {
    backgroundColor: containerColors.backgroundColor,
    borderRadius: BorderRadius.pillBtn,
    paddingHorizontal: Spacing.lg,
    height: resolvedHeight,
    // widthClasses[width],
    borderWidth: variant === "secondary" ? 1 : 0,
    borderColor: variant === "secondary" ? containerColors.borderColor : "transparent",
    justifyContent: "center",
    // Sombra nativa (uso tokens.shadows para control)
    ...shadows.md,
    opacity: disabled ? 0.6 : 1,
  };

  // Se aplica al btn principal (caja EXTERIOR del btn). Si pasamos styleAdd, lo respetamos (se aplica al final)
  // Define: Bg, height, width, border, shadow, opacity y estilo adicionales (styleAdd)
  const combinedButtonStyle = StyleSheet.flatten([baseButtonStyle, widthClasses, styleAdd]) as ViewStyle;

  // contenido: layout horizontal con icon + texto (estilos que se aplican DENTRO del btn)
  const contentStyle: ViewStyle = {
    flexDirection: iconPosition === "right" ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8 as any, // RN no soporta gap en todas las versiones; en caso de problemas reemplazar con margin
    paddingHorizontal: 4,
  };

  return (
    <View style={[{ marginTop: Spacing.lg }, ]}>
      <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.97 : 1 }] })}>
        {({ pressed }) => (
          <View
            style={[
              combinedButtonStyle,
              // efecto pressed (ligero darken) 
              pressed ? { opacity: 0.95, transform: [{ scale: 0.97 }] } : undefined,
            ]}
          >
            <View style={contentStyle}>
              {Icon && (
                <Icon
                  width={16}
                  height={16}
                  fill={containerColors.iconColor}
                  stroke={containerColors.iconColor}
                />
              )}

              <Text
                style={{
                  color: containerColors.textColor,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {children}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
