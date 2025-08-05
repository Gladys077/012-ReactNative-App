import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Stack, useNavigation, useRouter } from 'expo-router';

const StackLayout = () => {

    const navigation = useNavigation();
    const router = useRouter();

    const onHeaderLeftClick = (canGoBack: boolean) => {

        if (canGoBack) {
            // navigation.dispatch(StackActions.pop()); //si puedo regresar a la pág. anterior entonces usa el navigation.dispatch
            router.back();      //puse esta, porque .dispatch no me funcionaba.
            return;
        }

        navigation.dispatch(DrawerActions.toggleDrawer); //sino, viene aquí
    };

  return (
    <Stack      //al ponerlo las opciones a este "nivel", se aplicará a todas las pantallas
        screenOptions = {{ 
            // headerShown: false,     //oculta el header con "true"
            headerShadowVisible: false,  //quita la sombra del bg del header
            contentStyle: {
                backgroundColor: 'white',   //dentro del contentStyle modif. el estilo
            },
            headerLeft: ({ tintColor, canGoBack }) => (
                <Ionicons 
                    name={ canGoBack ? 'arrow-back-outline' : "grid-outline" }
                    className="mr-5" 
                    size={20}
                    // onPress={ () => onHeaderLeftClick(!!canGoBack) }
                    onPress={ () => onHeaderLeftClick(!!canGoBack) }
                />
            ),
        
        }}          
    >
        <Stack.Screen 
            name='home/index'
            options={{
                title: 'Inicio'
            }}
        />

        <Stack.Screen 
            name='products/index'
            options={{
                title: 'Productos',
            }}
        />

        <Stack.Screen 
            name='profile/index'
            options={{
                title: 'Perfil'
            }}
        />

        <Stack.Screen 
            name='settings/index'
            options={{
                title: 'Ajustes'
            }}
        />


    </Stack> 
  )
}

export default StackLayout;