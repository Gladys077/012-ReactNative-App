// components/Label/Label.tsx
import { Text, View } from "react-native";

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  icon?: React.ReactNode;
  subtext?: string;
  className?: string;
}

export default function Label({
  children,
  required = false,
  icon,
  subtext,
  className = "",
}: LabelProps) {
  return (
    <View className={`flex flex-col mt-4 ${className}`}>
      <View className="flex-row items-center gap-1">
        <Text className="text-sm text-gray-800 font-medium">
          {children}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
        {icon && <View className="ml-1">{icon}</View>}
      </View>
      {subtext && (
        <Text className="text-xs text-gray-500 mt-1 leading-4">
          {subtext}
        </Text>
      )}
    </View>
  );
}
