// Ejemplo de uso del componente SelectRubrosVendedor
// En tu pantalla o formulario de vendedor:

import React, { useState } from "react";
import { View } from "react-native";
import SelectRubrosVendedor from "../../components/SelectRubros/SelectRubros";
import { rubrosVendedor } from "../../components/SelectRubros/rubrosConfig";

export default function FormularioVendedor() {
  const [rubrosSeleccionados, setRubrosSeleccionados] = useState<string[]>([]);

  const handleRubrosChange = (values: string[]) => {
    console.log("Rubros seleccionados:", values);
    setRubrosSeleccionados(values);
    // Aquí puedes guardar en tu estado global, backend, etc.
  };

  return (
    <View className="p-4">
      <SelectRubrosVendedor
        label="Rubros de tu negocio"
        selected={rubrosSeleccionados}
        rubros={rubrosVendedor}
        onChange={handleRubrosChange}
        placeholder="Selecciona tu/s rubro/s"
      />
    </View>
  );
}

// ESTRUCTURA DE ARCHIVOS:
// ├── components/
// │   ├── SelectRubrosVendedor/
// │   │   ├── SelectRubrosVendedor.tsx   ✅ Componente principal
// │   │   ├── RubroItem.tsx              ✅ Item individual
// │   │   ├── NuevoRubroInput.tsx        ✅ Input para nuevo rubro
// │   │   ├── rubroColors.tsx            ✅ Paleta de colores
// │   │   └── rubrosConfig.tsx           ✅ Configuración inicial
// │   └── icons/
// │       ├── CanastaAlmacen.tsx
// │       ├── Limpieza.tsx
// │       ├── Rotiseria.tsx
// │       ├── Verduleria.tsx
// │       ├── Carniceria.tsx
// │       ├── Libreria.tsx
// │       ├── TiendaIcon.tsx
// │       └── Check.tsx

// CARACTERÍSTICAS IMPLEMENTADAS:
// ✅ Bottom Sheet modal para selección
// ✅ Múltiple selección de rubros (checkboxes)
// ✅ Iconos con círculos de colores tenues
// ✅ Agregar nuevos rubros dinámicamente
// ✅ Validación (no duplicados, no vacíos)
// ✅ Botones Guardar/Cancelar
// ✅ Colores automáticos para nuevos rubros
// ✅ Input con confirmación/cancelación
// ✅ Diseño responsive y accesible