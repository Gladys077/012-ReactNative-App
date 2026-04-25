import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Enviar } from "../../icons";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import Button from "../../UI/Button/Button";
import LineaDivisoria from "../../UI/LineaDivisoria";
import CardVendedorBase from "./CardVendedorBase";

interface CardPedidoNuevoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  estadoSistema: "nuevo" | "presupuestado";
  precioEnviado?: number;
  notaEnviada?: string;
  onEnviarPresupuesto: (
    pedidoId: string | number,
    precio: number,
    nota?: string,
  ) => void;
  onEliminarPedido: (pedidoId: string | number) => void;
}

const ContenidoExpandible = ({
  pedidoId,
  textoPedido,
  estadoSistema,
  precioEnviado,
  notaEnviada,
  onEnviarPresupuesto,
  onEliminarPedido,
}: {
  pedidoId: string | number;
  textoPedido: string;
  estadoSistema: "nuevo" | "presupuestado";
  precioEnviado?: number;
  notaEnviada?: string;
  onEnviarPresupuesto: (
    pedidoId: string | number,
    precio: number,
    nota?: string,
  ) => void;
  onEliminarPedido: (pedidoId: string | number) => void;
}) => {
  const { colors, fonts } = useTheme();

  const [nota, setNota] = useState(notaEnviada ?? "");
  const [precio, setPrecio] = useState(
    precioEnviado ? String(precioEnviado) : "",
  );
  const [errorPrecio, setErrorPrecio] = useState("");

  const yaPresupuestado = estadoSistema === "presupuestado";

  const handleEnviar = () => {
    const precioNum = parseFloat(precio.replace(",", "."));
    if (!precio.trim() || isNaN(precioNum) || precioNum <= 0) {
      setErrorPrecio("Ingresá un precio válido.");
      return;
    }
    setErrorPrecio("");
    onEnviarPresupuesto(pedidoId, precioNum, nota.trim() || undefined);
  };

  const handleEliminar = () => {
    Alert.alert(
      "Eliminar pedido",
      "¿Estás seguro que querés eliminar este pedido de tu lista?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onEliminarPedido(pedidoId),
        },
      ],
    );
  };

  return (
    <View style={{ gap: Spacing.lg, marginTop: Spacing.md }}>
      {/* Texto del pedido — fondo diferenciado */}
      <View
        style={{
          backgroundColor: colors.textSecondaryBg,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
        }}
      >
        <Text
          style={{
            fontSize: FontSizes.sm,
            fontFamily: fonts.robotoRegular,
            color: colors.textDefault,
            lineHeight: 22,
          }}
        >
          {textoPedido}
        </Text>
      </View>

      {/* Label + Input nota */}
      <View style={{ gap: Spacing.xs, marginVertical: Spacing.sm }}>
        <Text
          style={{
            fontSize: FontSizes.sm,
            fontFamily: fonts.robotoMedium,
            color: colors.textOnColor,
          }}
        >
          Tu nota{" "}
          <Text style={{ fontFamily: fonts.robotoRegular }}>(opcional)</Text>
        </Text>
        <TextInput
          placeholder="Escribe aquí cualquier aclaración o detalle que quieras agregar a tu presupuesto."
          placeholderTextColor={colors.textMuted}
          value={nota}
          onChangeText={setNota}
          editable={!yaPresupuestado}
          multiline
          textAlignVertical="top"
          style={{
            borderWidth: 1,
            borderColor: colors.inputBorder,
            borderRadius: BorderRadius.md,
            padding: Spacing.md,
            fontSize: FontSizes.sm,
            fontStyle: "italic",
            fontFamily: fonts.robotoRegular,
            color: colors.textDefault,
            backgroundColor: yaPresupuestado
              ? colors.textSecondaryBg
              : colors.cardBg,
            minHeight: 64,
          }}
        />
      </View>

      {/* Label + Input precio con prefijo $ */}
      <View style={{ gap: Spacing.xs }}>
        <Text
          style={{
            fontSize: FontSizes.sm,
            fontFamily: fonts.robotoMedium,
            color: colors.textOnColor,
          }}
        >
          Tu precio
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: errorPrecio
              ? colors.textError
              : yaPresupuestado
                ? colors.border
                : colors.brandSeller,
            borderRadius: BorderRadius.md,
            backgroundColor: yaPresupuestado
              ? colors.textSecondaryBg
              : colors.cardBg,
            paddingHorizontal: Spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.md,
              fontFamily: fonts.robotoBold,
              color: colors.textDefault,
              marginRight: Spacing.xs,
            }}
          >
            $
          </Text>
          <TextInput
            placeholder="0"
            placeholderTextColor={colors.textMuted}
            value={precio}
            onChangeText={(v) => {
              setPrecio(v);
              if (errorPrecio) setErrorPrecio("");
            }}
            editable={!yaPresupuestado}
            keyboardType="numeric"
            textAlign="right"
            style={{
              flex: 1,
              fontSize: FontSizes.md,
              fontFamily: fonts.robotoBold,
              color: colors.textDefault,
              paddingVertical: Spacing.md,
            }}
          />
        </View>
        {errorPrecio !== "" && (
          <Text
            style={{
              fontSize: FontSizes.xs,
              color: colors.textError,
              fontFamily: fonts.robotoRegular,
            }}
          >
            {errorPrecio}
          </Text>
        )}
      </View>

      <LineaDivisoria />

      {/* Botones — flex row para ocupar ancho completo */}
      <View style={{ flexDirection: "row", gap: Spacing.md }}>
        {!yaPresupuestado ? (
          <>
            <View style={{ flex: 1 }}>
              <Button
                section="seller"
                variant="secondary"
                width="full"
                onPress={handleEliminar}
              >
                Eliminar pedido
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                section="seller"
                variant="primary"
                width="full"
                icon={Enviar}
                iconPosition="left"
                onPress={handleEnviar}
              >
                Enviar precio
              </Button>
            </View>
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <Button section="seller" variant="primary" width="full" disabled>
              ✓ Precio enviado
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default function CardPedidoNuevo({
  pedidoId,
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  estadoSistema,
  precioEnviado,
  notaEnviada,
  onEnviarPresupuesto,
  onEliminarPedido,
}: CardPedidoNuevoProps) {
  const estado: EtiqEstadoType =
    estadoSistema === "presupuestado" ? "Presupuestado" : "Nuevo pedido";

  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={estado}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      contenidoExpandible={
        <ContenidoExpandible
          pedidoId={pedidoId}
          textoPedido={textoPedido}
          estadoSistema={estadoSistema}
          precioEnviado={precioEnviado}
          notaEnviada={notaEnviada}
          onEnviarPresupuesto={onEnviarPresupuesto}
          onEliminarPedido={onEliminarPedido}
        />
      }
    />
  );
}
