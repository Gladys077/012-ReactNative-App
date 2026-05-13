import { Spacing } from "@/constants/Tokens";
// import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Slot, useSegments } from "expo-router";
import { View } from "react-native";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import { BottomSheetVerPedidoProvider } from "../../context/BottomSheetVerPedidoContext";

export default function VendedorLayout() {
  const { colors } = useTheme();
  // const { user } = useAuthContext();
  const segments = useSegments();
  const currentPage = segments[segments.length - 1] as string;

  const isHome = currentPage === "homeVendedor";

  const getTitleByPage = () => {
    switch (currentPage) {
      case "homeVendedor":
        return "Mi Negocio";
      // return user?.commerceName || "Mi negocio";
      case "historialVendedor":
        return "Historial de ventas";
      case "creditos":
        return "Mis créditos";
      case "comprar":
        return "Comprar";
      case "ajustesVendedor":
        return "Ajustes";
      default:
        return "Mi negocio";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header recibe showBackArrow solo si NO estamos en la home */}
      <Header
        title={getTitleByPage()}
        showBackArrow={!isHome}
        variant="seller"
      />
      <BottomSheetVerPedidoProvider>
        <View
          style={{
            flex: 1,
            paddingTop: Spacing.xs,
            paddingBottom: Spacing.lg,
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Slot />
        </View>
      </BottomSheetVerPedidoProvider>
      <Footer />
    </View>
  );
}
