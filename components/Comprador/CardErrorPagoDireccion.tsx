import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import ChatModal from "@/components/Chat/ChatModal";
import PagoTransferencia from "@/components/subcomponentes/PagoTransferencia";
import VerBottomSheet from "@/components/subcomponentes/VerBottomSheet";
import LineaDivisoria from "@/components/UI/LineaDivisoria";
import { alertaCancelarPedido } from "../../utils/alertas";
import { Chat } from "../icons";
import FormaPagoTabs from "../subcomponentes/FormaPagoTabs";
import PagoEfectivo from "../subcomponentes/PagoEfectivo";
import AttentionRebote from "../UI/Animations/AttentionRebote";
import Button from "../UI/Button/Button";
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
  const { colors, fonts } = useTheme();

  const [chatVisible, setChatVisible] = useState(false);

  const [formaPago, setFormaPago] = useState<FormaPago>(formaPagoInicial);

  const [comprobante, setComprobante] = useState<{
    uri: string;
    name: string;
  } | null>(null);

  const [importeEfectivo, setImporteEfectivo] = useState("");

  // const [direccionState, setDireccionState] = useState(direccion);

  const hayErrorComprobante = !!problemaPago?.comprobante;
  // const hayErrorDireccion = !!problemaPago?.direccion;

  const [intentoEnviar, setIntentoEnviar] = useState(false);

  const errorComprobante =
    intentoEnviar && hayErrorComprobante && !comprobante
      ? "Carga el comprobante correcto."
      : undefined;

  const handleEnviar = () => {
    setIntentoEnviar(true);

    // Valida antes de enviar
    if (hayErrorComprobante && !comprobante) return;
    // if (hayErrorDireccion && !direccionState.trim()) return;

    onEnviarCorreccion({
      formaPago,
      comprobante:
        formaPago === "transferencia" && hayErrorComprobante
          ? (comprobante ?? undefined)
          : undefined,
      importeEfectivo: formaPago === "efectivo" ? importeEfectivo : undefined,
      // direccion: hayErrorDireccion ? direccionState : undefined,
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
      {/* Modal del chat  */}
      <ChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        pedidoId={pedidoId}
        vendedorNombre={nombreNegocio}
        vendedorAlias={titular}
      />

      {/* Acciones superiores */}
      <View
        style={{
          flexDirection: "row",
          gap: Spacing.lg,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <VerBottomSheet
          onPress={onVerPedido}
          iconPosition="left"
          variant="buyer"
        />

        <Pressable
          onPress={() => setChatVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.sm,
              color: colors.brandSeller,
              fontFamily: fonts.robotoMedium,
              textDecorationLine: "underline",
            }}
          >
            Mensaje
          </Text>
          <AttentionRebote>
            <Chat
              width={20}
              height={20}
              stroke={colors.brandSeller}
              strokeWidth={1.5}
              fill={"antiquewhite"}
            />
          </AttentionRebote>
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

      {/* Dirección - sólo permitimos editar la dirección si el vendedor lo marcó como dirección errónea */}
      {/* <DireccionEntrega
        direccion={direccionState}
        editable={hayErrorDireccion && editandoDireccion}
        onEditarDireccion={() =>
          hayErrorDireccion && setEditandoDireccion(true)
        }
        onCambiarDireccion={setDireccionState}
        onGuardarDireccion={() => setEditandoDireccion(false)}
        errorDireccion={errorDireccion}
      /> */}

      {/* Btns: Rechazar - Aceptar */}
      <View
        style={{
          flexDirection: "row",
          gap: Spacing.md,
          marginTop: Spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <Button
            variant="secondary"
            height="md"
            width="full"
            onPress={() => alertaCancelarPedido(onCancelarPedido)}
          >
            Cancelar pedido
          </Button>
        </View>

        <View style={{ flex: 1 }}>
          <Button
            variant="primary"
            section="buyer"
            height="md"
            width="full"
            onPress={handleEnviar}
          >
            Enviar datos
          </Button>
        </View>
      </View>
    </CardRespVendedorBase>
  );
}
