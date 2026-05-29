import { Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import type { Mensaje } from "@/types/pedidos";
import React, { useCallback, useState } from "react";
import { Modal, Pressable } from "react-native";
import { Estrella100 } from "../../icons";
import CalificacionEstrellas from "../../subcomponentes/CalificacionEstrellas";
import MascotaAgradeciendo from "../../subcomponentes/MascotaAgradeciendo";
import CardPedidoVendedor from "./CardPedidoVendedor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardEntregadoProps {
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
  onCalificar?: () => void;
}

// ─── Constante ────────────────────────────────────────────────────────────────

const ESTADO = "Entregado" as const;

// ─── Export principal ─────────────────────────────────────────────────────────

export default function CardEntregado({
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
  onCalificar,
}: CardEntregadoProps) {
  const { colors } = useTheme();
  const { moverAHistorialVendedor, updatePedido } = useOrders();
  const [modalVisible, setModalVisible] = useState(false);
  const [calificado, setCalificado] = useState(false);

  // TODO enviar calificación al backend (data + pedidoId) - VER LIO

  const handleCalificar = useCallback(
    (data: { estrellas: number; comentario: string }) => {
      updatePedido(pedidoId, {
        calificacionComprador: {
          estrellas: data.estrellas,
          comentario: data.comentario,
        },
      });
      setModalVisible(false);
      setCalificado(true);
    },
    [pedidoId, updatePedido],
  );

  const handleFin = useCallback(() => {
    moverAHistorialVendedor(pedidoId);
  }, [pedidoId, moverAHistorialVendedor]);

  // ── Tras calificar: muestra MascotaAgradeciendo ──
  if (calificado) {
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
        btnPrincipalLabel="Calificar"
        btnPrincipalIcon={Estrella100}
        btnPrincipalIconSize={32}
        onPressBtnPrincipal={() => {}}
        modoAgradecimiento={true}
        contenidoExtra={
          <MascotaAgradeciendo
            colorBarra={colors.brandSeller}
            onFin={handleFin}
          />
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
        btnPrincipalLabel="Calificar"
        btnPrincipalIcon={Estrella100}
        btnPrincipalIconSize={32}
        onPressBtnPrincipal={() => {
          onCalificar?.(); // cierra el sheet primero
          setModalVisible(true);
        }}
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
