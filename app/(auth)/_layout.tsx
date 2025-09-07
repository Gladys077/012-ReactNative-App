// Sin header ni footer - es para login y elegirRol
import { Slot } from "expo-router";
import { View } from "react-native";

const AppLayout = () => {
  return (
    <View className="flex-1 bg-background">
      <Slot />
    </View>
  );
}

export default AppLayout;