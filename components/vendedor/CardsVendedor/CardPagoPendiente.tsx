import { Spacing } from "@/constants/Tokens";
import React from "react";
import { View } from "react-native";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import NotaEnviada from "../../subcomponentes/NotaEnviada";
import TextoPedido from "../../subcomponentes/TextoPedido";
import CardVendedorBase from "./CardVendedorBase";

interface CardPagoPendienteProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
}

// Subcomponente interno: muestra el texto del pedido y nota opcional
const ContenidoExpandible = ({
  textoPedido,
  nota,
}: {
  textoPedido: string;
  nota?: string;
}) => {
  return (
    <View style={{ gap: Spacing.lg, marginTop: Spacing.md }}>
      <TextoPedido texto={textoPedido} />

      {/* Nota */}
      <NotaEnviada nota={nota} />
    </View>
  );
};

const ESTADO: EtiqEstadoType = "Pago pendiente";

export default function CardPagoPendiente({
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  nota,
  precio,
}: CardPagoPendienteProps) {
  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      precio={precio}
      contenidoExpandible={
        <ContenidoExpandible textoPedido={textoPedido} nota={nota} />
      }
    />
  );
}
