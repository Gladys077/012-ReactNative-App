import { useTheme } from "@/context/ThemeContext";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MasBlanca, TiendaIcon } from "../icons";
import Button from "../UI/Button/Button";
import NuevoRubroInput from "./NuevoRubroInput";
import { rubroColorPalette } from "./rubroColors";
import RubroItem from "./RubroItem";

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
  rubros: Rubro[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  allowAddNew?: boolean; // nuevo flag para compradores
  section?: "seller" | "buyer"; // para los botones
};

export default function SelectRubros({
  label,
  selected,
  rubros,
  onChange,
  placeholder = "Selecciona tu/s rubro/s",
  allowAddNew = true,
  section = "seller",
}: Props) {
  const { colors, mode } = useTheme();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["75%"], []);

  const [selectedValues, setSelectedValues] = useState(selected);
  const [rubrosInternos, setRubrosInternos] = useState(rubros);
  const [nuevoRubro, setNuevoRubro] = useState("");
  const [agregando, setAgregando] = useState(false);

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

  const agregarNuevoRubro = () => {
    const trimmed = nuevoRubro.trim();
    if (!trimmed) return;

    const valor = trimmed.toLowerCase().replace(/\s+/g, "-");
    const yaExiste = rubrosInternos.some((r) => r.value === valor);

    if (yaExiste) {
      alert("Ese rubro ya existe");
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

    setRubrosInternos([...rubrosInternos, nuevo]);
    setSelectedValues([...selectedValues, valor]);
    setNuevoRubro("");
    setAgregando(false);
  };

  const guardarCambios = () => {
    onChange(selectedValues);
    // evitamos bug de reabrir automáticamente
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
      <Text className="text-base mb-1" style={{ color: colors.textDefault, fontSize: 12 }}>
        {label}
      </Text>

      <Pressable
        onPress={handlePresentModal}
        className="rounded-xl p-3 flex-row items-center justify-between"
        style={{
          borderWidth: 1,
          borderColor: colors.inputBorder,
          backgroundColor: colors.cardBg,
        }}
      >
        <Text
          className="flex-1"
          style={{ color: selectedValues.length > 0 ? colors.textDefault : colors.textMuted }}
        >
          {selectedValues.length > 0
            ? rubrosInternos.filter((r) => selectedValues.includes(r.value)).map((r) => r.label).join(", ")
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
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={rubrosInternos}
              keyExtractor={(item) => item.value}
              ListHeaderComponent={
                <View className="px-5 pt-5 pb-3">
                  <Text className="text-lg font-bold" style={{ color: colors.textDefault }}>
                    {allowAddNew ? "Selecciona tus rubros" : "Selecciona destinatarios"}
                  </Text>
                </View>
              }
              renderItem={({ item }) => (
                <RubroItem rubro={item} isSelected={selectedValues.includes(item.value)} onToggle={toggleRubro} />
              )}
              ListFooterComponent={
                allowAddNew
                  ? agregando
                    ? <NuevoRubroInput
                        value={nuevoRubro}
                        onChange={setNuevoRubro}
                        onAdd={agregarNuevoRubro}
                        onCancel={() => { setAgregando(false); setNuevoRubro(""); }}
                      />
                    : <Pressable
                        onPress={() => setAgregando(true)}
                        className="flex-row items-center p-3 rounded-xl"
                        style={{ backgroundColor: 'transparent', marginBottom: 16 }}
                      >
                        <View
                          className="w-11 h-11 rounded-full items-center justify-center mr-3"
                          style={{ backgroundColor: mode === 'dark' ? '#4A5568' : '#b4bbc5' }}
                        >
                          <MasBlanca width={24} height={24} color={mode === 'dark' ? '#CBD5E0' : '#9CA3AF'} />
                        </View>
                        <Text className="flex-1 text-base" style={{ color: colors.textMuted }}>
                          Nuevo Rubro
                        </Text>
                      </Pressable>
                  : null
              }
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
            />
          </View>

          <SafeAreaView edges={["bottom"]} style={{ paddingHorizontal: 20, paddingTop: 8, backgroundColor: colors.background }}>
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





// 