import * as Haptics from "expo-haptics";
import type { ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { getColorByRole } from "@/constants/Colors";
import { FontSizes, getIconPixelSize } from "@/constants/Tokens";
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
      iconSize: getIconPixelSize("md"),
      defaultColor: colors.textMuted,
    },
    menuVendedor: {
      iconSize: getIconPixelSize("md"),
      defaultColor: colors.textMuted,
    },
    pendientes: {
      iconSize: getIconPixelSize("lg"),
      defaultColor: colors.textDefault,
    },
  };
  return baseStyles[variant];
};

const Badge = ({
  iconSize,
  count,
  colors,
}: {
  iconSize: number;
  count: number;
  colors: any;
}) => {
  if (count <= 0) return null;
  const offset = iconSize / 3;

  return (
    <View
      style={{
        position: "absolute",
        top: -offset,
        right: -offset,
        backgroundColor: colors.error,
        borderRadius: 9999,
        minWidth: 8,
        height: 16,
        paddingHorizontal: 4,
        borderWidth: 0.8,
        borderColor: colors.textOnColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#f6f6f6",
          fontSize: 11,
          fontWeight: "bold",
          lineHeight: 11,
        }}
      >
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
  const { colors, fonts, mode } = useTheme();
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
    return colors.brandSeller;
  };

  const getLabelColor = () => {
    if (!active) return styles.defaultColor;
    if (variant === "footer") return getColorByRole(role, mode);
    if (variant === "pendientes") return styles.defaultColor;
    return colors.brandSeller;
  };

  const getContainerStyle = () => {
    switch (variant) {
      case "footer":
        return {
          minWidth: 48,
          minHeight: 48,
          alignItems: "center" as const,
          justifyContent: "center" as const,
        };
      case "menuVendedor":
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
          alignItems: "center" as const,
        };
      case "pendientes":
        return { padding: 8, alignItems: "center" as const };
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      android_ripple={{
        color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      }}
      style={({ pressed }) => [
        getContainerStyle(),
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View
        style={{
          position: "relative",
          width: styles.iconSize,
          height: styles.iconSize,
        }}
      >
        <Icon
          width={styles.iconSize}
          height={styles.iconSize}
          color={getIconColor()}
        />
        {showBadge && (
          <Badge
            iconSize={styles.iconSize}
            count={badgeCount}
            colors={colors}
          />
        )}
      </View>

      <Text
        style={{
          color: getLabelColor(),
          fontSize: FontSizes.xs,
          fontFamily: active ? fonts.robotoMedium : fonts.robotoRegular,
          marginTop: 4,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};
