import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View className="py-12 items-center justify-center">
      <Ionicons name="calendar-outline" size={56} color="#D1D5DB" />
      <Text className="text-gray-400 font-poppins mt-4 text-base text-center">
        {title}
      </Text>
      <Text className="text-gray-300 font-poppins mt-2 text-xs text-center px-4">
        {message}
      </Text>
    </View>
  );
}
