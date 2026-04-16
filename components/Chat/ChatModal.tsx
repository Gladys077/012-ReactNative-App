// components/Chat/ChatModal.tsx
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

// TODO CON LIO: importar socket.io-client
// import { io, Socket } from "socket.io-client";
// const socket: Socket = io("https://tu-backend.com");

interface Mensaje {
  id: string;
  texto: string;
  remitenteId: string; // "comprador" o el id del vendedor
  timestamp: Date;
}

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
  pedidoId: string | number;
  vendedorNombre: string;
  vendedorAlias: string;
}

export default function ChatModal({
  visible,
  onClose,
  pedidoId,
  vendedorNombre,
  vendedorAlias,
}: ChatModalProps) {
  const { colors, fonts } = useTheme();
  const { user } = useAuthContext();

  const scrollRef = useRef<ScrollView>(null);

  const [mensajes, setMensajes] = useState<Mensaje[]>([
    // --- MOCK: reemplazar por fetch real al abrir el modal ---
    // TODO CON LIO: GET /api/chat/:pedidoId → cargar historial
    {
      id: "1",
      texto: "El comprobante que me envió no cubre el importe total.",
      remitenteId: "vendedor",
      timestamp: new Date(Date.now() - 60000 * 5),
    },
  ]);

  const [texto, setTexto] = useState("");

  // TODO CON LIO: conectar socket al montar, desconectar al cerrar
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

  // Scroll al último mensaje automáticamente
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [mensajes]);

  const handleEnviar = () => {
    if (!texto.trim()) return;

    const nuevoMensaje: Mensaje = {
      id: Date.now().toString(),
      texto: texto.trim(),
      remitenteId: "comprador",
      timestamp: new Date(),
    };

    // Agrega localmente (optimistic update)
    setMensajes((prev) => [...prev, nuevoMensaje]);
    setTexto("");

    // TODO CON LIO: enviar al backend via socket
    // socket.emit("enviar_mensaje", {
    //   pedidoId,
    //   texto: texto.trim(),
    //   remitenteId: user?.id,
    // });

    // TODO CON LIO: o via REST
    // await fetch(`/api/chat/${pedidoId}/mensaje`, {
    //   method: "POST",
    //   body: JSON.stringify({ texto: texto.trim() }),
    // });
  };

  // Iniciales del comprador para el avatar
  const iniciales = user?.nombre
    ? user.nombre
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "YO";

  // Iniciales del vendedor para fallback
  const inicialesVendedor = vendedorNombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const formatHora = (date: Date) => {
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop oscuro */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.82)",
          justifyContent: "center",
          alignItems: "center",
          padding: Spacing.lg,
        }}
      >
        {/* Contenedor del chat */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            width: "100%",
            maxWidth: 480,
            maxHeight: "85%",
            backgroundColor: colors.cardBg,
            borderRadius: BorderRadius.lg,
            overflow: "hidden",
          }}
        >
          {/* Header */}
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
              {/* Avatar vendedor */}
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.brandBuyer,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: fonts.robotoBold,
                    fontSize: FontSizes.sm,
                  }}
                >
                  {inicialesVendedor}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: colors.textDefault,
                    fontFamily: fonts.robotoBold,
                    fontSize: FontSizes.base,
                  }}
                >
                  {vendedorNombre}
                </Text>
                <Text
                  style={{
                    color: colors.textMuted,
                    fontSize: FontSizes.xs,
                  }}
                >
                  Pedido #{pedidoId}
                </Text>
              </View>
            </View>

            {/* Botón cerrar */}
            <Pressable
              onPress={onClose}
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
                }}
              >
                ✕
              </Text>
            </Pressable>
          </View>

          {/* Mensajes */}
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{
              padding: Spacing.lg,
              gap: Spacing.md,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
          >
            {mensajes.map((msg) => {
              const esComprador = msg.remitenteId === "comprador";

              return (
                <View
                  key={msg.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: Spacing.sm,
                    justifyContent: esComprador ? "flex-end" : "flex-start",
                    marginBottom: Spacing.sm,
                  }}
                >
                  {/* Avatar vendedor (izquierda) */}
                  {!esComprador && (
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.brandBuyer,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: fonts.robotoBold,
                          fontSize: FontSizes.xs,
                        }}
                      >
                        {inicialesVendedor}
                      </Text>
                    </View>
                  )}

                  {/* Burbuja */}
                  <View
                    style={{
                      maxWidth: "75%",
                      backgroundColor: esComprador
                        ? colors.brandBuyer
                        : colors.background,
                      borderRadius: BorderRadius.md,
                      borderBottomRightRadius: esComprador
                        ? 4
                        : BorderRadius.md,
                      borderBottomLeftRadius: esComprador ? BorderRadius.md : 4,
                      padding: Spacing.md,
                    }}
                  >
                    <Text
                      style={{
                        color: esComprador ? "#fff" : colors.textDefault,
                        fontSize: FontSizes.base,
                        fontFamily: fonts.robotoRegular,
                      }}
                    >
                      {msg.texto}
                    </Text>
                    <Text
                      style={{
                        color: esComprador
                          ? "rgba(255,255,255,0.7)"
                          : colors.textMuted,
                        fontSize: FontSizes.xs,
                        alignSelf: "flex-end",
                        marginTop: 4,
                      }}
                    >
                      {formatHora(msg.timestamp)}
                    </Text>
                  </View>

                  {/* Avatar comprador (derecha) */}
                  {esComprador && (
                    <View
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
                          fontSize: FontSizes.xs,
                        }}
                      >
                        {iniciales}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* Input */}
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
                  ? colors.brandBuyer
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
      </View>
    </Modal>
  );
}
