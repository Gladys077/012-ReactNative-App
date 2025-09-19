import { View } from "react-native";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

const Ajustes = () => {
  return (
    <View className="flex-1">
      <Header title="Ajustes" showBackArrow />
      {/* Contenido */}
      
      <Footer /> 
      {/* Footer dinámico según rol */}
      
    </View>
  );
}

export default Ajustes;