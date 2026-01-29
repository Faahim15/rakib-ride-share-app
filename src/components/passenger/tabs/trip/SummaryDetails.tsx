import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface SummaryDetailsProps {
  title: string;
  subtitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export default function SummaryDetails({
  title,
  subtitle,
  iconName,
}: SummaryDetailsProps) {
  return (
    <View className="flex-row justify-between items-center mb-3">
      <View className="flex-row items-center">
        <Ionicons
          name={iconName}
          size={20}
          color="#4DB8B8"
          style={{ marginRight: 8 }}
        />
        <Text className="font-poppins text-sm text-gray-600">{title}:</Text>
      </View>
      <Text className="font-poppinsMedium text-sm text-gray-800">
        {subtitle}
      </Text>
    </View>
  );
}
