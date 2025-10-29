// CronometroDisplay.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { FontSizes } from '../../constants/Tokens';

type Props = {
  tipo: 'espera' | 'elegir' | 'pagar';
  horas: string;  // formateadas con 2 dígitos
  minutos: string; // formateadas con 2 dígitos
  textoColor: string;
};

export default function CronometroDisplay({ tipo, horas, minutos, textoColor }: Props) {
  // Formato uniforme HH:MM para todas las variantes
  const formato = `${horas}:${minutos}`;

  const textoTitulo =
    tipo === 'espera'
      ? 'Tiempo de espera'
      : tipo === 'elegir'
      ? 'Tiempo para elegir'
      : 'Tiempo para pagar';

  return (
    <View className="items-center">
      <Text
        style={{
          color: textoColor,
          fontFamily: 'Roboto-Bold',
          fontSize: FontSizes.sm,
          marginBottom: 4,
        }}
      >
        {textoTitulo}
      </Text>
      <Text
        style={{
          color: textoColor,
          fontFamily: 'AlarmClock',
          fontSize: FontSizes.xxl,
        }}
      >
        {formato}
      </Text>
    </View>
  );
}
