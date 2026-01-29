import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ride } from "@/src/mockData/driver/trip.data";
import { verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import RideDetailCard from "../RideDetailCard";
import { EditRequestModal } from "../rideCard/EditModal";

interface RideRequest extends Ride {
  requestType: "driver-offer" | "user-booked";
  displayStatus?: "driver-offer" | "booking-pending";
}

export default function RequestsScreen() {
  const { t } = useLanguage();

  const [rides] = useState<RideRequest[]>([
    // Driver's Offer Request (Driver Sent Price)
    {
      id: "REQ001",
      pickupAddress: "University Campus",
      dropoffAddress: "Library Street",
      scheduledTime: "10:00 AM",
      scheduledDate: "30/10/2024",
      distance: "3.1 miles",
      seats: 1,
      price: 25.5,
      driverName: "John Doe",
      driverProfilePicture: "https://i.pravatar.cc/150?img=1",
      status: "request",
      requestType: "driver-offer",
      displayStatus: "driver-offer",
    },
    // User's Booked Request (Waiting for Driver Response)
    {
      id: "REQ002",
      pickupAddress: "Downtown Station",
      dropoffAddress: "Business Plaza",
      scheduledTime: "02:30 PM",
      scheduledDate: "30/10/2024",
      distance: "5.8 miles",
      seats: 2,
      price: undefined,
      driverName: "Sarah Johnson",
      driverProfilePicture: "https://i.pravatar.cc/150?img=2",
      status: "request",
      requestType: "user-booked",
      displayStatus: "booking-pending",
    },
    // Another Driver's Offer Request
    {
      id: "REQ003",
      pickupAddress: "Airport Terminal A",
      dropoffAddress: "Hotel Downtown",
      scheduledTime: "06:15 PM",
      scheduledDate: "30/10/2024",
      distance: "12.4 miles",
      seats: 3,
      price: 45.0,
      driverName: "Michael Chen",
      driverProfilePicture: "https://i.pravatar.cc/150?img=3",
      status: "request",
      requestType: "driver-offer",
      displayStatus: "driver-offer",
    },
    // Another User's Booked Request
    {
      id: "REQ004",
      pickupAddress: "Central Park Entrance",
      dropoffAddress: "Grand Central Terminal",
      scheduledTime: "04:00 PM",
      scheduledDate: "31/10/2024",
      distance: "2.5 miles",
      seats: 1,
      price: undefined,
      driverName: "Emma Wilson",
      driverProfilePicture: "https://i.pravatar.cc/150?img=4",
      status: "request",
      requestType: "user-booked",
      displayStatus: "booking-pending",
    },
  ]);

  const handleAcceptOffer = (rideId: string) => {
    Alert.alert(
      t("driver.tabs.requestsScreen.successTitle"),
      t("driver.tabs.requestsScreen.acceptedOffer"),
      [
        {
          text: t("driver.tabs.requestsScreen.ok"),
          onPress: () => console.log("Offer accepted:", rideId),
        },
      ]
    );
  };
  const [editingRide, setEditingRide] = useState<RideRequest | null>(null);

  const handleEditRequest = (rideId: string) => {
    const ride = rides.find((r) => r.id === rideId);
    if (ride) {
      setEditingRide(ride);
    }
  };

  const handleSaveEdit = (updatedData: any) => {
    Alert.alert(
      t("driver.tabs.requestsScreen.success"),
      t("driver.tabs.requestsScreen.requestUpdated"),
      [
        {
          text: t("driver.tabs.requestsScreen.ok"),
          onPress: () => {
            console.log("Updated ride:", updatedData);
            setEditingRide(null);
          },
        },
      ]
    );
  };
  const handleRejectOffer = (rideId: string) => {
    Alert.alert(
      t("driver.tabs.requestsScreen.rejectTitle"),
      t("driver.tabs.requestsScreen.rejectMessage"),
      [
        {
          text: t("driver.tabs.requestsScreen.ok"),
          onPress: () => console.log("Offer rejected:", rideId),
        },
      ]
    );
  };

  const getActionsForRequest = (ride: RideRequest) => {
    if (ride.requestType === "driver-offer") {
      return [
        {
          label: t("driver.tabs.requestsScreen.accept"),
          icon: "checkmark-outline",
          onPress: () => handleAcceptOffer(ride.id),
        },
        {
          label: t("driver.tabs.requestsScreen.decline"),
          icon: "close-outline",
          onPress: () => handleRejectOffer(ride.id),
          variant: "danger" as const,
        },
      ];
    } else {
      return [
        {
          label: t("driver.tabs.requestsScreen.edit"),
          icon: "create-outline",
          onPress: () => handleEditRequest(ride.id),
        },
        {
          label: t("driver.tabs.requestsScreen.cancel"),
          icon: "trash-outline",
          onPress: () => () => {},
          variant: "danger" as const,
        },
      ];
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: verticalScale(80) }}
    >
      {rides.length === 0 ? (
        <View className="py-8 items-center">
          <Ionicons name="help-circle-outline" size={48} color="#D1D5DB" />
          <Text className="text-gray-400 font-poppins mt-2">
            {t("driver.tabs.requestsScreen.emptyTitle")}
          </Text>
        </View>
      ) : (
        <>
          {rides.map((ride) => (
            <View key={ride.id} className="mb-4">
              <RideDetailCard
                ride={ride as any}
                actions={getActionsForRequest(ride)}
              />
            </View>
          ))}
        </>
      )}
      {editingRide && (
        <EditRequestModal
          visible={!!editingRide}
          ride={editingRide}
          onClose={() => setEditingRide(null)}
          onSave={handleSaveEdit}
        />
      )}
    </ScrollView>
  );
}
