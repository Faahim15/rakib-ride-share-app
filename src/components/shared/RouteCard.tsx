import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";

// ---------------------- RouteCard Component ----------------------
interface RouteCardProps {
  pickupAddress: string;
  dropoffAddress: string;
}

export default function RouteCard({
  pickupAddress,
  dropoffAddress,
}: RouteCardProps) {
  return (
    <View className="bg-brandColor rounded-2xl p-[5%] mb-[5%]">
      {/* Pickup Location */}
      <View className="flex-row items-center mb-[4%]">
        <Ionicons name="radio-button-on" size={18} color="white" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-1 ml-[3%]"
        >
          <Text className="text-white font-poppinsMedium text-sm">
            {pickupAddress}
          </Text>
        </ScrollView>
      </View>

      {/* Divider Line */}
      <View className="h-[1px] bg-white/30 mb-[4%]" />

      {/* Dropoff Location */}
      <View className="flex-row items-center">
        <Ionicons name="location" size={18} color="white" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-1 ml-[3%]"
        >
          <Text className="text-white font-poppinsMedium text-sm">
            {dropoffAddress}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}
