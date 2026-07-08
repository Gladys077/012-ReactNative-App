import React, { useMemo, useState } from "react";
import {
  Alert,
  Animated,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { BorderRadius, FontSizes } from "../../constants/Tokens";
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

// Repara rubros que puedan llegar sin IconComponent (ej: si vinieran
// serializados desde el backend antes de tener el ícono real asignado).
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
  rubros?: RubroConfig[]; // catálogo base (rubrosVendedor o rubrosServicios)
  rubrosCustom?: RubroConfig[]; // rubros personalizados ya cargados desde el backend (pendientes o aprobados)
  onNuevoRubro?: (nombre: string) => void; // avisa al padre que el usuario creó un rubro nuevo
};

export default function SelectRubros({
  label,
  selected,
  onChange,
  placeholder = "Selecciona tu/s rubro/s",
  section = "seller",
  borderColor,
  rubros,
  rubrosCustom = [],
  onNuevoRubro,
}: Props) {
  const { colors, mode } = useTheme();
  const allowAddNew = section === "seller";

  const baseRubros = rubros ?? rubrosVendedor;

  // Sin persistencia local: todo lo que no venga por props (rubrosCustom)
  // se pierde al desmontar, que es lo esperado en un componente controlado.
  const [rubrosNuevosEnSesion, setRubrosNuevosEnSesion] = useState<Rubro[]>([]);

  const rubrosInternos: Rubro[] = useMemo(
    () => [
      ...baseRubros,
      ...repararRubros(rubrosCustom),
      ...rubrosNuevosEnSesion,
    ],
    [baseRubros, rubrosCustom, rubrosNuevosEnSesion],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [nuevoRubro, setNuevoRubro] = useState("");
  const [agregando, setAgregando] = useState(false);
  const [busqueda, setBusqueda] = useState("");

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

  const rubrosFiltrados = useMemo(() => {
    const query = busqueda.trim().toLowerCase();
    if (!query) return rubrosInternos;
    return rubrosInternos.filter((r) => r.label.toLowerCase().includes(query));
  }, [rubrosInternos, busqueda]);

  const toggleOpen = () => {
    const next = !isOpen;
    setIsOpen(next);
    animateChevron(next);
    if (!next) setBusqueda("");
  };

  const toggleRubro = (value: string) => {
    const nextValues = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(nextValues);
  };

  const agregarNuevoRubro = () => {
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

    // Solo para que se vea en la lista de inmediato dentro de esta sesión.
    // La persistencia real la maneja el padre (backend) vía onNuevoRubro.
    setRubrosNuevosEnSesion((prev) => [...prev, nuevo]);
    onChange([...selected, valor]);
    onNuevoRubro?.(trimmed);

    setNuevoRubro("");
    setAgregando(false);
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
            color: selected.length > 0 ? colors.textDefault : colors.textMuted,
            fontSize: FontSizes.base,
          }}
        >
          {selected.length > 0
            ? rubrosInternos
                .filter((r) => selected.includes(r.value))
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
          {/* Barra de búsqueda */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: mode === "dark" ? "#2D3748" : "#F1F5F9",
              borderRadius: 10,
              paddingHorizontal: 12,
              marginBottom: 8,
              marginTop: 4,
            }}
          >
            <Text style={{ color: colors.textMuted, marginRight: 6 }}>🔍</Text>
            <TextInput
              value={busqueda}
              onChangeText={setBusqueda}
              placeholder="Buscar rubro..."
              placeholderTextColor={colors.textMuted}
              style={{
                flex: 1,
                paddingVertical: 10,
                fontSize: FontSizes.base,
                color: colors.textDefault,
              }}
              autoCorrect={false}
            />
            {busqueda.length > 0 && (
              <Pressable onPress={() => setBusqueda("")}>
                <Text style={{ color: colors.textMuted, fontSize: 16 }}>✕</Text>
              </Pressable>
            )}
          </View>

          {/* Lista filtrada */}
          {rubrosFiltrados.length === 0 ? (
            <Text
              style={{
                color: colors.textMuted,
                fontSize: FontSizes.sm,
                textAlign: "center",
                paddingVertical: 16,
              }}
            >
              No se encontraron rubros
            </Text>
          ) : (
            rubrosFiltrados.map((item) => (
              <RubroItem
                key={item.value}
                rubro={item}
                isSelected={selected.includes(item.value)}
                onToggle={toggleRubro}
              />
            ))
          )}

          {/* "Nuevo Rubro" */}
          {allowAddNew && !busqueda ? (
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
        </View>
      )}
    </View>
  );
}
