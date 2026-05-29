import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import type { Mensaje } from "@/types/pedidos";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import ChatModal from "../../Chat/ChatModal";
import { Chat, Comprobante, Historial } from "../../icons";
import AyudaReportar from "../../subcomponentes/AyudaReportar";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import NotaEnviada from "../../subcomponentes/NotaEnviada";
import VerBottomSheet from "../../subcomponentes/VerBottomSheet";
import Button from "../../UI/Button/Button";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardPagoObservadoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  compradorRatingCount?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
  mensajes?: Mensaje[];
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onVerComprobante: (id: string | number) => void;
  onAbrirIssue?: () => void;
}

const toMensajesModal = (mensajes?: Mensaje[]): Mensaje[] =>
  (mensajes ?? []).map((m) => ({
    id: m.id,
    texto: m.texto,
    remitenteId: m.remitenteId,
    timestamp: m.timestamp,
  }));

// ─── Contenido Expandible ─────────────────────────────────────────────────────

const ContenidoExpandible = ({
  pedidoId,
  nota,
  mensajes,
  compradorNombre,
  fechaSeleccion,
  onVerPedido,
  onVerNota,
  onVerComprobante,
  onAbrirIssue,
}: Omit<
  //omit = omitirá 3props de un tipo de 11 (compradorRating, precio, textoPedido)
  CardPagoObservadoProps,
  "compradorRating" | "precio" | "textoPedido"
>) => {
  const { colors, fonts } = useTheme();
  const { updateEstado, moverAHistorial, agregarMensaje } = useOrders();
  const [chatVisible, setChatVisible] = useState(false);

  const mensajesModal = toMensajesModal(mensajes);

  const handleMensajeEnviado = (texto: string) => {
    if (!texto.trim()) return;
    const nuevo: Mensaje = {
      id: Date.now().toString(),
      texto: texto.trim(),
      remitenteId: "vendedor",
      timestamp: new Date().toISOString(),
    };
    agregarMensaje(pedidoId, nuevo);
  };

  const handleArchivar = () => {
    Alert.alert(
      "Archivar pedido",
      "El pedido pasará al historial como cancelado. Podrás consultarlo si hay algún reclamo posterior.",
      [
        { text: "No, volver", style: "cancel" },
        {
          text: "Sí, archivar",
          style: "destructive",
          onPress: () => {
            updateEstado(pedidoId, "cancelado");
            moverAHistorial(pedidoId);
          },
        },
      ],
    );
  };

  return (
    <View
      style={{
        gap: Spacing.md,
        // backgroundColor: colors.background,
        // paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.lg,
      }}
    >
      {/* ── Aviso de estado pasivo ── */}
      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: BorderRadius.md,
          borderLeftWidth: 3,
          borderLeftColor: colors.brandSeller,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
        }}
      >
        <Text
          style={{
            fontSize: FontSizes.sm,
            fontFamily: fonts.robotoRegular,
            color: colors.textDefault,
            lineHeight: 20,
          }}
        >
          Esperando que{" "}
          <Text style={{ fontFamily: fonts.robotoBold }}>
            {compradorNombre ?? "el comprador"}
          </Text>{" "}
          resuelva el inconveniente con el pago.
        </Text>
      </View>

      {/* ── Ver Comprobante ── */}
      <Pressable
        onPress={() => onVerComprobante(pedidoId)}
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
          Ver Comprobante
        </Text>
      </Pressable>

      {/* ── Mensajes ── */}
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
          {mensajesModal.length > 0
            ? `${mensajesModal.length} mensaje${mensajesModal.length > 1 ? "s" : ""} en la conversación.`
            : "Sin mensajes aún. Podés escribirle al comprador."}
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

      {/* ── ChatModal ── */}
      <ChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        pedidoId={pedidoId}
        fechaSeleccion={fechaSeleccion}
        otroNombre={compradorNombre ?? "Comprador"}
        rolActual="vendedor"
        mensajesIniciales={mensajesModal.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }))}
        onMensajeEnviado={handleMensajeEnviado}
      />

      {/* ── Nota del vendedor ── */}
      <NotaEnviada nota={nota} />

      {/* ── Ver pedido ── */}
      <View style={{ alignSelf: "flex-start", paddingTop: Spacing.sm }}>
        <VerBottomSheet
          onPress={() => onVerPedido(pedidoId)}
          variant="seller"
        />
      </View>

      <LineaDivisoria />

      {/* ── Archivar ── */}
      <Button
        section="seller"
        variant="primary"
        width="full"
        icon={Historial}
        onPress={handleArchivar}
      >
        <Text>Archivar pedido</Text>
      </Button>

      <AyudaReportar // ← agregado
        role="seller"
        label="Reportar problema"
        onPress={() => onAbrirIssue?.()}
      />
    </View>
  );
};

// ─── Export principal ─────────────────────────────────────────────────────────

const ESTADO: EtiqEstadoType = "Pago observado";

export default function CardPagoObservado({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  compradorRatingCount,
  textoPedido,
  nota,
  precio,
  mensajes,
  onVerPedido,
  onVerNota,
  onVerComprobante,
  onAbrirIssue,
}: CardPagoObservadoProps) {
  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      compradorRatingCount={compradorRatingCount}
      precio={precio}
      contenidoExpandible={
        <ContenidoExpandible
          pedidoId={pedidoId}
          nota={nota}
          mensajes={mensajes}
          compradorNombre={compradorNombre}
          fechaSeleccion={fechaSeleccion}
          onVerPedido={onVerPedido}
          onVerNota={onVerNota}
          onVerComprobante={onVerComprobante}
          onAbrirIssue={onAbrirIssue}
        />
      }
    />
  );
}
