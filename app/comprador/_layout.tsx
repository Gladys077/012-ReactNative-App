import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { Slot, useSegments } from "expo-router";
import { View } from "react-native";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

export default function CompradorLayout() {
  const { colors } = useTheme();
  const segments = useSegments();
  const currentPage = segments[segments.length - 1] as string; // extrae el último segmento (nombre de la screen)

  const getTitleByPage = () => {
    switch (currentPage) {
      case "nuevoPedido":
        return "Nuevo Pedido";
      case "estadoPedido":
        return "Estado del Pedido";
      case "historialComprador":
        return "Historial";
      case "ajustesComprador":
        return "Ajustes";
      default:
        return "";
    }
  };

  // El botón de volver solo aparece si NO estamos en 'nuevoPedido'
  const showBackArrow = currentPage !== "nuevoPedido";

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={getTitleByPage()} showBackArrow={showBackArrow} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: Spacing.xl,
          maxWidth: 500,
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Slot />
      </View>
      <Footer />
    </View>
  );
}
