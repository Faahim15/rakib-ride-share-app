import AuthButton from "@/src/components/passenger/auth/AuthButton";
import MobileImage from "@/src/components/passenger/auth/MobileImage";
import { useLanguage } from "@/src/localization/LangaugeContext";
import CustomStatusBar from "@/src/ui/CustomStatusBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const USER_MODE_KEY = "@user_mode";

export default function JoinAs() {
  const { t } = useLanguage();

  const handlePassengerPress = async () => {
    try {
      await AsyncStorage.setItem(USER_MODE_KEY, "passenger");
      router.push("/(passenger)/profile/profile-setup");
    } catch (error) {
      console.error("Error saving passenger mode:", error);
      // Navigate anyway even if save fails
      router.push("/(passenger)/profile/profile-setup");
    }
  };

  const handleDriverPress = async () => {
    try {
      await AsyncStorage.setItem(USER_MODE_KEY, "driver");
      router.push("/(driver)/profile/driver-profile-setup");
    } catch (error) {
      console.error("Error saving driver mode:", error);
      // Navigate anyway even if save fails
      router.push("/(driver)/profile/driver-profile-setup");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-[6%] bg-[#053F53]">
      <CustomStatusBar backgroundColor="transparent" barStyle="light-content" />
      <MobileImage />

      <View className="mt-[13%] gap-y-4">
        <AuthButton
          onPress={handlePassengerPress}
          title={t("auth.allButtonsName.passenger")}
        />
        <AuthButton
          onPress={handleDriverPress}
          title={t("auth.allButtonsName.driver")}
        />
      </View>
    </View>
  );
}
