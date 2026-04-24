import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Enviar } from "../../icons";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import Button from "../../UI/Button/Button";
import CardVendedorBase from "./CardVendedorBase";

interface CardPedidoNuevoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  estadoSistema: "nuevo" | "presupuestado";
  // Datos ya enviados (cuando estadoSistema === "presupuestado")
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
  textoPedido,
  estadoSistema,
  precioEnviado,
  notaEnviada,
  onEnviarPresupuesto,
  onEliminarPedido,
  pedidoId,
}: {
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
  pedidoId: string | number;
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
    <View style={{ gap: Spacing.md }}>
      {/* Texto del pedido */}
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

      {/* Nota del vendedor */}
      <TextInput
        placeholder="Nota del vendedor (opcional)"
        placeholderTextColor={colors.textMuted}
        value={nota}
        onChangeText={setNota}
        editable={!yaPresupuestado}
        multiline
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          fontSize: FontSizes.sm,
          fontFamily: fonts.robotoRegular,
          color: colors.textDefault,
          backgroundColor: yaPresupuestado
            ? colors.textSecondaryBg
            : colors.cardBg,
          minHeight: 60,
          textAlignVertical: "top",
        }}
      />

      {/* Input precio */}
      <TextInput
        placeholder="Total $"
        placeholderTextColor={colors.textMuted}
        value={precio}
        onChangeText={(v) => {
          setPrecio(v);
          if (errorPrecio) setErrorPrecio("");
        }}
        editable={!yaPresupuestado}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: errorPrecio
            ? colors.textError
            : yaPresupuestado
              ? colors.border
              : colors.brandSeller,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          fontSize: FontSizes.sm,
          fontFamily: fonts.robotoRegular,
          color: colors.textDefault,
          backgroundColor: yaPresupuestado
            ? colors.textSecondaryBg
            : colors.cardBg,
        }}
      />
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

      {/* Botones */}
      <View style={{ flexDirection: "row", gap: Spacing.md }}>
        {/* Eliminar — solo antes de presupuestar */}
        {!yaPresupuestado && (
          <Button
            section="seller"
            variant="secondary"
            width="half"
            onPress={handleEliminar}
          >
            Eliminar pedido
          </Button>
        )}

        {/* Enviar precio / Precio enviado */}
        <Button
          section="seller"
          variant="primary"
          disabled={yaPresupuestado}
          width={yaPresupuestado ? "full" : "half"}
          icon={yaPresupuestado ? undefined : Enviar}
          iconPosition="left"
          onPress={yaPresupuestado ? undefined : handleEnviar}
        >
          {yaPresupuestado ? "✓  Precio enviado" : "Enviar precio"}
        </Button>
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
