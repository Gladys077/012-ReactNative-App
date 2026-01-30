import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import DireccionEntrega from "@/components/subcomponentes/DireccionEntrega";
import LineaDivisoria from "@/components/subcomponentes/LineaDivisoria";
import PagoTransferencia from "@/components/subcomponentes/PagoTransferencia";
import VerBottomSheet from "@/components/subcomponentes/VerBottomSheet";
import FormaPagoTabs from "../subcomponentes/FormaPagoTabs";
import PagoEfectivo from "../subcomponentes/PagoEfectivo";
import CardRespVendedorBase from "./CardRespVendedorBase";

type FormaPago = "transferencia" | "efectivo";

interface Props {
  pedidoId: string | number;
  respuestaId: string | number;

  nombreNegocio: string;
  rating: number;
  precio: number;
  nota?: string;

  formaPagoInicial: FormaPago;

  alias: string;
  entidad: string;
  titular: string;

  direccion: string;

  problemaPago?: {
    comprobante: boolean;
    direccion: boolean;
  };

  onVerPedido: () => void;
  onVerMensajes: () => void;
  onVerNota: (nota: string) => void;

  onEnviarCorreccion: (data: {
    formaPago: FormaPago;
    comprobante?: { uri: string; name: string };
    importeEfectivo?: string;
    direccion?: string;
  }) => void;

  onCancelarPedido: () => void;
}

export default function CardErrorPagoDireccion({
  pedidoId,
  respuestaId,
  nombreNegocio,
  rating,
  precio,
  nota,
  formaPagoInicial,
  alias,
  entidad,
  titular,
  direccion,
  problemaPago,
  onVerPedido,
  onVerMensajes,
  onVerNota,
  onEnviarCorreccion,
  onCancelarPedido,
}: Props) {
  const { colors } = useTheme();

  const [formaPago, setFormaPago] = useState<FormaPago>(formaPagoInicial);

  const [comprobante, setComprobante] = useState<{
    uri: string;
    name: string;
  } | null>(null);

  const [importeEfectivo, setImporteEfectivo] = useState("");

  const [direccionState, setDireccionState] = useState(direccion);

  const hayErrorComprobante = !!problemaPago?.comprobante;
  const hayErrorDireccion = !!problemaPago?.direccion;

  const errorComprobante =
    hayErrorComprobante && !comprobante
      ? "Carga el comprobante correcto."
      : undefined;

  const errorDireccion = hayErrorDireccion
    ? "La dirección es incorrecta o incompleta."
    : undefined;

  const [editandoDireccion, setEditandoDireccion] = useState(hayErrorDireccion);

  const handleEnviar = () => {
    onEnviarCorreccion({
      formaPago,
      comprobante:
        formaPago === "transferencia" && hayErrorComprobante
          ? (comprobante ?? undefined)
          : undefined,
      importeEfectivo: formaPago === "efectivo" ? importeEfectivo : undefined,
      direccion: hayErrorDireccion ? direccionState : undefined,
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
      // tipoCronometro="pagar"
      // duracionCronometro={0} // no se muestra visualmente
      onVerNota={onVerNota}
    >
      {/* Acciones superiores */}
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
              fontFamily: "Roboto-Medium",
            }}
          >
            Mensajes
          </Text>
        </Pressable>
      </View>

      <LineaDivisoria marginVertical={Spacing.lg} />

      {/* Forma de pago */}
      <FormaPagoTabs formaPago={formaPago} setFormaPago={setFormaPago} />

      {/* Transferencia */}
      {formaPago === "transferencia" && (
        <PagoTransferencia
          alias={alias}
          entidad={entidad}
          titular={titular}
          errorComprobante={errorComprobante}
          onComprobanteChange={setComprobante}
        />
      )}

      {/* Efectivo */}
      {formaPago === "efectivo" && (
        <PagoEfectivo
          importe={importeEfectivo}
          onCambiarImporte={setImporteEfectivo}
        />
      )}

      {/* Dirección */}
      <DireccionEntrega
        direccion={direccionState}
        editable={hayErrorDireccion && editandoDireccion}
        onEditarDireccion={() =>
          hayErrorDireccion && setEditandoDireccion(true)
        }
        onCambiarDireccion={setDireccionState}
        onGuardarDireccion={() => setEditandoDireccion(false)}
        errorDireccion={errorDireccion}
      />

      {/* Acciones */}
      <View
        style={{
          flexDirection: "row",
          gap: Spacing.md,
          marginTop: Spacing.xl,
        }}
      >
        <Pressable
          onPress={onCancelarPedido}
          style={{
            flex: 1,
            paddingVertical: Spacing.md,
            borderRadius: BorderRadius.md,
            backgroundColor: colors.textSecondaryBg,
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
              fontFamily: "Roboto-Regular",
              color: colors.textOnColor,
            }}
          >
            Enviar comprobante
          </Text>
        </Pressable>
      </View>
    </CardRespVendedorBase>
  );
}
