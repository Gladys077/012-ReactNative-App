import { useCallback, useEffect, useRef, useState } from "react";

interface UndoToastState {
  visible: boolean;
  mensaje: string;
  onConfirm: () => void;
}

const DURACION = 4000;

export function useUndoToast() {
  const [toast, setToast] = useState<UndoToastState>({
    visible: false,
    mensaje: "",
    onConfirm: () => {},
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confirmRef = useRef<() => void>(() => {});

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const mostrar = useCallback((mensaje: string, onConfirm: () => void) => {
    clearTimer();
    // Si había uno pendiente, ejecutarlo antes de mostrar el nuevo
    confirmRef.current();

    confirmRef.current = onConfirm;
    setToast({ visible: true, mensaje, onConfirm });

    timerRef.current = setTimeout(() => {
      confirmRef.current();
      confirmRef.current = () => {};
      setToast((prev) => ({ ...prev, visible: false }));
    }, DURACION);
  }, []);

  const cancelar = useCallback(() => {
    clearTimer();
    confirmRef.current = () => {};
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const cerrar = useCallback(() => {
    clearTimer();
    confirmRef.current();
    confirmRef.current = () => {};
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => () => clearTimer(), []);

  return { toast, mostrar, cancelar, cerrar };
}
