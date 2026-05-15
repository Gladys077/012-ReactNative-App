import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Button from "../UI/Button/Button";

// ─── MODO DE USO ──────────────────────────────────────────────────────────────
//
// 1. Importo el ref y el componente en la card:
//
//    import BottomSheetAyudaPedido, {
//      BottomSheetAyudaPedidoRef,
//    } from "@/components/shared/BottomSheetAyudaPedido";
//    import AyudaPedidoTrigger from "@/components/shared/AyudaPedidoTrigger";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type BottomSheetAyudaPedidoRef = {
  present: () => void;
  dismiss: () => void;
};

interface BottomSheetAyudaPedidoProps {
  /* Array de opciones predefinidas. La última siempre actúa como "Otro" si `mostrarOtro` es true (default). Debemos pasar las opciones sin incluir "Otro", xq el componente lo agrega automáticamente. */
  opciones: string[];
  /* Título del sheet. Default: "¿En qué podemos ayudarte?" */
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

  backgroundColor?: string;
}

// ─── Colores fijos del sheet (oscuro, independiente del tema) ────────────────
const SHEET_BG = "#181d27";
const SHEET_SURFACE = "#232a38";
const SHEET_BORDER = "rgba(255,255,255,0.08)";
const SHEET_TEXT = "#e8eaf0";
const SHEET_TEXT_MUTED = "#7b8499";
const SHEET_INDICATOR = "#3d4558";
const SHEET_DIVIDER = "rgba(255,255,255,0.06)";
const SHEET_PRESSED = "rgba(255,255,255,0.05)";

// ─── Componente ───────────────────────────────────────────────────────────────

const BottomSheetAyudaPedido = forwardRef<
  BottomSheetAyudaPedidoRef,
  BottomSheetAyudaPedidoProps
>(
  (
    {
      opciones,
      titulo = "Cuéntanos qué ocurrió",
      subtitulo,
      role = "buyer",
      onEnviar,
      onCerrar,
      isVisible,
      // backgroundColor,
    },
    ref,
  ) => {
    const { colors, fonts } = useTheme();
    const sheetRef = useRef<BottomSheet>(null);

    const [seleccionada, setSeleccionada] = useState<string | null>(null);
    const [mostrandoOtro, setMostrandoOtro] = useState(false);
    const [mensajeLibre, setMensajeLibre] = useState("");
    const [enviando, setEnviando] = useState(false);

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
      role === "buyer" ? colors.bottomSheetBgBuyer : colors.bottomSheetBgBuyer;

    const todasLasOpciones = [...opciones, "Otro"];

    const resetear = () => {
      setSeleccionada(null);
      setMostrandoOtro(false);
      setMensajeLibre("");
      setEnviando(false);
    };

    const handleSeleccionar = (opcion: string) => {
      setSeleccionada(opcion);
      setMostrandoOtro(opcion === "Otro");
      if (opcion !== "Otro") setMensajeLibre("");
    };

    const puedeEnviar =
      seleccionada !== null &&
      (seleccionada !== "Otro" || mensajeLibre.trim().length >= 5);

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
        onClose={() => {
          resetear();
          onCerrar?.();
        }}
        enablePanDownToClose
        // ── Teclado: Gorhom lo maneja nativamente, no usar KeyboardAvoidingView
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backgroundStyle={{
          backgroundColor: backgroundColor ?? colors.brandBuyerSoft,
        }}
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
            }}
          >
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
                  fontSize: FontSizes.sm,
                  color: colors.textDefault,
                  lineHeight: 18,
                }}
              >
                {subtitulo}
              </Text>
            )}
          </View>

          {/* ── Opciones ── */}
          <View
            style={{ paddingHorizontal: Spacing.xxl, paddingTop: Spacing.xl }}
          >
            {todasLasOpciones.map((opcion, index) => {
              const estaSeleccionada = seleccionada === opcion;
              const esOtro = opcion === "Otro";

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
                      color: estaSeleccionada
                        ? colors.textDefault
                        : colors.textDefault,
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
                  backgroundColor: accentColor + 22,
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
                {/* Contador de caracteres */}
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: FontSizes.xs,
                    fontStyle: "italic",
                    color:
                      mensajeLibre.length > 270
                        ? colors.textError
                        : colors.textDefault,
                    textAlign: "right",
                    paddingHorizontal: Spacing.xl,
                    paddingBottom: Spacing.md,
                  }}
                >
                  {mensajeLibre.length}/270
                </Text>
              </View>
            )}
          </View>

          {/* ── Acciones ── */}
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: accentColor + "33",
              marginTop: Spacing.md,
            }}
          >
            {/* Btns: Cancelar - Enviar */}
            <View
              style={{
                flexDirection: "row",
                gap: Spacing.md,
                paddingHorizontal: Spacing.xxl,
                paddingBottom: Spacing.xl,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                marginTop: Spacing.lg,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <View style={{ flex: 1 }}>
                <Button
                  variant="secondary"
                  height="md"
                  width="full"
                  onPress={handleCancelar}
                >
                  Cancelar
                </Button>
              </View>

              <View style={{ flex: 1 }}>
                <Button
                  variant="primary"
                  section={role === "buyer" ? "buyer" : "seller"}
                  height="md"
                  width="full"
                  disabled={!puedeEnviar}
                  onPress={handleEnviar}
                >
                  Enviar
                </Button>
              </View>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

BottomSheetAyudaPedido.displayName = "BottomSheetAyudaPedido";

export default BottomSheetAyudaPedido;
//
// 2. Declaro el ref y estado en la card:
//
//    const ayudaRef = useRef<BottomSheetAyudaPedidoRef>(null);
//    const [ayudaVisible, setAyudaVisible] = useState(false);
//
// 3. Opciones específicas por rol (no incluir "Otro", se agrega automáticamente):
//
//    BUYER:
//    const OPCIONES_BUYER = [
//      "El pedido no llegó",
//      "El pedido llegó incompleto",
//      "El producto llegó en mal estado",
//      "Quiero cancelar el pedido",
//    ];
//
//    SELLER:
//    const OPCIONES_SELLER = [
//      "No puedo actualizar el estado del pedido",
//      "Hay un error en los datos del comprador",
//      "Problema con el pago recibido",
//      "Quiero cancelar este pedido",
//    ];
//
// 4. En el JSX de la card (solo cuando `expandido` es true):
//
//    {expandido && (
//      <>
//        <AyudaPedidoTrigger
//          role="buyer"
//          onPress={() => {
//            setAyudaVisible(true);
//            ayudaRef.current?.present();
//          }}
//        />
//        <BottomSheetAyudaPedido
//          ref={ayudaRef}
//          isVisible={ayudaVisible}
//          role="buyer"
//          opciones={OPCIONES_BUYER}
//          subtitulo="Seleccioná el problema con tu pedido"
//          onEnviar={(opcion, mensaje) => {
//            console.log("Ayuda enviada:", opcion, mensaje);
//            setAyudaVisible(false);
//          }}
//          onCerrar={() => setAyudaVisible(false)}
//        />
//      </>
//    )}
