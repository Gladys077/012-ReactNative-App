import { useOrders } from "@/context/OrdersContext";
import type { Mensaje } from "@/types/pedidos";
import React, { useRef, useState } from "react";
import { ListoParaEnviarNuevo } from "../../icons";
import AyudaReportar from "../../subcomponentes/AyudaReportar";
import UndoToast from "../../subcomponentes/UndoToast";
import CardPedidoVendedor from "./CardPedidoVendedor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardEnPreparacionProps {
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

const ESTADO = "En preparación" as const;

export default function CardEnPreparacion({
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
}: CardEnPreparacionProps) {
  const { updateEstado } = useOrders();

  const [undoVisible, setUndoVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleListoParaEnviar = () => {
    setUndoVisible(true);
    timeoutRef.current = setTimeout(() => {
      updateEstado(pedidoId, "listo_para_enviar");
      setUndoVisible(false);
    }, 5000);
  };

  const handleCancelar = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setUndoVisible(false);
  };

  return (
    <>
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
        btnPrincipalLabel="Listo para enviar"
        btnPrincipalIcon={ListoParaEnviarNuevo}
        btnPrincipalIconSize={32}
        onPressBtnPrincipal={handleListoParaEnviar}
        contenidoExtra={
          <AyudaReportar
            role="seller"
            label="Reportar un problema"
            onPress={() => onAbrirIssue?.()}
          />
        }
      />
      <UndoToast
        visible={undoVisible}
        mensaje="Pedido movido a Listo para enviar"
        onCancelar={handleCancelar}
        onCerrar={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          updateEstado(pedidoId, "listo_para_enviar");
          setUndoVisible(false);
        }}
      />
    </>
  );
}
