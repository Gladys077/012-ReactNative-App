import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import type { Comprobante } from "../../types/pedidos";

interface Props {
  visible: boolean;
  comprobantes: Comprobante[];
  onClose: () => void;
}

export default function ComprobanteViewerModal({
  visible,
  comprobantes,
  onClose,
}: Props) {
  const { colors, fonts } = useTheme();
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);

  return (
    <>
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: Spacing.lg,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.robotoBold,
                fontSize: FontSizes.md,
                color: colors.textDefault,
              }}
            >
              Comprobantes ({comprobantes.length})
            </Text>
            <Pressable onPress={onClose}>
              <Text
                style={{
                  fontFamily: fonts.robotoBold,
                  color: colors.brandSeller,
                }}
              >
                Cerrar
              </Text>
            </Pressable>
          </View>

          {/* Lista */}
          <FlatList
            data={comprobantes}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ padding: Spacing.lg, gap: Spacing.xl }}
            renderItem={({ item, index }) => (
              <View style={{ gap: Spacing.sm }}>
                {/* Etiqueta */}
                <Text
                  style={{
                    fontFamily: fonts.robotoMedium,
                    fontSize: FontSizes.sm,
                    color: colors.textMuted,
                  }}
                >
                  Comprobante {index + 1} ·{" "}
                  {new Date(item.fechaEnvio).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>

                {/* Imagen tappeable */}
                <Pressable onPress={() => setImagenAmpliada(item.uri)}>
                  <Image
                    source={{ uri: item.uri }}
                    style={{
                      width: "100%",
                      height: 300,
                      borderRadius: BorderRadius.md,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: FontSizes.xs,
                      fontFamily: fonts.robotoRegular,
                      color: colors.textMuted,
                      marginTop: Spacing.xs,
                    }}
                  >
                    Tocá para ampliar
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </Modal>

      {/* Imagen a pantalla completa */}
      <Modal
        visible={!!imagenAmpliada}
        animationType="fade"
        onRequestClose={() => setImagenAmpliada(null)}
      >
        <StatusBar hidden />
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
          }}
          onPress={() => setImagenAmpliada(null)}
        >
          <Image
            source={{ uri: imagenAmpliada ?? "" }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
          <Text
            style={{
              position: "absolute",
              top: Spacing.xl,
              right: Spacing.lg,
              color: "white",
              fontFamily: fonts.robotoBold,
              fontSize: FontSizes.sm,
            }}
          >
            Cerrar
          </Text>
        </Pressable>
      </Modal>
    </>
  );
}
