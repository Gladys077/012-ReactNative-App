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
  textoPedido: string;
  precioEnviado: number;
  notaEnviada?: string;
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
  textoPedido,
  precioEnviado,
  notaEnviada,
}: CardPresupuestadoProps) {
  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      precio={precioEnviado}
      contenidoExpandible={
        <ContenidoExpandible
          textoPedido={textoPedido}
          notaEnviada={notaEnviada}
        />
      }
    />
  );
}
