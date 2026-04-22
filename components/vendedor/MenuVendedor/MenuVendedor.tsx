import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View } from "react-native";
import Carrito from "../../icons/Carrito";
import Entregado from "../../icons/Entregado";
import PendientesMenuVendedor from "../../icons/PendientesMenuVendedor";
import { IconLabel } from "../../UI/IconLabel";

export type TabVendedorMenu = "pedidos" | "pendientes" | "entregados";

interface MenuVendedorProps {
  tabActivo: TabVendedorMenu;
  onTabChange: (tab: TabVendedorMenu) => void;
  badgePedidos?: number;
  badgePendientes?: number;
  badgeEntregados?: number;
}

const TABS: {
  key: TabVendedorMenu;
  label: string;
  Icon: React.ComponentType<any>;
  badgeKey: keyof Pick<
    MenuVendedorProps,
    "badgePedidos" | "badgePendientes" | "badgeEntregados"
  >;
}[] = [
  { key: "pedidos", label: "Pedidos", Icon: Carrito, badgeKey: "badgePedidos" },
  {
    key: "pendientes",
    label: "Pendientes",
    Icon: PendientesMenuVendedor,
    badgeKey: "badgePendientes",
  },
  {
    key: "entregados",
    label: "Entregados",
    Icon: Entregado,
    badgeKey: "badgeEntregados",
  },
];

const MenuVendedor = ({
  tabActivo,
  onTabChange,
  badgePedidos = 0,
  badgePendientes = 0,
  badgeEntregados = 0,
}: MenuVendedorProps) => {
  const { colors } = useTheme();
  const badges = { badgePedidos, badgePendientes, badgeEntregados };

  return (
    <View
      style={{
        backgroundColor: colors.headerFooterBg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          maxWidth: 500,
          alignSelf: "center",
          backgroundColor: colors.headerFooterBg,
          paddingTop: Spacing.lg,
        }}
      >
        {TABS.map(({ key, label, Icon, badgeKey }) => {
          const isActive = tabActivo === key;
          return (
            <View key={key} style={{ flex: 1, alignItems: "center" }}>
              <IconLabel
                icon={Icon}
                label={label}
                variant="menuVendedor"
                active={isActive}
                badgeCount={badges[badgeKey]}
                role="seller"
                onPress={() => onTabChange(key)}
              />
              <View
                style={{
                  height: 2,
                  width: "90%",
                  backgroundColor: isActive
                    ? colors.brandSeller
                    : "transparent",
                  marginTop: Spacing.xs,
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default MenuVendedor;
