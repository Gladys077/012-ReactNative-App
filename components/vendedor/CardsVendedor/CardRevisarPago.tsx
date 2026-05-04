import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useOrders } from "../../../context/OrdersContext";
import { Mensaje } from "../../../types/pedidos";
import ChatModal from "../../Chat/ChatModal";
import { Cancel, Chat, Check, Comprobante } from "../../icons";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import NotaEnviada from "../../subcomponentes/NotaEnviada";
import VerBottomSheet from "../../subcomponentes/VerBottomSheet";
import Button from "../../UI/Button/Button";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

interface CardRevisarPagoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
  onVerPedido: (id: string | number) => void;
  onVerComprobante: (id: string | number) => void;
}

type EstadoPago = "correcto" | "problema" | null;

// ─── Toggle Segmentado ────────────────────────────────────────────────────────

const ToggleVerificacionPago = ({
  value,
  onChange,
}: {
  value: EstadoPago;
  onChange: (v: EstadoPago) => void;
}) => {
  const { colors, fonts } = useTheme();

  const opcion = (
    tipo: "correcto" | "problema",
    icono: React.ReactNode,
    label: string,
    isFirst: boolean,
  ) => {
    const seleccionado = value === tipo;
    return (
      <Pressable
        onPress={() => onChange(seleccionado ? null : tipo)}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: Spacing.sm,
          paddingVertical: Spacing.lg + 2,
          backgroundColor: seleccionado ? colors.brandSeller : "transparent",
          borderTopLeftRadius: isFirst ? BorderRadius.md : 0,
          borderBottomLeftRadius: isFirst ? BorderRadius.md : 0,
          borderTopRightRadius: isFirst ? 0 : BorderRadius.md,
          borderBottomRightRadius: isFirst ? 0 : BorderRadius.md,
        }}
      >
        {icono}
        <Text
          style={{
            fontSize: FontSizes.sm,
            fontFamily: fonts.robotoBold,
            color: seleccionado ? colors.textOnColor : colors.brandSeller,
          }}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: BorderRadius.md,
        borderWidth: 1.5,
        borderColor: colors.brandSeller,
        overflow: "hidden",
      }}
    >
      {opcion(
        "correcto",
        <Check
          width={16}
          height={16}
          fill={value === "correcto" ? colors.textOnColor : colors.brandSeller}
        />,
        "Pago Correcto",
        true,
      )}
      <View style={{ width: 1.5, backgroundColor: colors.brandSeller }} />
      {opcion(
        "problema",
        <Cancel
          width={16}
          height={16}
          stroke={
            value === "problema" ? colors.textOnColor : colors.brandSeller
          }
          strokeWidth={2}
        />,
        "A Resolver",
        false,
      )}
    </View>
  );
};

// ─── Contenido Expandible ─────────────────────────────────────────────────────

const ContenidoExpandible = ({
  pedidoId,
  textoPedido,
  nota,
  compradorNombre,
  fechaSeleccion,
  onVerPedido,
  onVerComprobante,
}: {
  pedidoId: string | number;
  textoPedido: string;
  nota?: string;
  compradorNombre?: string;
  fechaSeleccion?: string;
  onVerPedido: (id: string | number) => void;
  onVerComprobante: (id: string | number) => void;
}) => {
  const { colors, fonts } = useTheme();
  const { updateEstado, agregarMensaje } = useOrders();

  const [estadoPago, setEstadoPago] = useState<EstadoPago>(null);
  const [chatVisible, setChatVisible] = useState(false);

  const handleMensajeEnviado = (texto: string) => {
    if (!texto.trim()) return;

    const nuevoMensaje: Mensaje = {
      id: Date.now().toString(),
      texto: texto.trim(),
      remitenteId: "vendedor",
      timestamp: new Date().toISOString(),
    };

    agregarMensaje(pedidoId, nuevoMensaje);

    if (estadoPago === "problema") {
      updateEstado(pedidoId, "pago_observado");
      setChatVisible(false);
    }
  };

  const handlePagoConfirmado = () => {
    updateEstado(pedidoId, "en_preparacion");
  };

  const handleAccionPrincipal = () => {
    if (estadoPago === "correcto") {
      handlePagoConfirmado();
    } else if (estadoPago === "problema") {
      updateEstado(pedidoId, "pago_observado");
    }
  };

  return (
    <View
      style={{
        gap: Spacing.md,
        backgroundColor: colors.background,
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.lg,
      }}
    >
      {/* ── Cabecera sección ── */}
      <Text
        style={{
          color: colors.textDefault,
          backgroundColor: colors.background,
          textAlign: "center",
          fontSize: FontSizes.sm,
          fontFamily: fonts.robotoBold,
          letterSpacing: 1,
          textTransform: "uppercase",
          paddingVertical: 4,
        }}
      >
        Verificar Pago
      </Text>

      {/* ── Ver Comprobante ── */}
      <Pressable
        onPress={() => onVerComprobante(pedidoId)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: Spacing.sm,
          paddingVertical: Spacing.lg,
          marginBottom: Spacing.md,
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

      {/* ── Toggle ── */}
      <ToggleVerificacionPago value={estadoPago} onChange={setEstadoPago} />

      {/* ── Aviso + Mensajes ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.cardBg,
          borderRadius: BorderRadius.lg,
          borderWidth: 1,
          borderColor: colors.brandSeller,
          padding: Spacing.lg,
          gap: Spacing.md,
          marginVertical: Spacing.md,
        }}
      >
        <Pressable
          onPress={() => setChatVisible(true)}
          style={{ alignItems: "center", gap: 8, flexDirection: "row" }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: FontSizes.sm,
              fontFamily: fonts.robotoRegular,
              color: colors.textDefault,
            }}
          >
            Si el importe no coincide o existe algún problema, enviá un mensaje
            al comprador.
          </Text>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
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
      </View>

      {/* ── Chat Modal ── */}
      <ChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        pedidoId={pedidoId}
        fechaSeleccion={fechaSeleccion}
        otroNombre={compradorNombre ?? "Comprador"}
        rolActual="vendedor"
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

      {/* ── CTA principal ── */}
      <Button
        section="seller"
        variant="primary"
        width="full"
        disabled={estadoPago === null}
        onPress={handleAccionPrincipal}
        styleAdd={
          estadoPago === "problema"
            ? {
                backgroundColor: colors.brandSeller,
                borderWidth: 2,
                elevation: 0,
                shadowOpacity: 0,
              }
            : {}
        }
      >
        <Text>
          {estadoPago === "problema"
            ? "Mover a Pago Observado"
            : "Confirmo Pago Correcto"}
        </Text>
      </Button>
    </View>
  );
};

// ─── Export principal ─────────────────────────────────────────────────────────

const ESTADO: EtiqEstadoType = "Revisar pago";

export default function CardRevisarPago({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  nota,
  precio,
  onVerPedido,
  onVerComprobante,
}: CardRevisarPagoProps) {
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
          textoPedido={textoPedido}
          nota={nota}
          compradorNombre={compradorNombre}
          fechaSeleccion={fechaSeleccion}
          onVerPedido={onVerPedido}
          onVerComprobante={onVerComprobante}
        />
      }
    />
  );
}
