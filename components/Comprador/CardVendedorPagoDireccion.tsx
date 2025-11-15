import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Cancel, Copiar, DocumentSolid, EditPencil, Ubicacion } from "../icons";
import LineaDivisoria from "../subcomponentes/LineaDivisoria";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
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
  timestampRespuesta: number; // NEW: timestamp cuando el vendedor respondió (Date.now() del backend)
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

      <View>
        <VerBottomSheet onPress={() => onVerPedido?.()} iconPosition="left" variant="buyer" />
      </View>

      <LineaDivisoria marginVertical={Spacing.lg} />

      {/* Título */}
      <Text
        style={{
          fontFamily: "Roboto-Medium",
          fontSize: FontSizes.base,
          backgroundColor: colors.textSecondaryBg || "#F9FAFB",
          color: colors.textDefault,
          marginBottom: Spacing.md,
          padding: 4
        }}
      >
        Forma de pago
      </Text>

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

              <Pressable style={{ padding: 8}}>
                <Copiar
                  width={26}
                  height={26}
                  fill={colors.textDefault}
                  stroke={colors.brandBuyer}
                />
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

          {/* Botón cargar comprobante */}
          <View>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: Spacing.md,
                paddingHorizontal: Spacing.lg,
                marginTop: Spacing.md,
                borderRadius: BorderRadius.md,
                borderWidth: 1,
                borderColor: colors.textMuted,
                backgroundColor: colors.background
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <DocumentSolid
                    width={24}
                    height={24}
                    fill={colors.brandBuyer}
                    stroke={colors.brandBuyer}
                  />
                <Text
                  style={{
                    fontSize: FontSizes.xs,
                    fontFamily: "Roboto-Regular",
                    color: colors.textDefault,
                  }}
                >
                  Cargar comprobante de pago
                </Text>
              </View>
              
            </Pressable>
          

          <Pressable>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: colors.textMuted,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cancel
                  width={24}
                  height={24}
                  fill={colors.textDefault}
                  // stroke={colors.brandBuyer}
                />
            </View>
            </Pressable>
          </View>
          </View>


        </>
      ) : (
        /* Efectivo contra entrega */
        <View
          style={{
            backgroundColor: "#FEF3C7",
            padding: Spacing.md,
            borderRadius: BorderRadius.md,
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.sm,
              color: "#92400E",
              textAlign: "center",
            }}
          >
            Para pagos en efectivo, indique con cuánto pagará así le llevamos cambio.
          </Text>
          <Pressable
            style={{
              marginTop: Spacing.sm,
              paddingVertical: Spacing.sm,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.sm,
                fontFamily: "Roboto-Bold",
                color: colors.brandBuyer,
              }}
            >
              Importe
            </Text>
          </Pressable>
        </View>
      )}

      <LineaDivisoria marginVertical={Spacing.lg} />

      {/* Dirección de entrega */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          marginTop: Spacing.sm,
          marginBottom: Spacing.sm,
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: Spacing.sm,
            marginBottom: Spacing.sm,
          }}
        >
          <Pressable onPress={onEditarDireccion}>
            <EditPencil width={18} height={18}/>
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: FontSizes.sm,
                color: colors.brandBuyer,
              }}
            >
              Editar
            </Text>
          </Pressable>
        </View>
      </View>

      <Text
        style={{
          fontSize: FontSizes.btn,
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
            ? "Enviar comprobante y dirección"
            : "Confirmar pedido y dirección"}
        </Text>
      </Pressable>
    </CardRespVendedorBase>
  );
}