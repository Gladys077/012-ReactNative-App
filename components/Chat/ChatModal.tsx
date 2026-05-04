import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Mensaje {
  id: string;
  texto: string;
  /**
   * "comprador" | "vendedor"
   * Se compara contra el rol actual para decidir qué burbuja va a la derecha.
   */
  remitenteId: "comprador" | "vendedor";
  timestamp: Date;
}

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
  pedidoId: string | number;
  /** ISO string — se formatea igual que en las cards */
  fechaSeleccion?: string;
  /** Nombre de la otra parte (vendedor si lo abre el comprador, y viceversa) */
  otroNombre: string;
  /** Rol del usuario actual: define qué burbuja va a la derecha */
  rolActual: "comprador" | "vendedor";
  /** Mensajes iniciales (mock por ahora; luego vendrán del socket) */
  mensajesIniciales?: Mensaje[];
  /** Callback opcional: se llama con el texto cada vez que se envía un mensaje */
  onMensajeEnviado?: (texto: string) => void;
  /** Para cuando esté en el historial **/
  readOnly?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatFecha = (iso?: string) => {
  if (!iso) return "";
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatHora = (date: Date) =>
  date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

const iniciales = (nombre?: string) =>
  (nombre ?? "?")
    .split(" ")
    .map((n) => n[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({
  letras,
  size = 32,
  color,
}: {
  letras: string;
  size?: number;
  color: string;
}) => {
  const { fonts } = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: fonts.robotoBold,
          fontSize: size === 40 ? FontSizes.sm : FontSizes.xs,
        }}
      >
        {letras}
      </Text>
    </View>
  );
};

// ─── Burbuja ──────────────────────────────────────────────────────────────────

const Burbuja = ({
  msg,
  esPropio,
  otroLetras,
  propioLetras,
  avatarColor,
}: {
  msg: Mensaje;
  esPropio: boolean;
  otroLetras: string;
  propioLetras: string;
  avatarColor: string;
}) => {
  const { colors, fonts } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: esPropio ? "flex-end" : "flex-start",
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
      }}
    >
      {/* Avatar otra parte (izquierda) */}
      {!esPropio && <Avatar letras={otroLetras} color={avatarColor} />}

      {/* Burbuja */}
      <View
        style={{
          maxWidth: "75%",
          backgroundColor: esPropio ? avatarColor : colors.background,
          borderRadius: BorderRadius.md,
          borderBottomRightRadius: esPropio ? 4 : BorderRadius.md,
          borderBottomLeftRadius: esPropio ? BorderRadius.md : 4,
          padding: Spacing.md,
        }}
      >
        <Text
          style={{
            color: esPropio ? "#fff" : colors.textDefault,
            fontSize: FontSizes.base,
            fontFamily: fonts.robotoRegular,
            lineHeight: 20,
          }}
        >
          {msg.texto}
        </Text>
        <Text
          style={{
            color: esPropio ? "rgba(255,255,255,0.7)" : colors.textMuted,
            fontSize: FontSizes.xs,
            alignSelf: "flex-end",
            marginTop: 4,
          }}
        >
          {formatHora(msg.timestamp)}
        </Text>
      </View>

      {/* Avatar propio (derecha) */}
      {esPropio && <Avatar letras={propioLetras} color={avatarColor} />}
    </View>
  );
};

// ─── Mock de mensajes ─────────────────────────────────────────────────────────

const MOCK_MENSAJES: Mensaje[] = [
  {
    id: "1",
    texto: "El comprobante que me envió no cubre el importe total.",
    remitenteId: "vendedor",
    timestamp: new Date(Date.now() - 60000 * 10),
  },
  {
    id: "2",
    texto: "Ah, disculpá. Te mando el resto ahora.",
    remitenteId: "comprador",
    timestamp: new Date(Date.now() - 60000 * 7),
  },
  {
    id: "3",
    texto: "Perfecto, esperaré el nuevo comprobante.",
    remitenteId: "vendedor",
    timestamp: new Date(Date.now() - 60000 * 5),
  },
];

// ─── ChatModal ────────────────────────────────────────────────────────────────

export default function ChatModal({
  visible,
  onClose,
  pedidoId,
  fechaSeleccion,
  otroNombre,
  rolActual,
  mensajesIniciales,
  onMensajeEnviado,
  readOnly = false,
}: ChatModalProps) {
  const { colors, fonts } = useTheme();
  const { user } = useAuthContext();

  const scrollRef = useRef<ScrollView>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>(mensajesIniciales ?? []);

  const [texto, setTexto] = useState("");

  // TODO CON LIO: conectar socket al montar
  // useEffect(() => {
  //   if (!visible) return;
  //   socket.emit("join_chat", { pedidoId });
  //   socket.on("nuevo_mensaje", (msg: Mensaje) => {
  //     setMensajes((prev) => [...prev, msg]);
  //   });
  //   return () => {
  //     socket.off("nuevo_mensaje");
  //     socket.emit("leave_chat", { pedidoId });
  //   };
  // }, [visible, pedidoId]);

  // Scroll al último mensaje
  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [mensajes, visible]);

  const handleEnviar = () => {
    if (!texto.trim()) return;
    const nuevo: Mensaje = {
      id: Date.now().toString(),
      texto: texto.trim(),
      remitenteId: rolActual,
      timestamp: new Date(),
    };
    setMensajes((prev) => [...prev, nuevo]);
    onMensajeEnviado?.(texto.trim());
    setTexto("");
    // TODO CON LIO: socket.emit("enviar_mensaje", { pedidoId, ...nuevo });
  };

  // Letras para avatares
  const propioLetras = user?.name
    ? iniciales(user.name)
    : rolActual === "comprador"
      ? "CO"
      : "VE";
  const otroLetras = iniciales(otroNombre);
  const avatarColor = colors.brandBuyer; // siempre azul para ambos lados

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.82)",
          justifyContent: "center",
          alignItems: "center",
          padding: Spacing.lg,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 480,
            height: "75%",
            backgroundColor: colors.cardBg,
            borderRadius: BorderRadius.lg,
            overflow: "hidden",
          }}
        >
          {/* ── Header fijo ── */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: Spacing.lg,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              backgroundColor: colors.headerFooterBg,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: Spacing.md,
              }}
            >
              <Avatar letras={otroLetras} size={40} color={avatarColor} />
              <View>
                <Text
                  style={{
                    color: colors.textDefault,
                    fontFamily: fonts.robotoBold,
                    fontSize: FontSizes.base,
                  }}
                >
                  {otroNombre}
                </Text>
                {fechaSeleccion && (
                  <Text
                    style={{
                      color: colors.textDefault,
                      fontSize: FontSizes.sm,
                      fontFamily: fonts.robotoRegular,
                    }}
                  >
                    {formatFecha(fechaSeleccion)}
                  </Text>
                )}
              </View>
            </View>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: colors.textSecondaryBg,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.textDefault,
                  fontFamily: fonts.robotoBold,
                  fontSize: FontSizes.base,
                  lineHeight: 18,
                }}
              >
                ✕
              </Text>
            </Pressable>
          </View>

          {/* ── Mensajes scrolleables ── */}
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: Spacing.lg, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {mensajes.map((msg) => (
              <Burbuja
                key={msg.id}
                msg={msg}
                esPropio={msg.remitenteId === rolActual}
                otroLetras={otroLetras}
                propioLetras={propioLetras}
                avatarColor={avatarColor}
              />
            ))}
          </ScrollView>

          {/* ── Input (solo si no es readOnly) ── */}
          {!readOnly && (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: Spacing.sm,
                  padding: Spacing.md,
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                  backgroundColor: colors.headerFooterBg,
                }}
              >
                <TextInput
                  value={texto}
                  onChangeText={setTexto}
                  placeholder="Escribe un mensaje"
                  placeholderTextColor={colors.textMuted}
                  multiline
                  style={{
                    flex: 1,
                    minHeight: 40,
                    maxHeight: 100,
                    backgroundColor: colors.background,
                    borderRadius: BorderRadius.md,
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.sm,
                    color: colors.textDefault,
                    fontSize: FontSizes.base,
                    fontFamily: fonts.robotoRegular,
                  }}
                />
                <Pressable
                  onPress={handleEnviar}
                  style={{
                    height: 40,
                    paddingHorizontal: Spacing.lg,
                    backgroundColor: texto.trim()
                      ? avatarColor
                      : colors.textSecondaryBg,
                    borderRadius: BorderRadius.md,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: texto.trim() ? "#fff" : colors.textMuted,
                      fontFamily: fonts.robotoBold,
                      fontSize: FontSizes.sm,
                    }}
                  >
                    Enviar
                  </Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </View>
    </Modal>
  );
}
