import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ride } from "@/src/mockData/driver/trip.data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CancelModal from "../../tabs/trip/modal/CancelModat";
import RideDetailCard from "../RideDetailCard";
interface RideRequest extends Ride {
  requestType: "ongoing";
}
export default function OngoingScreen() {
  const { t } = useLanguage();

  const [rides] = useState<RideRequest[]>([
    {
      id: "ONG001",
      pickupAddress: "Mall Road",
      dropoffAddress: "Central Station",
      scheduledTime: "12:45 PM",
      scheduledDate: "28/10/2024",
      distance: "5.2 miles",
      seats: 2,
      price: 25.5,
      status: "ongoing",
      driverName: "John Doe",
      driverProfilePicture: "https://i.pravatar.cc/150?img=1",
      requestType: "ongoing",
    },
  ]);

  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

  const handleContactDriver = (rideId: string) => {
    router.push({
      pathname: "/(passenger)/shared/chat-screen",
      params: { driverId: rideId },
    });
  };

  const handleCancel = (rideId: string) => {
    setSelectedRideId(rideId);
    router.push("/(passenger)/trip/cancel-ride");
  };

  const handleCancelConfirm = () => {
    if (selectedRideId) {
      console.log("Ride cancelled:", selectedRideId);
      setCancelModalVisible(false);
      setSelectedRideId(null);
    }
  };

  const handleCancelClose = () => {
    setCancelModalVisible(false);
    setSelectedRideId(null);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {rides.length === 0 ? (
        <View className="py-8 items-center">
          <Ionicons name="navigate-circle-outline" size={48} color="#D1D5DB" />
          <Text className="text-gray-400 font-poppins mt-2">
            {t("driver.tabs.ongoingRides.emptyTitle")}
          </Text>
        </View>
      ) : (
        rides.map((ride) => (
          <RideDetailCard
            key={ride.id}
            ride={ride}
            actions={[
              {
                label: t("driver.tabs.ongoingRides.contactDriver"),
                icon: "chatbubble-outline",
                onPress: () => handleContactDriver(ride.id),
              },
              {
                label: t("driver.tabs.ongoingRides.cancel"),
                icon: "close-outline",
                onPress: () => handleCancel(ride.id),
                variant: "danger",
              },
            ]}
          />
        ))
      )}
      <CancelModal
        visible={cancelModalVisible}
        onClose={handleCancelClose}
        onConfirm={handleCancelConfirm}
      />
    </ScrollView>
  );
}
