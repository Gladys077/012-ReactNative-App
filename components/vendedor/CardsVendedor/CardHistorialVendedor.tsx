import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import type { Pedido } from "@/types/pedidos";
import React, { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import ChatModal from "../../Chat/ChatModal";
import LineaDivisoria from "../../UI/LineaDivisoria";
import { Chat, Comprobante, Remove } from "../../icons";

interface CardHistorialVendedorProps {
  pedido: Pedido;
  onEliminar: (id: string | number) => void;
  onVerComprobante: (id: string | number) => void;
}

const FilaInfo = ({ label, valor }: { label: string; valor: string }) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: Spacing.sm, flexWrap: "wrap" }}>
      <Text
        style={{
          fontFamily: fonts.robotoBold,
          fontSize: FontSizes.sm,
          color: colors.textMuted,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          flex: 1,
        }}
      >
        {valor}
      </Text>
    </View>
  );
};

export default function CardHistorialVendedor({
  pedido,
  onEliminar,
  onVerComprobante,
}: CardHistorialVendedorProps) {
  const { colors, fonts } = useTheme();
  const [expandido, setExpandido] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

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

  console.log("mensajesModal:", JSON.stringify(mensajesModal, null, 2));

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
          <Text
            style={{
              backgroundColor: colors.textSecondaryBg,
              borderRadius: BorderRadius.md,
              padding: Spacing.md,
              fontFamily: fonts.robotoRegular,
              fontSize: FontSizes.sm,
              color: colors.textDefault,
              lineHeight: 22,
            }}
          >
            {pedido.textoPedido}
          </Text>

          <LineaDivisoria />

          {/* Datos del comprador */}
          <Text
            style={{
              fontFamily: fonts.robotoBold,
              fontSize: FontSizes.sm,
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            Datos del comprador
          </Text>
          <FilaInfo label="Dirección:" valor={pedido.direccionComprador} />
          <FilaInfo
            label="Celular:"
            valor={pedido.celularComprador?.toString() ?? "—"}
          />

          <LineaDivisoria />

          {/* ── Ver Comprobante ── */}
          <Pressable
            onPress={() => tieneComprobantes && onVerComprobante(pedido.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: Spacing.sm,
              paddingVertical: Spacing.lg,
              borderRadius: BorderRadius.md,
              borderWidth: 1,
              borderColor: tieneComprobantes
                ? colors.textDefault
                : colors.textMuted,
              borderStyle: "dashed",
              opacity: tieneComprobantes ? 1 : 0.45,
            }}
          >
            <Comprobante
              width={24}
              height={24}
              fill={tieneComprobantes ? colors.brandSeller : colors.textMuted}
            />
            <Text
              style={{
                fontSize: FontSizes.sm,
                fontFamily: fonts.robotoBold,
                color: tieneComprobantes
                  ? colors.brandSeller
                  : colors.textMuted,
                letterSpacing: 0.5,
              }}
            >
              {tieneComprobantes
                ? `Ver Comprobante${(pedido.comprobantes?.length ?? 0) > 1 ? `s (${pedido.comprobantes!.length})` : ""}`
                : "Sin comprobantes"}
            </Text>
          </Pressable>

          {/* ── Mensajes ── */}
          <Pressable
            onPress={() => tieneMensajes && setChatVisible(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.cardBg,
              borderRadius: BorderRadius.lg,
              borderWidth: 1,
              borderColor: tieneMensajes
                ? colors.brandSeller
                : colors.textMuted,
              padding: Spacing.lg,
              gap: Spacing.md,
              opacity: tieneMensajes ? 1 : 0.45,
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
              {tieneMensajes
                ? `${mensajesModal.length} mensaje${mensajesModal.length > 1 ? "s" : ""} en la conversación.`
                : "Sin mensajes en esta venta."}
            </Text>
            <View style={{ alignItems: "center", gap: 4 }}>
              <Chat
                width={24}
                height={24}
                stroke={tieneMensajes ? colors.textDefault : colors.textMuted}
                strokeWidth={1.5}
                fill="transparent"
              />
              <Text
                style={{
                  fontSize: FontSizes.xs,
                  fontFamily: fonts.robotoMedium,
                  color: tieneMensajes ? colors.textDefault : colors.textMuted,
                }}
              >
                Mensajes
              </Text>
            </View>
          </Pressable>

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
