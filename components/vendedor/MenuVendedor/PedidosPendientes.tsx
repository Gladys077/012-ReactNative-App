import { FontSizes, Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import type { Pedido } from "../../../types/pedidos";
import BottomSheetIssueSelector from "../../subcomponentes/BottomSheetIssueSelector";

import { useToast } from "../../../context/ToastContext";
import CardEnCamino from "../CardsVendedor/CardEnCamino";
import CardEnPreparacion from "../CardsVendedor/CardEnPreparacion";
import CardListoParaEnviar from "../CardsVendedor/CardListoParaEnviar";
import CardPagoObservado from "../CardsVendedor/CardPagoObservado";
import CardPagoPendiente from "../CardsVendedor/CardPagoPendiente";
import CardRevisarPago from "../CardsVendedor/CardRevisarPago";
import SubMenuPendientes, {
  estadoSistemaASubTab,
  SUB_TABS,
  type SubTabPendiente,
} from "./SubMenuPendientes";

interface Props {
  pedidos: Pedido[];
  subTabActivo: SubTabPendiente | null;
  onSubTabChange: (subTab: SubTabPendiente | null) => void;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onVerComprobante: (id: string | number) => void;
  onPagoConfirmado: (id: string | number) => void;
  onPagoRechazado: (id: string | number) => void;
  onMensaje: (id: string | number) => void;
  onListoParaEnviar: (id: string | number) => void;
  onEntregado: (id: string | number) => void;
}

// ─── Opciones de incidencias (seller) ────────────────────────────────────────
// "Otro" se agrega automáticamente
const OPCIONES_ISSUE_SELLER = [
  "Sin respuesta del comprador.",
  "Hubo un problema con el pago.",
  "El comprador no estaba en el domicilio.",
];

// Tipo específico para renderCard ────────────────────────────────────────
type CardHandlers = {
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onVerComprobante: (id: string | number) => void;
  onPagoConfirmado: (id: string | number) => void;
  onPagoRechazado: (id: string | number) => void;
  onMensaje: (id: string | number) => void;
  onListoParaEnviar: (id: string | number) => void;
  onEntregado: (id: string | number) => void;
  onReportIssue: (pedidoId: string | number) => void; //para reportar xq no se concretó la transacción
};

// ─── Renderer por subtab ──────────────────────────────────────────────────────

function renderCard(
  pedido: Pedido,
  subTab: SubTabPendiente,
  handlers: CardHandlers,
) {
  const common = {
    pedidoId: pedido.id,
    fechaSeleccion: pedido.fechaSeleccion,
    compradorNombre: pedido.compradorNombre,
    compradorRating: pedido.compradorRating,
    compradorRatingCount: pedido.compradorRatingCount,
    textoPedido: pedido.textoPedido,
    nota: pedido.respuestaSeleccionada?.nota,
    precio: pedido.respuestaSeleccionada?.precio ?? 0,
    direccionComprador: pedido.direccionComprador,
    celularComprador: pedido.celularComprador,
    onVerPedido: handlers.onVerPedido,
    onVerNota: handlers.onVerNota,
  };

  switch (subTab) {
    case "esperando_pago":
      return (
        <CardPagoPendiente
          key={pedido.id}
          {...common}
          onAbrirIssue={() => handlers.onReportIssue(pedido.id)}
        />
      );

    case "revisar_pago":
      return (
        <CardRevisarPago
          key={pedido.id}
          {...common}
          onVerComprobante={handlers.onVerComprobante}
        />
      );

    case "pago_observado":
      return (
        <CardPagoObservado
          key={pedido.id}
          {...common}
          mensajes={pedido.mensajes}
          onVerComprobante={handlers.onVerComprobante}
          onAbrirIssue={() => handlers.onReportIssue(pedido.id)}
        />
      );
    case "en_preparacion":
      return (
        <CardEnPreparacion
          key={pedido.id}
          {...common}
          mensajes={pedido.mensajes}
          onAbrirIssue={() => handlers.onReportIssue(pedido.id)}
        />
      );

    case "listo_para_enviar":
      return (
        <CardListoParaEnviar
          key={pedido.id}
          {...common}
          mensajes={pedido.mensajes}
        />
      );

    case "en_camino":
      return (
        <CardEnCamino
          key={pedido.id}
          {...common}
          mensajes={pedido.mensajes}
          onAbrirIssue={() => handlers.onReportIssue(pedido.id)}
        />
      );
  }
}

// ─── Componente ───────────────────────────────────────────────────────────────

const PedidosPendientes = ({
  pedidos,
  subTabActivo,
  onSubTabChange,
  onVerPedido,
  onVerNota,
  onVerComprobante,
  onPagoConfirmado,
  onPagoRechazado,
  onMensaje,
  onListoParaEnviar,
  onEntregado,
}: Props) => {
  const { colors, fonts } = useTheme();
  const { updateEstado, moverAHistorialVendedor } = useOrders();
  const { showToast } = useToast();
  const [issueVisible, setIssueVisible] = useState(false);
  const [pedidoIssueId, setPedidoIssueId] = useState<string | number | null>(
    null,
  );

  const handleAbrirIssue = (pedidoId: string | number) => {
    setPedidoIssueId(pedidoId);
    setIssueVisible(true);
  };

  const handleIssueEnviado = (opcion: string, mensaje?: string) => {
    if (!pedidoIssueId) return;

    setIssueVisible(false);
    showToast(
      "Problema registrado. El pedido pasará al historial como: No concretado",
    );

    updateEstado(pedidoIssueId, "no_concretado");
    moverAHistorialVendedor(pedidoIssueId, { opcion, detalle: mensaje });
  };

  const pedidosFiltrados = subTabActivo
    ? pedidos.filter(
        (p) => estadoSistemaASubTab[p.estadoSistema] === subTabActivo,
      )
    : [];

  const labelSubTab = SUB_TABS.find((t) => t.key === subTabActivo)?.label ?? "";

  const handlers = {
    onVerPedido,
    onVerNota,
    onVerComprobante,
    onPagoConfirmado,
    onPagoRechazado,
    onMensaje,
    onListoParaEnviar,
    onEntregado,
    onReportIssue: handleAbrirIssue,
  };

  const menuKeyRef = useRef(0);
  const prevSubTabRef = useRef(subTabActivo);

  if (prevSubTabRef.current !== null && subTabActivo === null) {
    menuKeyRef.current += 1; // incrementa solo cuando "volvés" al submenú
  }
  prevSubTabRef.current = subTabActivo;

  if (subTabActivo === null) {
    return (
      <SubMenuPendientes
        key={menuKeyRef.current}
        pedidos={pedidos}
        onSelectSubTab={onSubTabChange}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Título informativo */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: Spacing.sm,
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.lg,
          paddingBottom: Spacing.md,
          backgroundColor: colors.bgSubMenuPendientes,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          marginBottom: Spacing.md,
        }}
      >
        <Text
          style={{
            color: colors.textDefault,
            fontSize: FontSizes.sm,
            fontFamily: fonts.robotoMedium,
            textTransform: "uppercase",
          }}
        >
          {labelSubTab}
        </Text>
        <Text
          style={{
            color: colors.textDefault,
            fontSize: FontSizes.sm,
            fontFamily: fonts.robotoRegular,
          }}
        >
          ({pedidosFiltrados.length})
        </Text>
      </View>

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

      <BottomSheetIssueSelector
        isVisible={issueVisible}
        role="seller"
        opciones={OPCIONES_ISSUE_SELLER}
        titulo={"¿Qué ocurrió con el pedido?"}
        subtitulo={
          'Al presionar "Enviar", el pedido pasará al historial como "No concretado".'
        }
        onEnviar={handleIssueEnviado}
        onCerrar={() => setIssueVisible(false)}
      />
    </View>
  );
};

export default PedidosPendientes;
