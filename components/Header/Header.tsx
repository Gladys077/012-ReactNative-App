import { useNavigation } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";

import { useAuthContext } from "../../context/AuthContext";
// import { useAuth } from "@/context/AuthContext";
// import ArrowLeftIcon from "@/assets/icons/ArrowLeft";
// import { getColorByRole } from "@/theme/Colors";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? "dark" : "light";

  const isSeller = user?.role === "seller";

  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b bg-header-bg dark:bg-header-bg-dark border-gray-200 dark:border-gray-700">
      {/* Botón back */}
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowLeftIcon
          width={24}
          height={24}
          stroke={getColorByRole("common", theme)}
        />
      </Pressable>

      {/* Título */}
      <Text className="text-lg font-Roboto-Bold text-text-default dark:text-text-default-dark">
        {title}
      </Text>

      {/* Créditos solo si es Seller */}
      {isSeller ? (
        <Text className="text-sm font-Roboto-Regular text-text-muted dark:text-text-muted-dark">
          Créditos: {user?.credits ?? 0}
        </Text>
      ) : (
        <View style={{ width: 24 }} /> // placeholder para mantener balance
      )}
    </View>
  );
}
