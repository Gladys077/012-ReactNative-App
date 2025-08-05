import { Pressable, PressableProps, Text } from 'react-native';

interface Props extends PressableProps { //extiendo las props desde PressableProps que tomo de ReactNative (así mi componente aceptará todas las props de PressableProps)
    children: string;
    color?: 'primary' | 'secondary' | 'terciary' //estoy restringiendo el valor de color a uno de esos tres strings exactos
    variant?: 'contained' | 'text-only';
    className?: string;
}

const CustomButton = ({ 
        children, 
        color= 'primary', 
        onPress, 
        onLongPress, 
        variant = 'contained',
        className,
    }: Props) => { //aquí desestructuré las props, al hacerlo ya puedo usarlo y agregué ": Props" para que las props que llgan cumplan con esa forma exacta
        const btnColor={
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            terciary: 'bg-terciary',
    }[color]; //[color] = busca en ese objeto la propiedad que tenga el mismo nombre de color.

        const textColor={
            primary: 'text-primary',
            secondary: 'text-secondary',
            terciary: 'text-terciary',
        }[color];

    if (variant === 'text-only'){
        return (
            <Pressable 
                className= {`p-3 ${className}`}
                onPress={onPress}
                onLongPress={onLongPress}    
            >
                <Text className={`text-center ${textColor} font-work-black`}>{ children }</Text>
            </Pressable>
        )
    }


  return (
    <Pressable 
        className= {`p-3 rounded-full ${btnColor} active:opacity-90  ${className}`}
        onPress={onPress}
        onLongPress={onLongPress}    
    >
        <Text className="text-white text-center">
            { children }

        </Text>
    </Pressable>
  )
}

export default CustomButton