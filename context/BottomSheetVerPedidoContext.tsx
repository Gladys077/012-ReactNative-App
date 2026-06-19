import BottomSheetVerPedido, {
  BottomSheetVerPedidoRef,
} from "@/components/subcomponentes/BottomSheetVerPedido";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface PedidoData {
  pedidoId?: string | number;
  fechaSeleccion?: string;
  items?: { id: string | number; label: string }[];
  backgroundColor?: string;
  role?: "buyer" | "seller";
}

interface BottomSheetVerPedidoContextType {
  isVisible: boolean;
  pedidoId?: string | number;
  openBottomSheetVerPedido: (data: PedidoData) => void;
  closeBottomSheetVerPedido: () => void;
}

const BottomSheetVerPedidoContext =
  createContext<BottomSheetVerPedidoContextType | null>(null);

export const BottomSheetVerPedidoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sheetRef = useRef<BottomSheetVerPedidoRef>(null);
  const [pedidoData, setPedidoData] = useState<PedidoData>({});
  const [isVisible, setIsVisible] = useState(false);

  const openBottomSheetVerPedido = useCallback((data: PedidoData) => {
    setPedidoData(data);
    setIsVisible(true);
  }, []);

  const closeBottomSheetVerPedido = useCallback(() => {
    sheetRef.current?.dismiss();
    setIsVisible(false);
  }, []);

  const handleSheetClose = useCallback(() => {
    setIsVisible(false);
    setPedidoData({}); // se limpia DESPUÉS de la animación de cierre
  }, []);

  return (
    <BottomSheetVerPedidoContext.Provider
      value={{
        isVisible,
        pedidoId: pedidoData.pedidoId,
        openBottomSheetVerPedido,
        closeBottomSheetVerPedido,
      }}
    >
      {children}

      <BottomSheetVerPedido
        ref={sheetRef}
        items={pedidoData.items}
        isVisible={isVisible}
        onClose={handleSheetClose}
        backgroundColor={pedidoData.backgroundColor}
        role={pedidoData.role ?? "buyer"}
      />
    </BottomSheetVerPedidoContext.Provider>
  );
};

export const useBottomSheetVerPedido = () => {
  const context = useContext(BottomSheetVerPedidoContext);
  if (!context) {
    throw new Error(
      "useBottomSheetVerPedido debe usarse dentro de BottomSheetVerPedidoProvider",
    );
  }
  return context;
};
