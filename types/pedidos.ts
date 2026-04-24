// ─── Estado interno del sistema (fuente de verdad) ───────────────────────────
export type EstadoSistema =
  | "nuevo"
  | "presupuestado"
  | "aceptado_efectivo"
  | "aceptado_transferencia"
  | "pago_enviado"
  | "pago_rechazado"
  | "en_preparacion"
  | "listo_para_enviar"
  | "en_camino"
  | "entregado_pendiente_calif"
  | "completado";

// ─── Lo que ve el COMPRADOR ───────────────────────────────────────────────────
export type EstadoComprador =
  | "En proceso"
  | "Ver respuestas"
  | "Pago y dirección"
  | "Pago en revisión"
  | "A resolver"
  | "En preparación"
  | "En camino"
  | "Pedido recibido"
  | "Completado";

export const estadoSistemaAComprador: Record<EstadoSistema, EstadoComprador> = {
  nuevo: "En proceso",
  presupuestado: "Ver respuestas",
  aceptado_efectivo: "En preparación",
  aceptado_transferencia: "Pago y dirección",
  pago_enviado: "Pago en revisión",
  pago_rechazado: "A resolver",
  en_preparacion: "En preparación",
  listo_para_enviar: "En preparación", // el comprador no ve este sub-estado
  en_camino: "En camino",
  entregado_pendiente_calif: "Pedido recibido",
  completado: "Completado",
};

// ─── Lo que ve el VENDEDOR ────────────────────────────────────────────────────
export type EstadoVendedor =
  | "Nuevo pedido"
  | "Presupuesto enviado"
  | "Esperando pago"
  | "Con comprobante"
  | "En preparación"
  | "Listo para enviar"
  | "En camino"
  | "Entregado"
  | "Completado";

export const estadoSistemaAVendedor: Record<EstadoSistema, EstadoVendedor> = {
  nuevo: "Nuevo pedido",
  presupuestado: "Presupuesto enviado",
  aceptado_efectivo: "En preparación",
  aceptado_transferencia: "Esperando pago",
  pago_enviado: "Con comprobante",
  pago_rechazado: "Esperando pago",
  en_preparacion: "En preparación",
  listo_para_enviar: "Listo para enviar",
  en_camino: "En camino",
  entregado_pendiente_calif: "Entregado",
  completado: "Completado",
};

// ─── Tabs del menú vendedor ───────────────────────────────────────────────────
export type TabVendedor = "pedidos" | "pendientes" | "entregados";

export const estadoSistemaATabVendedor: Record<EstadoSistema, TabVendedor> = {
  nuevo: "pedidos",
  presupuestado: "pedidos",
  aceptado_efectivo: "pendientes",
  aceptado_transferencia: "pendientes",
  pago_enviado: "pendientes",
  pago_rechazado: "pendientes",
  en_preparacion: "pendientes",
  listo_para_enviar: "pendientes",
  en_camino: "pendientes",
  entregado_pendiente_calif: "entregados",
  completado: "entregados", // permanece en historial
};

// ─── Respuesta / Presupuesto del vendedor ─────────────────────────────────────
export interface Respuesta {
  id: string | number;
  vendedorNombre: string;
  alias?: string;
  entidad?: string;
  titular?: string;
  rating: number;
  telefono?: string;
  precio: number;
  nota?: string;
  duracionCronometro?: number;
}

// ─── Pedido ───────────────────────────────────────────────────────────────────
export interface Pedido {
  id: string | number;

  estadoSistema: EstadoSistema; // fuente real

  textoPedido: string;
  rubros?: string[];

  fechaSeleccion?: string; // cuando el comprador acepta un presupuesto

  // Datos del comprador (los ve el vendedor)
  compradorNombre?: string;
  compradorRating?: number;
  direccionComprador: string;

  // Pago
  formaPago?: "transferencia" | "efectivo";
  problemaPago?: {
    comprobante: boolean;
    direccion: boolean;
  };

  // Presupuestos
  respuestasRecibidas?: number;
  duracionCronometro?: number;
  respuestas?: Respuesta[];
  respuestaSeleccionada?: Respuesta;

  // UI helpers
  expandido?: boolean;

  // Calificaciones
  calificacionComprador?: number; // el vendedor califica al comprador
  calificacionVendedor?: number; // el comprador califica al vendedor
}
