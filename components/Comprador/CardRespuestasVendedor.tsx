import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import { Chat } from "../icons";
import EstrellaReputacion from "../subcomponentes/EstrellaReputación";
import AttentionRebote from "../UI/Animations/AttentionRebote";
import Button from "../UI/Button/Button";

interface CardRespuestaVendedorProps {
  id: string | number;
  vendedorNombre: string;
  // vendedorAvatar?: string; 
  rating: number; // De 0 a 5
  precio: number;
  nota?: string;
  duracionCronometro: number; // En minutos
  onAceptar: (id: string | number) => void;
  onCancelar: (id: string | number) => void;
  onFinishCronometro?: () => void;
  onVerNota?: (nota: string) => void; // Para abrir bottom sheet con la nota
}

export default function CardRespuestaVendedor({
  id,
  vendedorNombre,
  // vendedorAvatar,
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
  const [notaExpandida, setNotaExpandida] = useState(false);

  const handleCancelar = () => {
    Alert.alert(
      "Cancelar presupuesto",
      "Si confirmás la cancelación, este presupuesto se borrará y no podrás recuperarlo.",
      [
        { text: "Volver", style: "cancel" },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: () => onCancelar(id),
        },
      ],
      { cancelable: true }
    );
  };

  // para usar inicial si no hay avatar
  // const getInitials = (name: string) => {
  //   const words = name.trim().split(" ");
  //   if (words.length >= 2) {
  //     return `${words[0][0]}${words[1][0]}`.toUpperCase();
  //   }
  //   return name.substring(0, 2).toUpperCase();
  // };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderRadius: BorderRadius.md,
        padding: Spacing.xl,
        paddingVertical: Spacing.xxl,
        gap: Spacing.md,
        borderTopWidth: 1,
        borderBottomWidth: 4,
        borderColor: colors.brandBuyerSoft,
        elevation: 4,
        margin: 4,
        
      }}
    >
      {/* Header: Avatar + Nombre + Rating */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.md,
        }}
      >
        {/* Avatar */}
        {/* <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: vendedorAvatar ? "transparent" : colors.brandBuyer,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {vendedorAvatar ? (
            <Image
              source={{ uri: vendedorAvatar }}
              style={{ width: 48, height: 48 }}
              resizeMode="cover"
            />
          ) : (
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: FontSizes.md,
                color: "#FFFFFF",
              }}
            >
              {getInitials(vendedorNombre)}
            </Text>
          )}
        </View> */}

        {/* Nombre + Rating */}
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



      <View style={{justifyContent: "space-between", flexDirection: "row", alignItems: "flex-start"}}>
      {/* Nota del vendedor */}
      {nota ? (
        <Pressable
          onPress={() => onVerNota?.(nota)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Bold",
              fontSize: FontSizes.sm,
              // fontStyle: "italic",
              color: colors.brandBuyer,
              textDecorationLine: "underline",
            }}
          >
            VER NOTA
          </Text>

            <AttentionRebote>
          {/* Ícono con efecto solo si hay nota */}
            <Chat
              width={20}
              height={20}
              stroke={colors.brandBuyer}
              strokeWidth={1.5}
              fill={"white"}
            />
          </AttentionRebote>
        </Pressable>
      ) : (
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: FontSizes.sm,
              color: colors.textMuted,
              fontStyle: "italic",
            }}
          >
            {""}
          </Text>
          
      )}
          <Text style={{ fontFamily: "Roboto-Medium", fontSize: FontSizes.sm, color: colors.textDefault }}>
            Presupuesto:
          </Text>
      </View>

            {/* Precio */}
      <View style={{ alignItems: "flex-end" }}>
        
        <Text style={{ fontFamily: "Roboto-Bold", fontSize: FontSizes.xl, color: colors.textDefault }}>
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
          <Button variant="secondary" height="md"  onPress={handleCancelar}>
            Cancelar
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button variant="primary" height="md"  onPress={() => onAceptar(id)}>
            Aceptar
          </Button>
        </View>
      </View>
    </View>
  );
}