import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ReportButtonsProps {
  onReportPress: () => void;
  onBlockPress: () => void;
}

export default function ReportButtons({
  onReportPress,
  onBlockPress,
}: ReportButtonsProps) {
  const { t } = useLanguage();

  return (
    <View className="flex-row mt-4 gap-3">
      <TouchableOpacity
        onPress={onReportPress}
        className="flex-1 bg-orange-500 rounded-lg py-4 flex-row items-center justify-center"
      >
        <Ionicons name="flag-outline" size={18} color="white" />
        <Text className="font-poppinsMedium text-base text-white ml-2">
          {t("passenger.tabs.home.report")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onBlockPress}
        className="flex-1 bg-red-600 rounded-lg py-4 flex-row items-center justify-center"
      >
        <Ionicons name="ban-outline" size={18} color="white" />
        <Text className="font-poppinsMedium text-base text-white ml-2">
          {t("passenger.tabs.home.block")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
