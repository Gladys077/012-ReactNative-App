import CardPedidoPagar from "@/components/Comprador/CardPedidoPagar";
import CardPedidoVerRespuestas from "@/components/Comprador/CardPedidoVerRespuestas";
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useBottomSheetVerPedido } from "@/context/BottomSheetVerPedidoContext";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  Vibration,
  View,
} from "react-native";
import CardPedidoEnProceso from "../../components/Comprador/CardPedidoEnProceso";

// Tipado básico
export type EstadoPedidoActual =
  | "En proceso"
  | "Ver respuestas"
  | "Pagar"
  | "Pago en revisión"
  | "En preparación"
  | "En camino"
  | "Pedido entregado"
  | "Completado";

// Estructura general del pedido
interface Pedido {
  id: number;
  numeroPedido: number;
  estado: EstadoPedidoActual;
  respuestasRecibidas?: number;
  duracionCronometro?: number;
  textoPedido: string;
  respuestas?: Respuesta[];
  expandido?: boolean;
  respuestaSeleccionada?: Respuesta;
}

// Estructura de las respuestas de vendedores
interface Respuesta {
  id: string | number;
  vendedorNombre: string;
  rating: number;
  precio: number;
  nota?: string;
  duracionCronometro: number;
}

// COMPONENTE PRINCIPAL 

const EstadoPedido = () => {
  const { colors } = useTheme();
  const { openBottomSheetVerPedido } = useBottomSheetVerPedido();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  

  // TODO: VER CON LIO: Implementar fetch real a la API
  // useEffect(() => {
    // SECCIÓN: Fetch real (API)
    //-------------------------
    /*
    const fetchPedidos = async () => {
      try {
        const response = await fetch("https://tu-api.com/pedidos");
        const data: Pedido[] = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      } 
    };

    fetchPedidos();
    */
    // -------------------------
    // FIN FETCH REAL (API)
    //-------------------------


    // ------------ Simulación de datos locales (mock) --------------
    useEffect(() => {
      const mockData: Pedido[] = [
        {
          id: 1,
          numeroPedido: 2548,
          estado: "En proceso",
          respuestasRecibidas: 0,
          duracionCronometro: 60,
          textoPedido: `3 paltas (una madura y dos para comer ahora)
          1 kilo de pan casero integral
          1 litro de leche descremada`,
        },
        {
          id: 2,
          numeroPedido: 2552,
          estado: "Ver respuestas",
          respuestasRecibidas: 2,
          duracionCronometro: 30,
          textoPedido: `Revisión de cañerías del baño. 
  Traer soplete y materiales básicos.`,
          respuestas: [
            {
              id: "v1",
              vendedorNombre: "Minimarket Juan",
              rating: 4.0,
              precio: 4500,
              nota: "Puedo ir mañana temprano. El precio no incluye materiales si hubiera que cambiar algo.",
              duracionCronometro: 45,
            },
            {
              id: "v2",
              vendedorNombre: "Tienda María",
              rating: 4.5,
              precio: 4250,
              nota: undefined,
              duracionCronometro: 30,
            },
          ],
          expandido: false,
        },
        {
          id: 3,
          numeroPedido: 2556,
          estado: "Pagar",
          respuestasRecibidas: 0,
          duracionCronometro: 30,
          textoPedido: `200 Sandwichs de miga de jamón y queso`,
          respuestaSeleccionada: { 
            id: "v3",
            vendedorNombre: "Sandwichería Express",
            rating: 4.8,
            precio: 25000,
            duracionCronometro: 0,
        }
        },
      ];

      setTimeout(() => {
      setPedidos(mockData);
      setLoading(false);
    }, 800); // Simula delay de red
  }, []);

  // ------> HANDLERS <------
  const handleVerPedido = (id: number) => {
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) return;
    
    openBottomSheetVerPedido({
      numeroPedido: pedido.numeroPedido,
      items: [{ id: "texto", label: pedido.textoPedido }],
    });
  };

// Btn para cancelar el pedido completo (perdería todas las respuestas de los vendedores)
  const handleCancelarPedido = (id: number | string) => {
    Vibration.vibrate(300);
    Alert.alert(
      "Cancelar pedido",
      "¿Querés cancelar este pedido?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          style: "destructive",
          onPress: () => confirmarCancelacion(id),
        },
      ],
      { cancelable: true }
    );
  };

  const confirmarCancelacion = (id: number | string) => {
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
    console.log(`Pedido ${id} cancelado correctamente`);
  };

  //este lo uso con el componente CardPedidoEnProceso
  const handleFinishCronometro = (id: number | string) => {
    console.log(`El cronómetro del pedido ${id} finalizó.`);
  };

  const handleAceptarRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number
  ) => {
    console.log(`Pedido ${pedidoId}: Respuesta ${respuestaId} aceptada`);

    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === pedidoId) {
          const respuestaSeleccionada = pedido.respuestas?.find(
            (r) => r.id === respuestaId
          );
          return {
            ...pedido,
            estado: "Pagar",
            respuestaSeleccionada,
          };
        }
        return pedido;
      })
    );
  };


// Handler para cuando el comprador cancela una respuesta específica
  const handleCancelarRespuesta = (
    pedidoId: number | string, 
    respuestaId: string | number
  ) => {


    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === pedidoId && pedido.respuestas) {
           const nuevasRespuestas = pedido.respuestas.filter((r) => r.id !== respuestaId);

          return {
            ...pedido,
            respuestas: nuevasRespuestas,
          respuestasRecibidas: nuevasRespuestas.length,
          };
        }
        return pedido;
      })
    );
    console.log(`Pedido ${pedidoId}: Respuesta ${respuestaId} cancelada`);
        // return updated;

  };

  // Confirma antes de cancelar una respuesta de un vendedor
  const confirmarCancelarRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number
  ) => {

    Vibration.vibrate(100);

   Alert.alert(
    "Cancelar respuesta",
    "¿Estás segura de cancelar esta respuesta?",
    [
      { text: "No", style: "cancel" },
      { text: "Sí", 
        style: "destructive", // Para que se vea rojo
        onPress: () => handleCancelarRespuesta(pedidoId, respuestaId) },
    ]
  );
};


  // Handler para ver la nota del vendedor (abre bottom sheet)
  const handleVerNota = (nota: string) => {
    // TODO: Crear un bottom sheet específico para mostrar la nota o dejo el Alert?
    Alert.alert("Nota del vendedor", nota); // Temporal, reemplazar con bottom sheet
  };

  const handleFinishCronometroRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number
  ) => {
    console.log(
      `Pedido ${pedidoId}: El cronómetro de la respuesta ${respuestaId} finalizó`
    );
  };

  
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.brandBuyer} />
      </View>
    );
  }


  const toggleExpandido = (pedidoId: number | string, valor: boolean) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === pedidoId ? { ...p, expandido: valor } : p))
    );
  };


  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: Spacing.md,
          paddingTop: Spacing.xl,
          gap: Spacing.xxl,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => {
            switch (pedido.estado) {
              case "Ver respuestas":
                return (
                    <CardPedidoVerRespuestas
                      key={pedido.id}
                      id={pedido.id}
                      numeroPedido={pedido.numeroPedido}
                      cantidadRespuestas={pedido.respuestas?.length || 0}
                      estado="Ver respuestas"
                      expandido={pedido.expandido || false}
                      onToggleExpandir={(valor) => toggleExpandido(pedido.id, valor)} 
                      onVerPedido={handleVerPedido}
                      // onCancelarPedido={handleCancelarPedido}
                      respuestas={pedido.respuestas}
                      onAceptarRespuesta={handleAceptarRespuesta}
                      onCancelarRespuesta={confirmarCancelarRespuesta}
                      onVerNota={handleVerNota}
                      onFinishCronometro={handleFinishCronometroRespuesta}
                    />
                );

              case "Pagar":
                return (
                  <CardPedidoPagar
                    key={pedido.id}
                    id={pedido.id}
                    numeroPedido={pedido.numeroPedido}
                    estado={pedido.estado}
                    monto={pedido.respuestaSeleccionada?.precio}
                    onVerPedido={handleVerPedido}
                  />
                );

              case "En proceso":
              default:
                return (
                  <CardPedidoEnProceso
                    key={pedido.id}
                    id={pedido.id}
                    numeroPedido={pedido.numeroPedido}
                    estado="En proceso"
                    respuestasRecibidas={pedido.respuestasRecibidas}
                    duracionCronometro={60}
                    onVerPedido={() => handleVerPedido(pedido.id)}
                    onCancelarPedido={() => handleCancelarPedido(pedido.id)}
                    onFinishCronometro={() =>
                      handleFinishCronometro(pedido.id)
                    }
                  />
                );
            }
          })
        ) : (
          <Text
            style={{
              color: colors.textMuted,
              fontSize: FontSizes.md,
              textAlign: "center",
              marginTop: Spacing.xl,
            }}
          >
            No tenés pedidos activos por el momento.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default EstadoPedido;
