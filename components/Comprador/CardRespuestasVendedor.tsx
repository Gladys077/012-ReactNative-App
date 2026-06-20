import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { Alert, Text, Vibration, View } from "react-native";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";
import Button from "../UI/Button/Button";
import CardRespVendedorBase from "./CardRespVendedorBase";

interface CardRespuestaVendedorProps {
  respuestaId: string | number;
  vendedorNombre: string;
  rating: number;
  ratingCount: number;
  precio: number;
  nota?: string;
  duracionCronometro: number;
  onAceptar: (respuestaId: string | number) => void;
  onRechazar: (respuestaId: string | number) => void;
  onVerNota?: (nota: string) => void;
  onFinishCronometro?: (respuestaId: string | number) => void;
}

export default function CardRespuestaVendedor({
  respuestaId,
  vendedorNombre,
  rating,
  ratingCount = 0,
  precio,
  nota,
  duracionCronometro,
  onAceptar,
  onRechazar,
  onVerNota,
  onFinishCronometro,
}: CardRespuestaVendedorProps) {
  const { colors, fonts } = useTheme();
  // const { openModal } = useModal();

  const handleConfirmarRechazo = () => {
    Vibration.vibrate(300);
    Alert.alert(
      "Rechazar presupuesto",
      "Si confirmas, este presupuesto se eliminará y no podrás recuperarlo.",
      [
        { text: "Cancelar  ", style: "cancel" },
        {
          text: "Sí, rechazar",
          style: "destructive",
          onPress: () => onRechazar(respuestaId),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <CardRespVendedorBase
      respuestaId={respuestaId}
      vendedorNombre={vendedorNombre}
      rating={rating}
      ratingCount={ratingCount}
      precio={precio}
      nota={nota}
      duracionCronometro={duracionCronometro}
      tipoCronometro="espera"
      onFinishCronometro={onFinishCronometro}
    >
      {/* Nota del vendedor a la izq. y Presupuesto a la derecha */}
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: Spacing.sm,
        }}
      >
        <NotaDelVendedor nota={nota} onVerNota={onVerNota} />

        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          Presupuesto:
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.xl,
            color: colors.textDefault,
          }}
        >
          ${precio.toLocaleString("es-AR")}
        </Text>
      </View>

      {/* Btns: Rechazar - Aceptar */}
      <View
        style={{
          flexDirection: "row",
          gap: Spacing.md,
          marginTop: Spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <Button
            variant="secondary"
            height="md"
            width="full"
            onPress={handleConfirmarRechazo}
          >
            Rechazar
          </Button>
        </View>

        <View style={{ flex: 1 }}>
          <Button
            variant="primary"
            section="buyer"
            height="md"
            width="full"
            onPress={() => onAceptar(respuestaId)}
          >
            Aceptar
          </Button>
        </View>
      </View>
    </CardRespVendedorBase>
  );
}
