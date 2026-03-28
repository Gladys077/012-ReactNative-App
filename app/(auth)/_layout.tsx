// Sin header ni footer - es para login y elegirRol
import { useTheme } from "@/context/ThemeContext";
import { Slot } from "expo-router";
import { View } from "react-native";

const AuthLayout = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Slot />
    </View>
  );
};

export default AuthLayout;
