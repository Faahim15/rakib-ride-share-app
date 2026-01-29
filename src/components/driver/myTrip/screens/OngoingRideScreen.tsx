import RideCard from "@/src/components/driver/myRides/RideCard";
import { useLanguage } from "@/src/localization/LangaugeContext";
import publishedRidesData, { Ride } from "@/src/mockData/driver/myRides.data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OngoingRideScreen() {
  const [rides, setRides] = React.useState<Ride[]>(publishedRidesData);
  const { t } = useLanguage();

  // Filter ongoing rides only
  const ongoingRides = useMemo(
    () => rides.filter((ride) => ride.status === "ongoing"),
    [rides]
  );

  const handleContact = useCallback((ride: Ride) => {
    router.push("/(passenger)/shared/chat-screen");
  }, []);

  const handleCancelRide = useCallback(
    (rideId: string) => {
      router.push("/(passenger)/trip/cancel-ride");
    },
    [t]
  );

  const handleCompleteRide = useCallback(
    (rideId: string) => {
      setRides((prevRides) =>
        prevRides.map((r) =>
          r.id === rideId ? { ...r, status: "completed" } : r
        )
      );
      Alert.alert(
        t("driver.tabs.ongoingRides.success"),
        t("driver.tabs.ongoingRides.rideMarkedComplete")
      );
    },
    [t]
  );

  return (
    <View className="flex-1 bg-white">
      {/* Rides List */}
      <FlatList
        data={ongoingRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
                    {t("driver.tabs.ongoingRides.rideId")} #{item.id}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Ride Card Component */}
            <View className="mb-4">
              <RideCard
                ride={item}
                onEdit={() => {}}
                onDelete={() => handleCancelRide(item.id)}
                onStatusChange={() => handleCompleteRide(item.id)}
              />
              {/* Show only price and seats booked */}
              <View className="bg-gray-50 rounded-lg p-3 flex-row justify-between">
                <View>
                  <Text className="text-gray-600 font-poppins text-xs">
                    {t("driver.tabs.ongoingRides.pricePerSeat")}
                  </Text>
                  <Text className="text-gray-900 font-poppinsBold text-base">
                    {item.pricePerSeat} {t("shared.currency.symbol")}
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-600 font-poppins text-xs">
                    {t("driver.tabs.ongoingRides.seatsBooked")}
                  </Text>
                  <Text className="text-gray-900 font-poppinsBold text-base">
                    {item.seatsBooked}
                  </Text>
                </View>
              </View>
            </View>

            {/* Custom Action Buttons for Ongoing */}
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => handleContact(item)}
                className="flex-1 bg-brandColor rounded-lg py-2.5 flex-row items-center justify-center gap-2"
              >
                <Ionicons name="chatbubble" size={16} color="white" />
                <Text className="text-white font-poppinsSemiBold text-sm">
                  {t("driver.tabs.ongoingRides.contact")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCancelRide(item.id)}
                className="flex-1 bg-red-500 rounded-lg py-2.5 flex-row items-center justify-center gap-2"
              >
                <Ionicons name="close-circle" size={16} color="white" />
                <Text className="text-white font-poppinsSemiBold text-sm">
                  {t("driver.tabs.ongoingRides.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="car-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-600 font-poppinsSemiBold text-base mt-4">
              {t("driver.tabs.ongoingRides.noOngoingRides")}
            </Text>
            <Text className="text-gray-500 font-poppins text-sm mt-2 text-center">
              {t("driver.tabs.ongoingRides.noOngoingRidesMessage")}
            </Text>
          </View>
        }
      />
    </View>
  );
}
