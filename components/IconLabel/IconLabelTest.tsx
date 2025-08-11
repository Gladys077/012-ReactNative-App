import { Ajustes, Carrito, CheckCircle, ConComprobante, EnCaminoOutline, EnPreparacion, Historial, Home, ListoParaEnviar, Monedas, PendientesMenuVendedor, SinComprobante } from "@/components/icons";
import React, { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { IconLabel } from "./IconLabel";

export default function IconLabelTest() {
  const [dark, setDark] = useState(false);

  return (
    // si pones la clase 'dark' en este contenedor, las clases dark:... deberían activarse
    <ScrollView contentContainerStyle={{ padding: 16 }} className={dark ? "dark" : ""}>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Text className="mr-2 text-text-default">Dark mode</Text>
          <Switch value={dark} onValueChange={setDark} />
        </View>
      </View>

      <View className="flex-row gap-4 mb-8">
        <IconLabel icon={Home} label="Inicio" variant="footer" active={true} />
        <IconLabel icon={Historial} label="Historial" variant="footer" active={true}  />
        <IconLabel icon={Monedas} label="Monedas" variant="footer" active={true}   />
        <IconLabel icon={PendientesMenuVendedor} label="Pendiente" variant="footer" active={true}  />
        <IconLabel icon={Ajustes} label="Ajustes" variant="footer" active={true}  />
      </View>

      <View className="flex-row gap-4 mb-8">
        <IconLabel icon={Carrito} label="Monedas" variant="menuVendedor"  active={true} />
        <IconLabel icon={PendientesMenuVendedor} label="Inicio" variant="menuVendedor" badgeCount={3} />
        <IconLabel icon={CheckCircle} label="Inicio" variant="menuVendedor" badgeCount={3} />
      </View>

      <View className="flex-column gap-4">
        <IconLabel icon={SinComprobante} label="Pendiente" variant="pendientes" />

        <IconLabel icon={ConComprobante} label="Pendiente Activo" variant="pendientes" />
        <IconLabel icon={EnPreparacion} label="Pendiente Activo" variant="pendientes" />

        <IconLabel icon={ListoParaEnviar} label="Pendiente Activo" variant="pendientes" />
        <IconLabel icon={EnCaminoOutline} label="Pendiente Activo" variant="pendientes" /> 
        
      </View>
    </ScrollView>
  );
}
