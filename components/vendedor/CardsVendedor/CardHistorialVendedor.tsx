import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import type { Pedido } from "@/types/pedidos";
import React, { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import ChatModal from "../../Chat/ChatModal";
import LineaDivisoria from "../../UI/LineaDivisoria";
import { Chat, Comprobante, Remove } from "../../icons";
import CalificacionDada from "../../subcomponentes/CalificacionDada";
import TextoPedido from "../../subcomponentes/TextoPedido";

interface CardHistorialVendedorProps {
  pedido: Pedido;
  onEliminar: (id: string | number) => void;
  onVerComprobante: (id: string | number) => void;
}

export default function CardHistorialVendedor({
  pedido,
  onEliminar,
  onVerComprobante,
}: CardHistorialVendedorProps) {
  const { colors, fonts } = useTheme();
  const [expandido, setExpandido] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const calif = pedido.calificacionComprador;

  const r = pedido.respuestaSeleccionada;
  const precio = r?.precio ?? 0;
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

  const fechaFormateada = pedido.fechaSeleccion
    ? new Date(pedido.fechaSeleccion).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Sin fecha";

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
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        gap: Spacing.sm,
        elevation: 3,
      }}
    >
      {/* ── Header: comprador + precio ── */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.base,
            color: colors.textDefault,
            flex: 1,
          }}
        >
          {pedido.compradorNombre ?? "Comprador"}
        </Text>
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.base,
            color: colors.brandSeller,
          }}
        >
          ${precio.toLocaleString("es-AR")}
        </Text>
      </View>

      {/* ── Fecha ── */}
      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.sm,
          color: colors.textMuted,
        }}
      >
        Pedido del: {fechaFormateada}
      </Text>

      {/* ── Contenido expandible ── */}
      {expandido && (
        <View style={{ gap: Spacing.md, marginTop: Spacing.sm }}>
          {/* Listado del pedido */}
          <TextoPedido texto={pedido.textoPedido} />

          {/* ── Calificación al Comprador ── */}
          {calif && (
            <CalificacionDada
              estrellas={calif.estrellas}
              comentario={calif.comentario}
              label="Califiqué al comprador con:"
            />
          )}

          {(tieneComprobantes || tieneMensajes) && <LineaDivisoria />}

          {/* ── Ver Comprobante: solo si hay ── */}
          {tieneComprobantes && (
            <Pressable
              onPress={() => onVerComprobante(pedido.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: Spacing.sm,
                paddingVertical: Spacing.lg,
                borderRadius: BorderRadius.md,
                borderWidth: 1,
                borderColor: colors.textDefault,
                borderStyle: "dashed",
              }}
            >
              <Comprobante width={24} height={24} fill={colors.brandSeller} />
              <Text
                style={{
                  fontSize: FontSizes.sm,
                  fontFamily: fonts.robotoBold,
                  color: colors.brandSeller,
                  letterSpacing: 0.5,
                }}
              >
                {`Ver Comprobante${(pedido.comprobantes?.length ?? 0) > 1 ? `s (${pedido.comprobantes!.length})` : ""}`}
              </Text>
            </Pressable>
          )}

          {/* ── Mensajes: solo si hay ── */}
          {tieneMensajes && (
            <Pressable
              onPress={() => setChatVisible(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.cardBg,
                borderRadius: BorderRadius.lg,
                borderWidth: 1,
                borderColor: colors.brandSeller,
                padding: Spacing.lg,
                gap: Spacing.md,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: FontSizes.sm,
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
                    fontSize: FontSizes.xs,
                    fontFamily: fonts.robotoMedium,
                    color: colors.textDefault,
                  }}
                >
                  Mensajes
                </Text>
              </View>
            </Pressable>
          )}

          {/* ── ChatModal readOnly ── */}
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

          <LineaDivisoria />
        </View>
      )}

      {/* ── Toggle + Eliminar ── */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: Spacing.sm,
        }}
      >
        <Pressable onPress={() => setExpandido(!expandido)}>
          <Text
            style={{
              fontFamily: fonts.robotoMedium,
              fontSize: FontSizes.sm,
              color: colors.brandSeller,
              textDecorationLine: "underline",
            }}
          >
            {expandido ? "Ver menos" : "Ver más"}
          </Text>
        </Pressable>
        <Pressable onPress={handleEliminar} style={{ padding: Spacing.sm }}>
          <Remove width={26} height={26} fill={colors.textError} />
        </Pressable>
      </View>
    </View>
  );
}
