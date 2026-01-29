import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Text, View } from "react-native";

export default function VehicleDetails() {
  const { t } = useLanguage();

  return (
    <View>
      {/* Vehicle Details */}
      <View className="my-[4%] p-[3%] bg-gray-50 rounded-xl">
        <Text className="font-poppinsBold text-base text-gray-900 mb-3">
          {t("shared.vehicleDetails.title")}
        </Text>

        <View className="flex-row justify-between mb-2">
          <Text className="font-poppins text-base text-[#111]">
            {t("shared.vehicleDetails.trunkSize")}
          </Text>
          <Text className="font-poppins text-sm text-gray-900">Medium</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="font-poppins text-base text-[#111]">
            {t("shared.vehicleDetails.carModel")}
          </Text>
          <Text className="font-poppins text-sm text-gray-900">
            Toyota Corolla
          </Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="font-poppins text-base text-[#111]">
            {t("shared.vehicleDetails.vehicleType")}
          </Text>
          <Text className="font-poppins text-sm text-gray-900">Minivan</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="font-poppins text-base text-[#111]">
            {t("shared.vehicleDetails.numberOfSeats")}
          </Text>
          <Text className="font-poppins text-sm text-gray-900">4</Text>
        </View>
      </View>
    </View>
  );
}
