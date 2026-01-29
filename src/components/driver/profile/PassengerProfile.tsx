import { scale, verticalScale } from "@/src/utils/scaling";
import React from "react";
import { Pressable, Text, View } from "react-native";
import AppImage from "../../image/AppImage";

export default function PassengerProfile({
  onPress,
}: {
  onPress?: () => void;
}) {
  return (
    <View className="items-center  mb-6">
      <Pressable disabled={!onPress} onPress={onPress}>
        <View className="bg-white rounded-full p-1 shadow-lg">
          <AppImage
            source="https://i.pravatar.cc/150?img=48"
            height={verticalScale(96)}
            width={scale(96)}
            borderRadius={scale(47)}
          />
          {/* <View className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white" /> */}
        </View>
      </Pressable>

      <Text className="font-poppinsBold text-gray-800 text-xl mt-[2%]">
        Nikita
      </Text>

      {/* <View className="flex-row items-center mt-[1%] bg-amber-50 px-4 py-2 rounded-full">
        <Ionicons name="star" size={16} color="#f59e0b" />
        <Text className="font-poppinsMedium text-gray-700 text-base ml-1">
          5.0
        </Text>
        <Text className="font-poppins text-gray-500 text-sm ml-1">
          (235 ratings)
        </Text>
      </View> */}
    </View>
  );
}
