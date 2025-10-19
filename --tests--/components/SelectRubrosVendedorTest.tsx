import SelectRubrosVendedor from "@/components/SelectRubros/SelectRubrosVendedor";
import { rubrosVendedor } from "@/components/SelectRubros/rubrosConfig";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function TestSelectRubros() {
  const [rubrosSeleccionados, setRubrosSeleccionados] = useState<string[]>([]);

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-xl font-semibold mb-4">Prueba SelectRubros</Text>

      <SelectRubrosVendedor
        label="Rubros del negocio"
        selected={rubrosSeleccionados}
        rubros={rubrosVendedor} 
        onChange={setRubrosSeleccionados}
      />

      <Text className="mt-6 text-gray-700">
        Seleccionados: {rubrosSeleccionados.join(", ") || "Ninguno"}
      </Text>
    </View>
  );
}
