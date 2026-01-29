import { earningIcon } from "@/assets/svg/driver-svg";
import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function EstimateEarnings() {
  const { t } = useLanguage();
  return (
    <View className="flex-1  px-[6%] pt-[13%] bg-white">
      <View className=" py-[4%]  justify-center items-center shadow-md bg-brandColor border border-brandColor rounded-xl">
        <SvgXml xml={earningIcon} />
        <Text className=" pt-[3%] text-center font-poppinsMedium text-sm text-white">
          1500 JOD{"\n"}
          {t("driver.tabs.earnings.estEarnings")}
        </Text>
      </View>
    </View>
  );
}
