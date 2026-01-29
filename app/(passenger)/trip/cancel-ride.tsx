import DriverFeedbackForm from "@/src/components/passenger/tabs/trip/FeedbackForm";
import React from "react";
import { View } from "react-native";

export default function CancelRide() {
  return (
    <View className="flex-1 bg-white">
      <DriverFeedbackForm />
    </View>
  );
}
