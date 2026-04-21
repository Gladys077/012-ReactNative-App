import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

import { Text, View } from "react-native";
import { FontSizes, Spacing } from "../../constants/Tokens";
import { alertaCancelarPedido } from "../../utils/alertas";
import Button from "../UI/Button/Button";
import LineaDivisoria from "../UI/LineaDivisoria";
import DireccionEntrega from "../subcomponentes/DireccionEntrega";
import FormaPagoTabs from "../subcomponentes/FormaPagoTabs";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";
import PagoEfectivo from "../subcomponentes/PagoEfectivo";
import PagoTransferencia from "../subcomponentes/PagoTransferencia";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import CardRespVendedorBase from "./CardRespVendedorBase";

interface CardVendedorPagoDireccionProps {
  pedidoId: string | number;
  respuestaId: string | number;

  nombreNegocio: string;
  rating: number;
  precio: number;
  nota?: string | undefined;

  duracionCronometro: number;
  timestampRespuesta: number;

  alias: string;
  entidad: string;
  titular: string;

  direccion: string;

  onEditarDireccion: () => void;
  onVerPedido: () => void;
  onVerNota: (nota: string) => void;
  onFinishCronometro: (
    pedidoId: string | number,
    respuestaId: string | number,
  ) => void;
  comprobante?: { uri: string; name: string } | null; // <-- lo toma PagoTransferencia

  onCancelarPedido: () => void;
  onEnviarDatos?: (payload: {
    pedidoId: string | number;
    formaPago: "transferencia" | "efectivo";
    comprobante: { uri: string; name: string } | null;
    importeEfectivo: string;
    direccion: string;
  }) => void;
}

export default function CardVendedorPagoDireccion({
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
  // onEditarDireccion,
  onVerPedido,
  onVerNota,
  onFinishCronometro,

  onCancelarPedido,
  onEnviarDatos,
}: CardVendedorPagoDireccionProps) {
  const { colors, fonts } = useTheme();

  const [formaPago, setFormaPago] = useState<"transferencia" | "efectivo">(
    "transferencia",
  );

  const [comprobante, setComprobante] = useState<{
    uri: string;
    name: string;
  } | null>(null);

  const [importeEfectivo, setImporteEfectivo] = useState("");

  const [direccionState, setDireccionState] = useState(direccion);
  const [editandoDireccion, setEditandoDireccion] = useState(false);

  // Estados de error
  const [errorComprobante, setErrorComprobante] = useState("");
  const [errorDireccion, setErrorDireccion] = useState("");
  const [errorImporte, setErrorImporte] = useState("");

  const handleEnviar = () => {
    let valid = true;

    // reset errores
    setErrorComprobante("");
    setErrorDireccion("");
    setErrorImporte("");

    // Valida estado del comprobante
    if (formaPago === "transferencia" && !comprobante) {
      setErrorComprobante("Falta cargar el comprobante.");
      valid = false;
    }

    // error dirección
    if (!direccionState.trim()) {
      setErrorDireccion("La dirección es obligatoria.");
      valid = false;
    }

    // error importe efectivo
    if (
      formaPago === "efectivo" &&
      (!importeEfectivo.trim() || isNaN(Number(importeEfectivo)))
    ) {
      setErrorImporte("Indicá con cuánto vas a abonar.");
      valid = false;
    }

    if (!valid) return;

    // Envía datos al padre (que los mandará al backend) onEnviarDatos?.({}) es lo mismo q if (onEnviarDatos) {onEnviarDatos({ formaPago, direccion }); }
    onEnviarDatos?.({
      pedidoId,
      formaPago,
      comprobante,
      importeEfectivo,
      direccion: direccionState,
    });

    onFinishCronometro?.(pedidoId, respuestaId);
  };

  //TODO: FALTARÍA AGREGAR A LA FUNCIÓN handleEnviar EL ENVÍO DE DATOS AL BACKEND SEGÚN FORMA DE PAGO. Esta info le llega al vendedor y si se hizo una transferencia el vendedor confirma la acreditación del pago, o si se eligió efectivo contra entrega y la dirección de entrega está bien, el Vendedor dará el OK "confirmando que la transferencia es correcta" o dando continuar (en el caso de que el comprador abone contra entrega).  Si la transferencia no es correcta, el vendedor contactará al comprador desde la card PagoRecibido "en la sección Mensajes" para informarle que hubo un problema con la transferencia y que debe volver a cargar un nuevo comprobante de pago con el importe correcto (o con falte para completar el total).

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
      {/* Nota + Presupuesto */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: Spacing.sm,
        }}
      >
        <NotaDelVendedor nota={nota} onVerNota={onVerNota} />
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          Presupuesto:
        </Text>
      </View>

      {/* Precio */}
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.xl,
            color: colors.textDefault,
          }}
        >
          ${precio.toLocaleString("es-AR")}
        </Text>
      </View>

      {/* Ver pedido */}
      <View style={{ alignSelf: "flex-start", marginTop: Spacing.sm }}>
        <VerBottomSheet
          onPress={onVerPedido}
          iconPosition="left"
          variant="buyer"
        />
      </View>

      <LineaDivisoria marginVertical={Spacing.lg} />

      {/* Tabs */}
      <FormaPagoTabs formaPago={formaPago} setFormaPago={setFormaPago} />

      {/* Transferencia */}
      {formaPago === "transferencia" && (
        <>
          <PagoTransferencia
            alias={alias}
            entidad={entidad}
            titular={titular}
            errorComprobante={errorComprobante}
            onComprobanteChange={(nuevo) => {
              setComprobante(nuevo);

              if (nuevo) {
                setErrorComprobante(""); // limpia el error al cargar un comprobante
              }
            }}
          />
        </>
      )}

      {/* Efectivo */}
      {formaPago === "efectivo" && (
        <>
          <PagoEfectivo
            importe={importeEfectivo}
            errorImporte={errorImporte}
            onCambiarImporte={(valor) => {
              setImporteEfectivo(valor);

              // limpia error apenas se empieza a escribir
              if (errorImporte) {
                setErrorImporte("");
              }
            }}
          />
        </>
      )}

      {/* Dirección */}
      <DireccionEntrega
        direccion={direccionState}
        editable={editandoDireccion}
        onEditarDireccion={() => setEditandoDireccion(true)}
        onCambiarDireccion={setDireccionState}
        onGuardarDireccion={() => {
          setEditandoDireccion(false);

          if (direccionState.trim()) {
            setErrorDireccion(""); // limpia el error automáticamente
          } else {
            setErrorDireccion("La dirección es obligatoria.");
          }
        }}
        errorDireccion={errorDireccion}
      />

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
            onPress={() => handleEnviar()}
          >
            Enviar datos
          </Button>
        </View>
      </View>
      {/* Botón principal */}
      {/* <Button
        section="buyer"
        width="full"
        variant="primary"
        iconPosition="left"
        onPress={handleEnviar}
      >
        <Text>
          {formaPago === "transferencia"
            ? "Enviar información"
            : "Confirmar pago en efectivo"}
        </Text>
      </Button> */}
    </CardRespVendedorBase>
  );
}
