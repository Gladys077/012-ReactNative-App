import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacing } from "../../../constants/Tokens";
import { useTheme } from "../../../context/ThemeContext";

export default function Terms() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Spacing.lg,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: Spacing.xl,
            marginTop: Spacing.xxl,
            paddingBottom: Spacing.xxl,
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: colors.textDefault,
              fontSize: 26,
              fontWeight: "600",
              marginBottom: Spacing.xxl,
            }}
          >
            FAQ
          </Text>

          <Text
            style={{
              color: colors.textDefault,
              lineHeight: 24,
            }}
          >
            Aquí irán FAQ
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
