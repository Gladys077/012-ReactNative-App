import * as Haptics from "expo-haptics";
import type { ComponentType } from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";
import type { SvgProps } from "react-native-svg";

import { Colors, getColorByRole } from "@/constants/Colors";
import { getIconPixelSize, getIconSizeClass } from "@/constants/Tokens";

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

const getVariantStyles = (variant: Variant, isDark: boolean) => {
  const baseStyles = {
    footer: {
      container: "min-w-12 min-h-12 items-center justify-center",
      iconWrapper: getIconSizeClass("md"), // 24px
      iconSize: getIconPixelSize("md"),
      labelBase: `text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`,
      defaultColor: isDark ? Colors.dark.textMuted : Colors.light.textMuted,
    },
    menuVendedor: {
      container: `p-3 items-center ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl`,
      iconWrapper: getIconSizeClass("md"), // 24px
      iconSize: getIconPixelSize("md"),
      labelBase: `text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`,
      defaultColor: isDark ? Colors.dark.textMuted : Colors.light.textMuted,
    },
    pendientes: {
      container: "p-2 items-center",
      iconWrapper: getIconSizeClass("lg"), // 32px
      iconSize: getIconPixelSize("lg"),
      labelBase: `text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`,
      defaultColor: isDark ? Colors.dark.textDefault : Colors.light.textDefault,
    },
  };

  return baseStyles[variant];
};

// Componente badge que se auto-posiciona
const Badge = ({ iconSize, count, isDark }: { iconSize: number; count: number; isDark: boolean }) => {
  if (count <= 0) return null;

  const offset = iconSize / 3; // distancia desde el borde del icono

  return (
    <View
      style={{
        position: "absolute",
        top: -offset,
        right: -offset,
        backgroundColor: isDark ? Colors.dark.textError : Colors.light.textError,
        borderRadius: 9999,
        minWidth: 8,
        height: 16,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: isDark ? Colors.dark.textOnColor : Colors.light.textOnColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ 
        color: "#fff", 
        fontSize: 10, 
        fontWeight: "bold", 
        lineHeight: 12 
      }}>
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getVariantStyles(variant, isDark);
  const showBadge = badgeCount > 0 && variant !== "footer";
  
  const handlePress = async () => {
    // Feedback háptico diferenciado por variant
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
    
    if (variant === "footer") {
      return getColorByRole(role, isDark ? "dark" : "light");
    }
    
    if (variant === "menuVendedor") {
      // Siempre naranja, pero ajustado por modo
      return isDark ? Colors.dark.brandSeller : Colors.light.brandSeller;
    }
    
    return isDark ? Colors.dark.brandSeller : Colors.light.brandSeller;
  };

  const getLabelColor = () => {
    if (!active) return styles.defaultColor;
    
    if (variant === "footer") {
      return getColorByRole(role, isDark ? "dark" : "light");
    }

    if (variant === "pendientes") {
      return styles.defaultColor; // mantiene el color original
    }

    // menuVendedor
    return isDark ? Colors.dark.brandSeller : Colors.light.brandSeller;
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
      onPress={handlePress}
      accessibilityRole="button"
      className={styles.container}
      android_ripple={{ 
        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' 
      }}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 }
      ]}
    >
      <View style={{ 
        position: "relative", 
        width: styles.iconSize, 
        height: styles.iconSize 
      }}>
        <Icon 
          width={styles.iconSize} 
          height={styles.iconSize} 
          color={getIconColor()} 
        />
        {showBadge && (
          <Badge 
            iconSize={styles.iconSize} 
            count={badgeCount} 
            isDark={isDark}
          />
        )}
      </View>

      <Text className={labelClasses} style={{ color: getLabelColor() }}>
        {label}
      </Text>
    </Pressable>
  );
};