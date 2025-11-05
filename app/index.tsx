import { Redirect } from "expo-router";

// import React from 'react';
// import { View } from 'react-native';
// import CardPedidoEnEspera from '../components/Comprador/CardPedidoEnEspera';
// import { Spacing } from "../constants/Tokens";
// import Cronometro from "../components/Cronometro/Cronometro";

const App = () => {
  return <Redirect href={"/(auth)/login" as any} />;

  // return (
  //   <View  style={{
  //             flex: 1,
  //             paddingHorizontal: Spacing.xl,
  //             maxWidth: 500,
  //             width: "100%",
  //             alignSelf: "center",
  //             backgroundColor: "whitesmoke"
  //             }}>
              
  //     <CardPedidoEnEspera id={''} numeroPedido={0} estado={'En Proceso'} duracionCronometro={0} />
  //   </View>
  // );
}

export default App;
