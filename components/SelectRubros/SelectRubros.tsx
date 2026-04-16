import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Animated, Pressable, Text, View } from "react-native";
import { BorderRadius, FontSizes, Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";
import { Chevron, MasBlanca, TiendaIcon } from "../icons";
import NuevoRubroInput from "./NuevoRubroInput";
import { rubroColorPalette } from "./rubroColors";
import RubroItem from "./RubroItem";
import { RubroConfig, rubrosVendedor } from "./rubrosConfig";

export interface Rubro {
  label: string;
  value: string;
  IconComponent: React.ComponentType<{
    width: number;
    height: number;
    color?: string;
    fill?: string;
  }>;
  color: string;
  iconColor: string;
}

// Repara los rubros personalizados que vienen de AsyncStorage:
// como JSON no puede guardar funciones, el IconComponent llega undefined.
// Esta función lo reemplaza con TiendaIcon y completa color e iconColor si faltan.
export function repararRubros(lista: RubroConfig[]): RubroConfig[] {
  return lista.map((r) => ({
    ...r,
    IconComponent: r.IconComponent ?? TiendaIcon,
    color: r.color ?? "#CFD8DC",
    iconColor: r.iconColor ?? "#607D8B",
  }));
}

type Props = {
  label?: string;
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  section?: "seller" | "buyer";
  borderColor?: string;
};

const STORAGE_KEY = "rubrosVendedorGuardados";
const SELECTED_KEY = (section: string) => `selectedRubros_${section}`;

export default function SelectRubros({
  label,
  selected,
  onChange,
  placeholder = "Selecciona tu/s rubro/s",
  section = "seller",
  borderColor,
}: Props) {
  const { colors, mode } = useTheme();
  const allowAddNew = section === "seller";

  const [isOpen, setIsOpen] = useState(false);
  const [rubrosInternos, setRubrosInternos] = useState<Rubro[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>(selected);
  const [nuevoRubro, setNuevoRubro] = useState("");
  const [agregando, setAgregando] = useState(false);

  const rotateAnim = useMemo(() => new Animated.Value(0), []);

  const animateChevron = (open: boolean) => {
    Animated.timing(rotateAnim, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  useFocusEffect(
    useCallback(() => {
      const loadRubros = async () => {
        try {
          if (section !== "seller") {
            setRubrosInternos(rubrosVendedor);
            setSelectedValues(selected);
            return;
          }
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
          const rubrosGuardados: RubroConfig[] = stored
            ? JSON.parse(stored)
            : [];
          const rubrosReparados = repararRubros(rubrosGuardados);
          setRubrosInternos([...rubrosVendedor, ...rubrosReparados]);

          const storedSelected = await AsyncStorage.getItem(
            SELECTED_KEY(section),
          );
          if (storedSelected) {
            const parsed = JSON.parse(storedSelected);
            setSelectedValues(parsed);
            onChange(parsed);
          }
        } catch (error) {
          console.error("Error al cargar rubros:", error);
        }
      };
      loadRubros();
    }, [section]),
  );

  useEffect(() => {
    setSelectedValues(selected);
  }, [selected]);

  const toggleOpen = () => {
    const next = !isOpen;
    setIsOpen(next);
    animateChevron(next);
  };

  const toggleRubro = (value: string) => {
    const nextValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(nextValues);
    onChange(nextValues); //Esto envía los datos a NuevoPedido.tsx al instante
  };

  const agregarNuevoRubro = async () => {
    const trimmed = nuevoRubro.trim();
    if (!trimmed) return;

    const valor = trimmed.toLowerCase().replace(/\s+/g, "-");
    if (rubrosInternos.some((r) => r.value === valor)) {
      Alert.alert("Atención", "Ese rubro ya existe");
      setNuevoRubro("");
      setAgregando(false);
      return;
    }

    const index = rubrosInternos.length % rubroColorPalette.length;
    const { color, iconColor } = rubroColorPalette[index];

    const nuevo: Rubro = {
      label: trimmed,
      value: valor,
      IconComponent: TiendaIcon,
      color,
      iconColor,
    };
    const actualizados = [...rubrosInternos, nuevo];
    setRubrosInternos(actualizados);
    setSelectedValues((prev) => [...prev, valor]);

    try {
      const personalizados = actualizados.filter(
        (r) => !rubrosVendedor.some((base) => base.value === r.value),
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(personalizados));
    } catch (error) {
      console.error("Error guardando rubros:", error);
    }
    setNuevoRubro("");
    setAgregando(false);
  };

  const handleGuardar = async () => {
    try {
      if (section === "seller") {
        await AsyncStorage.setItem(
          SELECTED_KEY(section),
          JSON.stringify(selectedValues),
        );
      }
      onChange(selectedValues);
    } catch (error) {
      console.error("Error guardando selección:", error);
    }
    toggleOpen();
  };

  const handleCancelar = () => {
    setSelectedValues(selected);
    setNuevoRubro("");
    setAgregando(false);
    toggleOpen();
  };

  return (
    <View
      style={{
        borderRadius: BorderRadius.xl,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: borderColor || colors.inputBorder,
      }}
    >
      {/* Header del acordeón */}
      <Pressable
        onPress={toggleOpen}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 18,
          backgroundColor: colors.cardBg,
        }}
      >
        <Text
          style={{
            flex: 1,
            color:
              selectedValues.length > 0 ? colors.textDefault : colors.textMuted,
            fontSize: FontSizes.base,
          }}
        >
          {selectedValues.length > 0
            ? rubrosInternos
                .filter((r) => selectedValues.includes(r.value))
                .map((r) => r.label)
                .join(", ")
            : placeholder}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Chevron width={18} height={18} color={colors.textMuted} />
        </Animated.View>
      </Pressable>

      {/* Lista expandible */}
      {isOpen && (
        <View style={{ paddingHorizontal: 12, paddingBottom: 8 }}>
          {rubrosInternos.map((item) => (
            <RubroItem
              key={item.value}
              rubro={item}
              isSelected={selectedValues.includes(item.value)}
              onToggle={toggleRubro}
            />
          ))}
          {allowAddNew ? (
            agregando ? (
              <NuevoRubroInput
                value={nuevoRubro}
                onChange={setNuevoRubro}
                onAdd={agregarNuevoRubro}
                onCancel={() => {
                  setAgregando(false);
                  setNuevoRubro("");
                }}
              />
            ) : (
              <Pressable
                onPress={() => setAgregando(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                    backgroundColor: mode === "dark" ? "#4A5568" : "#b4bbc5",
                  }}
                >
                  <MasBlanca
                    width={20}
                    height={20}
                    color={mode === "dark" ? "#CBD5E0" : "#9CA3AF"}
                  />
                </View>
                <Text
                  style={{
                    color: colors.textMuted,
                    fontSize: FontSizes.base,
                  }}
                >
                  Nuevo Rubro
                </Text>
              </Pressable>
            )
          ) : null}
          {/* Botones */}
          <View
            style={{
              flexDirection: "row",
              gap: Spacing.md,
              padding: 12,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            {/* <View style={{ flex: 1 }}>
              <Button
                variant="secondary"
                section="common"
                width="full"
                onPress={handleCancelar}
              >
                Cancelar
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                variant="primary"
                section="common"
                width="full"
                onPress={handleGuardar}
              >
                Guardar
              </Button>
            </View> */}
          </View>
        </View>
      )}
    </View>
  );
}
