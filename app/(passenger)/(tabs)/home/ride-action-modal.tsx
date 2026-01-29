import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";

export default function RideActionModal() {
  const { t } = useLanguage();

  const handleSeeAvailableRides = () => {
    router.push("/(passenger)/(tabs)/home/availabe-ride");
  };

  const handlePublishRide = () => {
    router.push("/(passenger)/(tabs)/home/trip-summary");
  };

  return (
    <View className="flex-1 px-[6%] bg-white">
      {Platform.OS === "android" && (
        <View className="mt-[8%]">
          <Text className="text-lg text-center text-[#111] font-poppinsBold  ">
            {t("shared.formSheet.formsheetTitle")}
          </Text>
        </View>
      )}

      <View className="gap-[3%] mt-[10%]">
        {/* Action Buttons */}
        <Pressable
          onPress={handleSeeAvailableRides}
          className="bg-brandColor rounded-2xl py-4 items-center justify-center mb-3 shadow-sm active:opacity-80"
        >
          <View className="flex-row items-center">
            <Ionicons
              name="car-outline"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white text-base font-poppinsBold">
              {t("shared.tripDetailScreen.seeAvailableRides")}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={handlePublishRide}
          className="bg-[#053F53] rounded-2xl py-4 items-center justify-center mb-3 shadow-sm active:opacity-80"
        >
          <View className="flex-row items-center">
            <Ionicons
              name="car-outline"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white text-base font-poppinsBold">
              {t("driver.tabs.homeScreenText.publishARide")}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
