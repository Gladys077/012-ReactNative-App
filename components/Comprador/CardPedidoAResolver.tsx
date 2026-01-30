import CardPedidoBase from "@/components/Comprador/CardPedidoBase";
import React, { useState } from "react";
import { View } from "react-native";
import { Spacing } from "../../constants/Tokens";

import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardErrorPagoDireccion from "./CardErrorPagoDireccion";

type FormaPago = "transferencia" | "efectivo";


interface CardPedidoAResolverProps {
  pedidoId: string | number;
  respuestaId: string | number;
  numeroPedido: number;

  nombreNegocio: string;
  rating: number;
  precio: number;
  alias: string;
  entidad: string;
  titular: string;
  direccion: string;
  nota?: string;

  formaPagoInicial: FormaPago;
  
  problemaPago: {
    comprobante: boolean;
    direccion: boolean;
  };

  onVerPedido?: (id: string | number) => void;
  onVerNota?: (nota: string) => void; 
}

export default function CardPedidoAResolver({
  pedidoId,
  respuestaId,
  numeroPedido,
  precio,
  nombreNegocio,
  rating,
  alias,
  entidad,
  titular,
  direccion,
  nota,
  formaPagoInicial,
  problemaPago,
  onVerPedido,
  onVerNota,
}: CardPedidoAResolverProps) {
     const [expandido, setExpandido] = useState(false);

  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado="A resolver"
      expandido={expandido} 
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
      textoMostrar="Mostrar detalle"
      textoOcultar="Ocultar detalles"
      mostrarMascota
      mascotaMensaje="Revisa el mensaje del vendedor y elige qué quieres hacer."
      mascotaVariante="attention"
      mostrarDivisor
      elevation={expandido ? 0 : 5}
      contenidoExpandible={
        <View style={{ marginTop: Spacing.lg }}>
          <CardErrorPagoDireccion
            pedidoId={pedidoId}
            respuestaId={respuestaId}
            nombreNegocio={nombreNegocio}
            rating={rating}
            precio={precio}
            nota={nota}
            alias={alias}
            entidad={entidad}
            titular={titular}
            direccion={direccion}
            formaPagoInicial={formaPagoInicial}
            problemaPago={problemaPago}
            onVerPedido={() => onVerPedido?.(pedidoId)}
            onVerMensajes={() => {
              console.log("Abrir chat comprador ↔ vendedor");
            }}
            onVerNota={(nota) => onVerNota?.(nota)}
            onEnviarCorreccion={(data) => {
              console.log("Corrección enviada:", data);
            }}
            onCancelarPedido={() => {
              console.log("Cancelar pedido", pedidoId);
            }}
            
          />
        </View>
      }

        >
      {/* Línea de tiempo */}
            <LineaEstadoPedido estadoActual="Verificacion" />
      
      
    </CardPedidoBase>
  );
}
