import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'

const CustomDrawer = (props: DrawerContentComponentProps) => { //las props estaban en drawerContent (dentro de _layout.tsx)
  return (
    <DrawerContentScrollView
    {...props}          //así las disperso, ahora tendrá las mismas funcionalidades que están en <Drawer /> en _layout.tsx 
    scrollEnabled={false}
    >
      <View className="flex justify-center items-center mx-3 p-10 mb-10 h-[150px] rounded-xl bg-primary">
        <View className="flex justify-center items-center rounded-full bg-white h-24 w-24">
            <Text className="text-primary font-work-black text-3xl">FH</Text>
        </View>
      </View>

      {/* DrawerItems */}
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  )
}

export default CustomDrawer
