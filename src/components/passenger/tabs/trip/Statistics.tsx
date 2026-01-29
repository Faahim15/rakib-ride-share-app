import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Statistics({
  rideShared,
  rideCancelled,
}: {
  rideShared?: number;
  rideCancelled?: number;
}) {
  const { t } = useLanguage();

  return (
    <View className="flex-row mt-4 gap-3">
      <TouchableOpacity
        onPress={() => router.push("/(passenger)/timeline/ride-shared")}
        className="flex-1 border-2 border-brandColor2 rounded-lg p-4"
      >
        <View className="flex-row items-center">
          <Ionicons name="car-outline" size={24} color="#000" />
          <View className="ml-3">
            <Text className="font-poppinsBold text-lg text-black">
              {rideShared || "310"}
            </Text>
            <Text className="font-poppins text-sm text-gray2 ">
              {t("passenger.tabs.home.ridesShared")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(passenger)/timeline/ride-cancelled")}
        className="flex-1 border-2 border-red-200 rounded-lg p-4"
      >
        <View className="flex-row items-center">
          <Ionicons name="close-circle-outline" size={24} color="#f87171" />
          <View className="ml-3">
            <Text className="font-poppinsBold text-lg text-red-400">
              {rideCancelled || "5"}
            </Text>
            <Text className="font-poppins text-sm text-red-400">
              {t("passenger.tabs.home.cancelled")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
