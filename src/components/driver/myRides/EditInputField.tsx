import { Text, TextInput, View } from "react-native";

interface EditInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "number-pad" | "decimal-pad" | "default";
}

export default function EditInputField({
  label,
  value,
  onChangeText,
  keyboardType = "default",
}: EditInputFieldProps) {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-poppinsSemiBold text-sm mb-2">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType as any}
        className="border border-gray-300 rounded-lg p-3 text-gray-900 font-poppins"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}
