import React, { createContext, useCallback, useContext, useState } from "react";
import Toast from "../components/UI/Toast";

interface ToastContextValue {
  showToast: (mensaje: string, variante?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [variante, setVariante] = useState<"success" | "error" | "info">(
    "success",
  );

  const showToast = useCallback(
    (msg: string, v: "success" | "error" | "info" = "success") => {
      setMensaje(msg);
      setVariante(v);
      setVisible(true);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        mensaje={mensaje}
        visible={visible}
        variante={variante}
        onOcultar={() => setVisible(false)}
      />
    </ToastContext.Provider>
  );
}
