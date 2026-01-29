import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ride } from "@/src/mockData/driver/trip.data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import RideDetailCard from "../RideDetailCard";

export default function CompletedScreen() {
  const { t } = useLanguage();

  const [rides] = useState<Ride[]>([
    {
      id: "COM001",
      pickupAddress: "123 Main St",
      dropoffAddress: "456 Oak St",
      scheduledTime: "04:00 PM",
      scheduledDate: "25/10/2024",
      distance: "8.5 miles",
      seats: 2,
      price: 25.5,
      driverName: "John Doe",
      driverProfilePicture: "https://i.pravatar.cc/150?img=1",
      status: "completed",
    },
  ]);

  const handleRateDriver = (rideId: string) => {
    router.push({
      pathname: "/(passenger)/timeline/rating-screen",
      params: { tripId: rideId },
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {rides.length === 0 ? (
        <View className="py-8 items-center">
          <Ionicons name="checkmark-circle-outline" size={48} color="#D1D5DB" />
          <Text className="text-gray-400 font-poppins mt-2">
            {t("driver.tabs.completedRideScreen.emptyTitle")}
          </Text>
        </View>
      ) : (
        rides.map((ride) => (
          <RideDetailCard
            key={ride.id}
            ride={ride}
            actions={[
              {
                label: t("driver.tabs.completedScreen.rateDriver"),
                icon: "star-outline",
                onPress: () => handleRateDriver(ride.id),
              },
              {
                label: t("driver.tabs.completedScreen.viewReceipt"),
                icon: "document-outline",
                onPress: () => console.log("View receipt:", ride.id),
                variant: "secondary",
              },
            ]}
          />
        ))
      )}
    </ScrollView>
  );
}
