import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import { DeleteButton } from "../subcomponentes/DeleteButton";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import RespuestasRecibidas from "../subcomponentes/RespuestasRecibidas";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import LineaDivisoria from "../UI/LineaDivisoria";

interface CardPedidoEnProcesoProps {
  pedidoId: string | number;
  estado: EtiqEstadoType;
  respuestasRecibidas?: number;
  duracionCronometro: number; // en minutos
  onFinishCronometro?: () => void;
  onCancelarPedido: () => void;
  onVerPedido?: (id: string | number) => void;
}

export default function CardPedidoEnProceso({
  pedidoId,
  estado,
  respuestasRecibidas = 0,
  duracionCronometro,
  onFinishCronometro,
  onCancelarPedido,
  onVerPedido,
}: CardPedidoEnProcesoProps) {
  const { colors, fonts } = useTheme();
  const frase =
    "Pasado este tiempo si no recibe respuesta, se eliminará el pedido.";

  return (
    <CardPedidoBase estado="En proceso" elevation={5}>
      {/* Respuestas recibidas (si hay) */}
      {respuestasRecibidas > 0 && (
        <RespuestasRecibidas cantidad={respuestasRecibidas} />
      )}

      {/* Cronómetro + texto */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "center",
          marginTop: 4,
          gap: 16,
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Cronometro
            id={`pedido_${pedidoId}`}
            tipo="espera"
            duracionInicial={duracionCronometro}
            onFinish={onFinishCronometro}
          />

          <Text
            style={{
              flex: 1,
              fontFamily: fonts.robotoRegular,
              fontSize: FontSizes.sm,
              color: colors.textDefault,
              marginBottom: 6,
              textAlign: "left",
            }}
          >
            {frase}
          </Text>
        </View>
      </View>

      {/* Linea Divisoria */}
      <LineaDivisoria />

      {/* Ver pedido + Botón cancelar */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: Spacing.sm,
        }}
      >
        <VerBottomSheet icon={null} onPress={() => onVerPedido?.(pedidoId)} />

        {/* Remover card */}
        <DeleteButton onPress={onCancelarPedido} />
      </View>
    </CardPedidoBase>
  );
}

//MODO DE USO:
{
  /* <CardPedidoEnProceso
          key={pedido.id}
          pedidoId={pedido.id}
          numeroPedido={pedido.numeroPedido}
          estado="En proceso"
          respuestasRecibidas={pedido.respuestasRecibidas}
          duracionCronometro={60}
          onVerPedido={() => handleVerPedido(pedido.id)}
          onCancelarPedido={() => handleCancelarPedido(pedido.id)}
          onFinishCronometro={() =>
          handleFinishCronometro(pedido.id)
          }
        />*/
}
