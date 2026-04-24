import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Chat, Comprobante, Enviar } from "../../icons";
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
  onPagoConfirmado: (id: string | number) => void;
  onPagoRechazado: (id: string | number) => void;
  onMensaje: (id: string | number) => void;
}

const CheckboxPagoCorrecto = ({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) => {
  const { colors, fonts } = useTheme();

  return (
    <Pressable
      onPress={onToggle}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: checked ? colors.brandSeller : colors.border,
          backgroundColor: checked ? colors.brandSeller : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && (
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>
            ✓
          </Text>
        )}
      </View>
      <Text
        style={{
          fontSize: FontSizes.sm,
          fontFamily: fonts.robotoMedium,
          color: colors.textDefault,
        }}
      >
        Pago correcto
      </Text>
    </Pressable>
  );
};

const ContenidoExpandible = ({
  pedidoId,
  textoPedido,
  nota,
  onVerPedido,
  onVerNota,
  onPagoConfirmado,
  onPagoRechazado,
  onMensaje,
}: {
  pedidoId: string | number;
  textoPedido: string;
  nota?: string;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onPagoConfirmado: (id: string | number) => void;
  onPagoRechazado: (id: string | number) => void;
  onMensaje: (id: string | number) => void;
}) => {
  const { colors, fonts } = useTheme();
  const [pagoChecked, setPagoChecked] = useState(false);

  return (
    <View style={{ gap: Spacing.md }}>
      {/* Ver pedido */}
      <VerBottomSheet onPress={() => onVerPedido(pedidoId)} variant="seller" />

      <LineaDivisoria />

      {/* Ver comprobante + Pago correcto */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Ver comprobante */}
        <Pressable
          onPress={() => console.log("TODO: abrir imagen comprobante")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.sm,
            backgroundColor: colors.textSecondaryBg,
            borderRadius: BorderRadius.md,
            padding: Spacing.md,
            flex: 1,
            marginRight: Spacing.md,
          }}
        >
          <Comprobante width={22} height={22} fill={colors.textDefault} />
          <Text
            style={{
              fontSize: FontSizes.sm,
              fontFamily: fonts.robotoMedium,
              color: colors.textDefault,
            }}
          >
            Ver Comprobante
          </Text>
        </Pressable>

        {/* Checkbox pago correcto */}
        <CheckboxPagoCorrecto
          checked={pagoChecked}
          onToggle={() => setPagoChecked((prev) => !prev)}
        />
      </View>

      {/* Aviso + Mensajes */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: Spacing.md,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: FontSizes.xs,
            fontFamily: fonts.robotoRegular,
            color: colors.textMuted,
            fontStyle: "italic",
          }}
        >
          Si el importe no coincide, contacta al comprador desde el botón de
          mensajes.
        </Text>

        <Pressable
          onPress={() => onMensaje(pedidoId)}
          style={{ alignItems: "center", gap: 4 }}
        >
          <Chat
            width={22}
            height={22}
            stroke={colors.brandSeller}
            strokeWidth={1.5}
            fill="white"
          />
          <Text
            style={{
              fontSize: FontSizes.xs,
              fontFamily: fonts.robotoMedium,
              color: colors.brandSeller,
            }}
          >
            Mensajes
          </Text>
        </Pressable>
      </View>

      {/* Nota del vendedor */}
      {nota && <NotaDelVendedor nota={nota} onVerNota={onVerNota} />}

      <LineaDivisoria />

      {/* CTA Pago Recibido */}
      <Button
        section="seller"
        variant="primary"
        width="full"
        icon={Enviar}
        iconPosition="left"
        disabled={!pagoChecked}
        onPress={() => onPagoConfirmado(pedidoId)}
      >
        Pago Recibido
      </Button>
    </View>
  );
};

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
          onVerPedido={onVerPedido}
          onVerNota={onVerNota}
          onPagoConfirmado={onPagoConfirmado}
          onPagoRechazado={onPagoRechazado}
          onMensaje={onMensaje}
        />
      }
    />
  );
}
