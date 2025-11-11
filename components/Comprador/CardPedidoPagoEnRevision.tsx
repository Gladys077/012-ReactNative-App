import React from "react";
import CardPedidoBase from "./CardPedidoBase";

interface CardPedidoPagoEnRevisionProps {
  numeroPedido: number;
}

export default function CardPedidoPagoEnRevision({
  numeroPedido,
}: CardPedidoPagoEnRevisionProps) {
  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado="Pago En Revisión"
      mostrarMascota
      mascotaMensaje="Estamos verificando tu pago, esto puede demorar unos minutos."
      mascotaVariante="message"
      elevation={5}
    />
  );
}
