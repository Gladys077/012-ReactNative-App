import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

import { Pressable, Text, View } from "react-native";
import { BorderRadius, FontSizes, Spacing } from "../../../constants/Tokens";
import LineaDivisoria from "../../subcomponentes/LineaDivisoria";
import NotaDelVendedor from "../../subcomponentes/NotaDelVendedor";
import VerBottomSheet from "../../subcomponentes/VerBottomSheet";
import CardRespVendedorBase from "../CardRespVendedorBase";
import DireccionEntrega from "./DireccionEntrega";
import FormaPagoTabs from "./FormaPagoTabs";
import PagoEfectivo from "./PagoEfectivo";
import PagoTransferencia from "./PagoTransferencia";

interface CardVendedorPagoDireccionProps {
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
  onEditarDireccion: () => void;
  onVerPedido: () => void;
  onVerNota: (nota: string) => void;
  onFinishCronometro: (pedidoId: string | number, respuestaId: string | number) => void;
  comprobante?: { uri: string; name: string } | null; // <-- lo toma PagoTransferencia
}

export default function CardVendedorPagoDireccion(props: CardVendedorPagoDireccionProps) {
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
    onEditarDireccion,
    onVerPedido,
    onVerNota,
    onFinishCronometro,
  } = props;

  const { colors } = useTheme();

  const [formaPago, setFormaPago] = useState<"transferencia" | "efectivo">("transferencia");

  const [comprobante, setComprobante] = useState<{ uri: string; name: string } | null>(null);

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
    if (formaPago === "efectivo" && (!importeEfectivo.trim() || isNaN(Number(importeEfectivo)))) {
      setErrorImporte("Indicá con cuánto vas a abonar.");
      valid = false;
    }

    if (!valid) return;

    onFinishCronometro?.(pedidoId, respuestaId);
  };

  //TODO: FALTARÍA AGREGAR A LA FUNCIÓN handleEnviar EL ENVÍO DE DATOS AL BACKEND SEGÚN FORMA DE PAGO . Ver con LIO

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
      onFinishCronometro={() => { onFinishCronometro?.(pedidoId, respuestaId);  }}
    >
      {/* Nota + Presupuesto */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Spacing.sm }}>
        <NotaDelVendedor nota={nota} onVerNota={onVerNota} />
        <Text style={{ fontFamily: "Roboto-Medium", fontSize: FontSizes.sm, color: colors.textDefault }}>
          Presupuesto:
        </Text>
      </View>

      {/* Precio */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontFamily: "Roboto-Bold", fontSize: FontSizes.xl, color: colors.textDefault }}>
          ${precio.toLocaleString("es-AR")}
        </Text>
      </View>

      {/* Ver pedido */}
      <View style={{ alignSelf: "flex-start", marginTop: Spacing.sm }}>
        <VerBottomSheet onPress={onVerPedido} iconPosition="left" variant="buyer" />
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


      {/* Botón */}
      <Pressable
        onPress={handleEnviar}
        style={{
          backgroundColor: colors.brandBuyer,
          paddingVertical: Spacing.md,
          borderRadius: BorderRadius.md,
          alignItems: "center",
          marginTop: Spacing.xl,
        }}
      >
        <Text style={{ color: colors.textDefault, fontFamily: "Roboto-Bold", fontSize: FontSizes.btn }}>
          {formaPago === "transferencia" ? "Enviar información" : "Confirmar pago en efectivo"}

        </Text>
      </Pressable>
    </CardRespVendedorBase>
  );
}
