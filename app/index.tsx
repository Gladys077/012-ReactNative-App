
// import { Redirect } from "expo-router";
import CardPedidoEnEspera from "../components/Comprador/CardPedidoEnEspera";


// import React from 'react';
import { View } from 'react-native';
import { Spacing } from "../constants/Tokens";
// import Cronometro from "../components/Cronometro/Cronometro";

const App = () => {
  // return <Redirect href={"/(auth)/login" as any} />;

  return (
    <View  style={{
              flex: 1,
              paddingHorizontal: Spacing.xl,
              maxWidth: 500,
              width: "100%",
              alignSelf: "center",
              backgroundColor: "whitesmoke"
              }}>
              
      <CardPedidoEnEspera />
    </View>
  );
}

export default App;
