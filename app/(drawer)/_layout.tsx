import CustomDrawer from '@/components/shared/CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
  return  (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        // headerShown: false, //para que no muestre el titulo
        overlayColor: 'rgba(105,105,255,0.5)', //cubre el resto de la pantalla que no sea ocupado por el menú
        drawerActiveTintColor: 'indigo',  //color del item activo
        headerShadowVisible: false, //quita la linea de base del header
        sceneStyle: { //maneja el estilo del main
          backgroundColor: 'white',

        },
      }}
    >
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            headerShown: false,
            drawerLabel: 'Tabs + Stack',
            title: 'Tabs + Stack',
            
            drawerIcon:({color, size})=>(
              <Ionicons name = "albums-outline" size= {size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="user/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'User',
            title: 'Usuario',
            
            drawerIcon:({color, size})=>(
              <Ionicons name = "person-circle-outline" size= { size } color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="schedule/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Horario',
            title: 'Horario',
            drawerIcon:({color, size})=>(
              <Ionicons name = "calendar-outline" size= { size } color={color} />
            )
          }}
        />
      </Drawer>
)
}

export default DrawerLayout
