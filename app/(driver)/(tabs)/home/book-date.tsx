import DatePicker from "@/src/components/passenger/tabs/trip/DatePicker";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function BookDate() {
  return (
    <View className="flex-1 bg-white">
      <DatePicker
        onPress={() => router.push("/(driver)/(tabs)/home/book-time")}
      />
    </View>
  );
}
