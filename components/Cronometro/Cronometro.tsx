import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BorderRadius, Spacing } from '../../constants/Tokens';
import BotonExtraTiempo from './BotonExtraTiempo';
import CronometroDisplay from './CronometroDisplay';

type CronometroTipo = 'espera' | 'elegir' | 'pagar';

type CronometroProps =
  | { tipo: 'espera'; duracionInicial: number; id?: string | number; timestampInicio?: number; onFinish?: () => void }
  | { tipo: 'elegir' | 'pagar'; duracionInicial: number; id: string | number; timestampInicio?: number; onFinish?: () => void };

export default function Cronometro({
  id,
  tipo,
  duracionInicial,
  timestampInicio, // NEW
  onFinish,
}: CronometroProps) {
  const { colors } = useTheme();

  const [tiempoRestante, setTiempoRestante] = useState(duracionInicial * 60); // segs
  const finRef = useRef<number | null>(null);

  const pulse = useSharedValue(1);

  // Clave única por tipo e id (para pedidos distintos)
  const storageKey = id ? `cronometro_${tipo}_${id}` : `cronometro_${tipo}`;

  const estilos: Record<CronometroTipo, { bg: string; texto: string }> = {
    espera: { bg: colors.statusTurquoiseBg, texto: colors.statusTurquoiseDot },
    elegir: { bg: colors.brandBuyerSoft, texto: colors.relojBuyer },
    pagar: { bg: colors.brandBuyerSoft, texto: colors.relojBuyer },
  };

  // Cargar tiempo guardado o crear uno nuevo
  useEffect(() => {
    const cargarTiempo = async () => {
      const guardado = await AsyncStorage.getItem(storageKey);
      if (guardado) {
        // Si ya existe un tiempo guardado, usarlo
        let fin = parseInt(guardado, 10);
        if (fin < 1e12) fin = fin * 1000; // normaliza si estaba en segs
        finRef.current = fin;
        const diffSegs = Math.max(0, Math.ceil((fin - Date.now()) / 1000));
        setTiempoRestante(diffSegs);
      } else {
        // NEW: Si viene timestampInicio del backend, calcular desde ahí
        let nuevoFin: number;
        
        if (timestampInicio) {
          // Calcular fin basado en el timestamp de inicio del backend
          nuevoFin = timestampInicio + duracionInicial * 60 * 1000;
        } else {
          // Fallback: usar tiempo actual (comportamiento original)
          nuevoFin = Date.now() + duracionInicial * 60 * 1000;
        }
        
        finRef.current = nuevoFin;
        await AsyncStorage.setItem(storageKey, nuevoFin.toString());
        
        const diffSegs = Math.max(0, Math.ceil((nuevoFin - Date.now()) / 1000));
        setTiempoRestante(diffSegs);
      }
    };
    cargarTiempo();
  }, [storageKey, duracionInicial, timestampInicio]);

  // Intervalo de actualización
  useEffect(() => {
    const tick = async () => {
      if (!finRef.current) return;

      const diffSegs = Math.max(0, Math.ceil((finRef.current - Date.now()) / 1000));
      setTiempoRestante(diffSegs);

      if (diffSegs <= 0) {
        await AsyncStorage.removeItem(storageKey);
        onFinish?.();
      } else {
        pulse.value = withTiming(1.1, { duration: 200 }, () =>
          (pulse.value = withTiming(1, { duration: 200 }))
        );
      }
    };

    tick();
    const intervalo = setInterval(tick, 60000);
    return () => clearInterval(intervalo);
  }, [storageKey, onFinish]);

  // Calcular horas y minutos
  const horasTotales = Math.floor(tiempoRestante / 3600);
  const minutosTotales = Math.floor((tiempoRestante % 3600) / 60);

  const horasFormateadas = Math.min(horasTotales, 23).toString().padStart(2, '0');
  const minutosFormateados = minutosTotales.toString().padStart(2, '0');

  const estaPorTerminar = tiempoRestante <= 10 * 60;
  const fondo = estaPorTerminar ? colors.relojTiempoTerminado : estilos[tipo].bg;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  // Agregar tiempo (+1h o +10min)
  const agregarTiempo = async () => {
    const extraSegs = tipo === 'espera' ? 3600 : 600;
    const extraMs = extraSegs * 1000;
    const nuevoFin = (finRef.current ?? Date.now()) + extraMs;

    finRef.current = nuevoFin;
    await AsyncStorage.setItem(storageKey, nuevoFin.toString());

    const diffSegs = Math.max(0, Math.ceil((nuevoFin - Date.now()) / 1000));
    setTiempoRestante(diffSegs);
  };

  return (
    <Pressable onPress={agregarTiempo}>
      <Animated.View
        style={[
          {
            backgroundColor: fondo,
            borderRadius: BorderRadius.lg,
            borderWidth: 2,
            borderColor: estaPorTerminar ? colors.textError : estilos[tipo].texto,
            paddingVertical: Spacing.md,
          },
          animatedStyle,
        ]}
        className="items-center"
      >
        <CronometroDisplay
          tipo={tipo}
          horas={horasFormateadas}
          minutos={minutosFormateados}
          textoColor={estilos[tipo].texto}
        />

        {(tipo === 'espera' || tipo === 'pagar') && (
          <>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: colors.textMuted,
                marginVertical: Spacing.sm,
              }}
            />
            <BotonExtraTiempo tipo={tipo} />
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}

// Modo de uso:
// Sin timestamp (comportamiento original):
// <Cronometro id={`pedido_${pedido.id}`} tipo="espera" duracionInicial={60} />

// Con timestamp del backend:
// <Cronometro id={`pedido_${pedido.id}`} tipo="pagar" duracionInicial={15} timestampInicio={respuesta.createdAt} />