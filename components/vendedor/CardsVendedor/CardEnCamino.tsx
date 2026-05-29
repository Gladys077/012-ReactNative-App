import { useOrders } from "@/context/OrdersContext";
import type { Mensaje } from "@/types/pedidos";
import React from "react";
import { Alert } from "react-native";
import { Entregado } from "../../icons";
import AyudaReportar from "../../subcomponentes/AyudaReportar";
import CardPedidoVendedor from "./CardPedidoVendedor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardEnCaminoProps {
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
  onAbrirIssue?: () => void;
}

// ─── Export principal ─────────────────────────────────────────────────────────

const ESTADO = "En camino" as const;

export default function CardEnCamino({
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
  onAbrirIssue,
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
      btnPrincipalLabel="Entregado"
      btnPrincipalIcon={Entregado}
      btnPrincipalIconSize={32}
      onPressBtnPrincipal={handleEntregado}
      contenidoExtra={
        <AyudaReportar
          role="seller"
          label="Reportar un problema"
          onPress={() => onAbrirIssue?.()}
        />
      }
    />
  );
}
