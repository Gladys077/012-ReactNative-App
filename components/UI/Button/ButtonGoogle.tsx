
import { BorderRadius } from '@/constants/Tokens';
import { useTheme } from '@/context/ThemeContext';
import { Pressable, Text, View } from 'react-native';
import { GoogleLogoColor } from '../../icons';

interface ButtonGoogleProps {
  onLogin: () => void;
  children?: string;
}

const ButtonGoogle = ({  onLogin, children = "Sign in with Google" }: ButtonGoogleProps) => {
    const { colors } = useTheme(); 

  return (
    <Pressable
      onPress={onLogin}
      className="w-full flex-row items-center justify-center px-4 h-14 border shadow-md"
      style={{ 
        borderRadius: BorderRadius.pillBtn, 
        borderWidth: 1, 
        borderColor: colors.border, 
      }}
    >
      <View className="flex-row items-center justify-center">
        <GoogleLogoColor height={20} className="mx-2"/>
        <Text className="font-medium"
        style={{color: colors.textDefault}}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonGoogle;
