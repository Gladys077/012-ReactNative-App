import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { useTheme } from "@/context/ThemeContext";
import { useCallback } from "react";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import ContenidoGracias from "../subcomponentes/MascotaAgradeciendo";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CardPedidoCompletadoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  onDesaparecer?: () => void;
}

// ─── Export principal ─────────────────────────────────────────────────────────

export default function CardPedidoCompletado({
  pedidoId,
  fechaSeleccion,
  onDesaparecer,
}: CardPedidoCompletadoProps) {
  const { colors } = useTheme();

  const handleFin = useCallback(() => {
    onDesaparecer?.();
  }, [onDesaparecer]);

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion}
      estado="Completado"
      elevation={5}
    >
      <LineaEstadoPedido estadoActual="Recibido" todosCompletados={true} />

      <ContenidoGracias colorBarra={colors.brandBuyer} onFin={handleFin} />
    </CardPedidoBase>
  );
}
