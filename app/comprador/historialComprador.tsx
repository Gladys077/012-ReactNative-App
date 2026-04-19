import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CardPedidoHistorial from "../../components/Comprador/CardPedidoHistorial";

interface ItemHistorial {
  id: string | number;
  vendedorNombre: string;
  precio: number;
  fechaSeleccion: string;
  textoPedido: string;
  notaVendedor?: string;
}

export default function HistorialComprador() {
  const { colors } = useTheme();

  // TODO: reemplazar por fetch real VER CON LIO
  const [historial, setHistorial] = useState<ItemHistorial[]>([
    {
      id: 1,
      vendedorNombre: "Minimarket Juan",
      precio: 4150,
      fechaSeleccion: new Date("2025-10-05T11:10:00").toISOString(),
      textoPedido:
        "1k Tomates\n1k Cebolla\n2k Papas\n1/2k Duraznos\n1k Pomelo\n1/2k Zanahorias",
      notaVendedor: "No tenía pomelo, mandé naranja en su lugar.",
    },
    {
      id: 2,
      vendedorNombre: "Electricista Pepe",
      precio: 45000,
      fechaSeleccion: new Date("2025-10-05T13:30:00").toISOString(),
      textoPedido:
        "Me quedé sin luz en casa después de enchufar el microondas.",
    },
  ]);

  const handleEliminar = (id: string | number) => {
    // TODO: eliminar en backend
    setHistorial((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: Spacing.md,
          paddingTop: Spacing.xl,
          gap: Spacing.lg,
          paddingBottom: Spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {historial.length > 0 ? (
          historial.map((item) => (
            <CardPedidoHistorial
              key={item.id}
              id={item.id}
              vendedorNombre={item.vendedorNombre}
              precio={item.precio}
              fechaSeleccion={item.fechaSeleccion}
              textoPedido={item.textoPedido}
              notaVendedor={item.notaVendedor}
              onEliminar={handleEliminar}
            />
          ))
        ) : (
          <Text
            style={{
              color: colors.textMuted,
              fontSize: FontSizes.md,
              textAlign: "center",
              marginTop: Spacing.xl,
            }}
          >
            No tenés pedidos en tu historial.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
