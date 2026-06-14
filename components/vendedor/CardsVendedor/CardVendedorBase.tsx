// Este es el contenedor visual puro — maneja el layout de la card, el header (fecha + estado), nombre, rating, precio, y el toggle expandir/colapsar.

import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { DeleteButton } from "../../subcomponentes/DeleteButton";
import EstrellaUnica from "../../subcomponentes/EstrellaUnica";
import EtiqEstadoDelPedido, {
  EtiqEstadoType,
} from "../../subcomponentes/EtiqEstadoDelPedido";
import TiempoAceptacion from "../../subcomponentes/TiempoAceptacion";
import ToggleExpandir from "../../subcomponentes/ToggleExpandir";
import LineaDivisoria from "../../UI/LineaDivisoria";

interface CardVendedorBaseProps {
  fechaSeleccion?: string;
  estado: EtiqEstadoType;
  compradorNombre?: string;
  compradorRating?: number;
  compradorRatingCount?: number;
  precio?: number;
  children?: React.ReactNode;
  contenidoExpandible?: React.ReactNode;
  style?: ViewStyle;
  elevation?: number;
  mostrarTiempoAceptacion?: boolean;
  onCancelarPedido?: () => void;
}

export default function CardVendedorBase({
  fechaSeleccion,
  estado,
  compradorNombre,
  compradorRating,
  compradorRatingCount,
  precio,
  children,
  contenidoExpandible,
  style,
  elevation,
  mostrarTiempoAceptacion = true,
  onCancelarPedido,
}: CardVendedorBaseProps) {
  const { colors, fonts } = useTheme();
  const [expandido, setExpandido] = useState(false);

  return (
    <View
      style={[
        {
          backgroundColor: colors.cardBg,
          borderRadius: BorderRadius.lg,
          borderWidth: 1,
          borderColor: colors.borderTopBottomSeller,
          paddingHorizontal: Spacing.xl,
          paddingVertical: Spacing.xxl,
          gap: Spacing.md,
          elevation: elevation ?? 5,
          marginBottom: Spacing.md,
        },
        style,
      ]}
    >
      {/* HEADER: fecha + estado */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: FontSizes.sm,
            fontFamily: fonts.robotoRegular,
            color: colors.textMuted,
          }}
        >
          {fechaSeleccion
            ? new Date(fechaSeleccion).toLocaleString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </Text>
        <EtiqEstadoDelPedido estado={estado} />
      </View>

      {/* NOMBRE + RATING */}
      {compradorNombre && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.md,
              fontFamily: fonts.robotoBold,
              color: colors.textDefault,
              // flex: 1,
            }}
          >
            {compradorNombre}
          </Text>
          {compradorRating !== undefined && (
            <EstrellaUnica
              rating={compradorRating}
              ratingCount={compradorRatingCount}
            />
          )}
        </View>
      )}

      {/* TIEMPO DESDE ACEPTACIÓN */}
      {mostrarTiempoAceptacion && (
        <TiempoAceptacion fechaSeleccion={fechaSeleccion} />
      )}

      {/* TRASH + Total */}
      {precio !== undefined && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: Spacing.md,
          }}
        >
          {/* Trash a la izquierda */}
          {onCancelarPedido ? (
            <DeleteButton onPress={onCancelarPedido} />
          ) : (
            <View />
          )}

          {/* Total a la derecha */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: Spacing.sm,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.md,
                fontFamily: fonts.robotoRegular,
                color: colors.textMuted,
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                fontSize: FontSizes.lg,
                fontFamily: fonts.robotoBold,
                color: colors.textDefault,
              }}
            >
              $ {precio.toLocaleString("es-AR")}
            </Text>
          </View>
        </View>
      )}

      <LineaDivisoria />
      {/* TOGGLE VER MÁS / VER MENOS */}
      <ToggleExpandir
        textoMostrar="Ver más"
        textoOcultar="Ver menos"
        colorTexto={colors.brandSeller}
        onToggle={(val) => setExpandido(val)}
        style={{
          backgroundColor: colors.background,
          paddingVertical: 6,
          borderRadius: BorderRadius.lg,
        }}
      >
        {contenidoExpandible}
      </ToggleExpandir>

      {/* {!expandido && <LineaDivisoria />} */}

      {/* CONTENIDO EXTRA (botones, etc.) */}
      {children}
    </View>
  );
}
