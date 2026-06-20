import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import type { Pedido } from "@/types/pedidos";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import CalificacionDada from "../subcomponentes/CalificacionDada";
import { DeleteButton } from "../subcomponentes/DeleteButton";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";
import TextoPedido from "../subcomponentes/TextoPedido";
import LineaDivisoria from "../UI/LineaDivisoria";

interface CardHistorialCompradorProps {
  pedidoId: string | number;
  vendedorNombre: string;
  rating?: number;
  ratingCount?: number;
  precio: number;
  fechaSeleccion: string;
  textoPedido: string;
  notaVendedor?: string;
  onEliminar: (pedidoId: string | number) => void;
  calificacionDada?: { estrellas: number; comentario: string };
  motivoNoConcretado?: Pedido["motivoNoConcretado"];
}

export default function CardHistorialComprador({
  pedidoId,
  vendedorNombre,
  rating,
  ratingCount,
  precio,
  fechaSeleccion,
  textoPedido,
  notaVendedor,
  onEliminar,
  calificacionDada,
  motivoNoConcretado,
}: CardHistorialCompradorProps) {
  const { colors, fonts } = useTheme();
  const [expandido, setExpandido] = useState(false);

  const fechaFormateada = new Date(fechaSeleccion).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleEliminar = () => {
    onEliminar(pedidoId);
  };

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        gap: Spacing.md,
        elevation: 3,
        shadowColor: colors.textDefault,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      {/* Header: nombre + precio */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ gap: 4 }}>
          <Text
            style={{
              fontFamily: fonts.robotoBold,
              fontSize: FontSizes.base,
              color: colors.textDefault,
            }}
          >
            {vendedorNombre}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.md,
            color: colors.textDefault,
          }}
        >
          $ {precio.toLocaleString("es-AR")}
        </Text>
      </View>

      {/* Fecha */}
      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.sm,
          color: colors.textMuted,
        }}
      >
        Pedido del: {fechaFormateada}
      </Text>

      {/* Contenido expandible */}
      {expandido && (
        <View style={{ gap: Spacing.md, marginTop: Spacing.sm }}>
          <TextoPedido texto={textoPedido} />

          {notaVendedor && (
            <NotaDelVendedor
              nota={notaVendedor}
              onVerNota={(nota) => Alert.alert("Nota del vendedor", nota)}
            />
          )}

          {calificacionDada && (
            <View style={{ marginTop: Spacing.lg }}>
              <CalificacionDada
                estrellas={calificacionDada.estrellas}
                comentario={calificacionDada.comentario}
                label="Califiqué al vendedor con:"
              />
            </View>
          )}

          {motivoNoConcretado && (
            <View style={{ gap: Spacing.sm }}>
              <LineaDivisoria />
              <Text
                style={{
                  fontFamily: fonts.robotoMedium,
                  color: colors.textMuted,
                }}
              >
                ¿Qué sucedió?
              </Text>
              <Text
                style={{
                  fontFamily: fonts.robotoRegular,
                  color: colors.textDefault,
                }}
              >
                {motivoNoConcretado.opcion}
              </Text>
              {motivoNoConcretado.detalle && (
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    color: colors.textMuted,
                  }}
                >
                  {motivoNoConcretado.detalle}
                </Text>
              )}
            </View>
          )}

          <LineaDivisoria />
        </View>
      )}

      {/* Toggle */}
      <Pressable onPress={() => setExpandido(!expandido)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: Spacing.xl,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.robotoMedium,
              fontSize: FontSizes.sm,
              color: colors.brandBuyer,
              textDecorationLine: "underline",
            }}
          >
            {expandido ? "Ver menos" : "Ver más"}
          </Text>

          <DeleteButton onPress={handleEliminar} />
        </View>
      </Pressable>
    </View>
  );
}
