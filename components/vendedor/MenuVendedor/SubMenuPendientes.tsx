import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import ConComprobante from "../../icons/ConComprobante";
import EnCaminoOutline from "../../icons/EnCaminoOutline";
import EnPreparacion from "../../icons/EnPreparacion";
import ListoParaEnviar from "../../icons/ListoParaEnviar";
import SinComprobante from "../../icons/SinComprobante";

export type SubTabPendiente =
  | "esperando_pago"
  | "con_comprobante"
  | "en_preparacion"
  | "listo_para_enviar"
  | "en_camino";

interface SubMenuItemProps {
  Icon: React.ComponentType<any>;
  label: string;
  badge: number;
  onPress: () => void;
}

const SubMenuItem = ({ Icon, label, badge, onPress }: SubMenuItemProps) => {
  const { colors, fonts } = useTheme();
  const iconSize = 36;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 25,
        paddingHorizontal: Spacing.lg,
        paddingLeft: 105,
        backgroundColor: pressed
          ? colors.textSecondaryBg
          : colors.bgSubMenuPendientes,
        borderBottomWidth: 1,
        borderBottomColor: colors.textSecondaryBorder,
        gap: Spacing.xl,
        width: "100%",
        maxWidth: 500,
      })}
    >
      {/* Ícono con badge */}
      <View style={{ position: "relative", width: iconSize, height: iconSize }}>
        <Icon width={iconSize} height={iconSize} color={colors.textDefault} />
        {badge > 0 && (
          <View
            style={{
              position: "absolute",
              top: -8,
              right: -4,
              backgroundColor: colors.headerFooterBg,
              borderRadius: 9999,
              minWidth: 18,
              height: 20,
              paddingHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 0.8,
              borderColor: colors.textDefault,
            }}
          >
            <Text
              style={{
                color: colors.textDefault,
                fontSize: 11,
                fontFamily: fonts.robotoMedium,
                lineHeight: 12,
              }}
            >
              {badge}
            </Text>
          </View>
        )}
      </View>

      {/* Label */}
      <Text
        style={{
          flex: 1,
          color: colors.textDefault,
          fontSize: 14,
          fontFamily: fonts.robotoMedium,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

// ─── Items config ─────────────────────────────────────────────────────────────

export const SUB_TABS: {
  key: SubTabPendiente;
  label: string;
  Icon: React.ComponentType<any>;
}[] = [
  { key: "esperando_pago", label: "Esperando Pago", Icon: SinComprobante },
  { key: "con_comprobante", label: "Con Comprobante", Icon: ConComprobante },
  { key: "en_preparacion", label: "En Preparación", Icon: EnPreparacion },
  {
    key: "listo_para_enviar",
    label: "Listo Para Enviar",
    Icon: ListoParaEnviar,
  },
  { key: "en_camino", label: "En Camino", Icon: EnCaminoOutline },
];

// Mapeo EstadoSistema → SubTabPendiente
export const estadoSistemaASubTab: Partial<
  Record<import("../../../types/pedidos").EstadoSistema, SubTabPendiente>
> = {
  aceptado_transferencia: "esperando_pago",
  pago_rechazado: "esperando_pago",
  pago_enviado: "con_comprobante",
  en_preparacion: "en_preparacion",
  listo_para_enviar: "listo_para_enviar",
  en_camino: "en_camino",
};

// ─── Componente ───────────────────────────────────────────────────────────────

interface SubMenuPendientesProps {
  pedidos: import("../../../types/pedidos").Pedido[];
  onSelectSubTab: (subTab: SubTabPendiente) => void;
}

const SubMenuPendientes = ({
  pedidos,
  onSelectSubTab,
}: SubMenuPendientesProps) => {
  const getBadge = (key: SubTabPendiente) =>
    pedidos.filter((p) => estadoSistemaASubTab[p.estadoSistema] === key).length;

  return (
    <View style={{ flex: 1 }}>
      {SUB_TABS.map(({ key, label, Icon }) => (
        <SubMenuItem
          key={key}
          Icon={Icon}
          label={label}
          badge={getBadge(key)}
          onPress={() => onSelectSubTab(key)}
        />
      ))}
    </View>
  );
};

export default SubMenuPendientes;
