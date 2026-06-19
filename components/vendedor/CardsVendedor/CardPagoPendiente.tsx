import { Spacing } from "@/constants/Tokens";
import { View } from "react-native";
import AyudaReportar from "../../subcomponentes/AyudaReportar";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import NotaEnviada from "../../subcomponentes/NotaEnviada";
import TextoPedido from "../../subcomponentes/TextoPedido";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

interface CardPagoPendienteProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  compradorRatingCount?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
  onAbrirIssue?: () => void;
}

// Subcomponente interno: muestra el texto del pedido y nota opcional
const ContenidoExpandible = ({
  textoPedido,
  nota,
  onAbrirIssue,
}: {
  textoPedido: string;
  nota?: string;
  onAbrirIssue?: () => void;
}) => {
  return (
    <View style={{ gap: Spacing.lg, marginTop: Spacing.md }}>
      <TextoPedido texto={textoPedido} />

      {/* Nota */}
      <NotaEnviada nota={nota} />

      <LineaDivisoria />

      <AyudaReportar
        role="seller"
        label="Reportar un problema"
        onPress={() => onAbrirIssue?.()}
      />
    </View>
  );
};

const ESTADO: EtiqEstadoType = "Pago pendiente";

export default function CardPagoPendiente({
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  compradorRatingCount,
  textoPedido,
  nota,
  precio,
  onAbrirIssue,
}: CardPagoPendienteProps) {
  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      compradorRatingCount={compradorRatingCount}
      precio={precio}
      contenidoExpandible={
        <ContenidoExpandible
          textoPedido={textoPedido}
          nota={nota}
          onAbrirIssue={onAbrirIssue}
        />
      }
    />
  );
}
