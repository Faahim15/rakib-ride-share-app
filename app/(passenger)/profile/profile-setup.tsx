import AuthButton from "@/src/components/passenger/auth/AuthButton";
import EditProfile from "@/src/components/passenger/profile/EditProfile";
import GenderPreference from "@/src/components/passenger/profile/GenderPreference";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function profileSetUp() {
  const { t } = useLanguage();

  return (
    <View className="flex-1 bg-white px-[6%] ">
      <View className="justify-center mt-[5%] items-center">
        <EditProfile />
      </View>
      <View className="mt-[5%]">
        <GenderPreference />
      </View>
      <View className="mt-[3%]">
        <AuthButton
          onPress={() => router.push("/(passenger)/(tabs)/home")}
          title={t("auth.verifyNumber.continue")}
        />
      </View>
    </View>
  );
}
