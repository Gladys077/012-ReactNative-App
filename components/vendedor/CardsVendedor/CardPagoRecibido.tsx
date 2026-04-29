// CardPagoRecibido.tsx

import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ChatModal from "../../Chat/ChatModal";
import { Cancel, Chat, Check, Comprobante, Enviar } from "../../icons";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import NotaDelVendedor from "../../subcomponentes/NotaDelVendedor";
import VerBottomSheet from "../../subcomponentes/VerBottomSheet";
import Button from "../../UI/Button/Button";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

interface CardPagoRecibidoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onVerComprobante: (id: string | number) => void;
  onPagoConfirmado: (id: string | number) => void;
  onPagoRechazado: (id: string | number) => void;
  onMensaje: (id: string | number) => void;
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
          backgroundColor: seleccionado
            ? colors.brandSeller // naranja cuando está activo
            : "transparent",
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
            color: seleccionado ? colors.textDefault : colors.textOnColor,
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
          fill={value === "correcto" ? colors.textDefault : colors.textOnColor}
        />,
        "Pago Correcto",
        true,
      )}

      {/* Divisor central */}
      <View style={{ width: 1.5, backgroundColor: colors.brandSeller }} />

      {opcion(
        "problema",
        <Cancel
          width={16}
          height={16}
          stroke={
            value === "problema" ? colors.textDefault : colors.textOnColor
          }
          strokeWidth={2}
        />,
        "Hay Problemas",
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
  onVerPedido,
  onVerNota,
  onVerComprobante,
  onPagoConfirmado,
  onPagoRechazado,
  onMensaje,
  compradorNombre,
}: {
  pedidoId: string | number;
  textoPedido: string;
  nota?: string;
  compradorNombre?: string;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onVerComprobante: (id: string | number) => void;
  onPagoConfirmado: (id: string | number) => void;
  onPagoRechazado: (id: string | number) => void;
  onMensaje: (id: string | number) => void;
}) => {
  const { colors, fonts } = useTheme();
  const [estadoPago, setEstadoPago] = useState<EstadoPago>(null);
  const [chatVisible, setChatVisible] = useState(false);

  const handleToggle = (v: EstadoPago) => {
    setEstadoPago(v);
    if (v === "problema") onPagoRechazado(pedidoId);
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

      {/* ── Toggle SÍ / NO ── */}
      <ToggleVerificacionPago value={estadoPago} onChange={handleToggle} />

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
          onPress={() => {
            onMensaje(pedidoId);
            setChatVisible(true);
          }}
          style={{
            alignItems: "center",
            gap: 8,
            flexDirection: "row",
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
            Si el importe no coincide, o existe algún problema envía un mensaje
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
        {/* ── Chat Modal ── */}
        <ChatModal
          visible={chatVisible}
          onClose={() => setChatVisible(false)}
          pedidoId={pedidoId}
          vendedorNombre={compradorNombre ?? "Comprador"}
          vendedorAlias=""
        />
      </View>

      {/* ── Nota del vendedor ── */}
      {nota && <NotaDelVendedor nota={nota} onVerNota={onVerNota} />}

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
        icon={Enviar}
        iconPosition="left"
        disabled={estadoPago !== "correcto"}
        onPress={() => onPagoConfirmado(pedidoId)}
      >
        Confirmar Pago Recibido
      </Button>
    </View>
  );
};

// ─── Export principal ─────────────────────────────────────────────────────────
const ESTADO: EtiqEstadoType = "Pago recibido";

export default function CardPagoRecibido({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  nota,
  precio,
  onVerPedido,
  onVerNota,
  onVerComprobante,
  onPagoConfirmado,
  onPagoRechazado,
  onMensaje,
}: CardPagoRecibidoProps) {
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
          onVerPedido={onVerPedido}
          onVerNota={onVerNota}
          onVerComprobante={onVerComprobante}
          onPagoConfirmado={onPagoConfirmado}
          onPagoRechazado={onPagoRechazado}
          onMensaje={onMensaje}
        />
      }
    />
  );
}
