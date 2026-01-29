import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ride } from "@/src/mockData/driver/trip.data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import RideDetailCard from "../RideDetailCard";

interface ExtendedRide extends Ride {
  cancellationReason?: string;
}

interface FeedbackOption {
  id: string;
  label: string;
}

export default function CancelledScreen() {
  const { t } = useLanguage();

  const getFeedbackReason = (rideId: string): string => {
    const options: FeedbackOption[] = [
      { id: "1", label: t("shared.driverFeedback.priceHigher") },
      {
        id: "2",
        label: t("shared.driverFeedback.driverMisconduct"),
      },
      { id: "3", label: t("shared.driverFeedback.lostItem") },
    ];

    // Use rideId to consistently assign a reason
    const index = parseInt(rideId.replace(/\D/g, "")) % options.length;
    return options[index].label;
  };

  const [rides] = useState<ExtendedRide[]>([
    {
      id: "CAN001",
      pickupAddress: "789 Elm St",
      dropoffAddress: "321 Pine St",
      scheduledTime: "06:00 PM",
      scheduledDate: "20/10/2024",
      distance: "7.2 miles",
      seats: 1,
      price: 25.5,
      driverName: "John Doe",
      driverProfilePicture: "https://i.pravatar.cc/150?img=1",
      status: "cancelled",
      cancellationReason: getFeedbackReason("CAN001"),
    },
    {
      id: "CAN002",
      pickupAddress: "654 Maple Ave",
      dropoffAddress: "987 Cedar Ln",
      scheduledTime: "03:30 PM",
      scheduledDate: "19/10/2024",
      distance: "5.8 miles",
      seats: 2,
      price: 32.0,
      driverName: "Sarah Smith",
      driverProfilePicture: "https://i.pravatar.cc/150?img=2",
      status: "cancelled",
      cancellationReason: getFeedbackReason("CAN002"),
    },
    {
      id: "CAN003",
      pickupAddress: "555 Birch Rd",
      dropoffAddress: "222 Walnut St",
      scheduledTime: "08:15 PM",
      scheduledDate: "18/10/2024",
      distance: "6.5 miles",
      seats: 3,
      price: 40.75,
      driverName: "Michael Johnson",
      driverProfilePicture: "https://i.pravatar.cc/150?img=3",
      status: "cancelled",
      cancellationReason: getFeedbackReason("CAN003"),
    },
  ]);

  const handleBookAgain = (ride: ExtendedRide) => {
    router.push({
      pathname: "/(passenger)/(tabs)/home",
      params: {
        pickupLocation: ride.pickupAddress,
        dropoffLocation: ride.dropoffAddress,
      },
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="">
      {rides.length === 0 ? (
        <View className="py-12 items-center justify-center">
          <Ionicons name="close-circle-outline" size={48} color="#D1D5DB" />
          <Text className="text-gray-600 font-poppinsSemiBold text-base mt-4">
            {t("driver.tabs.cancelledScreen.emptyTitle")}
          </Text>
          <Text className="text-gray-500 font-poppins text-sm mt-2 text-center">
            {t("passenger.tabs.cancelledScreen.noCancelledRidesMessage") ||
              "You don't have any cancelled rides"}
          </Text>
        </View>
      ) : (
        rides.map((ride) => (
          <RideDetailCard
            key={ride.id}
            ride={ride}
            actions={[
              {
                label:
                  t("driver.tabs.cancelledScreen.bookAgain") || "Book Again",
                icon: "add-circle-outline",
                onPress: () => handleBookAgain(ride),
                variant: "primary",
              },
            ]}
          />
        ))
      )}
    </ScrollView>
  );
}
