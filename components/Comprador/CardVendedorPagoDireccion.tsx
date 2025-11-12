import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import DireccionEntrega from "../subcomponentes/DireccionEntrega";
import EstrellaReputacion from "../subcomponentes/EstrellaReputacion";
import FormaDePago from "../subcomponentes/FormaDePago";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";
import PagoEfectivo from "../subcomponentes/PagoEfectivo";
import PagoTransferencia from "../subcomponentes/PagoTransferencia";
import Button from "../UI/Button/Button";

interface CardVendedorPagoDireccionProps {
  id: string | number;
  nombreNegocio: string;
  rating: number; // De 0 a 5
  monto: number;
  nota?: string;
  duracionCronometro: number; // En minutos
  alias: string;
  entidad: string;
  titular: string;
  direccion: string;
  // importe: string;
  onEditarDireccion: () => void;
  onVerPedido: (id: string | number) => void;
  onFinishCronometro?: () => void;
  onVerNota?: (nota: string) => void;
}

export default function CardVendedorPagoDireccion({
  id,
  nombreNegocio,
  rating,
  monto,
  nota,
  duracionCronometro,
  alias,
  entidad,
  titular,
  direccion,
  onEditarDireccion,
  onVerPedido,
  onFinishCronometro,
  onVerNota,
}: CardVendedorPagoDireccionProps) {
  const { colors } = useTheme();
  const [metodo, setMetodo] = useState<"transferencia" | "efectivo">("transferencia");
  const [importe, setImporte] = useState("");
  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);

  const handleCargarComprobante = () => {
    // TODO: (Simulación) en real usaría expo-document-picker o image-picker
    setComprobanteUri("comprobante_simulado.jpg");
  };

  const handleEliminarComprobante = () => setComprobanteUri(null);

  const handleSubmit = () => {
    console.log("Enviar datos del pedido", { metodo, importe, comprobanteUri });
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.xxl,
        gap: Spacing.md,
        borderTopWidth: 1,
        borderBottomWidth: 4,
        borderColor: colors.borderTopBottom,
        elevation: 2,
        marginHorizontal: 8,
        marginVertical: 8,
      }}
    >
      {/* Header: Nombre + Rating + Cronómetro */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.md,
        }}
      >
        {/* Datos del vendedor */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: FontSizes.md,
              color: colors.textDefault,
              marginBottom: 4,
            }}
          >
            {nombreNegocio}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <EstrellaReputacion rating={rating} size={14} />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: FontSizes.sm,
                color: colors.textMuted,
              }}
            >
              ({rating.toFixed(1)})
            </Text>
          </View>
        </View>

      {/* Cronómetro y total */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Cronometro id={`pago_${id}`} tipo="pagar" duracionInicial={duracionCronometro} />
        {/* <Text
          style={{
            fontFamily: "Roboto-Bold",
            fontSize: FontSizes.lg,
            color: colors.textDefault,
          }}
        >
          ${total}
        </Text> */}
      </View>

      {/* Nota + Presupuesto */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Nota del vendedor */}
        <NotaDelVendedor nota={nota} onVerNota={onVerNota} />


        {/* Título Presupuesto */}
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          Presupuesto:
        </Text>
      </View>

      {/* "Ver pedido" */}
      <Text
        onPress={() => onVerPedido(id)}
        style={{
          fontFamily: "Roboto-Medium",
          color: colors.brandBuyer,
          fontSize: FontSizes.base,
          textAlign: "right",
        }}
      >
        Ver pedido
      </Text>

      <FormaDePago metodo={metodo} onChange={setMetodo} />

      {metodo === "transferencia" ? (
        <PagoTransferencia
          alias={alias}
          entidad={entidad}
          titular={titular}
          comprobanteUri={comprobanteUri}
          onCargarComprobante={handleCargarComprobante}
          onEliminarComprobante={handleEliminarComprobante}
        />
      ) : (
        <PagoEfectivo importe={importe} onChangeImporte={setImporte} />
      )}

      <DireccionEntrega direccion={direccion} onEditar={onEditarDireccion} />

      <Button
      section="buyer"
        variant="primary"
        height="lg"
        width="full"
        onPress={handleSubmit}
      >
        {metodo === "transferencia"
          ? "Enviar comprobante y dirección"
          : "Confirma pedido y dirección"}
      </Button>
    </View>
    </View>
  );
}

