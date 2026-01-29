import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function NextButton({ onPress }: { onPress: () => void }) {
  const { t } = useLanguage();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-brandColor py-[4%] rounded-lg items-center"
    >
      <Text className="text-white text-base font-poppinsSemiBold">
        {" "}
        {t("passenger.tabs.trip.next")}
      </Text>
    </TouchableOpacity>
  );
}
