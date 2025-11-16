import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from 'react-native';
import { Cancel, Copiar, DocumentSolid, EditPencil, Ubicacion, } from "../icons";
import LineaDivisoria from "../subcomponentes/LineaDivisoria";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import { InputField } from "../UI/InputField";
import CardRespVendedorBase from "./CardRespVendedorBase";


type FormaPago = "transferencia" | "efectivo";

interface CardVendedorPagoDireccionProps {
  pedidoId?: string | number;
  respuestaId?: string | number;
  nombreNegocio: string;
  rating: number;
  precio: number;
  nota?: string;
  duracionCronometro: number; // duración total en minutos (15 por defecto, puede ser más si extendió)
  timestampRespuesta: number; // timestamp cuando el vendedor respondió (Date.now() del backend)
  alias?: string;
  entidad?: string;
  titular?: string;
  direccion: string;
  onEditarDireccion: () => void;
  onVerPedido: () => void;
  onVerNota?: (nota: string) => void;
  onFinishCronometro?: (pedidoId: string | number, respuestaId?: string | number) => void;
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
  onEditarDireccion,
  onVerPedido,
  onVerNota,
  onFinishCronometro,
}: CardVendedorPagoDireccionProps) {
  const { colors } = useTheme();
  const [formaPago, setFormaPago] = useState<FormaPago>("transferencia");


  // estado local comprobante + importe
  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);
  const [importe, setImporte] = useState<string>("");

  // Para elegir archivo y cargarlo
 const handleCargarComprobante = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    setComprobanteUri(file.uri);
  } catch (error) {
    console.log("Error al elegir comprobante:", error);
    Alert.alert("Error", "No se pudo cargar el archivo.");
  }
};

  const handleEliminarComprobante = () => {
    setComprobanteUri(null);
  };

  const handleCopiarAlias = async () => {
    if (!alias) {
      Alert.alert("Alias no disponible", "El vendedor no proporcionó alias.");
      return;
    }
    await Clipboard.setStringAsync(alias);
    Alert.alert("Copiado", "Alias copiado al portapapeles.");
  };

  const handleEnviar = () => {
    // Validaciones
    if (!direccion || direccion.trim().length === 0) {
      Alert.alert("Dirección faltante", "Por favor completá la dirección de entrega.");
      return;
    }

    if (formaPago === "transferencia") {
      if (!comprobanteUri) {
        Alert.alert(
          "Comprobante faltante",
          "Por favor cargá el comprobante de pago antes de enviar."
        );
        return;
      }
      // ok: enviar comprobante + dirección
      console.log("Enviando comprobante y dirección", { comprobanteUri, direccion });
      Alert.alert("Enviado", "Comprobante y dirección enviados correctamente.");
    } else {
      // efectivo: validar importe (opcional, sugiriste placeholder)
      if (!importe || importe.trim().length === 0) {
        Alert.alert("Importe faltante", "Por favor indicá con cuánto vas a pagar.");
        return;
      }
      console.log("Confirmando pedido (efectivo)", { importe, direccion });
      Alert.alert("Confirmado", "Pedido confirmado. Gracias.");
    }

    // opcional: llamar callback
    if (pedidoId !== undefined) {
      onFinishCronometro?.(pedidoId, respuestaId);
    }
  };

  return (
    <CardRespVendedorBase
      pedidoId={pedidoId}
      respuestaId={respuestaId ?? "-"}
      vendedorNombre={nombreNegocio}
      rating={rating}
      precio={precio}
      nota={nota}
      duracionCronometro={duracionCronometro}
      timestampRespuesta={timestampRespuesta}
      tipoCronometro="pagar"
      onFinishCronometro={() => {
        if (pedidoId !== undefined) {
          onFinishCronometro?.(pedidoId, respuestaId);
        }
      }}    
      >
{/* Nota del vendedor a la izq. y Presupuesto a la derecha */}
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: Spacing.sm,
        }}
      >
        <NotaDelVendedor nota={nota} onVerNota={onVerNota} />

        {/* Presupuesto y precio a la derecha */}
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          Presupuesto:
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            fontFamily: "Roboto-Bold",
            fontSize: FontSizes.xl,
            color: colors.textDefault,
          }}
        >
          ${precio.toLocaleString("es-AR")}
        </Text>
      </View>

      {/* Ver pedido: alineado a la izquierda */}
      <View style={{ alignSelf: "flex-start", marginTop: Spacing.sm }}>
        <VerBottomSheet onPress={() => onVerPedido?.()} iconPosition="left" variant="buyer" />
      </View>

      <LineaDivisoria marginVertical={Spacing.lg} />

      {/* <View style={{backgroundColor: colors.textSecondaryBg }}> */}
      {/* Título Forma de Pago */}
      <Text
        style={{
          fontFamily: "Roboto-Bold",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          textAlign: "center",
          marginBottom: Spacing.md,
          backgroundColor: colors.textSecondaryBg,
          paddingTop: 4,
        }}
      >
        FORMA DE PAGO
      </Text>
      {/* </View> */}

      {/* Selector de forma de pago (tabs) */}
      <View
        style={{
          flexDirection: "row",
          borderRadius: BorderRadius.md,
          padding: 8,
          marginBottom: Spacing.lg,
          gap: 8
        }}
      >
        {/* -----Tranferencia----- */}
        <Pressable
          onPress={() => setFormaPago("transferencia")}
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: Spacing.sm,
            borderRadius: BorderRadius.sm,
            gap: 10,
            borderBottomWidth:
              formaPago === "transferencia" ? 4 : 0, 
            borderColor: 
              formaPago === "transferencia" ? colors.brandBuyer : "transparent"
          }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              borderWidth: formaPago === "transferencia" ? 5 : 2,
              borderColor: formaPago === "transferencia" ? colors.textDefault : colors.textMuted,
            }}
          />
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: FontSizes.xs,
              color:
                formaPago === "transferencia" ? colors.textDefault : colors.textMuted,
            }}
          >
            Transferencia
          </Text>
        </Pressable>

        {/* -----Efectivo contra entrega----- */}
        <Pressable
          onPress={() => setFormaPago("efectivo")}
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: Spacing.sm,
            borderRadius: BorderRadius.sm,
            gap: 10,
            borderBottomWidth:
              formaPago === "efectivo" ? 4 : 0, 
            borderColor: 
              formaPago === "efectivo" ? colors.brandBuyer : "transparent"
          }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              borderWidth: formaPago === "efectivo" ? 5 : 2,
              borderColor: formaPago === "efectivo" ? colors.textDefault : colors.textMuted,
            }}
          />
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: FontSizes.xs,
              color: formaPago === "efectivo" ? colors.textDefault : colors.textMuted,
            }}
          >
            Efectivo contra entrega
          </Text>
        </Pressable>
      </View>

      {/* --------------Contenido condicional--------------- */}
      {formaPago === "transferencia" ? (
        <>
          {/* Datos para transferencia */}
          <View
            style={{
              backgroundColor: colors.textSecondaryBg || "#F9FAFB",
              padding: Spacing.md,
              gap: Spacing.xs,            
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: FontSizes.base,
                color: colors.textDefault,
                marginBottom: Spacing.xs,
                textDecorationLine: "underline"
              }}
            >
              Datos para transferencia:
            </Text>

            {/* Alias con copiar */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap:8,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Text
                  style={{
                    fontSize: FontSizes.sm,
                    color: colors.textDefault,
                  }}
                >
                  Alias:
                </Text>

                <Text style={{fontSize: FontSizes.base,fontFamily: "Roboto-Black",color: colors.textDefault}}>
                  {alias || " "}
                </Text>
              </View>

              <Pressable
                onPress={handleCopiarAlias}
                accessible
                accessibilityLabel="Copiar alias"
                style={{ padding: 8 }}
              >
                <Copiar width={24} height={24} fill={colors.textDefault} />
              </Pressable>
            </View>

            <Text
              style={{
                fontSize: FontSizes.sm,
                color: colors.textDefault,
              }}
            >
              Entidad:{" "}
              <Text style={{ color: colors.textDefault, fontFamily: "Roboto-Bold" }}>
                {entidad || "Mercado Pago"}
              </Text>
            </Text>

            <Text
              style={{
                fontSize: FontSizes.sm,
                color: colors.textDefault,
                paddingTop: 8,
              }}
            >
              Titular:{" "}
              <Text style={{ color: colors.textDefault, fontFamily: "Roboto-Bold"  }}>
                {titular || "Juan Pérez"}
              </Text>
            </Text>

          {/* Botón cargar comprobante + btn cancelar al lado*/}
          <View  style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: Spacing.md,
                gap: 4,
              }}>
            <Pressable
              onPress={handleCargarComprobante}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: Spacing.md,
                paddingHorizontal: Spacing.lg,
                borderTopStartRadius: BorderRadius.md,
                borderBottomStartRadius: BorderRadius.md,
                borderWidth: 1,
                borderColor: colors.textMuted,
                backgroundColor: colors.background
              }}
            >
                <DocumentSolid  //TODO: ARREGLAR ESTE ICONO PARA Q SE VEA
                    width={24}
                    height={24}
                    fill={colors.brandBuyer}
                    stroke={colors.brandBuyer}
                  />
                <Text style={{ fontSize: FontSizes.sm, color: colors.textDefault }}>
                  {comprobanteUri ? "Comprobante cargado" : "Cargar comprobante"}
                </Text>
              
            </Pressable>
            {/* Cancel (borra comprobante) */}
              <Pressable
                onPress={handleEliminarComprobante}
                style={{
                  width: 40,
                  height: 40,
                  borderTopEndRadius: BorderRadius.md,
                  borderBottomEndRadius: BorderRadius.md,
                  borderWidth: 1,
                  borderColor: colors.textMuted,
                  backgroundColor: colors.brandBuyer,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Cancel width={18} height={18} fill="#fff" />
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        /* Efectivo contra entrega */
         <View
          style={{
            backgroundColor: colors.textSecondaryBg || "#FEF3C7",
            padding: Spacing.md,
            borderRadius: BorderRadius.md,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.sm,
              color: colors.textError,
              textAlign: "center",
              marginBottom: Spacing.sm,
            }}
          >
            Para pagos en efectivo, indique con cuánto pagará así le llevamos cambio.
          </Text>

          <InputField
            value={importe}
            onChangeText={setImporte}
            placeholder="Importe"
            // placeholderTextColor={colors.textMuted}
            // keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}
            // style={{
            //   width: "90%",
            //   textAlign: "center",
            //   paddingVertical: Spacing.sm,
            //   borderRadius: BorderRadius.sm,
            //   backgroundColor: colors.background,
            //   borderWidth: 1,
            //   borderColor: colors.textMuted,
            // }}
          />
        </View>
      )}

      <LineaDivisoria marginVertical={Spacing.lg} />

      {/* Dirección de entrega */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          margin: Spacing.md,
        }}
      >
        <Ubicacion 
          width={18} 
          height={18} 
          fill={colors.textDefault}
          stroke={colors.textDefault}
        />
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.sm,
            color: colors.textDefault,
            flex: 1,
          }}
        >
          Dirección de entrega
        </Text>

        {/* Btn edit dirección de entrega */}
        <Pressable
          onPress={onEditarDireccion}
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <EditPencil width={16} height={16} fill={colors.brandBuyer} />
          <Text style={{ fontFamily: "Roboto-Bold", fontSize: FontSizes.sm, color: colors.brandBuyer }}>
            Editar
          </Text>
        </Pressable>
      </View>

      <Text
        style={{
          fontSize: FontSizes.md,
          color: colors.textDefault,
          backgroundColor: colors.textSecondaryBg || "#F9FAFB",
          padding: Spacing.md,
          borderRadius: BorderRadius.md,
        }}
      >
        {direccion}
      </Text>

      {/* Botón principal */}
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
        <Text
          style={{
            color: "white",
            fontFamily: "Roboto-Bold",
            fontSize: FontSizes.btn,
          }}
        >
          {formaPago === "transferencia"
            ? "Enviar información"
            : "Confirmar dirección"}
        </Text>
      </Pressable>
    </CardRespVendedorBase>
  );
}