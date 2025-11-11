import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import DireccionEntrega from "../subcomponentes/DireccionEntrega";
import FormaDePago from "../subcomponentes/FormaDePago";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";
import PagoEfectivo from "../subcomponentes/PagoEfectivo";
import PagoTransferencia from "../subcomponentes/PagoTransferencia";
import Button from "../UI/Button/Button";

interface CardVendedorPagoDireccionProps {
  id: string | number;
  numeroPedido: number;
  nombreNegocio: string;
  notaVendedor?: string | null;
  duracionCronometro: number;
  alias: string;
  entidad: string;
  titular: string;
  direccion: string;
  total: string;
  onEditarDireccion: () => void;
  onVerPedido: (id: string | number) => void;
}

export default function CardVendedorPagoDireccion({
  id,
  numeroPedido,
  nombreNegocio,
  notaVendedor,
  duracionCronometro,
  alias,
  entidad,
  titular,
  direccion,
  total,
  onEditarDireccion,
  onVerPedido,
}: CardVendedorPagoDireccionProps) {
  const { colors } = useTheme();
  const [metodo, setMetodo] = useState<"transferencia" | "efectivo">("transferencia");
  const [importe, setImporte] = useState("");
  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);

  const handleCargarComprobante = () => {
    // Simulación: en real usarías expo-document-picker o image-picker
    setComprobanteUri("comprobante_simulado.jpg");
  };

  const handleEliminarComprobante = () => setComprobanteUri(null);

  const handleSubmit = () => {
    console.log("Enviar datos del pedido", { metodo, importe, comprobanteUri });
  };

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.md,
        padding: Spacing.xl,
        gap: Spacing.md,
        elevation: 5,
      }}
    >
      {/* Header */}
      {/* <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <PedidoNumero numero={numeroPedido} />
        <EtiqEstadoDelPedido estado="Pagar" />
      </View> */}

      {/* Cronómetro y total */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Cronometro id={`pago_${id}`} tipo="pagar" duracionInicial={duracionCronometro} />
        <Text
          style={{
            fontFamily: "Roboto-Bold",
            fontSize: FontSizes.lg,
            color: colors.textDefault,
          }}
        >
          ${total}
        </Text>
      </View>

      <NotaDelVendedor nota={notaVendedor} />

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
  );
}


//MODO DE USO:
//  <ScrollView
//       contentContainerStyle={{
//         padding: 16,
//         gap: 24,
//       }}
//     >
//       <CardVendedorPagoDireccion
//         id={1}
//         numeroPedido={1234}
//         nombreNegocio="Verdulería San Jorge"
//         notaVendedor="Podés pagar por transferencia o en efectivo al entregar."
//         duracionCronometro={3600} // 1 hora
//         alias="SANJORGE.PAGOS"
//         entidad="Banco Galicia"
//         titular="Verdulería San Jorge SRL"
//         direccion="Av. Mitre 2450, San Clemente"
//         total="4800"
//         onEditarDireccion={handleEditarDireccion}
//         onVerPedido={handleVerPedido}
//       />
//     </ScrollView>