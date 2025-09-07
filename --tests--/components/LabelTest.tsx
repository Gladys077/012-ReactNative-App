import { View } from "react-native";
import { EditPencil } from "../../components/icons";
import Label from "../../components/UI/Label";

export default function LabelTest() {
  return (
    <View className="flex-1 justify-center items-start p-6 bg-background-default">
      {/* Label simple */}
      <Label>Email</Label>

      {/* Label requerido */}
      <Label required>Password</Label>

      {/* Label con subtexto */}
      <Label subtext="Debe tener al menos 8 caracteres">Password</Label>

      {/* Label con ícono y requerido */}
      <Label
        required
        icon={<EditPencil width={16} height={16} color="gray" />}
        subtext="Debe ser un email válido"
      >
        Email
      </Label>
    </View>
  );
}
