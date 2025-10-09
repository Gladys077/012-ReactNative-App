
import { useTheme } from "@/context/ThemeContext";
import { Slot } from "expo-router";
import { View } from "react-native";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

export default function CompradorLayout() {
  const { colors } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header (se adapta según la página) */}
      <Header />
      
      {/* Contenido scrollable */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      
      {/* Footer fijo abajo */}
      <Footer />
    </View>
  );
}