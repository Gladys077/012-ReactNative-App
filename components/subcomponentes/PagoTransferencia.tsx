import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { BorderRadius, FontSizes, Spacing } from "../../constants/Tokens";
import { Cancel, Check, Copiar, DocumentSolid } from "../icons";

import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";

interface Props {
  alias: string;
  entidad: string;
  titular: string;
  errorComprobante?: string;
  disabled?: boolean;
  onComprobanteChange?: (value: { uri: string; name: string } | null) => void;

}

const PagoTransferencia: React.FC<Props> = ({ alias, entidad, titular, errorComprobante, onComprobanteChange }) => {
  const { colors } = useTheme();

  // estado local comprobante + importe
  const [comprobante, setComprobante] = useState<{ uri: string; name: string } | null>(null);

  const [copiado, setCopiado] = useState(false); //para copiar alias

  // Cada vez que cambia el comprobante, avisamos al padre
  useEffect(() => {
    onComprobanteChange?.(comprobante);
  }, [comprobante]);

  // Para elegir archivo y cargarlo
  const handleCargarComprobante = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      //el estado local se actualiza y el padre recibe el valor
      setComprobante({ uri: file.uri, name: file.name });

    } catch (error) {
      console.log("Error al elegir comprobante:", error);
      Alert.alert("Error", "No se pudo cargar el archivo.");
    }
  };

  const handleEliminarComprobante = () => {
    Alert.alert(
      "Eliminar comprobante",
      "¿Querés borrar el archivo cargado?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => setComprobante(null), //elimina el comprobante y le avisa al padre
        },
      ]
    );
  };

  const handleCopiarAlias = async () => {
    if (!alias) {
      Alert.alert("Alias no disponible", "El vendedor no proporcionó alias.");
      return;
    }
    await Clipboard.setStringAsync(alias);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <View
      style={{
        marginTop: 4,
        padding: 12,
        backgroundColor: colors.cardBg,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text
        style={{
          fontFamily: "Roboto-Bold",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          textDecorationLine: "underline",
          marginBottom: Spacing.sm,
        }}
      >
        Datos para transferencia
      </Text>

      {/* Alias con copiar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text
            style={{
              fontSize: FontSizes.sm,
              color: colors.textDefault,
            }}
          >
            Alias:
          </Text>

          <Text
            style={{
              fontSize: FontSizes.sm,
              fontFamily: "Roboto-Bold",
              color: colors.textDefault,
            }}
          >
            {alias || " "}
          </Text>
        </View>

        <Pressable
          onPress={handleCopiarAlias}
          accessible
          accessibilityLabel="Copiar alias"
          style={{ padding: 8 }}
        >
          {copiado ? (
            <Check width={20} height={20} fill={colors.brandBuyer} />
          ) : (
            <Copiar width={20} height={20} fill={colors.brandBuyer} />
          )}
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
        <Text style={{ color: colors.textDefault, fontFamily: "Roboto-Bold" }}>
          {titular || "Juan Pérez"}
        </Text>
      </Text>

      {/* Botón cargar comprobante + cancelar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: Spacing.lg,
          gap: 4,
        }}
      >
        <Pressable
          onPress={handleCargarComprobante}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.lg,
            borderTopStartRadius: BorderRadius.md,
            borderBottomStartRadius: BorderRadius.md,
            borderWidth: 1,
            borderColor: errorComprobante ? colors.textError : colors.textMuted,
            backgroundColor: colors.background,
          }}
        >
          <DocumentSolid
            width={20}
            height={20}
            stroke={colors.brandBuyer}
          />

          <Text style={{ fontSize: FontSizes.sm, color: colors.textDefault }}>
            {comprobante ? comprobante.name : "Cargar comprobante"}
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

      {/* TEXTO DE ERROR */}
      {errorComprobante ? (
        <Text
          style={{
            marginTop: 6,
            color: colors.textError,
            fontSize: FontSizes.xs,
            fontFamily: "Roboto-Regular",
          }}
        >
          {errorComprobante}
        </Text>
      ) : null}
    </View>
  );
};

export default PagoTransferencia;
