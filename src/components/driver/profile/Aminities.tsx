import { scale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface AminitiesProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  disabled?: boolean; // added
}

export default function Aminities({
  iconName,
  title,
  disabled = false, // default enabled
}: AminitiesProps) {
  return (
    <View className="flex-row items-center justify-between mb-[2%] py-[2%]">
      <View className="flex-row items-center">
        <Ionicons
          name={iconName}
          size={18}
          color="#666"
          style={{ marginRight: scale(4) }}
        />
        <Text className="font-poppins text-base text-black">{title}</Text>
      </View>

      <View
        className={`w-[50px] h-[28px] rounded-full justify-center px-[3px] ${
          disabled ? "bg-gray-300 items-start" : "bg-brandColor items-end"
        }`}
      >
        <View className="w-[22px] h-[22px] bg-white rounded-full" />
      </View>
    </View>
  );
}
