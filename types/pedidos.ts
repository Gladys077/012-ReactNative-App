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
  precio: number;
  nota?: string;
  duracionCronometro?: number;
}

export interface Pedido {
  id: string | number;
  numeroPedido: number;
  direccionComprador: string;
  estado: EstadoPedidoActual;
  textoPedido: string;

  respuestasRecibidas?: number;
  duracionCronometro?: number;
  
  respuestas?: Respuesta[];
  respuestaSeleccionada?: Respuesta;

  formaPago?: "transferencia" | "efectivo";

  // SOLO cuando estado === "A resolver"
  problemaPago?: {
    comprobante: boolean;
    direccion: boolean;
  };

  expandido?: boolean;

}
