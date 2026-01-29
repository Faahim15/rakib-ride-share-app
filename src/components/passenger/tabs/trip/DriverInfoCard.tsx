import AppImage from "@/src/components/image/AppImage";
import { savedDriversData } from "@/src/mockData/passenger/savedDriverData";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function DriverInfoCard() {
  const item = savedDriversData[2];
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(passenger)/trip/driver-profile",
          params: { driverId: item?.id },
        })
      }
      className="bg-white rounded-2xl p-[4%] mb-[5%] shadow-sm border border-brandColor2 "
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {/* Driver Avatar */}
          {/* <View className="mr-[3%]">
            <View
              style={{ width: scale(44), height: verticalScale(44) }}
              className="bg-white items-center justify-center"
            >
              <Ionicons name="person" size={26} color="#6B7280" />
            </View>
          </View> */}
          {item?.profileImage ? (
            <View className="mr-[3%]">
              <AppImage
                source={item?.profileImage}
                width={scale(44)}
                height={verticalScale(44)}
                borderRadius={scale(22)}
              />
            </View>
          ) : (
            <View className="mr-[3%]">
              <View
                style={{ width: scale(44), height: verticalScale(44) }}
                className="bg-white items-center justify-center"
              >
                <Ionicons name="person" size={26} color="#6B7280" />
              </View>
            </View>
          )}
          {/* Driver Details */}
          <View className="flex-1">
            <View className="flex-row items-center mb-[2%]">
              <Text className="font-poppinsMedium text-base text-[#0D0D0D] mr-[2%]">
                {item?.name}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={15} color="#FFA500" />
              <Text className="text-xs pt-1 font-poppinsMedium text-[#B3B3B3] ml-[2%]">
                {item?.rating}
              </Text>
            </View>
            <Text className="font-poppinsMedium text-base text-[#808080] mt-[2%]">
              Arriving in {item?.estimatedMins} mins
            </Text>
          </View>

          {/* Price */}
          <View className="items-end">
            <Text className="font-poppinsMedium text-base text-[#0D0D0D]">
              {item?.pricePerKm}JOD
            </Text>
          </View>
        </View>

        {/* Arrow */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(passenger)/trip/driver-profile",
              params: { driverId: item?.id },
            })
          }
          className="ml-[3%]"
        >
          <Ionicons name="chevron-forward" size={24} color="#00ABB0" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
