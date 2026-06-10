import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CardPedidoHistorial from "../../components/Comprador/CardPedidoHistorial";
import UndoToast from "../../components/subcomponentes/UndoToast";
import { useOrders } from "../../context/OrdersContext";
import { useUndoToast } from "../../hooks/useUndoToast";

export default function HistorialComprador() {
  const { colors } = useTheme();
  const { historialComprador, removeHistorialComprador } = useOrders();
  const { toast, mostrar, cancelar, cerrar } = useUndoToast();
  const [pendienteId, setPendienteId] = useState<string | number | null>(null);

  const handleEliminar = (id: string | number, vendedorNombre?: string) => {
    if (pendienteId !== null) removeHistorialComprador(pendienteId);

    setPendienteId(id);
    mostrar(`Pedido de ${vendedorNombre ?? "vendedor"} eliminado`, () => {
      removeHistorialComprador(id);
      setPendienteId(null);
    });
  };

  const handleCancelar = () => {
    setPendienteId(null);
    cancelar();
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
        {historialComprador.length > 0 ? (
          historialComprador
            .filter((p) => p.id !== pendienteId)
            .map((item) => {
              const r = item.respuestaSeleccionada;
              if (!r) return null;
              return (
                <CardPedidoHistorial
                  key={item.id}
                  pedidoId={item.id}
                  vendedorNombre={r.vendedorNombre}
                  rating={item.respuestaSeleccionada?.rating}
                  ratingCount={item.respuestaSeleccionada?.ratingCount}
                  precio={r.precio}
                  fechaSeleccion={item.fechaSeleccion ?? ""}
                  textoPedido={item.textoPedido}
                  notaVendedor={r.nota}
                  calificacionDada={item.calificacionVendedor}
                  onEliminar={(id) => handleEliminar(id, r.vendedorNombre)}
                />
              );
            })
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

      <UndoToast
        visible={toast.visible}
        mensaje={toast.mensaje}
        onCancelar={handleCancelar}
        onCerrar={cerrar}
      />
    </View>
  );
}
