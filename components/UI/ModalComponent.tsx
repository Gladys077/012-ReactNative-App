import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import useModal from "@/hooks/useModal";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ModalComponentProps {
  visible: boolean;
  type: "alert" | "confirm";
  options: any;
  closeModal: () => void;
}

export default function ModalComponent() {
  const { colors, fonts } = useTheme();
  const { visible, type, options, closeModal } = useModal();

  if (!visible || !options) return null;

  const handleConfirm = () => {
    options?.onConfirm?.();
    closeModal();
  };

  const handleCancel = () => {
    options?.onCancel?.();
    closeModal();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={closeModal}
    >
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={closeModal}>
        {/* Caja del modal */}
        <Pressable
          style={{
            backgroundColor: colors.cardBg,
            padding: Spacing.xl,
            borderRadius: BorderRadius.md,
            minWidth: 280,
            width: "85%",
            maxWidth: 420,
          }}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Título */}
          {options?.title && (
            <Text
              style={{
                fontSize: FontSizes.md,
                fontFamily: fonts.robotoMedium,
                color: colors.textDefault,
                marginBottom: Spacing.md,
              }}
            >
              {options.title}
            </Text>
          )}

          {/* Mensaje */}
          {options?.message && (
            <Text
              style={{
                fontSize: FontSizes.btn,
                fontFamily: fonts.robotoRegular,
                color: colors.textDefault,
                marginBottom: Spacing.xxl,
              }}
            >
              {options.message}
            </Text>
          )}

          {/* Botones */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 36,
            }}
          >
            {type === "confirm" && (
              <Pressable onPress={handleCancel}>
                <Text
                  style={{
                    fontFamily: fonts.robotoMedium,
                    fontSize: FontSizes.btn,
                    color: colors.brandCommon,
                    textTransform: "uppercase",
                  }}
                >
                  {options?.cancelText || "Cancelar"}
                </Text>
              </Pressable>
            )}

            <Pressable onPress={handleConfirm}>
              <Text
                style={{
                  fontFamily: fonts.robotoMedium,
                  fontSize: FontSizes.btn,
                  color: colors.brandCommon,
                  textTransform: "uppercase",
                }}
              >
                {options?.confirmText || "OK"}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
