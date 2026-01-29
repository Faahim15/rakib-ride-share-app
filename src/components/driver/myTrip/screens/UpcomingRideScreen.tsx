import { useLanguage } from "@/src/localization/LangaugeContext";
import publishedRidesData, {
  Ride,
  statusColors,
} from "@/src/mockData/driver/myRides.data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function UpcomingRideScreen() {
  const [rides, setRides] = React.useState<Ride[]>(publishedRidesData);
  const { t } = useLanguage();

  // Filter upcoming rides (upcoming status)
  const upcomingRides = useMemo(
    () => rides.filter((ride) => ride.status === "upcoming"),
    [rides]
  );

  const handleContact = useCallback((ride: Ride) => {
    router.push("/(passenger)/shared/chat-screen");
  }, []);

  const handleCancelRide = useCallback((rideId: string) => {
    router.push("/(passenger)/trip/cancel-ride");
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* Rides List */}
      <FlatList
        data={upcomingRides}
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
                      {t("driver.tabs.upcomingScreen.rideId")} #{item.id}
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
                        {item.date} {t("driver.tabs.upcomingScreen.at")}{" "}
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
                      {t(`driver.tabs.upcomingScreen.status.${item.status}`)}
                    </Text>
                  </View>
                </View>

                {/* Ride Details Grid */}
                <View className="bg-gray-50 rounded-xl p-3 mb-3">
                  <View className="flex-row justify-between mb-2">
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.upcomingScreen.seats")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.numberOfSeats}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.upcomingScreen.available")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {availableSeats}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.upcomingScreen.pricePerSeat")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.pricePerSeat} {t("shared.currency.symbol")}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between">
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.upcomingScreen.fullCar")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.fullCarPrice} {t("shared.currency.symbol")}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 font-poppins text-xs">
                        {t("driver.tabs.upcomingScreen.ac")}
                      </Text>
                      <Text className="text-gray-900 font-poppinsBold text-sm">
                        {item.acEnabled
                          ? t("driver.tabs.upcomingScreen.yes")
                          : t("driver.tabs.upcomingScreen.no")}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Price and Seats Info */}
                <View className="bg-gray-50 rounded-lg p-3 flex-row justify-between">
                  <View>
                    <Text className="text-gray-600 font-poppins text-xs">
                      {t("driver.tabs.upcomingScreen.pricePerSeat")}
                    </Text>
                    <Text className="text-gray-900 font-poppinsBold text-base">
                      {item.pricePerSeat} {t("shared.currency.symbol")}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-600 font-poppins text-xs">
                      {t("driver.tabs.upcomingScreen.seatsBooked")}
                    </Text>
                    <Text className="text-gray-900 font-poppinsBold text-base">
                      {item.seatsBooked}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons - Contact and Cancel Only */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleContact(item)}
                  className="flex-1 bg-brandColor rounded-lg py-2.5 flex-row items-center justify-center gap-2"
                >
                  <Ionicons name="chatbubble" size={16} color="white" />
                  <Text className="text-white font-poppinsSemiBold text-sm">
                    {t("driver.tabs.upcomingScreen.contact")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleCancelRide(item.id)}
                  className="flex-1 bg-red-500 rounded-lg py-2.5 flex-row items-center justify-center gap-2"
                >
                  <Ionicons name="close-circle" size={16} color="white" />
                  <Text className="text-white font-poppinsSemiBold text-sm">
                    {t("driver.tabs.upcomingScreen.cancel")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="calendar-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-600 font-poppinsSemiBold text-base mt-4">
              {t("driver.tabs.upcomingScreen.noUpcomingRides")}
            </Text>
            <Text className="text-gray-500 font-poppins text-sm mt-2 text-center">
              {t("driver.tabs.upcomingScreen.noUpcomingRidesMessage")}
            </Text>
          </View>
        }
      />
    </View>
  );
}
