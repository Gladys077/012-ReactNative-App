import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Linking, ScrollView, View } from "react-native";

import { Spacing } from "@/constants/Tokens";
import ItemsAjustes from "../../components/ajustes/ItemsAjustes";
import SeccionAjustes from "../../components/ajustes/SeccionAjustes";
import {
  Avatar,
  CambiarContraseña,
  Faq,
  Mail,
  MonedasOutline,
  Salir,
  Terminos,
  Theme,
  Version,
  Visible,
} from "../../components/icons";
import { useAuthContext } from "../../context/AuthContext";

const AjustesVendedorScreen = () => {
  const { colors, toggleMode } = useTheme();
  const { logout } = useAuthContext();
  const router = useRouter();

  // Cerrar sesión
  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Seguro que querés cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          try {
            await logout(); // Limpia el estado local y tokens (AuthContext)
            router.replace("/login"); // Redirige a la pantalla de login
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
            Alert.alert("Error", "No se pudo cerrar la sesión correctamente.");
          }
        },
      },
    ]);
  };

  // Abrir cliente de correo
  const handleOpenMail = async () => {
    const email = "soporte@Nuestrodominio.com";
    const subject = "Consulta sobre la app";
    const body = "Hola, necesito ayuda con...";
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    try {
      const supported = await Linking.canOpenURL(mailtoURL);
      if (supported) {
        await Linking.openURL(mailtoURL);
      } else {
        Alert.alert("Error", "No se pudo abrir la aplicación de correo.");
      }
    } catch (error) {
      console.error("Error al abrir correo:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: Spacing.xl,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingVertical: Spacing.lg,
          paddingHorizontal: Spacing.xs,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: Spacing.lg,
            // paddingBottom: Spacing.xl,
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* Cuenta */}
          <SeccionAjustes titulo="Cuenta">
            <ItemsAjustes
              icon={Avatar}
              texto="Perfil"
              onPress={() => router.push("/(preAuth)/Ajustes/perfil" as any)}
            />
            <ItemsAjustes
              icon={CambiarContraseña}
              texto="Cambiar contraseña"
              onPress={() =>
                router.push("/(preAuth)/Ajustes/cambiarContrasena" as any)
              }
            />
            <ItemsAjustes
              icon={Salir}
              texto="Cerrar sesión"
              onPress={handleLogout}
            />
          </SeccionAjustes>

          {/* Preferencias */}
          <SeccionAjustes titulo="Preferencias">
            <ItemsAjustes
              icon={Theme}
              texto="Tema claro/oscuro"
              onPress={toggleMode}
            />
          </SeccionAjustes>

          {/* Información */}
          <SeccionAjustes titulo="Información">
            <ItemsAjustes
              icon={Terminos}
              texto="Términos y condiciones"
              onPress={() =>
                router.push({
                  pathname: "/(preAuth)/Ajustes/terms" as any,
                  params: { from: "vendedor" },
                })
              }
            />
            <ItemsAjustes
              icon={Visible}
              texto="Políticas de privacidad"
              onPress={() =>
                router.push("/(preAuth)/Ajustes/privacidad" as any)
              }
            />
            <ItemsAjustes
              icon={Version}
              texto="Versión de la app"
              textoSecundario="v1.0.0"
            />
            <ItemsAjustes
              icon={Faq}
              texto="Preguntas frecuentes (FAQ)"
              onPress={() => router.push("/(preAuth)/Ajustes/FAQ" as any)}
            />
            <ItemsAjustes
              icon={Mail}
              texto="Contactar soporte técnico"
              onPress={handleOpenMail}
            />
          </SeccionAjustes>

          {/* Para vendedores */}
          <SeccionAjustes titulo="Para vendedores">
            <ItemsAjustes
              icon={MonedasOutline}
              texto="Cargar créditos"
              textoSecundario="(Al registrarse recibirá un crédito de $5000 de regalo)"
              onPress={() => router.push("./creditos")}
            />
          </SeccionAjustes>

          {/* Espaciado final */}
          <View style={{ height: Spacing.xl }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AjustesVendedorScreen;
