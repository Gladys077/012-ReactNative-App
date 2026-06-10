import { FontSizes, Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import UndoToast from "../../components/subcomponentes/UndoToast";
import CardHistorialVendedor from "../../components/vendedor/CardsVendedor/CardHistorialVendedor";
import ComprobanteViewerModal from "../../components/vendedor/ComprobanteViewerModal";
import { useUndoToast } from "../../hooks/useUndoToast";
import type { Comprobante } from "../../types/pedidos";

export default function HistorialVendedor() {
  const { colors } = useTheme();
  const { historialVendedor, removeHistorialVendedor } = useOrders();
  const { toast, mostrar, cancelar, cerrar } = useUndoToast();

  // Pedido pendiente de borrado (lo ocultamos visualmente pero aún no lo borramos)
  const [pendienteId, setPendienteId] = useState<string | number | null>(null);

  const [comprobanteModal, setComprobanteModal] = useState<{
    visible: boolean;
    comprobantes: Comprobante[];
  }>({ visible: false, comprobantes: [] });

  const handleVerComprobante = (id: string | number) => {
    const pedido = historialVendedor.find((p) => p.id === id);
    if (!pedido?.comprobantes?.length) return;
    setComprobanteModal({ visible: true, comprobantes: pedido.comprobantes });
  };

  const handleEliminar = (id: string | number, nombreComprador?: string) => {
    // Si había otro pendiente, lo borramos primero
    if (pendienteId !== null) removeHistorialVendedor(pendienteId);

    setPendienteId(id);
    mostrar(`Pedido de ${nombreComprador ?? "comprador"} eliminado`, () => {
      removeHistorialVendedor(id);
      setPendienteId(null);
    });
  };

  const handleCancelar = () => {
    setPendienteId(null);
    cancelar();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ComprobanteViewerModal
        visible={comprobanteModal.visible}
        comprobantes={comprobanteModal.comprobantes}
        onClose={() =>
          setComprobanteModal({ visible: false, comprobantes: [] })
        }
      />

      <ScrollView
        contentContainerStyle={{
          padding: Spacing.md,
          paddingTop: Spacing.xl,
          gap: Spacing.lg,
          paddingBottom: Spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {historialVendedor.length > 0 ? (
          historialVendedor
            // Ocultamos visualmente la card pendiente de borrado
            .filter((p) => p.id !== pendienteId)
            .map((pedido) => (
              <CardHistorialVendedor
                key={pedido.id}
                pedido={pedido}
                onEliminar={(id) => handleEliminar(id, pedido.compradorNombre)}
                onVerComprobante={handleVerComprobante}
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

      <UndoToast
        visible={toast.visible}
        mensaje={toast.mensaje}
        onCancelar={handleCancelar}
        onCerrar={cerrar}
      />
    </View>
  );
}
