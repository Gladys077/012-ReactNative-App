import type { ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { Colors, getColorByRole } from "@/constants/Colors";
import { getIconPixelSize, getIconSizeClass } from "@/constants/Tokens";
// 👆 getIconPixelSize es nuevo: devuelve número (24, 32, etc.)

type Variant = "footer" | "menuVendedor" | "pendientes";
type Role = "buyer" | "seller" | "common";

interface IconLabelProps {
  icon: ComponentType<SvgProps>;
  label: string;
  variant?: Variant;
  active?: boolean;
  badgeCount?: number;
  role?: Role;
  onPress?: () => void;
}

const getVariantStyles = (variant: Variant) => {
  const baseStyles = {
    footer: {
      container: "min-w-12 min-h-12 items-center justify-center",
      iconWrapper: getIconSizeClass("md"), // 24px
      iconSize: getIconPixelSize("md"),
      labelBase: "text-xs text-gray-500",
      defaultColor: Colors.light.textMuted,
    },
    menuVendedor: {
      container: "p-3 items-center bg-white rounded-xl",
      iconWrapper: getIconSizeClass("md"), // 24px
      iconSize: getIconPixelSize("md"),
      labelBase: "text-sm text-gray-500",
      defaultColor: Colors.light.textMuted,
    },
    pendientes: {
      container: "p-2 items-center",
      iconWrapper: getIconSizeClass("lg"), // 32px
      iconSize: getIconPixelSize("lg"),
      labelBase: "text-sm text-gray-700",
      defaultColor: Colors.light.textDefault,
    },
  };

  return baseStyles[variant];
};

// 🔹 Componente badge que se auto-posiciona
const Badge = ({ iconSize, count }: { iconSize: number; count: number }) => {
  if (count <= 0) return null;

  const offset = iconSize / 3; // distancia desde el borde del icono

  return (
    <View
      style={{
        position: "absolute",
        top: -offset,
        right: -offset,
        backgroundColor: Colors.light.textError,
        borderRadius: 9999,
        minWidth: 8,
        height: 16,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: Colors.light.textOnColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold", lineHeight: 12 }}>
        {count}
      </Text>
    </View>
  );
};

export const IconLabel = ({
  icon: Icon,
  label,
  variant = "footer",
  active = false,
  badgeCount = 0,
  role = "common",
  onPress,
}: IconLabelProps) => {
  const styles = getVariantStyles(variant);
  const showBadge = badgeCount > 0 && variant !== "footer";

  const getIconColor = () => {
    if (!active) return styles.defaultColor;
    if (variant === "footer") return getColorByRole(role, "light");
    return Colors.light.primarySeller;
  };

  const getLabelColor = () => {
    if (!active) return styles.defaultColor;
    
    if (variant === "footer") return getColorByRole(role, "light");

    if (variant === "pendientes") {
    return styles.defaultColor; // mantiene el color original
  }

    return Colors.light.primarySeller;
  };

  const labelClasses = [
    "mt-1 text-center font-roboto",
    styles.labelBase,
    active && "font-medium",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className={styles.container}
    >
      <View style={{ position: "relative", width: styles.iconSize, height: styles.iconSize }}>
        <Icon width={styles.iconSize} height={styles.iconSize} color={getIconColor()} />
        {showBadge && <Badge iconSize={styles.iconSize} count={badgeCount} />}
      </View>

      <Text className={labelClasses} style={{ color: getLabelColor() }}>
        {label}
      </Text>
    </Pressable>
  );
};
