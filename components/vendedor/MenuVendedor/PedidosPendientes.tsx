import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import type { Pedido } from "../../../types/pedidos";
import CardEnCamino from "../CardsVendedor/CardEnCamino";
import CardEnPreparacion from "../CardsVendedor/CardEnPreparación";
import CardListoParaEnviar from "../CardsVendedor/CardListoParaEnviar";
import CardPagoPendiente from "../CardsVendedor/CardPagoPendiente";
import CardPagoRecibido from "../CardsVendedor/CardPagoRecibido";
import SubMenuPendientes, {
  estadoSistemaASubTab,
  SUB_TABS,
  type SubTabPendiente,
} from "./SubMenuPendientes";

interface Props {
  pedidos: Pedido[];
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onPagoConfirmado: (id: string | number) => void;
  onPagoRechazado: (id: string | number) => void;
  onMensaje: (id: string | number) => void;
  onListoParaEnviar: (id: string | number) => void;
  onEntregado: (id: string | number) => void;
}

// ─── Renderer por subtab ──────────────────────────────────────────────────────

function renderCard(
  pedido: Pedido,
  subTab: SubTabPendiente,
  handlers: Omit<Props, "pedidos">,
) {
  const common = {
    key: pedido.id,
    pedidoId: pedido.id,
    fechaSeleccion: pedido.fechaSeleccion,
    compradorNombre: pedido.compradorNombre,
    compradorRating: pedido.compradorRating,
    textoPedido: pedido.textoPedido,
    nota: pedido.respuestaSeleccionada?.nota,
    precio: pedido.respuestaSeleccionada?.precio ?? 0,
    direccionComprador: pedido.direccionComprador,
    telefono: pedido.respuestaSeleccionada?.telefono,
    onVerPedido: handlers.onVerPedido,
    onVerNota: handlers.onVerNota,
  };

  switch (subTab) {
    case "esperando_pago":
      return <CardPagoPendiente {...common} />;

    case "con_comprobante":
      return (
        <CardPagoRecibido
          {...common}
          onPagoConfirmado={handlers.onPagoConfirmado}
          onPagoRechazado={handlers.onPagoRechazado}
          onMensaje={handlers.onMensaje}
        />
      );

    case "en_preparacion":
      return (
        <CardEnPreparacion
          {...common}
          onListoParaEnviar={handlers.onListoParaEnviar}
        />
      );

    case "listo_para_enviar":
      return (
        <CardListoParaEnviar
          {...common}
          onListoParaEnviar={handlers.onListoParaEnviar}
        />
      );

    case "en_camino":
      return (
        <CardEnCamino {...common} onListoParaEnviar={handlers.onEntregado} />
      );
  }
}

// ─── Componente ───────────────────────────────────────────────────────────────

const PedidosPendientes = ({
  pedidos,
  onVerPedido,
  onVerNota,
  onPagoConfirmado,
  onPagoRechazado,
  onMensaje,
  onListoParaEnviar,
  onEntregado,
}: Props) => {
  const { colors, fonts } = useTheme();
  const [subTabActivo, setSubTabActivo] = useState<SubTabPendiente | null>(
    null,
  );

  const pedidosFiltrados = subTabActivo
    ? pedidos.filter(
        (p) => estadoSistemaASubTab[p.estadoSistema] === subTabActivo,
      )
    : [];

  const labelSubTab = SUB_TABS.find((t) => t.key === subTabActivo)?.label ?? "";

  const handlers = {
    onVerPedido,
    onVerNota,
    onPagoConfirmado,
    onPagoRechazado,
    onMensaje,
    onListoParaEnviar,
    onEntregado,
  };

  if (subTabActivo !== null) {
    return (
      <View style={{ flex: 1 }}>
        {/* Título + botón volver */}
        <Pressable
          onPress={() => setSubTabActivo(null)}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.sm,
            paddingHorizontal: Spacing.lg,
            paddingVertical: Spacing.md,
            backgroundColor: pressed ? colors.textSecondaryBg : colors.cardBg,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          })}
        >
          <Text
            style={{
              color: colors.brandSeller,
              fontSize: FontSizes.md,
              fontFamily: fonts.robotoMedium,
            }}
          >
            ←
          </Text>
          <Text
            style={{
              color: colors.textDefault,
              fontSize: FontSizes.md,
              fontFamily: fonts.robotoMedium,
            }}
          >
            {labelSubTab}
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: FontSizes.sm,
              fontFamily: fonts.robotoRegular,
            }}
          >
            ({pedidosFiltrados.length})
          </Text>
        </Pressable>

        <ScrollView
          contentContainerStyle={{
            padding: Spacing.md,
            gap: Spacing.lg,
            paddingBottom: Spacing.xl,
          }}
          showsVerticalScrollIndicator={false}
        >
          {pedidosFiltrados.length === 0 ? (
            <Text
              style={{
                color: colors.textMuted,
                fontSize: FontSizes.md,
                textAlign: "center",
                marginTop: Spacing.xl,
              }}
            >
              No hay pedidos en este estado.
            </Text>
          ) : (
            pedidosFiltrados.map((p) => renderCard(p, subTabActivo, handlers))
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <SubMenuPendientes pedidos={pedidos} onSelectSubTab={setSubTabActivo} />
  );
};

export default PedidosPendientes;
