
import { Redirect } from "expo-router";
// import TestSelectRubros from "../--tests--/components/SelectRubrosVendedorTest";
// import PerfilScreen from "./(preAuth)/perfil";

// import AjustesVendedorScreen from "./(vendedor)/ajustesVendedor";

// import ElegirRolScreen from "./(auth)/elegirRol";
// import AjustesCompradorScreen from "./comprador/ajustesComprador";


const App = () => {
  return <Redirect href={"/(auth)/login" as any} />;
  // return <AjustesCompradorScreen/>;
}

export default App