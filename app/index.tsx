
import { Redirect } from "expo-router";
// import PerfilScreen from "./(preAuth)/perfil";


const App = () => {
  return <Redirect href={"/(auth)/login" as any} />;
  // return PerfilScreen();
 
}

export default App