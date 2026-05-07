import { useAuthContext } from "@/context/AuthContext";
import { useRouter, useSegments } from "expo-router";
import { ComponentType } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";
import {
  Ajustes,
  CarritoOutline,
  Historial,
  Home,
  Monedas,
  Pendientes,
  TiendaIconOutline,
} from "../icons";
import { IconLabel } from "./IconLabel";

interface FooterItem {
  icon: ComponentType<SvgProps>;
  label: string;
  route: string;
}

const itemsBuyer: FooterItem[] = [
  { icon: Home, label: "Inicio", route: "/comprador/nuevoPedido" },
  {
    icon: Historial,
    label: "Historial",
    route: "/comprador/historialComprador",
  },
  { icon: Pendientes, label: "Pedidos", route: "/comprador/estadoPedido" },
  { icon: TiendaIconOutline, label: "Vender", route: "/vendedor/homeVendedor" },
  { icon: Ajustes, label: "Ajustes", route: "/comprador/ajustesComprador" },
];

const itemsSeller: FooterItem[] = [
  { icon: Home, label: "Inicio", route: "/vendedor/homeVendedor" },
  { icon: Historial, label: "Historial", route: "/vendedor/historialVendedor" },
  { icon: Monedas, label: "Créditos", route: "/vendedor/creditos" },
  { icon: CarritoOutline, label: "Comprar", route: "/comprador/nuevoPedido" },
  { icon: Ajustes, label: "Ajustes", route: "/vendedor/ajustesVendedor" },
];

export default function Footer() {
  const { colors } = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const segments = useSegments();

  if (!user) return null;

  // Detectar sección activa POR RUTA, no por rol del usuario
  const currentSection = segments[0]; // "vendedor" | "comprador"
  const isSellerSection = currentSection === "vendedor";

  const items = isSellerSection ? itemsSeller : itemsBuyer;

  // Label activo según la ruta actual
  const currentPage = segments[segments.length - 1];

  const getActiveLabelByRoute = () => {
    // Buscar solo dentro de los items de la sección actual
    const matched = items.find((item) => item.route.includes(currentPage));
    return matched?.label ?? "Inicio";
  };

  const activeLabel = getActiveLabelByRoute();

  return (
    <View style={{ backgroundColor: colors.headerFooterBg, paddingBottom: 8 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 12,
          height: 64,
          width: "100%",
          maxWidth: 500,
          alignSelf: "center",
          backgroundColor: colors.headerFooterBg,
        }}
      >
        {items.map((item) => (
          <View key={item.label} style={{ flex: 1, alignItems: "center" }}>
            <IconLabel
              icon={item.icon}
              label={item.label}
              role={isSellerSection ? "seller" : "buyer"}
              active={item.label === activeLabel}
              onPress={() => router.push(item.route as any)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
