import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";
import { Estrella100 } from "../icons";

interface CalificacionDadaProps {
  estrellas: number;
  comentario: string;
  label: string; // "Califiqué al vendedor con:" | "Califiqué al comprador con:"
}

export default function CalificacionDada({
  estrellas,
  comentario,
  label,
}: CalificacionDadaProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ gap: Spacing.xs }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}
      >
        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          {label}
        </Text>
        <View style={{ flexDirection: "row", gap: 2 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Estrella100
              key={n}
              width={16}
              height={16}
              fill={
                n <= estrellas ? colors.statusYellowDot : colors.textSecondaryBg
              }
            />
          ))}
        </View>
      </View>
      {comentario.trim() !== "" && (
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.sm,
            color: colors.textMuted,
            fontStyle: "italic",
          }}
        >
          {comentario}
        </Text>
      )}
    </View>
  );
}

// MODO DE USO:
// CardHistorialComprador
// {calificacionDada && (
//   <CalificacionDada
//     estrellas={calificacionDada.estrellas}
//     comentario={calificacionDada.comentario}
//     label="Califiqué al vendedor con:"
//   />
// )}

// CardHistorialVendedor
// {calif && (
//   <CalificacionDada
//     estrellas={calif.estrellas}
//     comentario={calif.comentario}
//     label="Califiqué al comprador con:"
//   />
// )}
