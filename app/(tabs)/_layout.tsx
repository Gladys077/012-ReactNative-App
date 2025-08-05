import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs 
      screenOptions={{ 
          tabBarActiveTintColor: 'indigo',   //da color a los items del tab (footer Nav)
          // headerShown: false,               //oculta el header
          // tabBarStyle: {
          //   backgroundColor: 'black'         //da color al bg del tabBar (footer Nav)
          // },
          // tabBarActiveBackgroundColor: 'indigo' ,  //da otro color al item activo
      }}>
      <Tabs.Screen
        name="(stack)"
        options={{
          title: 'Stack',
          headerShown: false,  
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />
      
      <Tabs.Screen   
        name="favorites/index"
        options={{
          title: 'favoritos',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="star-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout