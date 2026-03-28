import { BorderRadius } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, Text, View } from "react-native";
import { GoogleLogoColor } from "../../icons";

interface ButtonGoogleProps {
  onLogin: () => void;
  children?: string;
}

const ButtonGoogle = ({
  onLogin,
  children = "Sign in with Google",
}: ButtonGoogleProps) => {
  const { colors, fonts } = useTheme();

  return (
    <Pressable onPress={onLogin} style={{ width: "100%" }}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
            height: 56,
            borderRadius: BorderRadius.pillBtn,
            borderWidth: 1,
            borderColor: colors.border,
            transform: [{ scale: pressed ? 0.95 : 1 }],
            opacity: pressed ? 0.9 : 1,
            backgroundColor: colors.cardBg,
            elevation: 3,
          }}
        >
          <GoogleLogoColor height={20} style={{ marginHorizontal: 8 }} />
          <Text
            style={{
              color: colors.textDefault,
              marginLeft: 8,
              fontFamily: fonts.robotoMedium,
            }}
          >
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ButtonGoogle;
