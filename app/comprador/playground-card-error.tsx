import { useState } from "react";
import { ScrollView } from "react-native";
import CardErrorPagoDireccion from "../../components/Comprador/CardErrorPagoDireccion";


export default function PlaygroundCardErrorPago() {
  const [problema, setProblema] = useState<
    "comprobante" | "direccion" | "ambos"
  >("comprobante");

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <CardErrorPagoDireccion
        pedidoId={123}
        respuestaId={456}
        nombreNegocio="Minimarket Juan"
        rating={4.0}
        precio={4150}
        nota="El comprobante no coincide con el importe."
        duracionCronometro={3600}
        timestampRespuesta={Date.now()}
        alias="minimarket.mp"
        entidad="Mercado Pago"
        titular="Juan Pérez"
        direccion="Av. Corrientes 1234, 2H CABA"
        problema={problema}
        onVerPedido={() => console.log("Ver pedido")}
        onVerMensajes={() => console.log("Abrir mensajes")}
        onVerNota={(nota) => console.log("Nota:", nota)}
        onFinishCronometro={(p, r) =>
          console.log("Cronómetro finalizado", p, r)
        }
        onEnviarCorreccion={(data) =>
          console.log("Corrección enviada:", data)
        }
        onCancelarPedido={() => console.log("Pedido cancelado")}
      />
    </ScrollView>
  );
}
