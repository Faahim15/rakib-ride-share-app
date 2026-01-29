import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AppImage from "../../image/AppImage";

export default function ProfileHeader() {
  return (
    <View className=" justify-center items-center">
      <AppImage
        source="https://i.pravatar.cc/150?img=20"
        width={scale(86)}
        height={verticalScale(86)}
        borderRadius={scale(43)}
      />
      <View className="justify-center items-center">
        <View className=" justify-center items-center">
          {/* Name */}
          <Text className="font-poppinsMedium text-2xl text-[#0D0D0D] ">
            Huzzatul Maya
          </Text>
          <Text className="font-poppins text-base text-themeGray2 ">
            Letizia15
          </Text>

          {/* Rating and Badge Row */}
          <View className="flex-row justify-center items-center">
            {/* Rating Section */}
            <View className="flex-row justify-center items-center mr-[4%]">
              <Ionicons name="star" size={18} color="#FFD233" />
              <Text className="font-poppins text-base text-[#6C6C70] ml-[2%]">
                5.0
              </Text>
            </View>

            {/* Badge Section */}
            <View className="flex-row justify-center items-center">
              <Text className="font-poppinsMedium text-base text-gray-400">
                Badge:{" "}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(driver)/settings/change-membership")
                }
              >
                <Text className="font-poppinsSemiBold text-base text-brandColor underline ">
                  Free
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
