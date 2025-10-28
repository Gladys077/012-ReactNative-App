import { useTheme } from "@/context/ThemeContext";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BorderRadius } from "../../constants/Tokens";
import { MasBlanca, TiendaIcon } from "../icons";
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
  borderRadius?: number
};

const STORAGE_KEY = "rubrosVendedorGuardados";
// Guarda los rubros seleccionados por tipo de usuario
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

  // Carga rubros al iniciar (base + guardados)
  useFocusEffect(
    useCallback(() => {
      if (section !== "seller") {
        setRubrosInternos(rubrosVendedor); // buyer solo usa rubros base
        setSelectedValues(selected);        // buyer usa lo que viene del prop
        return;
      }

      const loadRubros = async () => {
        try {
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
          const rubrosGuardados: Rubro[] = stored ? JSON.parse(stored) : [];
          const combinados = [...rubrosVendedor, ...rubrosGuardados];
          setRubrosInternos(combinados);

           // Carga los rubros seleccionados para esta sección
          const storedSelected = await AsyncStorage.getItem(SELECTED_KEY(section));
          if (storedSelected) {
            const parsed = JSON.parse(storedSelected);
            setSelectedValues(parsed);
            onChange(parsed); // sincroniza con el padre
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

// Guardar los rubros seleccionados
  const saveSelectedRubros = async (values: string[]) => {
    try {
      await AsyncStorage.setItem(SELECTED_KEY(section), JSON.stringify(values));
    } catch (error) {
      console.error("Error guardando rubros seleccionados:", error);
    }
  };

  const handlePresentModal = () => sheetRef.current?.present();

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

   // Al guardar, solo persistir en AsyncStorage si es seller
  const guardarCambios = async () => {
    onChange(selectedValues);
    if (section === "seller") {
      await saveSelectedRubros(selectedValues);
    }
    setTimeout(() => sheetRef.current?.dismiss(), 50);
  };

  const handleCancel = () => {
    setSelectedValues(selected);
    setNuevoRubro("");
    setAgregando(false);
    sheetRef.current?.dismiss();
  };

  return (
    <View>
      {label ? (
        <Text className="text-base mb-1" style={{ color: colors.textDefault, fontSize: 12 }}>
          {label}
        </Text>
      ) : null}

      <Pressable
        onPress={handlePresentModal}
        className="rounded-xl p-3 flex-row items-center justify-between"
        style={{
          borderWidth: 1,
          borderColor: borderColor || colors.inputBorder,
          backgroundColor: colors.cardBg,
          borderRadius: borderRadius || BorderRadius.pillBtn,
        }}
      >
        <Text
          className="flex-1"
          style={{
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
        <View className="ml-2">
          <Text style={{ color: colors.textMuted, fontSize: 18 }}>▼</Text>
        </View>
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
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            width: "100%",
            maxWidth: 500,
            alignSelf: "center",
          }}
        >
          <FlatList
            data={rubrosInternos}
            keyExtractor={(item) => item.value}
            ListHeaderComponent={
              <View className="px-5 pt-5 pb-3">
                <Text className="text-lg font-Roboto-Bold" style={{ color: "colors.textDefault" }}>
                  {allowAddNew ? "Selecciona uno o más rubros" : "Selecciona el/los rubro/s"}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <RubroItem
                rubro={item}
                isSelected={selectedValues.includes(item.value)}
                onToggle={toggleRubro}
              />
            )}
            ListFooterComponent={
              allowAddNew ? (
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
                    className="flex-row items-center p-3 rounded-xl"
                    style={{ backgroundColor: "transparent", marginBottom: 16 }}
                  >
                    <View
                      className="w-11 h-11 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: mode === "dark" ? "#4A5568" : "#b4bbc5" }}
                    >
                      <MasBlanca
                        width={24}
                        height={24}
                        color={mode === "dark" ? "#CBD5E0" : "#9CA3AF"}
                      />
                    </View>
                    <Text className="flex-1 text-base" style={{ color: colors.textMuted }}>
                      Nuevo Rubro
                    </Text>
                  </Pressable>
                )
              ) : null
            }
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
          />

          <SafeAreaView
            edges={["bottom"]}
            style={{
              paddingHorizontal: 20,
              paddingTop: 8,
              backgroundColor: colors.background,
            }}
          >
            <View className="flex-row justify-between">
              <View className="flex-1 mr-2">
                <Button variant="secondary" section={section} width="auto" onPress={handleCancel}>
                  Cancelar
                </Button>
              </View>
              <View className="flex-1">
                <Button variant="primary" section={section} width="auto" onPress={guardarCambios}>
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
