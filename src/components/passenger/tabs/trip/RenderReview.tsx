import AppImage from "@/src/components/image/AppImage";
import { Review } from "@/src/mockData/passenger/savedDriverData";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface RenderReviewProps {
  item: Review;
}

export default function RenderReview({ item }: RenderReviewProps) {
  return (
    <View
      style={{
        width: scale(280),
        marginRight: scale(12),
        backgroundColor: "#fff",
        borderRadius: scale(12),
        padding: scale(16),
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      {/* Header */}
      <View className="flex-row">
        {!item.userImage ? (
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
            source={item.userImage}
          />
        )}

        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="font-poppinsMedium text-sm text-gray-900">
                {item.userName}
              </Text>

              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={14} color="#FFD233" />
                <Text className="font-poppins text-xs text-gray-700 ml-1">
                  {item.rating.toFixed(1)}
                </Text>
              </View>
            </View>

            <Text className="font-poppins text-xs text-gray-500">
              {item.timeAgo}
            </Text>
          </View>
        </View>
      </View>

      {/* Comment */}
      <Text
        className="font-poppins text-sm text-gray-600 mt-3"
        style={{ lineHeight: scale(20) }}
        numberOfLines={4}
      >
        {item.comment}
      </Text>
    </View>
  );
}
