import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import ListoParaEnviar from "../../icons/ListoParaEnviar";
import BottomSheetVerPedido from "../../subcomponentes/BottomSheetVerPedido";
import DatosComprador from "../../subcomponentes/DatosComprador";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import VerBottomSheet from "../../subcomponentes/VerBottomSheet";
import Button from "../../UI/Button/Button";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

interface CardEnPreparacionProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
  direccionComprador?: string;
  celularComprador?: string;
  onListoParaEnviar: (id: string | number) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convierte el textoPedido (string con \n) en items para el BottomSheet */
const textoAItems = (texto: string, nota?: string) => {
  const lineas = texto
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l, i) => ({ id: `item-${i}`, label: l }));

  if (nota?.trim()) {
    lineas.push({ id: "nota", label: `📝 Nota: ${nota.trim()}` });
  }

  return lineas;
};

// ─── Contenido Expandible ─────────────────────────────────────────────────────

const ContenidoExpandible = ({
  pedidoId,
  textoPedido,
  nota,
  precio,
  direccionComprador,
  celularComprador,
  fechaSeleccion,
  onListoParaEnviar,
}: {
  pedidoId: string | number;
  textoPedido: string;
  nota?: string;
  precio: number;
  direccionComprador?: string;
  celularComprador?: string;
  fechaSeleccion?: string;
  onListoParaEnviar: (id: string | number) => void;
}) => {
  const { colors } = useTheme();
  const sheetRef = useRef<BottomSheet>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const handleVerPedido = () => {
    setSheetVisible(true);
  };

  return (
    <View style={{ gap: Spacing.md, paddingBottom: Spacing.md }}>
      {/* Ver pedido → abre el BottomSheet con items + nota */}
      <VerBottomSheet onPress={handleVerPedido} variant="seller" />

      {/* Datos del comprador: dirección + teléfono */}
      <DatosComprador
        direccionComprador={direccionComprador}
        celularComprador={celularComprador}
      />

      <LineaDivisoria />

      {/* CTA */}
      <Button
        section="seller"
        variant="primary"
        width="full"
        icon={ListoParaEnviar}
        iconPosition="left"
        onPress={() => onListoParaEnviar(pedidoId)}
      >
        Listo para enviar
      </Button>

      {/* BottomSheet — montado fuera del scroll de la card */}
      <BottomSheetVerPedido
        ref={sheetRef}
        isVisible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        fechaSeleccion={fechaSeleccion}
        items={textoAItems(textoPedido, nota)}
        backgroundColor={colors.cardBg}
      />
    </View>
  );
};

// ─── Export principal ─────────────────────────────────────────────────────────

const ESTADO: EtiqEstadoType = "En preparación";

export default function CardEnPreparacion({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  nota,
  precio,
  direccionComprador,
  celularComprador,
  onListoParaEnviar,
}: CardEnPreparacionProps) {
  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      precio={precio}
      contenidoExpandible={
        <ContenidoExpandible
          pedidoId={pedidoId}
          textoPedido={textoPedido}
          nota={nota}
          precio={precio}
          direccionComprador={direccionComprador}
          celularComprador={celularComprador}
          fechaSeleccion={fechaSeleccion}
          onListoParaEnviar={onListoParaEnviar}
        />
      }
    />
  );
}
