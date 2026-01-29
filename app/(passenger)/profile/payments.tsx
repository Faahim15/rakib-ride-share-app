import AuthButton from "@/src/components/passenger/auth/AuthButton";
import AvailableBalance from "@/src/components/passenger/profile/AvailableBalance";
import CustomButton from "@/src/components/passenger/profile/CustomButton";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Payments() {
  const { t } = useLanguage();

  return (
    <View className="flex-1 px-[6%] bg-white">
      <AvailableBalance />

      <View className="mt-[14%] gap-y-[6%]">
        <AuthButton
          onPress={() => router.push("/(passenger)/profile/cash-input")}
          title={t("passenger.tabs.paymentScreenTexts.actions.topUp")}
        />

        <CustomButton
          backgroundColor="#fff"
          textColor="#00ABB0"
          title={t("passenger.tabs.paymentScreenTexts.header.history")}
          onPress={() =>
            router.push("/(passenger)/profile/transactions-history")
          }
        />
      </View>
    </View>
  );
}
