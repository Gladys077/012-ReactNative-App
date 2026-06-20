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
    compradorNombre: "Julia Pérez",
    compradorRating: 4.5,
    compradorRatingCount: 38,
    respuestasRecibidas: 0,
    duracionCronometro: 60,
    fechaSeleccion: new Date().toISOString(), //cuando el comprador acepta el presupuesto
  },
  {
    id: "2",
    estadoSistema: "presupuestado",
    fechaPresupuesto: new Date(Date.now() - 47 * 60 * 60 * 1000).toISOString(), // hace 47hs — casi expira

    textoPedido: `Revisión de cañerías del baño. Traer soplete y materiales básicos.`,
    direccionComprador: "Av. SiempreViva 724",
    celularComprador: 12341243,
    compradorNombre: "María García",
    compradorRating: 5,
    compradorRatingCount: 12,
    respuestasRecibidas: 2,
    duracionCronometro: 30,
    fechaSeleccion: new Date().toISOString(),
    respuestas: [
      {
        id: "v1",
        vendedorNombre: "Plomería Juan",
        telefono: 12341234,
        alias: "plomerojuan",
        entidad: "Mercado Pago",
        titular: "Juan Pérez",
        rating: 4.0,
        ratingCount: 54,
        precio: 4500,
        nota: "Puedo ir mañana temprano. El precio no incluye materiales si hubiera que cambiar algo.",
        duracionCronometro: 45,
      },
      {
        id: "v2",
        vendedorNombre: "Tienda Victor",
        telefono: 12341234,
        alias: "TIENDAVICTOR",
        entidad: "Mercado Pago",
        titular: "Víctor Rodriguez",
        rating: 4.5,
        ratingCount: 210,
        precio: 4250,
        nota: "Se le entregará entre las 12 y las 13hs.",
        duracionCronometro: 30,
      },
    ],
    expandido: false,
  },
  {
    id: "3",
    estadoSistema: "aceptado_transferencia",
    textoPedido: `200 Sandwichs de miga de jamón y queso\n1 kilo de pan casero\n1 kilo de pan flauta\n1 kilo de pan lactal`,
    direccionComprador: "Calle 1, nro 933",
    celularComprador: 12341243,
    compradorNombre: "Marcela Andrade",
    compradorRating: 4.5,
    compradorRatingCount: 73,
    formaPago: "transferencia",
    fechaSeleccion: new Date().toISOString(),
    respuestaSeleccionada: {
      id: "v3",
      vendedorNombre: "Minimarket Pedro",
      telefono: 12341234,
      alias: "SANDWICHERIAEXPRESS",
      entidad: "Mercado Pago",
      titular: "Pedro Pascal",
      rating: 4.8,
      ratingCount: 341,
      precio: 25000,
      nota: "El pedido será entregado entre las 11 y las 13hs.",
    },
  },
  {
    id: "4",
    estadoSistema: "en_preparacion",
    textoPedido: `200 Sandwichs de miga de jamón y queso\n1 kilo de pan casero\n1 kilo de pan flauta\n1 kilo de pan lactal`,
    direccionComprador: "Calle 50, nro 90",
    celularComprador: 12341243,
    compradorNombre: "Laura Gómez",
    compradorRating: 4.2,
    compradorRatingCount: 19,
    formaPago: "efectivo",
    fechaSeleccion: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v3",
      vendedorNombre: "Minimarket Pedro",
      telefono: 12341234,
      alias: "SANDWICHERIAEXPRESS",
      entidad: "Mercado Pago",
      titular: "Pedro Pascal",
      rating: 4.8,
      ratingCount: 341,
      precio: 25000,
      nota: "El pedido será entregado entre las 11 y las 13hs.",
    },
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
    id: "5",
    estadoSistema: "pago_observado",
    textoPedido: "Pan Lactal, 1 kilo de queso rallado, 2 litros de leche",
    direccionComprador: "Av. Corrientes 1234",
    celularComprador: 12341243,
    compradorNombre: "Carla Ruiz",
    compradorRating: 4.0,
    compradorRatingCount: 5,
    formaPago: "transferencia",
    problemaPago: { comprobante: true, direccion: false },
    fechaSeleccion: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v5",
      vendedorNombre: "Minimarket Juan",
      telefono: 123123123123,
      alias: "MINIMARKETJUAN",
      entidad: "Mercado Pago",
      titular: "Juan Pérez",
      rating: 4.0,
      ratingCount: 88,
      precio: 4150,
      nota: "El pedido será entregado entre las 10 y las 11hs.",
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
    compradorRatingCount: 156,
    formaPago: "transferencia",
    fechaSeleccion: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v5",
      vendedorNombre: "Minimarket Juan",
      telefono: 123123123123,
      alias: "MINIMARKETJUAN",
      entidad: "Mercado Pago",
      titular: "Juan Pérez",
      rating: 4.0,
      ratingCount: 88,
      precio: 4250,
      nota: "Se le entregará entre las 12 y las 13hs.",
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
    compradorRatingCount: 27,
    formaPago: "transferencia",
    fechaSeleccion: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v5",
      vendedorNombre: "Minimarket Juan",
      telefono: 12341234,
      alias: "MINIMARKETJUAN",
      entidad: "Mercado Pago",
      titular: "Juan Pérez",
      rating: 4.0,
      ratingCount: 88,
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
    compradorRatingCount: 91,
    formaPago: "efectivo",
    fechaSeleccion: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    respuestaSeleccionada: {
      id: "v5",
      vendedorNombre: "Minimarket Juan",
      telefono: 12341234,
      alias: "MINIMARKETJUAN",
      entidad: "Mercado Pago",
      titular: "Juan Pérez",
      rating: 4.0,
      ratingCount: 88,
      precio: 3200,
    },
  },
  {
    id: "9",
    estadoSistema: "nuevo",
    textoPedido: `10 docenas de medialunas\n1 kilo de pan casero integral\n1 Torta de chocolate grande`,
    direccionComprador: "Av. San Martín 1024",
    celularComprador: 12341243,
    compradorNombre: "Sandra Einstein",
    compradorRating: 4,
    compradorRatingCount: 30,
    respuestasRecibidas: 0,
    duracionCronometro: 60,
    fechaSeleccion: new Date().toISOString(), //cuando el comprador acepta el presupuesto
  },
  {
    id: "10",
    estadoSistema: "nuevo",
    textoPedido: `40 coca-colas de 2.25L\n20 kilos de hielo\n10 bolsas de 1kg de papas fritas\n5 kilos de maní salado`,
    direccionComprador: "Av. San Martín 1024",
    celularComprador: 12341243,
    compradorNombre: "Sonia Enrique",
    compradorRating: 4,
    compradorRatingCount: 30,
    respuestasRecibidas: 0,
    duracionCronometro: 60,
    fechaSeleccion: new Date().toISOString(), //cuando el comprador acepta el presupuesto
  },
  {
    id: "11",
    estadoSistema: "nuevo",
    textoPedido: `1 kilo de pan casero integral\n1 Torta de chocolate grande`,
    direccionComprador: "Av. San Martín 1024",
    celularComprador: 12341243,
    compradorNombre: "Paola Miguel",
    compradorRating: 4,
    compradorRatingCount: 30,
    respuestasRecibidas: 0,
    duracionCronometro: 60,
    fechaSeleccion: new Date().toISOString(), //cuando el comprador acepta el presupuesto
  },
];

// ─── Contexto ─────────────────────────────────────────────────────────────────

interface OrdersContextValue {
  pedidos: Pedido[];
  loading: boolean;
  updateEstado: (id: string | number, nuevoEstado: EstadoSistema) => void;
  updatePedido: (id: string | number, cambios: Partial<Pedido>) => void;
  getPedidoById: (id: string | number) => Pedido | undefined;
  removePedido: (id: string | number) => void;
  agregarMensaje: (id: string | number, mensaje: Mensaje) => void;
  historialComprador: Pedido[];
  historialVendedor: Pedido[];
  moverAHistorialComprador: (
    id: string | number,
    motivo?: { opcion: string; detalle?: string },
  ) => void;
  moverAHistorialVendedor: (
    id: string | number,
    motivo?: { opcion: string; detalle?: string },
  ) => void;
  removeHistorialComprador: (id: string | number) => void;
  removeHistorialVendedor: (id: string | number) => void;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [loading] = useState(false);

  const [historialComprador, setHistorialComprador] = useState<Pedido[]>([]);
  const [historialVendedor, setHistorialVendedor] = useState<Pedido[]>([]);

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

  const moverAHistorialComprador = useCallback(
    (id: string | number, motivo?: { opcion: string; detalle?: string }) => {
      setPedidos((prev) => {
        const pedido = prev.find((p) => p.id === id);
        if (pedido) {
          const pedidoConMotivo = motivo
            ? { ...pedido, motivoNoConcretado: motivo }
            : pedido;
          setHistorialComprador((h) => [pedidoConMotivo, ...h]);
        }
        return prev.filter((p) => p.id !== id);
      });
    },
    [],
  );

  const moverAHistorialVendedor = useCallback(
    (id: string | number, motivo?: { opcion: string; detalle?: string }) => {
      setPedidos((prev) => {
        const pedido = prev.find((p) => p.id === id);
        if (pedido) {
          const pedidoConMotivo = motivo
            ? { ...pedido, motivoNoConcretado: motivo }
            : pedido;
          setHistorialVendedor((h) => [pedidoConMotivo, ...h]);
        }
        return prev.filter((p) => p.id !== id);
      });
    },
    [],
  );

  const removeHistorialComprador = useCallback((id: string | number) => {
    setHistorialComprador((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const removeHistorialVendedor = useCallback((id: string | number) => {
    setHistorialVendedor((prev) => prev.filter((p) => p.id !== id));
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
        removePedido,
        agregarMensaje,
        historialComprador,
        historialVendedor,
        moverAHistorialComprador,
        moverAHistorialVendedor,
        removeHistorialComprador,
        removeHistorialVendedor,
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
