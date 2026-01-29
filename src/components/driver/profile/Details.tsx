import { scale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface DetailsProps {
  iconName: keyof typeof Ionicons.glyphMap; // ensures only valid Ionicons names
  title: string;
  subtitle: string;
}

const Details: React.FC<DetailsProps> = ({ iconName, title, subtitle }) => {
  return (
    <View className="flex-row  items-center mb-[5%]">
      <Ionicons
        name={iconName}
        size={18}
        color="#666"
        style={{ marginRight: scale(3) }}
      />
      <View className="flex-1 flex-row justify-between">
        <Text className="font-poppinsMedium text-sm text-black">{title}</Text>
        <Text className="font-poppins text-sm text-gray-700">{subtitle}</Text>
      </View>
    </View>
  );
};

export default Details;
