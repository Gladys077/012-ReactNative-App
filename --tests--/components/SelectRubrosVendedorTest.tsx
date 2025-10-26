import SelectRubrosVendedor from "@/components/SelectRubros/SelectRubros";
import { rubrosVendedor } from "@/components/SelectRubros/rubrosConfig";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestSelectRubros() {
  const [rubrosSeleccionados, setRubrosSeleccionados] = useState<string[]>([]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-4">
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
    </SafeAreaView>
  );
}
