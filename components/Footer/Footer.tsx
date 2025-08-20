import { useAuthContext } from "@/context/AuthContext"; // <- esto importa el contexto
import { useRouter } from "expo-router";
import { ComponentType, useState } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";
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
  const router = useRouter();
  const { user } = useAuthContext(); // obtiene el usuario y su rol
  const [activeLabel, setActiveLabel] = useState("Inicio");

  if (!user) return null; // si no hay usuario, no mostrar el footer

  const items = user.role === "buyer" ? itemsBuyer : itemsSeller;

  return (
    <View className="flex-row justify-around items-center border-t border-neutral-200 bg-white py-2 absolute bottom-0 left-0 right-0 h-16 z-50">
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
    </View>
  );
}

//Lo único que falta es que el login guarde bien el user con su role (ver con LIO)