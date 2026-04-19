export type EstadoPedidoActual =
  | "En proceso"
  | "Ver respuestas"
  | "Pago y dirección"
  | "Pago en revisión"
  | "A resolver"
  | "En preparación"
  | "En camino"
  | "Pedido entregado"
  | "Completado";

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

export interface Pedido {
  id: string | number;
  numeroPedido?: number;

  fechaSeleccion?: string; // <-- para mostrar "hace X minutos" o fecha exacta, ver con LIO

  estado: EstadoPedidoActual;
  rubros?: string[];
  textoPedido: string;

  respuestasRecibidas?: number;
  duracionCronometro?: number;
  direccionComprador: string;

  formaPago?: "transferencia" | "efectivo";

  problemaPago?: {
    comprobante: boolean;
    direccion: boolean;
  };

  respuestas?: Respuesta[];
  respuestaSeleccionada?: Respuesta;
  expandido?: boolean;

  fechaConfirmacion?: string;
  telefono?: string;
}
