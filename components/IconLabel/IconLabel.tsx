import type { ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

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

const getRoleStrokeColor = (role: Role = "common") => {
  switch (role) {
    case "buyer":
      return "stroke-primary-buyer";
    case "seller":
      return "stroke-primary-seller";
    default:
      return "stroke-primary-common";
  }
};
const getRoleFillColor = (role: Role = "common") => {
  switch (role) {
    case "buyer":
      return "fill-primary-buyer";
    case "seller":
      return "fill-primary-seller";
    default:
      return "fill-primary-common";
  }
};

/* --- TIPADO para las variantes: todas las funciones aceptan role?: Role --- */
type VariantStyle = {
  container: string[];
  icon: string[];
  label: string[];
  activeIcon: (role?: Role) => string[];
  activeLabel: (role?: Role) => string[];
};

const variantStyles: Record<Variant, VariantStyle> = {
  footer: {
    container: ["min-w-12", "min-h-12", "items-center", "justify-center"],
    icon: ["w-6", "h-6", "stroke-muted", "fill-none"], // outline gris medio
    label: ["text-xs", "text-text-muted"],
    activeIcon: (role?: Role) => [getRoleStrokeColor(role)],
    activeLabel: (role?: Role) => [
      // convertimos stroke-primary-x -> text-primary-x
      `text-${getRoleStrokeColor(role ?? "common").replace("stroke-", "")}`,
      "font-medium",
    ],
  },
  menuVendedor: {
    container: ["p-3", "items-center", "bg-header-bg-light", "rounded-xl"],
    icon: ["w-6", "h-6", "fill-current", "text-text-muted"], // fill gris medio inicial
    label: ["text-sm", "text-text-muted"],
    // ahora aceptan role? aunque lo ignoren
    activeIcon: (_role?: Role) => ["fill-primary-seller"], // naranja vendedor
    activeLabel: (_role?: Role) => ["text-primary-seller"],
  },
  pendientes: {
    container: ["p-2", "items-center"],
    icon: ["w-8", "h-8", "stroke-text-default", "fill-none"], // outline gris oscuro, 32px
    label: ["text-sm", "text-text-default"],
    // aceptan role? para mantener firma uniforme; aquí usamos seller por defecto si se requiere
    activeIcon: (_role?: Role) => ["stroke-primary-seller"],
    activeLabel: (_role?: Role) => ["text-text-default", "font-medium"],
  },
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
  const styles = variantStyles[variant];
  const showBadge = badgeCount > 0 && variant !== "footer";

  const containerClass = styles.container.join(" ");
  const iconClass = [...styles.icon, ...(active ? styles.activeIcon(role) : [])].join(" ");
  const labelClass = ["mt-1", "text-center", "font-sans", ...styles.label, ...(active ? styles.activeLabel(role) : [])].join(" ");

  return (
    <Pressable onPress={onPress} accessibilityRole="button" className={containerClass}>
      <View className="relative items-center justify-center">
        {/* Si tu icon acepta props fill/stroke también puedes pasarlos aquí */}
        <Icon className={iconClass} />
        {showBadge && (
          <View className="absolute -top-1 -right-1 bg-text-error rounded-full min-w-[8px] h-4 px-1 border border-text-on-color items-center justify-center">
            <Text className="text-text-on-color text-[10px] font-bold leading-none">{badgeCount}</Text>
          </View>
        )}
      </View>
      <Text className={labelClass}>{label}</Text>
    </Pressable>
  );
};
