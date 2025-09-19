import { Carrito, ConComprobante, Historial, Home, Monedas, PendientesMenuVendedor, SinComprobante } from "@/components/icons";
import React, { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { IconLabel } from "./IconLabel";

export default function IconLabelTest() {
  const [dark, setDark] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} className={dark ? "dark" : ""}>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Text className="mr-2 text-text-default dark:text-text-default-dark">Dark mode</Text>
          <Switch value={dark} onValueChange={setDark} />
        </View>
      </View>

      {/* Footer Icons - Testing different roles */}
      <Text className="text-lg font-bold mb-4 text-text-default dark:text-text-default-dark">
        Footer Icons (24px)
      </Text>
      
      <Text className="text-sm mb-2 text-text-muted">Role: Common (Violet when active)</Text>
      <View className="flex-row gap-4 mb-4">
        <IconLabel icon={Home} label="Inicio" variant="footer" active={false} role="common" />
        <IconLabel icon={Home} label="Inicio" variant="footer" active={true} role="common" />
      </View>

      <Text className="text-sm mb-2 text-text-muted">Role: Buyer (Blue when active)</Text>
      <View className="flex-row gap-4 mb-4">
        <IconLabel icon={Historial} label="Historial" variant="footer" active={false} role="buyer" />
        <IconLabel icon={Historial} label="Historial" variant="footer" active={true} role="buyer" />
      </View>

      <Text className="text-sm mb-2 text-text-muted">Role: Seller (Orange when active)</Text>
      <View className="flex-row gap-4 mb-8">
        <IconLabel icon={Monedas} label="Monedas" variant="footer" active={false} role="seller" />
        <IconLabel icon={Monedas} label="Monedas" variant="footer" active={true} role="seller" />
      </View>

      {/* Menu Vendedor Icons */}
      <Text className="text-lg font-bold mb-4 text-text-default ">
        Menu Vendedor Icons (24px)
      </Text>
      <View className="flex-row gap-4 mb-8">
        <IconLabel icon={Carrito} label="Carrito" variant="menuVendedor" active={false} />
        <IconLabel icon={Carrito} label="Carrito" variant="menuVendedor" active={true} />
        <IconLabel icon={PendientesMenuVendedor} label="Pendientes" variant="menuVendedor" active={false} badgeCount={3} />
        <IconLabel icon={PendientesMenuVendedor} label="Pendientes" variant="menuVendedor" active={true} badgeCount={3} />
      </View>

      {/* Pendientes Icons */}
      <Text className="text-lg font-bold mb-4 text-text-default dark:text-text-default-dark">
        Pendientes Icons (32px)
      </Text>
      <View className="flex-column gap-4">
        <IconLabel icon={SinComprobante} label="Sin Comprobante" variant="pendientes" active={false} />
        <IconLabel icon={SinComprobante} label="Sin Comprobante Active" variant="pendientes" active={true} />
        <IconLabel icon={ConComprobante} label="Con Comprobante" variant="pendientes" active={false} />
        <IconLabel icon={ConComprobante} label="Con Comprobante Active" variant="pendientes" active={true} />
      </View>
    </ScrollView>
  );
}