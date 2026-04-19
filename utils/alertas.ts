import { Alert } from "react-native";

export const alertaCancelarPedido = (onConfirmar?: () => void) => {
  Alert.alert(
    "Anular pedido",
    "¿Está seguro que quiere anularlo? Perderás el presupuesto seleccionado.",
    [
      { text: "Cancelar", style: "cancel" },
      { text: "Sí, anularlo", style: "destructive", onPress: onConfirmar },
    ],
    { cancelable: true },
  );
};
