import { Spacing } from "@/constants/Tokens";
import React from "react";
import { View } from "react-native";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import NotaEnviada from "../../subcomponentes/NotaEnviada";
import TextoPedido from "../../subcomponentes/TextoPedido";
import CardVendedorBase from "./CardVendedorBase";

interface CardPresupuestadoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  compradorRatingCount?: number;
  textoPedido: string;
  precioEnviado: number;
  notaEnviada?: string;
  onCancelarPedido: () => void;
}

const ContenidoExpandible = ({
  textoPedido,
  notaEnviada,
}: {
  textoPedido: string;
  notaEnviada?: string;
}) => {
  return (
    <View style={{ gap: Spacing.xl, marginTop: Spacing.md }}>
      {/* Texto del pedido */}
      <TextoPedido texto={textoPedido} />

      {/* Nota -solo si existe- */}
      <NotaEnviada nota={notaEnviada} />
    </View>
  );
};

const ESTADO: EtiqEstadoType = "Presupuestado";

export default function CardPresupuestado({
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  compradorRatingCount,
  textoPedido,
  precioEnviado,
  notaEnviada,
  onCancelarPedido,
}: CardPresupuestadoProps) {
  return (
    // <>
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      compradorRatingCount={compradorRatingCount}
      onCancelarPedido={onCancelarPedido}
      precio={precioEnviado}
      contenidoExpandible={
        <ContenidoExpandible
          textoPedido={textoPedido}
          notaEnviada={notaEnviada}
        />
      }
    ></CardVendedorBase>
  );
}
