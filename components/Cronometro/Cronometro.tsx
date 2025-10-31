import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BorderRadius, Spacing } from '../../constants/Tokens';
import BotonExtraTiempo from './BotonExtraTiempo';
import CronometroDisplay from './CronometroDisplay';

type CronometroTipo = 'espera' | 'elegir' | 'pagar';

type CronometroProps = {
  tipo: CronometroTipo;
  duracionInicial: number; // en minutos
  onFinish?: () => void;
};

export default function Cronometro({
  tipo,
  duracionInicial,
  onFinish,
}: CronometroProps) {
  const { colors } = useTheme();

  const [tiempoRestante, setTiempoRestante] = useState(duracionInicial * 60); // segundos
  const finRef = useRef<number | null>(null); // guardamos timestamp final (en ms)

  const pulse = useSharedValue(1);

  // Estilos base por tipo (colores normales)
  const estilos: Record<CronometroTipo, { bg: string; texto: string }> = {
    espera: { bg: colors.brandBuyerSoft, texto: colors.relojBuyer },
    elegir: { bg: colors.brandSellerSoft, texto: colors.relojSeller },
    pagar: { bg: colors.brandBuyerSoft, texto: colors.relojBuyer },
  };

  // Cargar tiempo desde AsyncStorage o inicializar uno nuevo
  useEffect(() => {
    const cargarTiempo = async () => {
      const guardado = await AsyncStorage.getItem(`cronometro_${tipo}`);
      if (guardado) {
        let fin = parseInt(guardado, 10);

        // Normalizar: si parece estar en segundos, convertir a ms
        if (fin < 1e12) fin = fin * 1000;

        finRef.current = fin;
        const diffSegs = Math.max(0, Math.ceil((fin - Date.now()) / 1000));
        setTiempoRestante(diffSegs);
      } else {
        const nuevoFin = Date.now() + duracionInicial * 60 * 1000; // min → ms
        finRef.current = nuevoFin;
        await AsyncStorage.setItem(`cronometro_${tipo}`, nuevoFin.toString());
        setTiempoRestante(duracionInicial * 60);
      }
    };

    cargarTiempo();
  }, []);

  // Intervalo: actualiza el tiempo restante cada minuto
  useEffect(() => {
    const tick = async () => {
      if (!finRef.current) return;

      const diffSegs = Math.max(0, Math.ceil((finRef.current - Date.now()) / 1000));
      setTiempoRestante(diffSegs);

      if (diffSegs <= 0) {
        await AsyncStorage.removeItem(`cronometro_${tipo}`);
        onFinish?.();
      } else {
        // Pequeña animación "pulse" cada minuto
        pulse.value = withTiming(1.1, { duration: 200 }, () =>
          (pulse.value = withTiming(1, { duration: 200 }))
        );
      }
    };

    tick(); // primer tick inmediato
    const intervalo = setInterval(tick, 60000);
    return () => clearInterval(intervalo);
  }, [tipo, onFinish]);

  // Calcular horas y minutos
const horasTotales = Math.floor(tiempoRestante / 3600);
const minutosTotales = Math.floor((tiempoRestante % 3600) / 60);

// Limitar máximo a 23:59
const horasFormateadas = Math.min(horasTotales, 23).toString().padStart(2, '0');
const minutosFormateados = minutosTotales.toString().padStart(2, '0');

  // Cambia color de fondo si queda poco tiempo (<10 min)
  const estaPorTerminar = tiempoRestante <= 10 * 60;
  const fondo = estaPorTerminar ? colors.statusRedBg : estilos[tipo].bg ;

  // Animación de escala
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  // Agregar tiempo (+1h o +10min)
  const agregarTiempo = async () => {
    const extraSegs = tipo === 'espera' ? 3600 : 600; // +1h o +10min
    const extraMs = extraSegs * 1000;
    const nuevoFin = (finRef.current ?? Date.now()) + extraMs;

    finRef.current = nuevoFin;
    await AsyncStorage.setItem(`cronometro_${tipo}`, nuevoFin.toString());

    const diffSegs = Math.max(0, Math.ceil((nuevoFin - Date.now()) / 1000));
    setTiempoRestante(diffSegs);
  };

 return (
  <Animated.View
    style={[
      {
        backgroundColor: fondo,
        borderRadius: BorderRadius.xl,
        borderWidth: 2,
        borderColor: estaPorTerminar ? colors.textError : estilos[tipo].texto,
        padding: Spacing.md,
        width: 140,
      },
      animatedStyle,
    ]}
    className="items-center"
  >
    {/* Cronómetro */}
    <CronometroDisplay
      tipo={tipo}
      horas={horasFormateadas}
      minutos={minutosFormateados}
      textoColor={estilos[tipo].texto}
    />

    {/* Solo en 'espera' o 'pagar': línea divisoria + botón */}
    {(tipo === 'espera' || tipo === 'pagar') && (
      <>
        {/* Línea divisoria */}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: colors.textMuted,
            marginVertical: Spacing.sm,
          }}
        />

        {/* Botón extra */}
        <BotonExtraTiempo tipo={tipo} onPress={agregarTiempo} />
      </>
    )}
  </Animated.View>
);

}


// MODO DE USO: La duracionInicial se expresa en minutos | se guarda en AsyncStorage | el onFinish es opcional, pero sirve para disparar una acción 
// (ej: actualizar estado del pedido o mostarr un aviso)
// Cronometro de 1 hora -tipo: espera-:
//   <Cronometro
//       tipo="espera"
//       duracionInicial={60} // minutos → 1 h
//       onFinish={() => console.log('El tiempo de espera terminó')}
//     />

// Cronómetro de 20min -tipo: pagar-:
//    <Cronometro
//       tipo="pagar"
//       duracionInicial={10} // minutos
//       onFinish={() => console.log('Se terminó el tiempo para pagar')}
//     />
