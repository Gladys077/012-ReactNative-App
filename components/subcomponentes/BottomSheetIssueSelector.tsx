import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import BottomSheet, {
  BottomSheetScrollView,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Easing } from "react-native-reanimated";
import Button from "../UI/Button/Button";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type BottomSheetIssueSelectorRef = {
  present: () => void;
  dismiss: () => void;
};

interface BottomSheetIssueSelectorProps {
  /* Array de opciones predefinidas. "Otro" se agrega automáticamente al final. */
  opciones: string[];
  /* Título del sheet. Default: "¿Tuviste un inconveniente?" */
  titulo?: string;
  /* Subtítulo/descripción breve debajo del título */
  subtitulo?: string;
  /* Rol para adaptar colores de acento */
  role?: "buyer" | "seller";
  /* Callback al enviar. Recibe opción seleccionada y mensaje libre (si aplica) */
  onEnviar?: (opcion: string, mensaje?: string) => void;
  /* Callback al cerrar/cancelar */
  onCerrar?: () => void;
  isVisible: boolean;
}

// ─── Constante interna ────────────────────────────────────────────────────────

const OPCION_OTRO = "Otro";

// ─── Componente ───────────────────────────────────────────────────────────────

const BottomSheetIssueSelector = forwardRef<
  BottomSheetIssueSelectorRef,
  BottomSheetIssueSelectorProps
>(
  (
    {
      opciones,
      titulo = "¿Tuviste un inconveniente?",
      subtitulo,
      role = "buyer",
      onEnviar,
      onCerrar,
      isVisible,
    },
    ref,
  ) => {
    const { colors, fonts } = useTheme();
    const sheetRef = useRef<BottomSheet>(null);

    const [seleccionada, setSeleccionada] = useState<string | null>(null);
    const [mostrandoOtro, setMostrandoOtro] = useState(false);
    const [mensajeLibre, setMensajeLibre] = useState("");
    const [enviando, setEnviando] = useState(false);

    const puedeEnviar =
      seleccionada !== null &&
      (seleccionada !== OPCION_OTRO || mensajeLibre.trim().length >= 5);

    const animationConfigs = useBottomSheetTimingConfigs({
      duration: 380,
      easing: Easing.out(Easing.cubic),
    });

    useImperativeHandle(ref, () => ({
      present: () => {
        resetear();
        sheetRef.current?.snapToIndex(0);
      },
      dismiss: () => sheetRef.current?.close(),
    }));

    const accentColor =
      role === "buyer" ? colors.brandBuyer : colors.brandSeller;
    const backgroundColor =
      role === "buyer" ? colors.bottomSheetBgBuyer : colors.bottomSheetBgSeller;

    const todasLasOpciones = [...opciones, OPCION_OTRO];

    const resetear = () => {
      setSeleccionada(null);
      setMostrandoOtro(false);
      setMensajeLibre("");
      setEnviando(false);
    };

    const handleSeleccionar = (opcion: string) => {
      if (seleccionada === opcion) {
        setSeleccionada(null);
        setMostrandoOtro(false);
        setMensajeLibre("");
        return;
      }
      setSeleccionada(opcion);
      setMostrandoOtro(opcion === OPCION_OTRO);
      if (opcion !== OPCION_OTRO) setMensajeLibre("");
    };

    const handleEnviar = () => {
      if (!puedeEnviar || enviando) return;
      setEnviando(true);
      onEnviar?.(
        seleccionada!,
        mostrandoOtro ? mensajeLibre.trim() : undefined,
      );
      sheetRef.current?.close();
    };

    const handleCancelar = () => {
      resetear();
      onCerrar?.();
      sheetRef.current?.close();
    };

    return (
      <BottomSheet
        ref={sheetRef}
        index={isVisible ? 0 : -1}
        enableDynamicSizing
        animationConfigs={animationConfigs}
        onClose={() => {
          resetear();
          onCerrar?.();
        }}
        enablePanDownToClose
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backgroundStyle={{ backgroundColor }}
        handleIndicatorStyle={{ backgroundColor: colors.textMuted }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: 48 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Encabezado ── */}
          <View
            style={{
              paddingHorizontal: Spacing.xxl,
              paddingTop: Spacing.xl,
              paddingBottom: Spacing.lg,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, paddingRight: Spacing.lg }}>
              <Text
                style={{
                  fontFamily: fonts.robotoBold,
                  fontSize: FontSizes.md,
                  color: colors.textDefault,
                  marginBottom: subtitulo ? Spacing.sm : 0,
                }}
              >
                {titulo}
              </Text>
              {subtitulo && (
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: FontSizes.base,
                    color: colors.textDefault,
                    lineHeight: 20,
                  }}
                >
                  {subtitulo}
                </Text>
              )}
            </View>

            {/* X cerrar */}
            <Pressable
              onPress={handleCancelar}
              hitSlop={12}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                padding: Spacing.xs,
                marginTop: -Spacing.sm,
              })}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.textMuted,
                  lineHeight: 22,
                }}
              >
                ✕
              </Text>
            </Pressable>
          </View>

          {/* ── Opciones ── */}
          <View
            style={{ paddingHorizontal: Spacing.xxl, paddingTop: Spacing.xl }}
          >
            {todasLasOpciones.map((opcion) => {
              const estaSeleccionada = seleccionada === opcion;
              const esOtro = opcion === OPCION_OTRO;

              return (
                <Pressable
                  key={opcion}
                  onPress={() => handleSeleccionar(opcion)}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: Spacing.xl,
                    paddingHorizontal: Spacing.lg,
                    marginBottom: Spacing.md,
                    borderRadius: BorderRadius.md,
                    backgroundColor: pressed
                      ? colors.bgPressed
                      : estaSeleccionada
                        ? `${accentColor}18`
                        : colors.cardBg,
                    borderWidth: 1,
                    borderColor: estaSeleccionada
                      ? `${accentColor}55`
                      : colors.border,
                  })}
                >
                  {/* Radio circle */}
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: estaSeleccionada ? 6 : 1.5,
                      borderColor: estaSeleccionada
                        ? accentColor
                        : colors.textMuted,
                      marginRight: Spacing.lg,
                      flexShrink: 0,
                    }}
                  />

                  <Text
                    style={{
                      fontFamily: estaSeleccionada
                        ? fonts.robotoMedium
                        : fonts.robotoRegular,
                      fontSize: FontSizes.base,
                      color: colors.textDefault,
                      flex: 1,
                      lineHeight: 20,
                      fontStyle: esOtro ? "italic" : "normal",
                    }}
                  >
                    {opcion}
                  </Text>
                </Pressable>
              );
            })}

            {/* ── Textarea "Otro" ── */}
            {mostrandoOtro && (
              <View
                style={{
                  marginTop: -Spacing.sm,
                  marginBottom: Spacing.lg,
                  backgroundColor: accentColor + "22",
                  borderRadius: BorderRadius.md,
                  borderWidth: 1,
                  borderColor:
                    mensajeLibre.trim().length >= 5
                      ? `${accentColor}55`
                      : colors.border,
                  overflow: "hidden",
                }}
              >
                <TextInput
                  multiline
                  numberOfLines={3}
                  maxLength={300}
                  placeholder="Describe brevemente tu problema..."
                  placeholderTextColor={colors.textMuted}
                  value={mensajeLibre}
                  onChangeText={setMensajeLibre}
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: FontSizes.base,
                    color: colors.textDefault,
                    paddingHorizontal: Spacing.xl,
                    paddingTop: Spacing.xl,
                    paddingBottom: Spacing.lg,
                    minHeight: 90,
                    textAlignVertical: "top",
                  }}
                />
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: FontSizes.xs,
                    fontStyle: "italic",
                    color:
                      mensajeLibre.length > 270
                        ? colors.textError
                        : colors.textMuted,
                    textAlign: "right",
                    paddingHorizontal: Spacing.xl,
                    paddingBottom: Spacing.md,
                  }}
                >
                  {mensajeLibre.length}/300
                </Text>
              </View>
            )}
          </View>

          {/* ── Acciones ── */}
          <View
            style={{
              paddingHorizontal: Spacing.xxl,
              paddingTop: Spacing.lg,
              paddingBottom: Spacing.xl,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              marginTop: Spacing.md,
              gap: Spacing.sm,
            }}
          >
            <Button
              variant="primary"
              section={role === "buyer" ? "buyer" : "seller"}
              width="full"
              disabled={!puedeEnviar}
              onPress={handleEnviar}
            >
              {puedeEnviar
                ? "Sí, reportar y cancelar pedido"
                : "Indica el inconveniente"}
            </Button>

            {puedeEnviar && (
              <Text
                style={{
                  fontFamily: fonts.robotoRegular,
                  fontSize: FontSizes.sm,
                  color: colors.textMuted,
                  textAlign: "center",
                  marginTop: Spacing.xs,
                }}
              >
                Esta acción no se puede deshacer
              </Text>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

BottomSheetIssueSelector.displayName = "BottomSheetIssueSelector";

export default BottomSheetIssueSelector;

// ─── MODO DE USO ──────────────────────────────────────────────────────────────
//
// 1. Importar el componente (el ref no es necesario si se controla con isVisible):
//
//    import BottomSheetIssueSelector from "@/components/subcomponentes/BottomSheetIssueSelector";
//
// 2. Estado en el padre:
//
//    const [issueVisible, setIssueVisible] = useState(false);
//
// 3. Opciones por rol (sin incluir "Otro", se agrega automáticamente):
//
//    BUYER:
//    const OPCIONES_BUYER = [
//      "El pedido no llegó",
//      "El pedido llegó incompleto",
//      "El producto llegó en mal estado",
//      "El vendedor no responde",
//    ];
//
//    SELLER:
//    const OPCIONES_SELLER = [
//      "Sin respuesta del comprador.",
//      "Hubo un problema con el pago.",
//      "El comprador no estaba en el domicilio.",
//    ];
//
// 4. En el JSX del padre:
//
//    <AyudaReportar
//      role="buyer"
//      onPress={() => setIssueVisible(true)}
//    />
//    <BottomSheetIssueSelector
//      isVisible={issueVisible}
//      role="buyer"
//      opciones={OPCIONES_BUYER}
//      subtitulo="Seleccioná el problema con tu pedido"
//      onEnviar={(opcion, mensaje) => {
//        console.log("Issue enviado:", opcion, mensaje);
//        setIssueVisible(false);
//      }}
//      onCerrar={() => setIssueVisible(false)}
//    />
