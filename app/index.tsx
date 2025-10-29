
import { Redirect } from "expo-router";


// import React from 'react';
// import { View } from 'react-native';
// import Cronometro from "../components/Cronometro/Cronometro";

const App = () => {
  return <Redirect href={"/(auth)/login" as any} />;

  // return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Cronometro tipo="espera" duracionInicial={60000} />
    // </View>
  // );
}

export default App;
