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
  numeroPedido?: number | string;
  items?: { id: string | number; label: string }[];
}

interface BottomSheetVerPedidoContextType {
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
    setIsVisible(false);
    setPedidoData({});
  }, []);

  return (
    <BottomSheetVerPedidoContext.Provider
      value={{ openBottomSheetVerPedido, closeBottomSheetVerPedido }}
    >
      {children}

      <BottomSheetVerPedido
        ref={sheetRef}
        numeroPedido={pedidoData.numeroPedido}
        items={pedidoData.items}
        isVisible={isVisible}
        onClose={closeBottomSheetVerPedido}
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
