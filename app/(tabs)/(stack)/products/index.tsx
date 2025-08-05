import { products } from '@/store/products.store';
import { Link } from 'expo-router';
import { FlatList, Text, View } from 'react-native';


const ProductsScreen = () => {
  return (
    <View className='flex flex-1 px-4 mt-15 mx-5'>
      <FlatList 
        data={products}  //aquí estoy llamando a los prod q guardé en la carp store
        keyExtractor={(item) => item.id.toString()} //Le dice a FlatList cómo identificar cada item y ayuda a react a optimizar el renderizado. usualmente son string, pero si no lo son, hay que agregar .ToString 
      //en renderItem, hay que desestructurar el item:
        renderItem={({ item })=> (
          <View className="mt-10">
            <Text className='text-2xl font-work-black'>{item.title}</Text>
            <Text className=''>{item.description}</Text>

            <View className="flex flex-row justify-between mt-2">
              <Text className="font-work-black">{item.price}</Text>
              <Link 
                href={`/products/${item.id}`}
                className="text-primary">
                Ver detalles
              </Link>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default ProductsScreen