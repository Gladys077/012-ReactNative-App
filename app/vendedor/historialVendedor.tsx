import { FontSizes, Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CardHistorialVendedor from "../../components/vendedor/CardsVendedor/CardHistorialVendedor";
import ComprobanteViewerModal from "../../components/vendedor/ComprobanteViewerModal";
import type { Comprobante } from "../../types/pedidos";

export default function HistorialVendedor() {
  const { colors } = useTheme();
  const { historial, removePedidoHistorial } = useOrders();

  const [comprobanteModal, setComprobanteModal] = useState<{
    visible: boolean;
    comprobantes: Comprobante[];
  }>({ visible: false, comprobantes: [] });

  const handleVerComprobante = (id: string | number) => {
    const pedido = historial.find((p) => p.id === id);
    if (!pedido?.comprobantes?.length) return;
    setComprobanteModal({ visible: true, comprobantes: pedido.comprobantes });
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
        {historial.length > 0 ? (
          historial.map((pedido) => (
            <CardHistorialVendedor
              key={pedido.id}
              pedido={pedido}
              onEliminar={removePedidoHistorial}
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
    </View>
  );
}
