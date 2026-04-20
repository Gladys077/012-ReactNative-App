import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Remove } from "../icons";
import LineaDivisoria from "../subcomponentes/LineaDivisoria";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";

interface CardHistorialCompradorProps {
  id: string | number;
  vendedorNombre: string;
  precio: number;
  fechaSeleccion: string;
  textoPedido: string;
  notaVendedor?: string;
  onEliminar: (id: string | number) => void;
}

export default function CardHistorialComprador({
  id,
  vendedorNombre,
  precio,
  fechaSeleccion,
  textoPedido,
  notaVendedor,
  onEliminar,
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
    Alert.alert(
      "Eliminar del historial",
      "¿Querés eliminar este pedido de tu historial?",
      [
        { text: "Cancelar  ", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onEliminar(id),
        },
      ],
      { cancelable: true },
    );
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
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.base,
            color: colors.textDefault,
          }}
        >
          {vendedorNombre}
        </Text>
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.base,
            color: colors.textDefault,
          }}
        >
          ${precio.toLocaleString("es-AR")}
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
          <Text
            style={{
              fontFamily: fonts.robotoRegular,
              fontSize: FontSizes.sm,
              color: colors.textDefault,
              lineHeight: 20,
              marginBottom: Spacing.lg,
            }}
          >
            {textoPedido}
          </Text>

          {notaVendedor && (
            <>
              {/* <LineaDivisoria /> */}
              <NotaDelVendedor
                nota={notaVendedor}
                onVerNota={(nota) => Alert.alert("Nota del vendedor", nota)}
              />
            </>
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

          {/* Remover card */}
          <Pressable onPress={handleEliminar} style={{ padding: Spacing.sm }}>
            <Remove width={26} height={26} fill={colors.textError} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}
