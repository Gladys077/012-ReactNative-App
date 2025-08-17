
import { Pressable, Text, View } from 'react-native';
import { BorderRadius } from '../../constants/Tokens';
import { GoogleLogoColor } from '../icons';

interface ButtonGoogleProps {
  onLogin: () => void;
  children?: string;
}

const ButtonGoogle = ({  onLogin, children = "Sign in with Google" }: ButtonGoogleProps) => {
  return (
    <Pressable
      onPress={onLogin}
      className="w-full flex-row items-center justify-center px-4 h-14 bg-google-bg border border-google-border shadow-md"
      style={{ borderRadius: BorderRadius.pillBtn }}
    >
      <View className="flex-row items-center justify-center gap-2">
        <GoogleLogoColor height={20} />
        <Text className="font-medium text-google-text">{children}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonGoogle;
