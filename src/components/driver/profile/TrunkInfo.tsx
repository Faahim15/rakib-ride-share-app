import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function TrunkInfo() {
  const { t } = useLanguage();

  return (
    <View className="flex-row justify-between mb-[6%]">
      <View className="flex-row items-center mb-[3%]">
        <Ionicons
          name="briefcase-outline"
          size={18}
          color="#666"
          style={{ marginRight: 8 }}
        />
        <Text className="font-poppinsMedium text-sm text-black">
          {t("driver.vehicleSummary.trunkSize")}
        </Text>
      </View>

      <View>
        <Text className="font-poppins text-sm text-gray-700">Medium</Text>
      </View>
    </View>
  );
}
