import { products } from '@/store/products.store';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

const ProductScreen = () => {
    const {id} = useLocalSearchParams();
    const navigation = useNavigation();

    // const product = products.find((p)=> p.id == id);
    const product = products.find((p)=> p.id === Number(id));


    useEffect(() => {
      navigation.setOptions({         //cambiaremos -si tiene- el título x product.title y si no tiene, pondremos "Producto"
        title: product?.title ?? 'Producto',
      });
     }, [product, navigation]);

    if (!product) {
      return <Redirect href='/' />;
    }  

  return (
    <View className = "px-5 mt-">
      <Text className="font-work-black text-2xl">{product.title}</Text>
      <Text>{product.description}</Text>
      <Text className="font-work-black">{product.price}</Text>
    </View>
  );
};


export default ProductScreen