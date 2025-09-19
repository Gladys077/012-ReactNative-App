import React, { useState } from "react";
import { Button, SafeAreaView, ScrollView, View } from "react-native";
import { InputField } from "../../components/UI/InputField";

export default function InputFieldTest() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleValidate = () => {
    // simple validación de ejemplo
    setErrorEmail(email.includes("@") ? "" : "Email inválido");
    setErrorPassword(password.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-800 p-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <InputField
          label="Nombre"
          placeholder="Ingresa tu nombre"
          value={text}
          onChangeText={setText}
          subtext="Tu nombre será visible en el perfil"
        />

        <InputField
          label="Email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errorEmail}
        />

        <InputField
          label="Contraseña"
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errorPassword}
        />

        <View className="mt-6">
          <Button title="Validar" onPress={handleValidate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
