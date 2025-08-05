import type { ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

type Variant = "footer" | "menuVendedor" | "pendientes";

interface IconLabelProps {
  icon: ComponentType<SvgProps>;
  label: string;
  variant?: Variant;
  active?: boolean;
  badgeCount?: number;
  onPress?: () => void;
}

const variantStyles = {
  footer: {
    container: ["min-w-12", "min-h-12", "items-center", "justify-center"],
    icon: ["w-6", "h-6", "stroke-neutral-500"],
    label: ["text-xs", "text-neutral-500"],
    activeIcon: ["stroke-neutral-800", "fill-neutral-800"],
    activeLabel: ["text-neutral-800", "font-medium"],
  },
  menuVendedor: {
    container: ["p-3", "items-center", "bg-white", "rounded-xl"],
    icon: ["w-6", "h-6", "fill-neutral-400"],
    label: ["text-sm", "text-neutral-400"],
    activeIcon: ["fill-seller-600"],
    activeLabel: ["text-seller-600"],
  },
  pendientes: {
    container: ["p-2", "items-center"],
    icon: ["h-8", "w-auto", "fill-neutral-800"],
    label: ["text-xs", "text-neutral-800"],
    activeIcon: [],
    activeLabel: [],
  },
};

export const IconLabel = ({
  icon: Icon,
  label,
  variant = "footer",
  active = false,
  badgeCount = 0,
  onPress,
}: IconLabelProps) => {
  const styles = variantStyles[variant];
  const showBadge = badgeCount > 0 && variant !== "footer";

  const containerClass = styles.container.join(" ");
  const iconClass = [...styles.icon, ...(active ? styles.activeIcon : [])].join(" ");
  const labelClass = ["mt-1", "text-center", "font-sans", ...styles.label, ...(active ? styles.activeLabel : [])].join(" ");

  return (
    <Pressable onPress={onPress} accessibilityRole="button" className={containerClass}>
      <View className="relative items-center justify-center">
        <Icon className={iconClass} />
        {showBadge && (
          <View className="absolute -top-1 -right-1 bg-red-600 rounded-full min-w-[8px] h-4 px-1 border border-white items-center justify-center">
            <Text className="text-white text-[10px] font-bold leading-none">
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
      <Text className={labelClass}>{label}</Text>
    </Pressable>
  );
};
