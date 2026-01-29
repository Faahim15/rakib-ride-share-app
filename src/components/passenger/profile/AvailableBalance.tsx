import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Text, View } from "react-native";

export default function AvailableBalance() {
  const { t } = useLanguage();
  return (
    <View className="flex-row justify-between mt-[4%] ">
      <View>
        <Text className="font-poppins text-base text-black">
          {t("passenger.tabs.paymentScreenTexts.header.availableBalance")}
        </Text>
        <Text className="font-poppins text-[#AEAEB2] pt-1 text-3xl">
          0.00JOD
        </Text>
      </View>
      <Text className="font-poppins text-brandColor text-base">
        {t("passenger.tabs.paymentScreenTexts.header.addNewCard")}
      </Text>
    </View>
  );
}
