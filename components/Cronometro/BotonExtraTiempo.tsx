import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Pressable, Text } from 'react-native';

type Props = {
  tipo: 'espera' | 'pagar';
  onPress: () => void;
};

export default function BotonExtraTiempo({ tipo, onPress }: Props) {
  const { colors } = useTheme();

  const texto = tipo === 'espera' ? 'AÑADIR 1 HORA' : 'AÑADIR 10 Minutos';

  return (
    <Pressable
      onPress={onPress}
      // className="mt-1 w-full rounded-xl items-center"
      style={{ backgroundColor: colors.brandBuyerSoft , paddingTop: 2, marginHorizontal: 3}}
    >
      <Text
        className="text-xs"
        style={{ fontFamily:'Roboto-Bold', color: colors.textDefault}} 
      >
        {texto}
      </Text>
    </Pressable>
  );
}
