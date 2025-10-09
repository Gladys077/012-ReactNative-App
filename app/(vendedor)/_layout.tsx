import { useTheme } from "@/context/ThemeContext";
import { Slot } from "expo-router";
import { View } from "react-native";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

export default function VendedorLayout() {
  const { colors } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />
      
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      
      <Footer />
    </View>
  );
}