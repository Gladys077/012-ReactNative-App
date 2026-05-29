import { useOrders } from "@/context/OrdersContext";
import type { Mensaje } from "@/types/pedidos";
import React from "react";
import { Alert } from "react-native";
import { EnCaminoOutline } from "../../icons";
import CardPedidoVendedor from "./CardPedidoVendedor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardListoParaEnviarProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  compradorRatingCount?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
  mensajes?: Mensaje[];
  direccionComprador?: string;
  celularComprador?: number;
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
}

// ─── Export principal ─────────────────────────────────────────────────────────

const ESTADO = "Listo para enviar" as const;

export default function CardListoParaEnviar({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  compradorRatingCount,
  textoPedido,
  nota,
  precio,
  mensajes,
  direccionComprador,
  celularComprador,
  onVerPedido,
  onVerNota,
}: CardListoParaEnviarProps) {
  const { updateEstado } = useOrders();

  const handleEnCamino = () => {
    Alert.alert(
      "Pedido en camino",
      "¿Confirma que el pedido está siendo enviado?",
      [
        { text: "No, volver", style: "cancel" },
        {
          text: "Sí, confirmar",
          onPress: () => updateEstado(pedidoId, "en_camino"),
        },
      ],
    );
  };

  return (
    <CardPedidoVendedor
      pedidoId={pedidoId}
      fechaSeleccion={fechaSeleccion}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      compradorRatingCount={compradorRatingCount}
      textoPedido={textoPedido}
      nota={nota}
      precio={precio}
      mensajes={mensajes}
      direccionComprador={direccionComprador}
      celularComprador={celularComprador}
      onVerPedido={onVerPedido}
      onVerNota={onVerNota}
      estado={ESTADO}
      btnPrincipalLabel="En camino"
      btnPrincipalIcon={EnCaminoOutline}
      btnPrincipalIconSize={32}
      onPressBtnPrincipal={handleEnCamino}
    />
  );
}
