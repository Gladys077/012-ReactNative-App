import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
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
        gap: Spacing.sm,
        elevation: 3,
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
          {/* {rating !== undefined && (
            <EstrellaUnica
              rating={rating}
              ratingCount={ratingCount}
              size={13}
            />
          )} */}
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
            <>
              {/* <LineaDivisoria /> */}
              <NotaDelVendedor
                nota={notaVendedor}
                onVerNota={(nota) => Alert.alert("Nota del vendedor", nota)}
              />
            </>
          )}

          <View style={{ marginTop: Spacing.lg }}>
            {calificacionDada && (
              <CalificacionDada
                estrellas={calificacionDada.estrellas}
                comentario={calificacionDada.comentario}
                label="Califiqué al vendedor con:"
              />
            )}
          </View>

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

          {/* Remover card */}
          <DeleteButton onPress={handleEliminar} />
        </View>
      </Pressable>
    </View>
  );
}
