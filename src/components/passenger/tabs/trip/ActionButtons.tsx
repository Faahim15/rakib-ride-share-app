import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ActionButtonsProps {
  disabled?: boolean;
}

export default function ActionButtons({
  disabled = false,
}: ActionButtonsProps) {
  const { t } = useLanguage();
  return (
    <View className="flex-row mt-4 gap-3">
      <TouchableOpacity
        className={`flex-1 rounded-lg py-4 flex-row items-center justify-center ${
          disabled ? "bg-gray-400 opacity-50" : "bg-themeGray2"
        }`}
        disabled={disabled}
      >
        <Ionicons name="chatbubble-outline" size={18} color="white" />
        <Text className="font-poppinsMedium text-base text-white ml-2">
          {t("passenger.tabs.home.chat")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 rounded-lg py-4 flex-row items-center justify-center ${
          disabled ? "bg-gray-400 opacity-50" : "bg-themeGray2"
        }`}
        disabled={disabled}
      >
        <Ionicons name="call-outline" size={18} color="white" />
        <Text className="font-poppinsMedium text-base text-white ml-2">
          {t("passenger.tabs.home.call")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
