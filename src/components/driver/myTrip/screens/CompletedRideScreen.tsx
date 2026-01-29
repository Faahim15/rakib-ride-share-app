import { useLanguage } from "@/src/localization/LangaugeContext";
import publishedRidesData, {
  Ride,
  statusColors,
} from "@/src/mockData/driver/myRides.data";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function CompletedRideScreen() {
  const [rides] = React.useState<Ride[]>(publishedRidesData);
  const { t } = useLanguage();

  // Filter completed rides
  const completedRides = useMemo(
    () => rides.filter((ride) => ride.status === "completed"),
    [rides]
  );

  return (
    <View className="flex-1 bg-white">
      {/* Rides List */}
      <FlatList
        data={completedRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { bg, text } = statusColors[item.status];
          const availableSeats =
            parseInt(item.numberOfSeats) - item.seatsBooked;

          return (
            <View className="bg-white rounded-2xl p-4 mb-4  border border-gray-200">
              {/* Passenger Info */}
              <TouchableOpacity
                onPress={() =>
                  router.push("/(driver)/rideBook/passenger-profile")
                }
              >
                <View className="flex-row items-center mb-4 pb-4 border-b border-gray-100">
                  <Image
                    source={{
                      uri: item.passengerImage,
                    }}
                    className="w-14 h-14 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <Text className="text-gray-900 font-poppinsBold text-base">
                      {item.passengerName}
                    </Text>
                    <Text className="text-gray-600 font-poppins text-sm">
                      {t("driver.tabs.completedScreen.rideId")} #{item.id}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Ride Details Card */}
              <View className="mb-4">
                {/* Header with Status Badge */}
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-1 mr-3">
                    <Text className="text-gray-900 font-poppinsSemiBold text-base mb-1">
                      {item.pickupLocation} → {item.dropoffLocation}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="calendar" size={14} color="#6B7280" />
                      <Text className="text-gray-600 font-poppins text-xs">
                        {item.date} {t("driver.tabs.completedScreen.at")}{" "}
                        {item.time}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ backgroundColor: bg }}
                    className="px-3 py-1 rounded-full"
                  >
                    <Text
                      style={{ color: text }}
                      className="text-xs font-poppinsSemiBold"
                    >
                      {t(`driver.tabs.completedScreen.status.${item.status}`)}
                    </Text>
                  </View>
                </View>

                {/* Ride Details Grid */}
                <View className="bg-gray-50 rounded-xl p-3 mb-3">
                  <View className="flex-row justify-between mb-2">
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.completedScreen.seats")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.numberOfSeats}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.completedScreen.available")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {availableSeats}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.completedScreen.pricePerSeat")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.pricePerSeat} {t("shared.currency.symbol")}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between">
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.completedScreen.fullCar")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.fullCarPrice} {t("shared.currency.symbol")}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.completedScreen.ac")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.acEnabled
                          ? t("driver.tabs.completedScreen.yes")
                          : t("driver.tabs.completedScreen.no")}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Price and Seats Info */}
                <View className="bg-gray-50 rounded-lg p-3 flex-row justify-between">
                  <View>
                    <Text className="text-gray-600 font-poppins text-xs">
                      {t("driver.tabs.completedScreen.pricePerSeat")}
                    </Text>
                    <Text className="text-gray-900 font-poppinsBold text-base">
                      {item.pricePerSeat} {t("shared.currency.symbol")}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-600 font-poppins text-xs">
                      {t("driver.tabs.completedScreen.seatsBooked")}
                    </Text>
                    <Text className="text-gray-900 font-poppinsBold text-base">
                      {item.seatsBooked}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Completed Badge */}
              <View className="bg-green-50 rounded-lg p-3 flex-row items-center gap-2 mb-3">
                <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
                <Text className="text-green-700  font-poppinsSemiBold text-sm">
                  {t("driver.tabs.completedScreen.rideCompletedSuccessfully")}
                </Text>
              </View>

              {/* Review Passenger Button */}
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(passenger)/timeline/rating-screen",
                    params: {
                      passengerId: item.id,
                      passengerName: item.passengerName,
                    },
                  })
                }
                className="bg-brandColor rounded-lg p-3 flex-row items-center justify-center gap-2"
              >
                <Ionicons name="star" size={18} color="#FFFFFF" />
                <Text className="text-white font-poppinsSemiBold text-base">
                  {t("driver.tabs.completedScreen.reviewPassenger")}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="checkmark-done-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-600 font-poppinsSemiBold text-base mt-4">
              {t("driver.tabs.completedScreen.noCompletedRides")}
            </Text>
            <Text className="text-gray-500 font-poppins text-sm mt-2 text-center">
              {t("driver.tabs.completedScreen.noCompletedRidesMessage")}
            </Text>
          </View>
        }
      />
    </View>
  );
}
