import { useTheme } from "@/context/ThemeContext";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { TiendaIcon } from "../icons";
import Button from "../UI/Button/Button";
import NuevoRubroInput from "./NuevoRubroInput";
import { rubroColorPalette } from "./rubroColors";
import RubroItem from "./RubroItem";

interface Rubro {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
}

type Props = {
  label: string;
  selected: string[];
  rubros: Rubro[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export default function SelectRubrosVendedor({
  label,
  selected,
  rubros,
  onChange,
  placeholder = "Selecciona tu/s rubro/s",
}: Props) {
  const { colors, mode } = useTheme();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["75%"], []);

  const [selectedValues, setSelectedValues] = useState(selected);
  const [rubrosInternos, setRubrosInternos] = useState(rubros);
  const [nuevoRubro, setNuevoRubro] = useState("");
  const [agregando, setAgregando] = useState(false);

  const handlePresentModal = () => {
    sheetRef.current?.present();
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

  const toggleRubro = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
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
      icon: <TiendaIcon width={18} height={18} color={iconColor} />,
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
    sheetRef.current?.dismiss();
  };

  const handleCancel = () => {
    setSelectedValues(selected);
    setNuevoRubro("");
    setAgregando(false);
    sheetRef.current?.dismiss();
  };

  return (
    <View>
      <Text className="text-base mb-1" style={{ color: colors.textDefault }}>
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
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.textMuted,
        }}
      >
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          {/* Header */}
          <View className="px-5 pt-5 pb-3">
            <Text 
              className="text-xl font-bold"
              style={{ color: colors.textDefault }}
            >
              Selecciona tus rubros
            </Text>
          </View>

          {/* Lista de rubros */}
          <FlatList
            data={rubrosInternos}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <RubroItem
                rubro={item}
                isSelected={selectedValues.includes(item.value)}
                onToggle={toggleRubro}
              />
            )}
            contentContainerStyle={{ paddingBottom: 140 }}
            className="px-5"
            ListFooterComponent={
                <View className="pb-3">
                  {agregando ? (
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
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <View 
                        className="w-9 h-9 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: mode === 'dark' ? '#4A5568' : '#E5E7EB' }}
                      >
                        <Text 
                          className="text-xl"
                          style={{ color: colors.textMuted }}
                        >
                          +
                        </Text>
                      </View>
                      <Text 
                        className="flex-1 text-base"
                        style={{ color: colors.textMuted }}
                      >
                        Nuevo Rubro
                      </Text>
                    </Pressable>
                  )}
                </View>
              }
            />
            
          


          {/* Btns*/}
          <View className="w-full flex-row"
            style={{ 
              backgroundColor: colors.background,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            <View className="flex-1 mr-2">
              <Button
                variant="secondary"
                section="seller"
                width="auto"
                onPress={handleCancel}
              >
                Cancelar
              </Button>
            </View>

            <View className="flex-1 mr-2">
              <Button
                variant="primary"
                section="seller"
                width="auto"
                onPress={guardarCambios}
              >
                Guardar
              </Button>
            </View>

          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
}