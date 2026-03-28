import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import DireccionEntrega from "@/components/subcomponentes/DireccionEntrega";
import LineaDivisoria from "@/components/subcomponentes/LineaDivisoria";
import PagoTransferencia from "@/components/subcomponentes/PagoTransferencia";
import VerBottomSheet from "@/components/subcomponentes/VerBottomSheet";
import CardRespVendedorBase from "./CardRespVendedorBase";

type ProblemaPago = "comprobante" | "direccion" | "ambos";

interface Props {
  pedidoId: string | number;
  respuestaId: string | number;

  nombreNegocio: string;
  rating: number;
  precio: number;

  nota: string | undefined;
  duracionCronometro: number;
  timestampRespuesta: number;

  alias: string;
  entidad: string;
  titular: string;

  direccion: string;

  problema: ProblemaPago;

  onVerPedido: () => void;
  onVerMensajes: () => void;
  onVerNota: (nota: string) => void;
  onFinishCronometro: (
    pedidoId: string | number,
    respuestaId: string | number,
  ) => void;

  onEnviarCorreccion: (data: {
    comprobante?: { uri: string; name: string };
    direccion?: string;
  }) => void;

  onCancelarPedido: () => void;
}

export default function CardErrorPagoDireccion(props: Props) {
  const {
    pedidoId,
    respuestaId,
    nombreNegocio,
    rating,
    precio,
    nota,
    duracionCronometro,
    timestampRespuesta,
    alias,
    entidad,
    titular,
    direccion,
    problema,
    onVerPedido,
    onVerNota,
    onVerMensajes,
    onFinishCronometro,
    onEnviarCorreccion,
    onCancelarPedido,
  } = props;

  const { colors, fonts } = useTheme();

  const [comprobante, setComprobante] = useState<{
    uri: string;
    name: string;
  } | null>(null);

  const [direccionState, setDireccionState] = useState(direccion);
  const [editandoDireccion, setEditandoDireccion] = useState(
    problema === "direccion" || problema === "ambos",
  );

  const puedeEditarComprobante =
    problema === "comprobante" || problema === "ambos";

  const puedeEditarDireccion = problema === "direccion" || problema === "ambos";

  const handleEnviar = () => {
    onEnviarCorreccion({
      comprobante: puedeEditarComprobante
        ? (comprobante ?? undefined)
        : undefined,
      direccion: puedeEditarDireccion ? direccionState : undefined,
    });
  };

  return (
    <CardRespVendedorBase
      pedidoId={pedidoId}
      respuestaId={respuestaId}
      vendedorNombre={nombreNegocio}
      rating={rating}
      precio={precio}
      nota={nota}
      duracionCronometro={duracionCronometro}
      timestampRespuesta={timestampRespuesta}
      tipoCronometro="pagar"
      onVerNota={onVerNota}
      onFinishCronometro={() => {
        onFinishCronometro?.(pedidoId, respuestaId);
      }}
    >
      {/* Ver pedido + Mensajes */}
      <View style={{ flexDirection: "row", gap: Spacing.lg }}>
        <VerBottomSheet
          onPress={onVerPedido}
          iconPosition="left"
          variant="buyer"
        />

        <Pressable onPress={onVerMensajes}>
          <Text
            style={{
              fontSize: FontSizes.sm,
              color: colors.brandBuyer,
              fontFamily: fonts.robotoMedium,
            }}
          >
            Mensajes
          </Text>
        </Pressable>
      </View>

      <LineaDivisoria marginVertical={Spacing.lg} />

      {/* Transferencia */}
      <PagoTransferencia
        alias={alias}
        entidad={entidad}
        titular={titular}
        disabled={!puedeEditarComprobante}
        errorComprobante={
          puedeEditarComprobante ? "Revisá el comprobante enviado." : undefined
        }
        onComprobanteChange={(file) => {
          if (puedeEditarComprobante) setComprobante(file);
        }}
      />

      {/* Dirección */}
      <DireccionEntrega
        direccion={direccionState}
        editable={puedeEditarDireccion && editandoDireccion}
        onEditarDireccion={() =>
          puedeEditarDireccion && setEditandoDireccion(true)
        }
        onCambiarDireccion={setDireccionState}
        onGuardarDireccion={() => setEditandoDireccion(false)}
        errorDireccion={
          puedeEditarDireccion
            ? "La dirección es incorrecta o incompleta."
            : undefined
        }
      />

      {/* Acciones */}
      <View
        style={{ flexDirection: "row", gap: Spacing.md, marginTop: Spacing.xl }}
      >
        <Pressable
          onPress={onCancelarPedido}
          style={{
            flex: 1,
            paddingVertical: Spacing.md,
            borderRadius: BorderRadius.md,
            backgroundColor: colors.border,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: FontSizes.btn }}>Cancelar pedido</Text>
        </Pressable>

        <Pressable
          onPress={handleEnviar}
          style={{
            flex: 1,
            paddingVertical: Spacing.md,
            borderRadius: BorderRadius.md,
            backgroundColor: colors.brandBuyer,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.btn,
              fontFamily: fonts.robotoBold,
              color: colors.textDefault,
            }}
          >
            Enviar
          </Text>
        </Pressable>
      </View>
    </CardRespVendedorBase>
  );
}
