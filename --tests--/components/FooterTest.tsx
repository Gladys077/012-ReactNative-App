import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconLabel, Role } from "../../components/UI/IconLabel";
import {
  Ajustes,
  Historial,
  Home,
  Monedas,
  Pendientes,
} from "../../components/icons";

interface FooterItem {
  icon: React.ComponentType<any>;
  label: string;
  route: string;
}

const itemsBuyer: FooterItem[] = [
  { icon: Home, label: "Inicio", route: "/homeRol" },
  { icon: Historial, label: "Historial", route: "/comprador/historial" },
  { icon: Pendientes, label: "Pendientes", route: "/comprador/pendientes" },
  { icon: Ajustes, label: "Ajustes", route: "/comprador/ajustes" },
];

const itemsSeller: FooterItem[] = [
  { icon: Home, label: "Inicio", route: "/homeRol" },
  { icon: Historial, label: "Historial", route: "/vendedor/historial" },
  { icon: Monedas, label: "Créditos", route: "/vendedor/creditos" },
  { icon: Ajustes, label: "Ajustes", route: "/vendedor/ajustes" },
];

// simulación de usuario
const user: { role: Role } = { role: "seller" };

export default function FooterTest() {
  const { colors } = useTheme();
  const [activeLabel, setActiveLabel] = useState("Inicio");

  const items = user.role === "buyer" ? itemsBuyer : itemsSeller;

  return (
    <SafeAreaView
      edges={["bottom"]}
      className="flex-row justify-around items-center border-t bottom-0 absolute left-0 right-0 py-2 z-50"
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
          active={item.label === activeLabel}
          role={user.role}
          onPress={() => setActiveLabel(item.label)}
        />
      ))}
    </SafeAreaView>
  );
}
