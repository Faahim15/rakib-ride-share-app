import CarInfo from "@/src/components/driver/profile/Car-info";
import CarImageSwiper from "@/src/components/driver/profile/CarImageSwiper";
import AuthButton from "@/src/components/passenger/auth/AuthButton";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { verticalScale } from "@/src/utils/scaling";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

export default function VehicleSummary() {
  const { t } = useLanguage();

  return (
    <View className="flex-1  bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(40) }}
      >
        <CarImageSwiper />
        <CarInfo />
      </ScrollView>
      <View className="px-[6%] pb-[5%]">
        <AuthButton
          onPress={() => router.push("/(driver)/(tabs)/home")}
          title={t("driver.vehicleSummary.submit")}
        />
      </View>
    </View>
  );
}
