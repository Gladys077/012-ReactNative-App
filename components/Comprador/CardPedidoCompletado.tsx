import React from "react";
import CardPedidoBase from "./CardPedidoBase";

interface CardPedidoCompletadoProps {
  numeroPedido: number;
}

export default function CardPedidoCompletado({
  numeroPedido,
}: CardPedidoCompletadoProps) {
  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado="Completado"
      mostrarMascota
      mascotaMensaje="¡Gracias por tu compra! Esperamos verte pronto."
      mascotaVariante="success"
      elevation={3}
    />
  );
}
