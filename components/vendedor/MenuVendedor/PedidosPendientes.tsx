import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import type { Pedido } from "../../../types/pedidos";
import SubMenuPendientes, {
  estadoSistemaASubTab,
  SUB_TABS,
  type SubTabPendiente,
} from "./SubMenuPendientes";

interface Props {
  pedidos: Pedido[];
}

const PedidosPendientes = ({ pedidos }: Props) => {
  const { colors, fonts } = useTheme();
  const [subTabActivo, setSubTabActivo] = useState<SubTabPendiente | null>(
    null,
  );

  // Pedidos filtrados por subtab activo
  const pedidosFiltrados = subTabActivo
    ? pedidos.filter(
        (p) => estadoSistemaASubTab[p.estadoSistema] === subTabActivo,
      )
    : [];

  const labelSubTab = SUB_TABS.find((t) => t.key === subTabActivo)?.label ?? "";

  // Vista de cards del subtab seleccionado
  if (subTabActivo !== null) {
    return (
      <View style={{ flex: 1 }}>
        {/* Título + botón volver */}
        <Pressable
          onPress={() => setSubTabActivo(null)}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.sm,
            paddingHorizontal: Spacing.lg,
            paddingVertical: Spacing.md,
            backgroundColor: pressed ? colors.textSecondaryBg : colors.cardBg,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          })}
        >
          <Text
            style={{
              color: colors.brandSeller,
              fontSize: FontSizes.md,
              fontFamily: fonts.robotoMedium,
            }}
          >
            ←
          </Text>
          <Text
            style={{
              color: colors.textDefault,
              fontSize: FontSizes.md,
              fontFamily: fonts.robotoMedium,
            }}
          >
            {labelSubTab}
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: FontSizes.sm,
              fontFamily: fonts.robotoRegular,
            }}
          >
            {pedidosFiltrados.length}
          </Text>
        </Pressable>

        {/* Cards — placeholder hasta hacer las cards del vendedor */}
        <ScrollView
          contentContainerStyle={{
            padding: Spacing.md,
            gap: Spacing.lg,
            paddingBottom: Spacing.xl,
          }}
          showsVerticalScrollIndicator={false}
        >
          {pedidosFiltrados.length === 0 ? (
            <Text
              style={{
                color: colors.textMuted,
                fontSize: FontSizes.md,
                textAlign: "center",
                marginTop: Spacing.xl,
              }}
            >
              No hay pedidos en este estado.
            </Text>
          ) : (
            pedidosFiltrados.map((p) => (
              <Text key={p.id} style={{ color: colors.textDefault }}>
                {p.compradorNombre} — {p.estadoSistema}
              </Text>
            ))
          )}
        </ScrollView>
      </View>
    );
  }

  // Vista del submenú
  return (
    <SubMenuPendientes pedidos={pedidos} onSelectSubTab={setSubTabActivo} />
  );
};

export default PedidosPendientes;
