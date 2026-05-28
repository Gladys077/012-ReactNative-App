import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import type { Pedido } from "@/types/pedidos";
import React, { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import ChatModal from "../../Chat/ChatModal";
import { Chat, Comprobante, Remove } from "../../icons";
import CalificacionDada from "../../subcomponentes/CalificacionDada";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import TextoPedido from "../../subcomponentes/TextoPedido";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardHistorialVendedorProps {
  pedido: Pedido;
  onEliminar: (id: string | number) => void;
  onVerComprobante: (id: string | number) => void;
}

// ─── Contenido Expandible ─────────────────────────────────────────────────────

const ContenidoExpandible = ({
  pedido,
  onVerComprobante,
}: {
  pedido: Pedido;
  onVerComprobante: (id: string | number) => void;
}) => {
  const { colors, fonts } = useTheme();
  const [chatVisible, setChatVisible] = useState(false);

  const calif = pedido.calificacionComprador;
  const tieneComprobantes = (pedido.comprobantes?.length ?? 0) > 0;

  const mensajesModal = useMemo(
    () =>
      (pedido.mensajes ?? []).map((m) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      })),
    [pedido.mensajes],
  );
  const tieneMensajes = mensajesModal.length > 0;

  return (
    <View style={{ gap: Spacing.md }}>
      <TextoPedido texto={pedido.textoPedido} />

      {calif && (
        <CalificacionDada
          estrellas={calif.estrellas}
          comentario={calif.comentario}
          label="Califiqué al comprador con:"
        />
      )}

      {(tieneComprobantes || tieneMensajes) && <LineaDivisoria />}

      {tieneComprobantes && (
        <Pressable
          onPress={() => onVerComprobante(pedido.id)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: Spacing.sm,
            paddingVertical: Spacing.lg,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.textDefault,
            borderStyle: "dashed",
          }}
        >
          <Comprobante width={24} height={24} fill={colors.brandSeller} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.robotoBold,
              color: colors.brandSeller,
              letterSpacing: 0.5,
            }}
          >
            {`Ver Comprobante${(pedido.comprobantes?.length ?? 0) > 1 ? `s (${pedido.comprobantes!.length})` : ""}`}
          </Text>
        </Pressable>
      )}

      {tieneMensajes && (
        <Pressable
          onPress={() => setChatVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.cardBg,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.brandSeller,
            padding: Spacing.lg,
            gap: Spacing.md,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 13,
              fontFamily: fonts.robotoRegular,
              color: colors.textDefault,
            }}
          >
            {`${mensajesModal.length} mensaje${mensajesModal.length > 1 ? "s" : ""} en la conversación.`}
          </Text>
          <View style={{ alignItems: "center", gap: 4 }}>
            <Chat
              width={24}
              height={24}
              stroke={colors.textDefault}
              strokeWidth={1.5}
              fill="transparent"
            />
            <Text
              style={{
                fontSize: 11,
                fontFamily: fonts.robotoMedium,
                color: colors.textDefault,
              }}
            >
              Mensajes
            </Text>
          </View>
        </Pressable>
      )}

      <ChatModal
        key={chatVisible ? "open" : "closed"}
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        pedidoId={pedido.id}
        fechaSeleccion={pedido.fechaSeleccion}
        otroNombre={pedido.compradorNombre ?? "Comprador"}
        rolActual="vendedor"
        mensajesIniciales={mensajesModal}
        readOnly
      />

      {pedido.motivoNoConcretado && (
        <View style={{ gap: Spacing.sm }}>
          <LineaDivisoria />

          <Text
            style={{
              fontFamily: fonts.robotoMedium,
              color: colors.textMuted,
            }}
          >
            ¿Qué sucedió?
          </Text>
          <Text
            style={{
              fontFamily: fonts.robotoRegular,
              color: colors.textDefault,
            }}
          >
            {pedido.motivoNoConcretado.opcion}
          </Text>

          {pedido.motivoNoConcretado.detalle && (
            <Text
              style={{
                fontFamily: fonts.robotoRegular,
                color: colors.textMuted,
              }}
            >
              {pedido.motivoNoConcretado.detalle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

// ─── Export principal ─────────────────────────────────────────────────────────

// const ESTADO: EtiqEstadoType = "Entregado";

export default function CardHistorialVendedor({
  pedido,
  onEliminar,
  onVerComprobante,
}: CardHistorialVendedorProps) {
  const { colors } = useTheme();

  const ESTADO: EtiqEstadoType =
    pedido.estadoSistema === "no_concretado" ? "No concretado" : "Entregado";

  const r = pedido.respuestaSeleccionada;
  const precio = r?.precio ?? 0;

  const handleEliminar = () => {
    Alert.alert(
      "Eliminar del historial",
      "¿Querés eliminar este pedido de tu historial?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onEliminar(pedido.id),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <CardVendedorBase
      fechaSeleccion={pedido.fechaSeleccion}
      mostrarTiempoAceptacion={false}
      estado={ESTADO}
      compradorNombre={pedido.compradorNombre}
      compradorRating={pedido.compradorRating}
      precio={precio}
      elevation={3}
      contenidoExpandible={
        <ContenidoExpandible
          pedido={pedido}
          onVerComprobante={onVerComprobante}
        />
      }
    >
      {/* Botón eliminar — siempre visible, fuera del toggle */}
      <Pressable
        onPress={handleEliminar}
        style={{ alignSelf: "flex-end", padding: Spacing.sm }}
      >
        <Remove width={26} height={26} fill={colors.textError} />
      </Pressable>
    </CardVendedorBase>
  );
}
