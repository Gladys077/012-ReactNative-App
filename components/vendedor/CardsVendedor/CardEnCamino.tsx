import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { Entregado } from "../../icons";
import DatosComprador from "../../subcomponentes/DatosComprador";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import NotaDelVendedor from "../../subcomponentes/NotaDelVendedor";
import VerBottomSheet from "../../subcomponentes/VerBottomSheet";
import Button from "../../UI/Button/Button";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

interface CardEnCaminoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
  direccionComprador?: string;
  telefono?: string;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onListoParaEnviar: (id: string | number) => void;
}

const ContenidoExpandible = ({
  pedidoId,
  textoPedido,
  nota,
  precio,
  direccionComprador,
  telefono,
  onVerPedido,
  onVerNota,
  onListoParaEnviar,
}: {
  pedidoId: string | number;
  textoPedido: string;
  nota?: string;
  precio: number;
  direccionComprador?: string;
  telefono?: string;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onListoParaEnviar: (id: string | number) => void;
}) => {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ gap: Spacing.lg, marginTop: Spacing.md }}>
      {/* Ver pedido */}
      <VerBottomSheet onPress={() => onVerPedido(pedidoId)} variant="seller" />

      <LineaDivisoria />

      {/* Nota + precio en la misma fila */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NotaDelVendedor nota={nota} onVerNota={onVerNota} />
        <Text
          style={{
            fontSize: FontSizes.lg,
            fontFamily: fonts.robotoBold,
            color: colors.textDefault,
          }}
        >
          $ {precio.toLocaleString("es-AR")}
        </Text>
      </View>

      {/* Datos del comprador */}
      <DatosComprador direccion={direccionComprador} telefono={telefono} />

      {/* CTA Listo para enviar */}
      <Button
        section="seller"
        variant="primary"
        width="full"
        icon={Entregado}
        iconPosition="left"
        onPress={() => onListoParaEnviar(pedidoId)}
      >
        Entregado
      </Button>
    </View>
  );
};

const ESTADO: EtiqEstadoType = "En camino";

export default function CardEnCamino({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  nota,
  precio,
  direccionComprador,
  telefono,
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
          textoPedido={textoPedido}
          nota={nota}
          precio={precio}
          direccionComprador={direccionComprador}
          telefono={telefono}
          onVerPedido={onVerPedido}
          onVerNota={onVerNota}
          onListoParaEnviar={onListoParaEnviar}
        />
      }
    />
  );
}
