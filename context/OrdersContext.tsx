import React, { createContext, useCallback, useContext, useState } from "react";
import type { EstadoSistema, Mensaje, Pedido } from "../types/pedidos";

// ─── Mock ─────────────────────────────────────────────────────────────────────

const mockPedidos: Pedido[] = [
  {
    id: "1",
    estadoSistema: "nuevo",
    textoPedido: `3 paltas (una madura y dos para comer ahora)\n1 kilo de pan casero integral\n1 litro de leche descremada`,
    direccionComprador: "Av. San Martín 1024",
    celularComprador: 12341243,
    compradorNombre: "Juan Pérez",
    compradorRating: 4.5,
    respuestasRecibidas: 0,
    duracionCronometro: 60,
    fechaSeleccion: new Date().toISOString(),
  },
  {
    id: "2",
    estadoSistema: "presupuestado",
    textoPedido: `Revisión de cañerías del baño. Traer soplete y materiales básicos.`,
    direccionComprador: "Av. SiempreViva 724",
    celularComprador: 12341243,
    compradorNombre: "María García",
    compradorRating: 5,
    respuestasRecibidas: 2,
    duracionCronometro: 30,
    fechaSeleccion: new Date().toISOString(),
    respuestas: [
      {
        id: "v1",
        vendedorNombre: "Plomería Juan",
        alias: "plomerojuan",
        entidad: "Mercado Pago",
        titular: "Juan Pérez",
        rating: 4.0,
        precio: 4500,
        nota: "Puedo ir mañana temprano. El precio no incluye materiales si hubiera que cambiar algo.",
        duracionCronometro: 45,
      },
      {
        id: "v2",
        vendedorNombre: "Tienda María",
        alias: "TIENDAMARIA",
        entidad: "Mercado Pago",
        titular: "María Rodriguez",
        rating: 4.5,
        precio: 4250,
        duracionCronometro: 30,
      },
    ],
    expandido: false,
  },
  {
    id: "3",
    estadoSistema: "aceptado_transferencia",
    textoPedido: `200 Sandwichs de miga de jamón y queso`,
    direccionComprador: "Calle 1, nro 933",
    celularComprador: 12341243,
    compradorNombre: "Marcelo Andrade",
    compradorRating: 4.5,
    formaPago: "transferencia",
    fechaSeleccion: new Date().toISOString(),
    respuestaSeleccionada: {
      id: "v3",
      vendedorNombre: "Minimarket Pedro",
      alias: "SANDWICHERIAEXPRESS",
      entidad: "Mercado Pago",
      titular: "Pedro Pascal",
      rating: 4.8,
      precio: 25000,
    },
  },
  {
    id: "4",
    estadoSistema: "en_preparacion",
    textoPedido: `200 Sandwichs de miga de jamón y queso`,
    direccionComprador: "Calle 50, nro 90",
    celularComprador: 12341243,
    compradorNombre: "Laura Gómez",
    compradorRating: 4.2,
    formaPago: "efectivo",
    fechaSeleccion: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v3",
      vendedorNombre: "Minimarket Pedro",
      alias: "SANDWICHERIAEXPRESS",
      entidad: "Mercado Pago",
      titular: "Pedro Pascal",
      rating: 4.8,
      precio: 25000,
    },
  },
  {
    id: "5",
    estadoSistema: "pago_observado",
    textoPedido: "Pan Lactal, 1 kilo de queso rallado, 2 litros de leche",
    direccionComprador: "Av. Corrientes 1234",
    celularComprador: 12341243,
    compradorNombre: "Carlos Ruiz",
    compradorRating: 4.0,
    formaPago: "transferencia",
    problemaPago: { comprobante: true, direccion: false },
    fechaSeleccion: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v5",
      vendedorNombre: "Minimarket Juan",
      alias: "MINIMARKETJUAN",
      entidad: "Mercado Pago",
      titular: "Juan Pérez",
      rating: 4.0,
      precio: 4150,
    },
    comprobantes: [
      {
        id: "c1",
        uri: "https://picsum.photos/400/600",
        fechaEnvio: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
        estado: "rechazado",
      },
    ],
    mensajes: [
      {
        id: "m1",
        texto:
          "El comprobante que me enviaste no cubre el importe total del pedido.",
        remitenteId: "vendedor",
        timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "6",
    estadoSistema: "pago_enviado",
    textoPedido:
      "1k Tomates\n1k Cebolla\n2k Papas\n1/2k Duraznos\n1k Pomelo\n1/2k Zanahorias",
    direccionComprador: "Av. Corrientes 1234",
    celularComprador: 12341243,
    compradorNombre: "Ana Martínez",
    compradorRating: 4.8,
    formaPago: "transferencia",
    fechaSeleccion: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v5",
      vendedorNombre: "Minimarket Juan",
      alias: "MINIMARKETJUAN",
      entidad: "Mercado Pago",
      titular: "Juan Pérez",
      rating: 4.0,
      precio: 4250,
    },
    comprobantes: [
      {
        id: "c2",
        uri: "https://picsum.photos/400/601",
        fechaEnvio: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
        estado: "rechazado",
      },
      {
        id: "c3",
        uri: "https://picsum.photos/400/603",
        fechaEnvio: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        estado: "pendiente",
      },
      {
        id: "c4",
        uri: "https://picsum.photos/400/604",
        fechaEnvio: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        estado: "pendiente",
      },
    ],
  },
  {
    id: "7",
    estadoSistema: "en_camino",
    textoPedido: "Pedido de verduras varias",
    direccionComprador: "Av. Corrientes 1234",
    celularComprador: 12341243,
    compradorNombre: "Roberto Silva",
    compradorRating: 3.9,
    formaPago: "transferencia",
    fechaSeleccion: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v5",
      vendedorNombre: "Minimarket Juan",
      alias: "MINIMARKETJUAN",
      entidad: "Mercado Pago",
      titular: "Juan Pérez",
      rating: 4.0,
      precio: 4150,
    },
  },
  {
    id: "8",
    estadoSistema: "entregado_pendiente_calif",
    textoPedido: "Pedido de lácteos",
    direccionComprador: "Av. Rivadavia 500",
    celularComprador: 12341243,
    compradorNombre: "Sofía Torres",
    compradorRating: 4.6,
    formaPago: "efectivo",
    fechaSeleccion: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v5",
      vendedorNombre: "Minimarket Juan",
      alias: "MINIMARKETJUAN",
      entidad: "Mercado Pago",
      titular: "Juan Pérez",
      rating: 4.0,
      precio: 3200,
    },
  },
];

// ─── Contexto ─────────────────────────────────────────────────────────────────

interface OrdersContextValue {
  pedidos: Pedido[];
  loading: boolean;
  historial: Pedido[];
  updateEstado: (id: string | number, nuevoEstado: EstadoSistema) => void;
  updatePedido: (id: string | number, cambios: Partial<Pedido>) => void;
  getPedidoById: (id: string | number) => Pedido | undefined;
  moverAHistorial: (id: string | number) => void;
  removePedidoHistorial: (id: string | number) => void;
  removePedido: (id: string | number) => void;
  agregarMensaje: (id: string | number, mensaje: Mensaje) => void;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [loading] = useState(false);
  const [historial, setHistorial] = useState<Pedido[]>([]);

  const updateEstado = useCallback(
    (id: string | number, nuevoEstado: EstadoSistema) => {
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estadoSistema: nuevoEstado } : p,
        ),
      );
    },
    [],
  );

  const updatePedido = useCallback(
    (id: string | number, cambios: Partial<Pedido>) => {
      setPedidos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...cambios } : p)),
      );
    },
    [],
  );

  const getPedidoById = useCallback(
    (id: string | number) => pedidos.find((p) => p.id === id),
    [pedidos],
  );

  const moverAHistorial = useCallback((id: string | number) => {
    setPedidos((prev) => {
      const pedido = prev.find((p) => p.id === id);
      if (pedido) setHistorial((h) => [pedido, ...h]);
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const removePedidoHistorial = useCallback((id: string | number) => {
    setHistorial((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const removePedido = useCallback((id: string | number) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Agrega un mensaje al array mensajes del pedido
  const agregarMensaje = useCallback(
    (id: string | number, mensaje: Mensaje) => {
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, mensajes: [...(p.mensajes ?? []), mensaje] }
            : p,
        ),
      );
    },
    [],
  );

  return (
    <OrdersContext.Provider
      value={{
        pedidos,
        loading,
        updateEstado,
        updatePedido,
        getPedidoById,
        moverAHistorial,
        historial,
        removePedidoHistorial,
        removePedido,
        agregarMensaje,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders debe usarse dentro de OrdersProvider");
  return ctx;
};
