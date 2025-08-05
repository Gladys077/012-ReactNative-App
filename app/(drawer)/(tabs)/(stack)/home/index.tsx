import CustomButton from '@/components/shared/CustomButton'
import { DrawerActions } from '@react-navigation/native'
import { Link, router, useNavigation } from 'expo-router'
import React from 'react'
import { SafeAreaView, View } from 'react-native'

const HomeScreen = () => {

    const navigation = useNavigation();

    const onToggleDrawer = () => {
      navigation.dispatch( DrawerActions.toggleDrawer );
    }



  return (
    <SafeAreaView  className="flex-1"> 
      <View  className="pt-16 px-10">


        <CustomButton 
          className='mb-2'
          color='primary' onPress={() => router.push('/products')}>    
            Productos 
        </CustomButton>

        <CustomButton
          onPress={() => router.push('/profile')}
          className='mb-2'
          color="secondary"
        >    
            Profile 
        </CustomButton>
        
        <CustomButton
          onPress={() => router.push('/settings')}
          className='mb-2'
          color="terciary"
        >    
            Ajustes 
        </CustomButton>


        <Link href="/products" asChild>   
          <CustomButton  variant="text-only" className='mb-10' color='primary'>
            Productos
          </CustomButton>
        </Link>

        <CustomButton onPress={onToggleDrawer}>Abrir menú</CustomButton>

        {/* <Link className="mb-5" href="/products">
          Productos{' '}  
        </Link>
        <Link className="mb-5" href="/profile">
          Perfil{' '}
        </Link>
        <Link className="mb-5" href="/settings">
          Ajustes{' '}
        </Link> */}

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen