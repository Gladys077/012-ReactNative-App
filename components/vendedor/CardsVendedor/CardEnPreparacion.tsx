import { useOrders } from "@/context/OrdersContext";
import type { Mensaje } from "@/types/pedidos";
import React from "react";
import { Alert } from "react-native";
import { ListoParaEnviarNuevo } from "../../icons";
import CardPedidoVendedor from "./CardPedidoVendedor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardEnPreparacionProps {
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

const ESTADO = "En preparación" as const;

export default function CardEnPreparacion({
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
}: CardEnPreparacionProps) {
  const { updateEstado } = useOrders();

  const handleListoParaEnviar = () => {
    Alert.alert(
      "Listo para enviar",
      "¿Confirma que el pedido está listo para ser enviado?",
      [
        { text: "No, volver", style: "cancel" },
        {
          text: "Sí, confirmar",
          onPress: () => updateEstado(pedidoId, "listo_para_enviar"),
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
      btnPrincipalLabel="Listo para enviar"
      btnPrincipalIcon={ListoParaEnviarNuevo}
      btnPrincipalIconSize={32}
      onPressBtnPrincipal={handleListoParaEnviar}
    />
  );
}
