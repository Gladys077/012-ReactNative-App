import { FontSizes } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import Clipboard from "../icons/Clipboard";

interface VerBottomSheetProps {
  label?: string;
  iconPosition?: "left" | "right";
  variant?: "buyer" | "seller";
  icon?: React.ComponentType<any>;
  onPress?: () => void;
  style?: ViewStyle;
}

const VerBottomSheet: React.FC<VerBottomSheetProps> = ({
  label = "Ver pedido",
  iconPosition = "right",
  variant = "buyer",
  icon: Icon = Clipboard,
  onPress,
  style,
}) => {
  const { colors, fonts } = useTheme();

  const color = variant === "buyer" ? colors.brandBuyer : colors.brandSeller;

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flexDirection: iconPosition === "left" ? "row-reverse" : "row",
          alignItems: "center",
          alignSelf: "flex-end",
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: fonts.robotoMedium,
          color,
          fontSize: FontSizes.base,
          marginHorizontal: 4,
        }}
      >
        {label}
      </Text>
      <Icon width={20} height={20} fill={color} stroke={color} />
    </Pressable>
  );
};

export default VerBottomSheet;

//MODO DE USO:
{
  /* <VerBottomSheet onPress={() => onVerPedido?.(pedidoId)} variant="buyer"/>

<VerBottomSheet
  label="Ver detalle"
  iconPosition="left"
  icon={MiOtroIcono}
  onPress={() => console.log("clic")}
/> */
}

// Para seller:
{
  /* <VerBottomSheet onPress={() => onVerPedido?.(pedidoId)} variant="seller" /> */
}

// Con icono a la izquierda:
{
  /* <VerBottomSheet iconSide="left" label="Ver detalle" variant="buyer" /> */
}
