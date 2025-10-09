import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { Avatar, EditForm } from "../../components/icons";
import Button from "../../components/UI/Button/Button";
import { InputField } from "../../components/UI/InputField";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function RegistroScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

   const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const pickImage = async () => {
    // Pedir permisos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert("Necesitas dar permisos para acceder a las fotos");
      return;
    }

    // Abrir selector de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite recortar
      aspect: [1, 1], // Cuadrado
      quality: 0.8, // Calidad de compresión
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    // Limpiar errores previos
    setEmailError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);

    // Validaciones
    let hasError = false;

    if (!name.trim()) {
      hasError = true;
      setEmailError("Por favor ingresa tu nombre y apellido");
    }

    if (!email.includes("@")) {
      hasError = true;
      setEmailError("Por favor ingresa un correo válido");
    }

    if (!password) {
      hasError = true;
      setPasswordError("Por favor ingresa una contraseña");
    }

    if (!confirmPassword) {
      hasError = true;
      setConfirmPasswordError("Por favor confirma tu contraseña");
    }

    if (password && confirmPassword && password !== confirmPassword) {
      hasError = true;
      setConfirmPasswordError("Las contraseñas no coinciden");
    }

    if (hasError) return;

    // TODO: Aquí se conectaría al backend para registrar al usuario. VER CON LIO
    router.push("/elegirRol"); 
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Spacing.lg,
      }}
    >
      
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.xl,
            marginTop: Spacing.xxl,
            // paddingTop: Spacing.xl,
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* Avatar Section */}
        <View 
          style={{ 
            alignItems: "center", 
            // marginBottom: Spacing.lg 
            }}>
            <View
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: 64,
                  alignItems: "center",
                  justifyContent: "center",
                  // marginBottom: Spacing.xxl,
                  position: "relative",
                  backgroundColor: colors.background,
                  overflow: 'hidden', // Para que la imagen respete el borderRadius
                }}
            >
              {avatarUri ? (
                // Muestra imagen seleccionada
                <Image
                  source={{ uri: avatarUri }}
                  style={{ width: 128, height: 128 }}
                  contentFit="cover"
                  transition={200}
                />
              ) : (
                // Muestra icono por defecto                
                <Avatar width={128} height={128} color={colors.textMuted} />
              )}

                {/* Botón de editar */}
                <Pressable
                onPress={pickImage}
                style={{
                    position: "absolute",
                    bottom: 4,
                    right: 6,
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: colors.brandCommon,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3                
                  }}
                >
                  <EditForm width={18} height={18} color={colors.textOnColor} />
                </Pressable>
                </View>
            </View>
        </View>


          {/* Form Section */}
          <View style={{ marginBottom: Spacing.xl }}>
            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Nombre y apellido"
                placeholder="Nombre y apellido"
                value={name}
                onChangeText={setName}
                error={emailError} // usando emailError para mostrar mensaje genérico si no ingresa nombre
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                error={emailError}
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Contraseña"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showPasswordToggle
                error={passwordError}
              />
            </View>

            <View style={{ marginBottom: Spacing.xxl }}>
              <InputField
                label="Confirmar Contraseña"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                showPasswordToggle
                error={confirmPasswordError}
              />
            </View>

            <Button section="common" width="full" onPress={handleRegister}>
              Registrarse
            </Button>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
