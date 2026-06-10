import { Pressable } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Remove } from "../icons";

interface DeleteButtonProps {
  onPress: () => void;
  size?: number;
}

export function DeleteButton({ onPress, size = 24 }: DeleteButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => ({
        padding: 4,
        borderRadius: 999,
        backgroundColor: pressed ? colors.textError : "transparent",
      })}
    >
      {({ pressed }) => (
        <Remove
          width={size}
          height={size}
          fill={pressed ? colors.textDefault : colors.textError}
        />
      )}
    </Pressable>
  );
}

/*
PROPS:

onPress: () => void   // Acción al presionar el botón
size?: number         // Tamaño del ícono (default: 24)

EJEMPLO:

<DeleteButton
  onPress={onCancelarPedido}
/>

<DeleteButton
  size={32}
  onPress={handleDelete}
/>
*/
