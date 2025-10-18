import { TiendaIcon } from "@/components/icons";
import { rubroColorPalette } from "@/components/SelectRubros/rubroColors";
import SelectRubrosVendedor from "@/components/SelectRubros/SelectRubrosVendedor";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function TestSelectRubros() {
  const rubrosIniciales = [
    {
      label: "Panadería",
      value: "panaderia",
      icon: <TiendaIcon width={18} height={18} color={rubroColorPalette[0].iconColor} />,
      color: rubroColorPalette[0].color,
      iconColor: rubroColorPalette[0].iconColor,
    },
    {
      label: "Verdulería",
      value: "verduleria",
      icon: <TiendaIcon width={18} height={18} color={rubroColorPalette[1].iconColor} />,
      color: rubroColorPalette[1].color,
      iconColor: rubroColorPalette[1].iconColor,
    },
  ];

  const [rubrosSeleccionados, setRubrosSeleccionados] = useState<string[]>([]);

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-xl font-semibold mb-4">Prueba SelectRubros</Text>

      <SelectRubrosVendedor
        label="Rubros del negocio"
        selected={rubrosSeleccionados}
        rubros={rubrosIniciales}
        onChange={setRubrosSeleccionados}
      />

      <Text className="mt-6 text-gray-700">
        Seleccionados: {rubrosSeleccionados.join(", ") || "Ninguno"}
      </Text>
    </View>
  );
}
