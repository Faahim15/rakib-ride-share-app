import { useLanguage } from "@/src/localization/LangaugeContext";
import publishedRidesData, {
  Ride,
  statusColors,
} from "@/src/mockData/driver/myRides.data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface FeedbackOption {
  id: string;
  label: string;
}

export default function CancelledRideScreen() {
  const [rides] = React.useState<Ride[]>(publishedRidesData);
  const { t } = useLanguage();

  // Filter cancelled rides
  const cancelledRides = useMemo(
    () => rides.filter((ride) => ride.status === "cancelled"),
    [rides]
  );

  const getFeedbackReason = (rideId: string): string => {
    const options: FeedbackOption[] = [
      { id: "1", label: t("shared.driverFeedback.priceHigher") },
      {
        id: "2",
        label: t("shared.driverFeedback.driverMisconduct"),
      },
      { id: "3", label: t("shared.driverFeedback.lostItem") },
    ];

    // Use rideId to consistently assign a reason (you can modify this logic)
    const index = parseInt(rideId) % options.length;
    return options[index].label;
  };

  return (
    <View className="flex-1 bg-white">
      {/* Rides List */}
      <FlatList
        data={cancelledRides}
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
                      {t("driver.tabs.cancelledScreen.rideId")} #{item.id}
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
                        {item.date} {t("driver.tabs.cancelledScreen.at")}{" "}
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
                      {t(`driver.tabs.cancelledScreen.status.${item.status}`)}
                    </Text>
                  </View>
                </View>

                {/* Ride Details Grid */}
                <View className="bg-gray-50 rounded-xl p-3 mb-3">
                  <View className="flex-row justify-between mb-2">
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.cancelledScreen.seats")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.numberOfSeats}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.cancelledScreen.available")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {availableSeats}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.cancelledScreen.pricePerSeat")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.pricePerSeat} {t("shared.currency.symbol")}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between">
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.cancelledScreen.fullCar")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.fullCarPrice} {t("shared.currency.symbol")}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.cancelledScreen.ac")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.acEnabled
                          ? t("driver.tabs.cancelledScreen.yes")
                          : t("driver.tabs.cancelledScreen.no")}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Price and Seats Info */}
                <View className="bg-gray-50 rounded-lg p-3 flex-row justify-between">
                  <View>
                    <Text className="text-gray-600 font-poppins text-xs">
                      {t("driver.tabs.cancelledScreen.pricePerSeat")}
                    </Text>
                    <Text className="text-gray-900 font-poppinsBold text-base">
                      {item.pricePerSeat} {t("shared.currency.symbol")}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-600 font-poppins text-xs">
                      {t("driver.tabs.cancelledScreen.seatsBooked")}
                    </Text>
                    <Text className="text-gray-900 font-poppinsBold text-base">
                      {item.seatsBooked}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Cancelled Badge with Feedback Reason */}
              <View className="bg-red-50 rounded-lg p-3 flex-row items-center gap-2">
                <Ionicons name="close-circle" size={20} color="#DC2626" />
                <Text className="text-red-700 font-poppinsSemiBold text-sm">
                  {getFeedbackReason(item.id)}
                </Text>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="ban-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-600 font-poppinsSemiBold text-base mt-4">
              {t("driver.tabs.cancelledScreen.noCancelledRides")}
            </Text>
            <Text className="text-gray-500 font-poppins text-sm mt-2 text-center">
              {t("driver.tabs.cancelledScreen.noCancelledRidesMessage")}
            </Text>
          </View>
        }
      />
    </View>
  );
}
