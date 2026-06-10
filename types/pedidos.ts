// ─── Estado interno del sistema (fuente de verdad) ───────────────────────────
export type EstadoSistema =
  | "nuevo"
  | "presupuestado"
  | "expirado"
  | "aceptado_efectivo"
  | "aceptado_transferencia"
  | "pago_enviado"
  | "pago_observado"
  | "en_preparacion"
  | "listo_para_enviar"
  | "en_camino"
  | "entregado_pendiente_calif"
  | "no_concretado"
  | "completado"
  | "cancelado";

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
  | "Completado"
  | "Cancelado";

export const estadoSistemaAComprador: Record<EstadoSistema, EstadoComprador> = {
  nuevo: "En proceso",
  presupuestado: "Ver respuestas",
  expirado: "Cancelado",
  aceptado_efectivo: "En preparación",
  aceptado_transferencia: "Pago y dirección",
  pago_enviado: "Pago en revisión",
  pago_observado: "A resolver",
  en_preparacion: "En preparación",
  listo_para_enviar: "En preparación", // el comprador no ve este sub-estado "listo para enviar"
  en_camino: "En camino",
  entregado_pendiente_calif: "Pedido recibido",
  no_concretado: "Cancelado",
  completado: "Completado",
  cancelado: "Cancelado",
};

// ─── Lo que ve el VENDEDOR ────────────────────────────────────────────────────
export type EstadoVendedor =
  | "Nuevo pedido"
  | "Presupuesto enviado"
  | "Expirado"
  | "Esperando pago"
  | "Pago observado"
  | "Por verificar"
  | "En preparación"
  | "Listo para enviar"
  | "En camino"
  | "Entregado"
  | "No concretado"
  | "Cancelado"
  | "Completado";

// esta etiqueta verá el vendedor (text para mostrar en la UI)
export const estadoSistemaAVendedor: Record<EstadoSistema, EstadoVendedor> = {
  nuevo: "Nuevo pedido",
  presupuestado: "Presupuesto enviado",
  expirado: "Expirado", // se verá en el historial con etiq. expirado -para cuando el comprando no elige ningún vendedor ni cancela el pedido
  aceptado_efectivo: "En preparación",
  aceptado_transferencia: "Esperando pago",
  pago_enviado: "Por verificar",
  pago_observado: "Pago observado",
  en_preparacion: "En preparación",
  listo_para_enviar: "Listo para enviar",
  en_camino: "En camino",
  entregado_pendiente_calif: "Entregado",
  no_concretado: "No concretado",
  completado: "Completado",
  cancelado: "Cancelado", // se verá en historial con etiqueta propia
};

// ─── Tabs del menú vendedor ───────────────────────────────────────────────────
export type TabVendedor = "pedidos" | "pendientes" | "entregados" | "historial";

// muestro en qué pestaña del menúVendedor aparece
export const estadoSistemaATabVendedor: Record<EstadoSistema, TabVendedor> = {
  nuevo: "pedidos",
  presupuestado: "pedidos",
  aceptado_efectivo: "pendientes",
  aceptado_transferencia: "pendientes",
  pago_enviado: "pendientes",
  pago_observado: "pendientes",
  en_preparacion: "pendientes",
  listo_para_enviar: "pendientes",
  en_camino: "pendientes",
  entregado_pendiente_calif: "entregados",
  // ─ Irán directo al historial
  completado: "historial",
  cancelado: "historial",
  expirado: "historial",
  no_concretado: "historial",
};

// ─── Respuesta / Presupuesto del vendedor ─────────────────────────────────────
export interface Respuesta {
  id: string | number;
  vendedorNombre: string;
  telefono?: number;
  alias?: string;
  entidad?: string;
  titular?: string;
  rating: number;
  ratingCount?: number;
  precio: number;
  nota?: string;
  duracionCronometro?: number;
}

// ─── Comprobante de pago ──────────────────────────────────────────────────────
export interface Comprobante {
  id: string;
  uri: string; // URI local o URL remota de la imagen/PDF
  fechaEnvio: string; // ISO timestamp
  estado: "pendiente" | "aprobado" | "rechazado";
  motivoRechazo?: string; // solo si estado === "rechazado"
}

// ─── Mensaje de chat ──────────────────────────────────────────────────────────
export interface Mensaje {
  id: string;
  texto: string;
  remitenteId: "comprador" | "vendedor";
  timestamp: string; // ISO string (serializable)
}

// ─── Pedido ───────────────────────────────────────────────────────────────────
export interface Pedido {
  id: string | number;

  estadoSistema: EstadoSistema; // fuente real

  textoPedido: string;
  rubros?: string[];

  fechaSeleccion?: string; // cuando el comprador acepta un presupuesto
  fechaPresupuesto?: string; // ISO timestamp — cuando el vendedor envía el presupuesto

  // Datos del comprador (los ve el vendedor)
  compradorNombre?: string;
  compradorRating?: number;
  compradorRatingCount?: number;
  direccionComprador: string;
  celularComprador: number;

  // Pago
  formaPago?: "transferencia" | "efectivo";
  comprobantes?: Comprobante[]; // ordenados por fechaEnvio asc (Lio, tené en cuenta que podríamos recibir más de un comprobante)

  problemaPago?: {
    comprobante: boolean;
    direccion: boolean;
  };

  // Chat — se usa cuando el vendedor marca "A resolver"
  mensajes?: Mensaje[];

  // Presupuestos
  respuestasRecibidas?: number;
  duracionCronometro?: number;
  respuestas?: Respuesta[];
  respuestaSeleccionada?: Respuesta;

  // UI helpers
  expandido?: boolean;

  // Calificaciones
  calificacionComprador?: { estrellas: number; comentario: string }; // el vendedor califica al comprador
  calificacionVendedor?: { estrellas: number; comentario: string }; // el comprador califica al vendedor

  motivoNoConcretado?: {
    opcion: string;
    detalle?: string;
  };
}
