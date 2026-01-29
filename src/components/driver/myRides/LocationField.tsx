import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LocationFieldComponent({
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
        <Text className="text-gray-900 font-poppins flex-1" numberOfLines={1}>
          {value || "Select location"}
        </Text>
        <Ionicons name="map" size={20} color="#00ABB0" />
      </TouchableOpacity>
    </View>
  );
}
