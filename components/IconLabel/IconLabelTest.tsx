import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Ajustes, Historial, Home, PendientesMenuVendedor } from "../icons";
import { IconLabel } from "./IconLabel";


const IconLabelTest = () => {
  const [activeFooter, setActiveFooter] = useState("home");
  const [activeMenu, setActiveMenu] = useState("historial");

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Footer Variante */}
      <View className="flex-row justify-around mb-6">
        <IconLabel
          icon={Home}
          label="Inicio"
          variant="footer"
          active={activeFooter === "home"}
          onPress={() => setActiveFooter("home")}
        />
        <IconLabel
          icon={PendientesMenuVendedor}
          label="Pendientes"
          variant="footer"
          active={activeFooter === "pendientes"}
          onPress={() => setActiveFooter("pendientes")}
        />
        <IconLabel
          icon={Historial}
          label="Historial"
          variant="footer"
          active={activeFooter === "historial"}
          onPress={() => setActiveFooter("historial")}
        />
  <IconLabel
          icon={Ajustes}
          label="Ajustes"
          variant="footer"
          active={activeFooter === "ajustes"}
          onPress={() => setActiveFooter("ajustes")}
        />
      </View>

      {/* Menu Vendedor Variante */}
      <View className="flex-row justify-around mb-6">
        <IconLabel
          icon={Historial}
          label="Historial"
          variant="menuVendedor"
          active={activeMenu === "historial"}
          onPress={() => setActiveMenu("historial")}
        />
        <IconLabel
          icon={PendientesMenuVendedor}
          label="Pendientes"
          variant="menuVendedor"
          active={activeMenu === "pendientes"}
          onPress={() => setActiveMenu("pendientes")}
        />
      </View>

      {/* Pendientes Variante (con badge) */}
      <View className="flex-row justify-around">
        <IconLabel
          icon={PendientesMenuVendedor}
          label="1 respuesta"
          variant="pendientes"
          badgeCount={1}
        />
        <IconLabel
          icon={PendientesMenuVendedor}
          label="5 respuestas"
          variant="pendientes"
          badgeCount={5}
        />
        <IconLabel
          icon={PendientesMenuVendedor}
          label="sin respuestas"
          variant="pendientes"
          badgeCount={0}
        />
      </View>
    </ScrollView>
  );
};

export default IconLabelTest;

