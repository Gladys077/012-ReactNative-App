
// import { Redirect } from "expo-router";
import EtiqEstadoDelPedido from "../components/EtiqEstadoDelPedido";


const App = () => {
  // return <Redirect href={"/(auth)/login" as any} />;
  return <EtiqEstadoDelPedido estado={"Pago Pendiente"}/>;
}

export default App