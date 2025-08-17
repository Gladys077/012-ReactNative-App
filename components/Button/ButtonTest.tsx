import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Historial, Home, PendientesMenuVendedor } from '../icons';
import Button from './Button';
import ButtonGoogle from './ButtonGoogle';

// Mock icon para pruebas
// const MockIcon = ({ height, width, color }: { height?: number; width?: number; color?: string }) => (
//   <View 
//     style={{ 
//       width: width || 20, 
//       height: height || 20, 
//       backgroundColor: color || '#666',
//       borderRadius: 2 
//     }} 
//   />
// );

export const ButtonTest = () => {
  function onLogin(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <Text className="text-2xl font-bold text-center mb-6 text-gray-800">
        Button Component Test
      </Text>

      {/* Primary Buttons por Sección */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          🎯 Primary Buttons por Sección
        </Text>
        
        <View className="space-y-3">
          <Button section="seller" onPress={() => console.log('Seller')}>
            Seller Button
          </Button>
          
          <Button section="buyer" onPress={() => console.log('Buyer')}>
            Buyer Button
          </Button>
          
          <Button section="common" onPress={() => console.log('Common')}>
            Common Button
          </Button>
        </View>
      </View>

      {/* Secondary y Google */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          🎨 Variantes
        </Text>
        
        <View className="space-y-3">
          <Button variant="secondary">
            Secondary Button
          </Button>
          
        <ButtonGoogle onLogin={onLogin}>
            Sign in with Google
          </ButtonGoogle>
        </View>
      </View>

      {/* Alturas */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          📏 Alturas
        </Text>
        
        <View className="space-y-3">
          
          <Button height="md" section="buyer">
            Medium (40px)
          </Button>
          
          <Button height="lg" section="common">
            Large (48px)
          </Button>
          
        </View>
      </View>

      {/* Anchos */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          ↔️ Anchos
        </Text>
        
        <View >
          <Button width="auto" section="seller">
            Auto Width
          </Button>
          
          <Button width="half" section="buyer">
            Half Width
          </Button>
          
          <Button width="full" section="common">
            Full Width
          </Button>
        </View>
      </View>

      {/* Con Iconos */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          🎯 Con Iconos
        </Text>
        
        <View className="space-y-3">
          <Button 
            section="seller" 
            icon={Home}
            iconPosition="left"
          >
            Icon Left
          </Button>
          
          <Button 
            section="buyer" 
            icon={Historial}
            iconPosition="right"
          >
            Icon Right
          </Button>
          
          <Button 
            variant="secondary" 
            icon={PendientesMenuVendedor}
          >
            Secondary + Icon
          </Button>
          
          <ButtonGoogle onLogin={function (): void {
            throw new Error('Function not implemented.');
          } }>
            {/* <Home width={24} height={24} /> */}
          
            Google + Icon
          </ButtonGoogle>
        </View>
      </View>

      {/* Estados */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          🚫 Estados
        </Text>
        
        <View className="space-y-3">
          <Button section="seller" disabled>
            Disabled Primary
          </Button>
          
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
          
          <ButtonGoogle onLogin={function (): void {
            throw new Error('Function not implemented.');
          } }>
            Disabled Google
          </ButtonGoogle>
        </View>
      </View>

      {/* Comparación lado a lado */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          ⚖️ Comparación
        </Text>
        
        <View className="w-full flex-row">
          <View className="flex-1 mr-2">
            <Button width= "auto" section="seller">
              Seller
            </Button>
          </View>
          <View className="flex-1 mr-2">
            <Button width="auto" section="buyer">
              Buyer  
            </Button>
          </View>
        </View>
        
        <View className="w-full flex-row mt-3 mb-4 space-x-2">
          <View className="flex-1 mr-2">
            <Button width="auto" variant="secondary">
              Secondary
            </Button>
          </View>
          <View className="flex-1 mr-2">
              <Button width= "auto" section="seller">
                Seller
              </Button>
            </View>
          </View>


          <ButtonGoogle onLogin={function (): void {
            throw new Error('Function not implemented.');
          } } >
            Google
          </ButtonGoogle>
       
      </View>

      {/* Test de presión */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">
          👆 Test Interacción (presiona para ver efectos)
        </Text>
        
        <Button 
          section="common"
          onPress={() => console.log('Button pressed!')}
        >
          Press Me!
        </Button>
      </View>

    </ScrollView>
  );
};