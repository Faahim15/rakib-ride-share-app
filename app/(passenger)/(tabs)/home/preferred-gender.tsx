import GenderPreference from "@/src/components/passenger/profile/GenderPreference";
import NextButton from "@/src/components/passenger/tabs/trip/NextButton";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function PreferredGender() {
  const handleNextPress = () => {
    // Open the modal instead of going directly to trip-summary
    router.push("/(passenger)/(tabs)/home/availabe-ride");
  };

  return (
    <View className="flex-1 px-[6%] bg-white">
      <View className="mt-[20%]">
        <GenderPreference />
      </View>
      <View className=" flex-1 justify-end mb-[14%]">
        <NextButton onPress={handleNextPress} />
      </View>
    </View>
  );
}
