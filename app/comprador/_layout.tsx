// app/comprador/_layout.tsx
import { Carrito } from "@/components/icons";
import { useTheme } from "@/context/ThemeContext";
import { Slot, usePathname } from "expo-router";
import { View } from "react-native";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function CompradorLayout() {
  const pathname = usePathname();
  const { colors } = useTheme();

  let headerProps: any = null;

  if (pathname === "/comprador/nuevoPedido") {
    // Header especial con carrito azul + título
    headerProps = {
      title: "Nuevo Pedido",
      leftContent: (
        <View className="flex-row items-center">
          <Carrito width={24} height={24} fill={colors.brandBuyer} />
        </View>
      ),
    };
  } else if (pathname.startsWith("/comprador")) {
    // Todas las demás páginas de comprador
    headerProps = {
      title: "Estado del pedido",
      showBackArrow: true,
    };
  }

  return (
    <>
      {headerProps && <Header {...headerProps} />}
      <Slot />
      <Footer />
    </>
  );
}
