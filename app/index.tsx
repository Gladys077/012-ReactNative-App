import { Redirect } from "expo-router";

//SafeAreaView: para que el contenido aparezca en el área de visión segura del celu
//en la línea 10 muestra una manera de aplicar el fontFamily, pero después muestra la manera ideal con nativeWind


const App = () => {
  // return <Redirect href="/(stack)/home" />
  // return <Redirect href="/tabs" />;
  // return <Redirect href="/drawer" />;
  return <Redirect href="/home" />;

  // return (
  //   <SafeAreaView> 
  //     <View className="mt-10 mx-5">
  //       <Text className="text-5xl" style={{fontFamily: "WorkSans-Black"}}>Hola Mundo</Text> 

  //       <Text className="text-4xl text-primary font-work-black">Hola Mundo</Text>

  //       <Text className="text-3xl text-secondary font-work-medium">Hola Mundo</Text>

  //       <Text className="text-2xl text-secondary-100 font-work-light">Hola Mundo</Text>

  //       <Text className="text-xl text-terciary">Hola Mundo</Text>

  //   <Link href='/products'>Productos</Link>

  //     </View>
  //   </SafeAreaView>
  // )
}

export default App