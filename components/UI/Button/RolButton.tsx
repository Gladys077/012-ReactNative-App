import React, { ComponentType } from "react";
import { Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { Spacing } from "../../../constants/Tokens";
import { useTheme } from "../../../context/ThemeContext";
import { FlechaDerecha } from "../../icons";
import Button from "./Button";

interface RoleButtonProps {
  icon: ComponentType<SvgProps>;
  section: "buyer" | "seller";
  onPress?: () => void;
  title: string;
  subtitle: string;
}

const RoleButton = ({
  title,
  subtitle,
  section,
  icon,
  onPress,
}: RoleButtonProps) => {
  const { colors } = useTheme();
  const iconColor =
    section === "buyer" ? colors.brandBuyer : colors.brandSeller;

  return (
    <Button
      section={section}
      variant="primary"
      width="full"
      height="xxl"
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* === Columna 1: círculo con ícono === */}
        <View
          style={{
            width: 56, // ancho fijo de columna izquierda
            alignItems: "center",
            justifyContent: "center",
            paddingTop: Spacing.xl,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.cardBg,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon &&
              React.createElement(icon, {
                fill: iconColor,
                stroke: colors.textSecondaryBorder,
                height: 28,
                width: 28,
              })}
          </View>
        </View>

        {/* === Columna 2: textos === */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: Spacing.md,
            paddingTop: Spacing.xl,
            height: 80,
          }}
        >
          <Text
            style={{
              color: colors.textOnColor,
              fontWeight: "bold",
              fontSize: 14,
              marginBottom: 2,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={{
              color: colors.textOnColor,
              fontSize: 12,
              opacity: 0.9,
            }}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        </View>

        {/* === Columna 3: flecha === */}
        <View
          style={{
            width: 32, // ancho fijo de columna derecha
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 20,
            paddingTop: Spacing.xl,
          }}
        >
          <FlechaDerecha fill={colors.textOnColor} height={24} width={24} />
        </View>
      </View>
    </Button>
  );
};

export default RoleButton;
