import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import {
  EnCaminoOutline,
  EnPreparacionNuevo,
  EsperandoPago,
  ListoParaEnviarNuevo,
  PagoObservado,
  RevisarPago,
} from "../../icons";

export type SubTabPendiente =
  | "esperando_pago"
  | "revisar_pago"
  | "pago_observado"
  | "en_preparacion"
  | "listo_para_enviar"
  | "en_camino";

interface SubMenuItemProps {
  Icon: React.ComponentType<any>;
  label: string;
  badge: number;
  onPress: () => void;
  index: number;
}

const STAGGER_DELAY = 60; // ms entre cada ítem
const ANIM_DURATION = 280; // ms que dura cada ítem

const SubMenuItem = ({
  Icon,
  label,
  badge,
  onPress,
  index,
}: SubMenuItemProps) => {
  const { colors, fonts } = useTheme();
  const iconSize = 36;

  // Valores animados para mostrar el submenú pendientes
  const translateY = useRef(new Animated.Value(-24)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIM_DURATION,
        delay: index * STAGGER_DELAY,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIM_DURATION,
        delay: index * STAGGER_DELAY,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
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
        <View
          style={{ position: "relative", width: iconSize, height: iconSize }}
        >
          <Icon width={iconSize} height={iconSize} color={colors.textDefault} />
          {badge > 0 && (
            <View
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                backgroundColor: colors.badge,
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
                  color: colors.textOnColor,
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
    </Animated.View>
  );
};

// ─── Items config ─────────────────────────────────────────────────────────────

export const SUB_TABS: {
  key: SubTabPendiente;
  label: string;
  Icon: React.ComponentType<any>;
}[] = [
  { key: "esperando_pago", label: "Esperando Pago", Icon: EsperandoPago },
  { key: "revisar_pago", label: "Revisar Pago", Icon: RevisarPago },
  { key: "pago_observado", label: "Pago Observado", Icon: PagoObservado },
  { key: "en_preparacion", label: "En Preparación", Icon: EnPreparacionNuevo },
  {
    key: "listo_para_enviar",
    label: "Listo Para Enviar",
    Icon: ListoParaEnviarNuevo,
  },
  { key: "en_camino", label: "En Camino", Icon: EnCaminoOutline },
];

// Mapeo EstadoSistema → SubTabPendiente
export const estadoSistemaASubTab: Partial<
  Record<import("../../../types/pedidos").EstadoSistema, SubTabPendiente>
> = {
  aceptado_transferencia: "esperando_pago",
  pago_enviado: "revisar_pago",
  pago_observado: "pago_observado",
  aceptado_efectivo: "en_preparacion",
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
      {SUB_TABS.map(({ key, label, Icon }, index) => (
        <SubMenuItem
          key={key}
          index={index}
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
