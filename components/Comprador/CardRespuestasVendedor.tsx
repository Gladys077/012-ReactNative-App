import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import EstrellaReputacion from "../subcomponentes/EstrellaReputacion";
import NotaDelVendedor from "../subcomponentes/NotaDelVendedor";
import Button from "../UI/Button/Button";

interface CardRespuestaVendedorProps {
  id: string | number;
  vendedorNombre: string;
  rating: number; // De 0 a 5
  precio: number;
  nota?: string;
  duracionCronometro: number; // En minutos
  onAceptar: (id: string | number) => void;
  onCancelar: (id: string | number) => void;
  onFinishCronometro?: () => void;
  onVerNota?: (nota: string) => void;
}

export default function CardRespuestaVendedor({
  id,
  vendedorNombre,
  rating,
  precio,
  nota,
  duracionCronometro,
  onAceptar,
  onCancelar,
  onFinishCronometro,
  onVerNota,
}: CardRespuestaVendedorProps) {
  const { colors } = useTheme();

  // const handleCancelar = () => {
  //   Alert.alert(
  //     "Cancelar presupuesto",
  //     "Si confirmás la cancelación, este presupuesto se borrará y no podrás recuperarlo.",
  //     [
  //       { text: "Volver", style: "cancel" },
  //       {
  //         text: "Sí, cancelar",
  //         style: "destructive",
  //         onPress: () => onCancelar(id),
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };



  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.xxl,
        gap: Spacing.md,
        borderTopWidth: 1,
        borderBottomWidth: 4,
        borderColor: colors.brandBuyerSoft,
        elevation: 2,
        marginHorizontal: 4,
        marginVertical: 8,
      }}
    >
      {/* Header: Nombre + Rating + Cronómetro */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.md,
        }}
      >
        {/* Datos del vendedor */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: FontSizes.md,
              color: colors.textDefault,
              marginBottom: 4,
            }}
          >
            {vendedorNombre}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <EstrellaReputacion rating={rating} size={14} />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: FontSizes.sm,
                color: colors.textMuted,
              }}
            >
              ({rating.toFixed(1)})
            </Text>
          </View>
        </View>

        {/* Cronómetro */}
        <Cronometro
          id={`respuesta_${id}`}
          tipo="elegir"
          duracionInicial={duracionCronometro}
          onFinish={onFinishCronometro}
        />
      </View>

      {/* Nota + Presupuesto */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Nota del vendedor */}
        <NotaDelVendedor nota={nota} onVerNota={onVerNota} />


        {/* Título Presupuesto */}
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          Presupuesto:
        </Text>
      </View>

      {/* Precio */}
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            fontFamily: "Roboto-Bold",
            fontSize: FontSizes.xl,
            color: colors.textDefault,
          }}
        >
          ${precio.toLocaleString("es-AR")}
        </Text>
      </View>

      {/* Botones */}
      <View
        style={{
          flexDirection: "row",
          gap: Spacing.md,
          marginTop: Spacing.xs,
        }}
      >
        <View style={{ flex: 1 }}>
          <Button 
          variant="secondary" 
          height="md" 
          onPress={() => onCancelar?.(id)}
          >
            Cancelar
          </Button>
        </View>

        <View style={{ flex: 1 }}>
          <Button
            variant="primary"
            section="buyer"
            height="md"
            onPress={() => onAceptar(id)}
          >
            Aceptar
          </Button>
        </View>
      </View>
    </View>
  );
}
