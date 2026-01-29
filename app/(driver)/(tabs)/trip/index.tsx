import MyTripsTab from "@/src/components/shared/MyTripsTab";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function MyTrip() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }} className="flex-1">
      <MyTripsTab />
    </View>
  );
}
