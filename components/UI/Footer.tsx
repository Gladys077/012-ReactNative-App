import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { ComponentType, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";
import { Ajustes, Historial, Home, Monedas, Pendientes } from "../icons";
import { IconLabel } from "./IconLabel";

interface FooterItem {
  icon: ComponentType<SvgProps>;
  label: string;
  route: string;
}

const itemsBuyer: FooterItem[] = [
  { icon: Home, label: "Inicio", route: "/comprador/nuevoPedido" },
  { icon: Historial, label: "Historial", route: "/comprador/historialComprador" },
  { icon: Pendientes, label: "Pedidos", route: "/comprador/estadoPedido" },
  { icon: Ajustes, label: "Ajustes", route: "/comprador/ajustesComprador" },
];

const itemsSeller: FooterItem[] = [
  { icon: Home, label: "Inicio", route: "/vendedor/homeVendedor" },
  { icon: Historial, label: "Historial", route: "/vendedor/historialVendedor" },
  { icon: Monedas, label: "Créditos", route: "/vendedor/creditos" },
  { icon: Ajustes, label: "Ajustes", route: "/vendedor/ajustesVendedor" },
];

export default function Footer() {
  const { colors } = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const [activeLabel, setActiveLabel] = useState("Inicio");

  if (!user) return null;

  const items = user.role === "buyer" ? itemsBuyer : itemsSeller;

  console.log('Footer Debug:', {
    userRole: user.role,
    itemsCount: items.length,
    itemsLabels: items.map(i => i.label)
  });

  return (
    <SafeAreaView
    edges={['bottom']} 
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.headerFooterBg,

    }}
    >
      <View 
        style={{
          flexDirection: 'row',           
          justifyContent: 'space-around', 
          alignItems: 'center',           
          borderTopWidth: 1,              //  Border
          borderTopColor: colors.border, 
          paddingTop: 12,  //espacio entre línea e iconos
          height: 64, 
          width: "100%",
          maxWidth: 500,
          alignSelf: "center",
          backgroundColor: colors.headerFooterBg,
        }}
      >
          {items.map((item) => (
            <View 
              key={item.label} 
              style={{
                      flex: 1,
                      alignItems: 'center',
                    }}
                  >              
            <IconLabel
                icon={item.icon}
                label={item.label}
                role={user.role} 
                active={item.label === activeLabel}
                onPress={() => {
                  setActiveLabel(item.label);
                  router.push(item.route as any);
                }}
              />
            </View>
          ))}
        </View>
    </SafeAreaView>
  );
}
