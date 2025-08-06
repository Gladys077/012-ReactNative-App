import Footer from "@/components/Footer/Footer";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function VendedorTabsLayout() {
  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }} />
      <Footer />
    </View>
  );
}
