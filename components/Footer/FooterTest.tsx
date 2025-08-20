import { useState } from "react";
import { View } from "react-native";
import type { Role } from "../IconLabel/IconLabel";
import { IconLabel } from "../IconLabel/IconLabel";
import { Ajustes, Historial, Home, Monedas, Pendientes } from "../icons";

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
const user: { role: Role } = { role: "buyer" }; // Cambiar a "seller" o "buyer" según el tipo Role

export default function FooterTest() {
  const [activeLabel, setActiveLabel] = useState("Inicio");

  const items = user.role === "buyer" ? itemsBuyer : itemsSeller;

  return (
    <View className="flex-row justify-around items-center border-t border-neutral-200 bg-white py-2 absolute bottom-0 left-0 right-0 h-16 z-50">
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
    </View>
  );
}
