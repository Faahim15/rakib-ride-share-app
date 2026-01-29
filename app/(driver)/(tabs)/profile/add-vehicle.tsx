import CarImageUpload from "@/src/components/driver/profile/AddMultiplePhotos";
import AuthButton from "@/src/components/passenger/auth/AuthButton";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AddVehicle() {
  const { t } = useLanguage();
  return (
    <View className="flex-1 bg-white">
      <CarImageUpload />
      <View className="px-[6%] py-[5%]">
        <AuthButton
          onPress={() =>
            router.push("/(driver)/(tabs)/profile/add-vehicle-details")
          }
          title={t("auth.verifyNumber.continue")}
        />
      </View>
    </View>
  );
}
