import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function DateFieldComponent({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-poppinsSemiBold text-sm mb-2">
        {label}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        className="border border-gray-300 rounded-lg p-3 flex-row items-center justify-between"
      >
        <Text className="text-gray-900 font-poppins flex-1">
          {value || "Select date"}
        </Text>
        <Ionicons name="calendar" size={20} color="#00ABB0" />
      </TouchableOpacity>
    </View>
  );
}
