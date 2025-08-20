import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { ComponentType, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";
import { IconLabel } from "../IconLabel/IconLabel";
import { Ajustes, Historial, Home, Monedas, PendientesMenuVendedor } from "../icons";

interface FooterItem {
  icon: ComponentType<SvgProps>;
  label: string;
  route: string;
}

const itemsBuyer: FooterItem[] = [
  { icon: Home, label: "Inicio", route: "/homeRol" },
  { icon: Historial, label: "Historial", route: "/comprador/historial" },
  { icon: PendientesMenuVendedor, label: "Pendientes", route: "/comprador/pendientes" },
  { icon: Ajustes, label: "Ajustes", route: "/comprador/ajustes" },
];

const itemsSeller: FooterItem[] = [
  { icon: Home, label: "Inicio", route: "/homeRol" },
  { icon: Historial, label: "Historial", route: "/vendedor/historial" },
  { icon: Monedas, label: "Créditos", route: "/vendedor/creditos" },
  { icon: Ajustes, label: "Ajustes", route: "/vendedor/ajustes" },
];

export default function Footer() {
  const { colors } = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const [activeLabel, setActiveLabel] = useState("Inicio");

  if (!user) return null;

  const items = user.role === "buyer" ? itemsBuyer : itemsSeller;

  return (
    <SafeAreaView
      edges={['bottom']}
      className="flex-row justify-around items-center border-t py-2 absolute bottom-0 left-0 right-0 h-16 z-50"
      style={{
        backgroundColor: colors.background,
        borderTopColor: colors.border,
      }}
    >
      {items.map((item) => (
        <IconLabel
          key={item.label}
          icon={item.icon}
          label={item.label}
          role={user.role} 
          active={item.label === activeLabel}
          onPress={() => {
            setActiveLabel(item.label);
            router.push(item.route as any);
          }}
        />
      ))}
    </SafeAreaView>
  );
}
