import React from "react";
import { ScrollView, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { Carrito } from "../icons";
import Header from "./Header";

// Mock users
const mockBuyer = {
  name: "Ana Compradora",
  email: "ana@email.com",
  role: "buyer",
};

const mockSeller = {
  name: "Pedro Vendedor",
  email: "pedro@email.com",
  role: "seller",
  credits: 500,
  commerceName: "Tienda Pedro",
};

// Ejemplo de carrito para Buyer
const BuyerCarritoHeader = () => {
  const { colors } = useTheme();
  return (
    <Header
      title="Nuevo Pedido"
      leftContent={
        <View className="flex-row items-center">
          <Carrito width={24} height={24} fill={colors.brandBuyer} />
        </View>
      }
    />
  );
};

const HeaderTest = () => {
  const { colors } = useTheme();
  return (
    <ThemeProvider>
      <ScrollView className="flex-1 p-4"
      style={{
            backgroundColor: colors.headerBg,
            borderBottomColor: colors.border,
          }}
      >
        {/* Buyer: Flecha + Título */}
        <AuthContext.Provider value={{ user: mockBuyer } as any}>
          <View className="mb-6">
            <Header title="Nuevo Pedido" showBackArrow />
          </View>
        </AuthContext.Provider>

        {/* Buyer: Ícono carrito + Título */}
        <AuthContext.Provider value={{ user: mockBuyer } as any}>
          <View className="mb-6">
            <BuyerCarritoHeader />
          </View>
        </AuthContext.Provider>

        {/* Seller: Tienda + nombre comercio, créditos */}
        <AuthContext.Provider value={{ user: mockSeller } as any}>
          <View className="mb-6">
            <Header />
          </View>
        </AuthContext.Provider>

        {/* Seller: Flecha + título */}
        <AuthContext.Provider value={{ user: mockSeller } as any}>
          <View className="mb-6">
            <Header title="Pedidos Pendientes superlargo" showBackArrow />
          </View>
        </AuthContext.Provider>
      </ScrollView>
    </ThemeProvider>
  );
};

export default HeaderTest;
