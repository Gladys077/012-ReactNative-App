import * as Haptics from "expo-haptics";
import type { ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { getColorByRole } from "@/constants/Colors";
import { getIconPixelSize, getIconSizeClass } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";

type Variant = "footer" | "menuVendedor" | "pendientes";
export type Role = "buyer" | "seller";

interface IconLabelProps {
  icon: ComponentType<SvgProps>;
  label: string;
  variant?: Variant;
  active?: boolean;
  badgeCount?: number;
  role?: Role;
  onPress?: () => void;
}

const getVariantStyles = (variant: Variant, colors: any) => {
  const baseStyles = {
    footer: {
      container: "min-w-12 min-h-12 items-center justify-center",
      iconWrapper: getIconSizeClass("md"), // 24px
      iconSize: getIconPixelSize("md"),
      labelBase: `text-xs text-${colors.textMuted}`,
      defaultColor: colors.textMuted,
    },
    menuVendedor: {
      container: `p-3 items-center rounded-xl bg-${colors.bg}`,
      iconWrapper: getIconSizeClass("md"),
      iconSize: getIconPixelSize("md"),
      labelBase: `text-sm text-${colors.textMuted}`,
      defaultColor: colors.textMuted,
    },
    pendientes: {
      container: "p-2 items-center",
      iconWrapper: getIconSizeClass("lg"), // 32px
      iconSize: getIconPixelSize("lg"),
      labelBase: `text-sm text-${colors.textDefault}`,
      defaultColor: colors.textDefault,
    },
  };
  return baseStyles[variant];
};

const Badge = ({ iconSize, count, colors }: { iconSize: number; count: number; colors: any }) => {
  if (count <= 0) return null;
  const offset = iconSize / 3;

  return (
    <View
      style={{
        position: "absolute",
        top: -offset,
        right: -offset,
        backgroundColor: colors.textError,
        borderRadius: 9999,
        minWidth: 8,
        height: 16,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: colors.textOnColor,
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
  role = "buyer",
  onPress,
}: IconLabelProps) => {
  const { colors, mode } = useTheme();
  const isDark = mode === "dark";
  const styles = getVariantStyles(variant, colors);
  const showBadge = badgeCount > 0 && variant !== "footer";

  const handlePress = async () => {
    switch (variant) {
      case "footer":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "menuVendedor":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "pendientes":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
    }
    onPress?.();
  };

  const getIconColor = () => {
    if (!active) return styles.defaultColor;
    if (variant === "footer") return getColorByRole(role, mode);
    if (variant === "menuVendedor") return colors.brandSeller;
    return colors.brandSeller; // pendientes
  };

  const getLabelColor = () => {
    if (!active) return styles.defaultColor;
    if (variant === "footer") return getColorByRole(role, mode);
    if (variant === "pendientes") return styles.defaultColor;
    return colors.brandSeller; // menuVendedor
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      className={styles.container}
      android_ripple={{ color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={{ position: "relative", width: styles.iconSize, height: styles.iconSize }}>
        <Icon width={styles.iconSize} height={styles.iconSize} color={getIconColor()} />
        {showBadge && <Badge iconSize={styles.iconSize} count={badgeCount} colors={colors} />}
      </View>

      <Text
        className={`mt-1 text-center font-roboto ${active ? "font-medium" : ""}`}
        style={{ color: getLabelColor() }}
      >
        {label}
      </Text>
    </Pressable>
  );
};
