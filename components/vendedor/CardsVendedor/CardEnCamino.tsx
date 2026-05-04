import { useOrders } from "@/context/OrdersContext";
import type { Mensaje } from "@/types/pedidos";
import React from "react";
import { Alert } from "react-native";
import { Entregado } from "../../icons";
import CardPedidoVendedor from "./CardPedidoVendedor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardEnCaminoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
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

const ESTADO = "En camino" as const;

export default function CardEnCamino({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  nota,
  precio,
  mensajes,
  direccionComprador,
  celularComprador,
  onVerPedido,
  onVerNota,
}: CardEnCaminoProps) {
  const { updateEstado } = useOrders();

  const handleEntregado = () => {
    Alert.alert(
      "Pedido Entregado",
      "¿Confirma que el pedido ha sido entregado?",
      [
        { text: "No, volver", style: "cancel" },
        {
          text: "Sí, confirmar",
          onPress: () => updateEstado(pedidoId, "entregado_pendiente_calif"),
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
      textoPedido={textoPedido}
      nota={nota}
      precio={precio}
      mensajes={mensajes}
      direccionComprador={direccionComprador}
      celularComprador={celularComprador}
      onVerPedido={onVerPedido}
      onVerNota={onVerNota}
      estado={ESTADO}
      btnPrincipalLabel="Entregado"
      btnPrincipalIcon={Entregado}
      btnPrincipalIconSize={32}
      onPressBtnPrincipal={handleEntregado}
    />
  );
}
