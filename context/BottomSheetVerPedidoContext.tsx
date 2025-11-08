import BottomSheetVerPedido, {
  BottomSheetVerPedidoRef,
} from "@/components/subcomponentes/BottomSheetVerPedido";
import React, { createContext, useCallback, useContext, useRef, useState } from "react";

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
  const [pedidoData, setPedidoData] = useState<PedidoData>({
    numeroPedido: undefined,
    items: [],
  });

  const openBottomSheetVerPedido = useCallback((data: PedidoData) => {
  setPedidoData(data);
  setTimeout(() => sheetRef.current?.present(), 50);
}, []);

const closeBottomSheetVerPedido = useCallback(() => {
  sheetRef.current?.dismiss();
}, []);

  return (
    <BottomSheetVerPedidoContext.Provider
      value={{ openBottomSheetVerPedido, closeBottomSheetVerPedido }}
    >
      {children}

      {/* El único BottomSheet global */}
      <BottomSheetVerPedido
        ref={sheetRef}
        numeroPedido={pedidoData.numeroPedido}
        items={pedidoData.items}
      />
    </BottomSheetVerPedidoContext.Provider>
  );
};

export const useBottomSheetVerPedido = () => {
  const context = useContext(BottomSheetVerPedidoContext);
  if (!context) {
    throw new Error(
      "useBottomSheetVerPedido debe usarse dentro de BottomSheetVerPedidoProvider"
    );
  }
  return context;
};


/* 
 * Contexto global que gestiona el BottomSheetVerPedido.
 * 
 * Permite abrir y cerrar un único BottomSheet compartido en toda la app,
 * evitando tener uno por cada CardPedidoEnEspera.
 * 
 * - `openBottomSheetVerPedido(data)` → muestra el detalle del pedido recibido.
 * - `closeBottomSheetVerPedido()` → cierra el BottomSheet.
 * 
 * Este contexto debe envolver el árbol principal de navegación (por ejemplo, en layout o _app.tsx).
 */