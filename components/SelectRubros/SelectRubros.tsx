import { useTheme } from "@/context/ThemeContext";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert, Animated, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BorderRadius, FontSizes } from "../../constants/Tokens";
import { FlechaAbajo, MasBlanca, TiendaIcon } from "../icons";
import Button from "../UI/Button/Button";
import NuevoRubroInput from "./NuevoRubroInput";
import { rubroColorPalette } from "./rubroColors";
import RubroItem from "./RubroItem";
import { rubrosVendedor } from "./rubrosConfig";

export interface Rubro {
  label: string;
  value: string;
  IconComponent: React.ComponentType<{ width: number; height: number; color?: string; fill?: string }>;
  color: string;
  iconColor: string;
}

type Props = {
  label: string;
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  section?: "seller" | "buyer";
  borderColor?: string;
  borderRadius?: number;
};

const STORAGE_KEY = "rubrosVendedorGuardados";
const SELECTED_KEY = (section: "seller" | "buyer") => `selectedRubros_${section}`;

export default function SelectRubros({
  label,
  selected,
  onChange,
  placeholder = "Selecciona tu/s rubro/s",
  section = "seller",
  borderColor,
  borderRadius
}: Props) {
  const { colors, mode } = useTheme();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["75%"], []);
  const allowAddNew = section === "seller";

  const [selectedValues, setSelectedValues] = useState<string[]>(selected);
  const [rubrosInternos, setRubrosInternos] = useState<Rubro[]>([]);
  const [nuevoRubro, setNuevoRubro] = useState("");
  const [agregando, setAgregando] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
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
      if (section !== "seller") {
        setRubrosInternos(rubrosVendedor);
        setSelectedValues(selected);
        return;
      }

      const loadRubros = async () => {
        try {
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
          const rubrosGuardados: Rubro[] = stored ? JSON.parse(stored) : [];
          const combinados = [...rubrosVendedor, ...rubrosGuardados];
          setRubrosInternos(combinados);

          const storedSelected = await AsyncStorage.getItem(SELECTED_KEY(section));
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
    }, [section])
  );

  const saveRubros = async (rubros: Rubro[]) => {
    try {
      const personalizados = rubros.filter(
        (r) => !rubrosVendedor.some((base) => base.value === r.value)
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(personalizados));
    } catch (error) {
      console.error("Error guardando rubros:", error);
    }
  };

  const saveSelectedRubros = async (values: string[]) => {
    try {
      await AsyncStorage.setItem(SELECTED_KEY(section), JSON.stringify(values));
    } catch (error) {
      console.error("Error guardando rubros seleccionados:", error);
    }
  };

  const handlePresentModal = () => {
    sheetRef.current?.present();
    animateChevron(true);
    setIsOpen(true);
  };

  const toggleRubro = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const agregarNuevoRubro = async () => {
    const trimmed = nuevoRubro.trim();
    if (!trimmed) return;

    const valor = trimmed.toLowerCase().replace(/\s+/g, "-");
    const yaExiste = rubrosInternos.some((r) => r.value === valor);

    if (yaExiste) {
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
    setSelectedValues([...selectedValues, valor]);
    await saveRubros(actualizados);
    setNuevoRubro("");
    setAgregando(false);
  };

  const guardarCambios = async () => {
    onChange(selectedValues);
    if (section === "seller") await saveSelectedRubros(selectedValues);
    setTimeout(() => sheetRef.current?.dismiss(), 50);
    animateChevron(false);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedValues(selected);
    setNuevoRubro("");
    setAgregando(false);
    sheetRef.current?.dismiss();
    animateChevron(false);
    setIsOpen(false);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <View>
      {label ? (
        <Text style={{ color: colors.textDefault, fontSize: 12, marginBottom: 4 }}>
          {label}
        </Text>
      ) : null}

      <Pressable
        onPress={isOpen ? handleCancel : handlePresentModal}
        style={{
          borderWidth: 1,
          borderColor: borderColor || colors.inputBorder,
          backgroundColor: colors.cardBg,
          borderRadius: borderRadius || BorderRadius.pillBtn,
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            flex: 1,
            color: selectedValues.length > 0 ? colors.textDefault : colors.textMuted,
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
          <FlechaAbajo width={18} height={18} color={colors.textMuted} />
        </Animated.View>
      </Pressable>

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.textMuted }}
        onDismiss={handleCancel}
      >
        <View style={{ flex: 1, backgroundColor: colors.background, width: "100%", maxWidth: 500, alignSelf: "center" }}>
          <FlatList
            data={rubrosInternos}
            keyExtractor={(item) => item.value}
            ListHeaderComponent={
              <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 }}>
                <Text style={{ color: colors.textDefault, fontSize: FontSizes.base, fontWeight: "700" }}>
                  {allowAddNew ? "Selecciona uno o más rubros" : "Selecciona el/los rubro/s"}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <RubroItem rubro={item} isSelected={selectedValues.includes(item.value)} onToggle={toggleRubro} />
            )}
            ListFooterComponent={
              allowAddNew
                ? agregando
                  ? <NuevoRubroInput value={nuevoRubro} onChange={setNuevoRubro} onAdd={agregarNuevoRubro} onCancel={() => { setAgregando(false); setNuevoRubro(""); }} />
                  : (
                    <Pressable onPress={() => setAgregando(true)} style={{ flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 12, marginBottom: 16, backgroundColor: "transparent" }}>
                      <View style={{ width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", marginRight: 12, backgroundColor: mode === "dark" ? "#4A5568" : "#b4bbc5" }}>
                        <MasBlanca width={24} height={24} color={mode === "dark" ? "#CBD5E0" : "#9CA3AF"} />
                      </View>
                      <Text style={{ flex: 1, color: colors.textMuted, fontSize: FontSizes.base }}>
                        Nuevo Rubro
                      </Text>
                    </Pressable>
                  )
                : null
            }
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
          />

          <SafeAreaView edges={["bottom"]} style={{ paddingHorizontal: 20, paddingTop: 8, backgroundColor: colors.background }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 12 }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button variant="secondary" section={section} width="half" onPress={handleCancel}>
                  Cancelar
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button variant="primary" section={section} width="half" onPress={guardarCambios}>
                  Guardar
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </BottomSheetModal>
    </View>
  );
}

