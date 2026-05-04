import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import type { Mensaje } from "@/types/pedidos";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import ChatModal from "../../Chat/ChatModal";
import { Chat, Entregado, Telephone, Ubicacion } from "../../icons";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import NotaEnviada from "../../subcomponentes/NotaEnviada";
import VerBottomSheet from "../../subcomponentes/VerBottomSheet";
import Button from "../../UI/Button/Button";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardEnCaminoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
  mensajes?: Mensaje[];
  direccionComprador?: string;
  celularComprador?: number;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onListoParaEnviar: (id: string | number) => void;
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
  direccionComprador,
  celularComprador,
  fechaSeleccion,
  onVerPedido,
  onVerNota,
  onListoParaEnviar,
}: {
  pedidoId: string | number;
  nota?: string;
  mensajes?: Mensaje[];
  compradorNombre?: string;
  direccionComprador?: string;
  celularComprador?: number;
  fechaSeleccion?: string;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onListoParaEnviar: (id: string | number) => void;
}) => {
  const { colors, fonts } = useTheme();
  const { updateEstado, agregarMensaje } = useOrders();
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

  const handleListoParaEnviar = () => {
    Alert.alert("En camino", "¿Confirmás que el pedido ha sido entregado?", [
      { text: "No, volver", style: "cancel" },
      {
        text: "Sí, confirmar",
        onPress: () => {
          updateEstado(pedidoId, "entregado_pendiente_calif");
        },
      },
    ]);
  };

  return (
    <View
      style={{
        gap: Spacing.md,
        // backgroundColor: colors.background,
        // paddingHorizontal: Spacing.sm,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.lg,
      }}
    >
      {/* ── Mensajes ── */}
      {mensajesModal.length > 0 && (
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
                fontSize: FontSizes.base,
                fontFamily: fonts.robotoMedium,
                color: colors.textDefault,
              }}
            >
              Mensajes
            </Text>
          </View>
        </Pressable>
      )}

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

      {/* ── Datos del comprador ── */}
      {(direccionComprador || celularComprador) && (
        <View
          style={{
            backgroundColor: colors.cardBg,
            borderRadius: BorderRadius.md,
            padding: Spacing.md,
            gap: Spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.base,
              fontFamily: fonts.robotoBold,
              color: colors.textDefault,
            }}
          >
            Datos del comprador
          </Text>
          {direccionComprador && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: Spacing.sm,
              }}
            >
              <Ubicacion width={16} height={16} fill={colors.textDefault} />
              <Text
                style={{
                  fontSize: FontSizes.base,
                  fontFamily: fonts.robotoRegular,
                  color: colors.textDefault,
                  flex: 1,
                }}
              >
                {direccionComprador}
              </Text>
            </View>
          )}
          {celularComprador && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: Spacing.sm,
              }}
            >
              <Telephone width={16} height={16} fill={colors.textDefault} />
              <Text
                style={{
                  fontSize: FontSizes.base,
                  fontFamily: fonts.robotoRegular,
                  color: colors.textDefault,
                  flex: 1,
                }}
              >
                {celularComprador}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* ── Ver pedido ── */}
      <View style={{ alignSelf: "flex-start", paddingTop: Spacing.sm }}>
        <VerBottomSheet
          onPress={() => onVerPedido(pedidoId)}
          variant="seller"
        />
      </View>

      <LineaDivisoria />

      {/* ── Listo para enviar ── */}
      <Button
        section="seller"
        variant="primary"
        width="full"
        icon={Entregado}
        iconSize={32}
        onPress={handleListoParaEnviar}
      >
        <Text>Entregado</Text>
      </Button>
    </View>
  );
};

// ─── Export principal ─────────────────────────────────────────────────────────

const ESTADO: EtiqEstadoType = "En camino";

export default function CardEnCamino({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  nota,
  precio,
  mensajes,
  direccionComprador,
  celularComprador,
  onVerPedido,
  onVerNota,
  onListoParaEnviar,
}: CardEnCaminoProps) {
  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      precio={precio}
      contenidoExpandible={
        <ContenidoExpandible
          pedidoId={pedidoId}
          nota={nota}
          mensajes={mensajes}
          compradorNombre={compradorNombre}
          direccionComprador={direccionComprador}
          celularComprador={celularComprador}
          fechaSeleccion={fechaSeleccion}
          onVerPedido={onVerPedido}
          onVerNota={onVerNota}
          onListoParaEnviar={onListoParaEnviar}
        />
      }
    />
  );
}
