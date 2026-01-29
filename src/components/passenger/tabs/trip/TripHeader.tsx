import AppImage from "@/src/components/image/AppImage";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { SavedDriver } from "@/src/mockData/passenger/savedDriverData";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface TripHeaderProps {
  item?: SavedDriver; // Make it optional
}

export default function TripHeader({ item }: TripHeaderProps) {
  const { t } = useLanguage();
  return (
    <View className="items-center">
      <View>
        {!item?.profileImage ? (
          <View
            className="bg-gray-200 items-center justify-center"
            style={{
              height: verticalScale(48),
              width: scale(48),
              borderRadius: scale(24),
            }}
          >
            <Ionicons name="person" size={scale(24)} color="#6C6C70" />
          </View>
        ) : (
          <AppImage
            height={verticalScale(48)}
            width={scale(48)}
            borderRadius={scale(24)}
            source={item.profileImage}
          />
        )}
      </View>

      <Text className="font-poppinsMedium text-base text-[#0D0D0D]">
        {item?.name || " Alex Jackob"}
      </Text>
      <Text className="font-poppins text-xs text-[#6C6C70] mt-1">
        {item?.location || "North city"}
      </Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name="star" size={16} color="#FFD233" />
        <Text className="font-poppins text-base text-[#6C6C70] ml-1">
          {item?.rating || "5.0"}
          <Text className="font-poppins text-xs text-[#6C6C70]">
            ({item?.totalRatings || "235"} {t("passenger.tabs.home.ratings")})
          </Text>
        </Text>
      </View>
      <Text className="font-poppinsMedium text-xs text-[#0D0D0D] mt-1">
        {item?.language || "English"}
      </Text>
    </View>
  );
}
