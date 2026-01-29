import { Text, View } from "react-native";

export default function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1">
      <Text className="text-gray-600 font-poppins text-xs mb-1">{label}</Text>
      <Text className="text-gray-900 font-poppinsSemiBold text-sm">
        {value}
      </Text>
    </View>
  );
}
