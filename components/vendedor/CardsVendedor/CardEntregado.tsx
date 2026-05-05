import { Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import type { Mensaje } from "@/types/pedidos";
import React, { useCallback, useState } from "react";
import { Modal, Pressable } from "react-native";
// import { CalificarIcono } from "../../icons";
import { Estrella100 } from "../../icons";
import CalificacionEstrellas from "../../subcomponentes/CalificacionEstrellas";
import ContenidoGracias from "../../subcomponentes/ContenidoGracias";
import CardPedidoVendedor from "./CardPedidoVendedor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardEntregadoProps {
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

// ─── Constante ────────────────────────────────────────────────────────────────

const ESTADO = "Entregado" as const;

// ─── Export principal ─────────────────────────────────────────────────────────

export default function CardEntregado({
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
}: CardEntregadoProps) {
  const { colors } = useTheme();
  const { moverAHistorial } = useOrders();
  const [modalVisible, setModalVisible] = useState(false);
  const [calificado, setCalificado] = useState(false);

  const handleCalificar = useCallback(
    (data: { estrellas: number; comentario: string }) => {
      // acá guardás la calificación donde corresponda
      setModalVisible(false);
      setCalificado(true);
    },
    [],
  );

  const handleFin = useCallback(() => {
    moverAHistorial(pedidoId);
  }, [pedidoId, moverAHistorial]);

  // ── Tras calificar: muestra agradecimiento inline ──
  if (calificado) {
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
        btnPrincipalLabel="Calificar"
        btnPrincipalIcon={Estrella100}
        btnPrincipalIconSize={32}
        onPressBtnPrincipal={() => {}}
        contenidoExtra={
          <ContenidoGracias colorBarra={colors.brandSeller} onFin={handleFin} />
        }
      />
    );
  }

  // ── Estado normal: btn Calificar ──
  return (
    <>
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
        btnPrincipalLabel="Calificar"
        btnPrincipalIcon={Estrella100}
        btnPrincipalIconSize={32}
        onPressBtnPrincipal={() => setModalVisible(true)}
      />

      {/* ── Modal de calificación ── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "flex-end",
          }}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={{
              backgroundColor: colors.background,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: Spacing.xl,
            }}
            onPress={() => {}}
          >
            <CalificacionEstrellas
              titulo="Calificá al comprador"
              colorBoton={colors.brandSeller}
              onEnviar={handleCalificar}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
