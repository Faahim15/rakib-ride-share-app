import { Ride } from "@/src/mockData/driver/trip.data";
import { View } from "react-native";
import ActionButtonsSection from "./ActionButtonsSection";
import LocationSection from "./LocationSection";
import PriceSection from "./PriceSection";
import DriverInfo from "./RideDriverInfo";
import RideHeader from "./RideHeader";
import TripDetailsRow from "./TripDetailsRow";

interface RideCardProps {
  ride: Ride;
  onChat: (rideId: string) => void;
  onCancel: (rideId: string) => void;
  translations: {
    tripId: string;
    driver: string;
    pickup: string;
    dropoff: string;
    dateTime: string;
    distance: string;
    seats: string;
    editTime: string;
    chat: string;
    call: string;
    cancel: string;
    price?: string;
  };
}

export default function RideCard({
  ride,
  onChat,
  onCancel,
  translations,
}: RideCardProps) {
  const actionButtons = [
    {
      icon: "chatbubble-outline" as const,
      label: translations.chat,
      onPress: () => onChat(ride.id),
      variant: "secondary" as const,
    },
    {
      icon: "close-outline" as const,
      label: translations.cancel,
      onPress: () => onCancel(ride.id),
      variant: "danger" as const,
    },
  ];

  // Type guard for status
  const rideStatus = (ride.status || "upcoming") as "upcoming" | "ongoing";

  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-200">
      <RideHeader
        tripId={ride.id || ""}
        status={rideStatus}
        tripIdLabel={translations.tripId}
      />

      <DriverInfo
        driverName={ride.driverName || "Unknown Driver"}
        driverProfilePicture={ride.driverProfilePicture || ""}
        driverLabel={translations.driver}
      />

      <LocationSection
        icon="location-outline"
        label={translations.pickup}
        address={ride.pickupAddress || ""}
      />

      <View className="h-px bg-gray-200 mb-3" />

      <LocationSection
        icon="flag-outline"
        label={translations.dropoff}
        address={ride.dropoffAddress || ""}
        marginBottom="mb-4"
      />

      <TripDetailsRow
        date={ride.scheduledDate || ""}
        time={ride.scheduledTime || ""}
        distance={ride.distance || ""}
        seats={ride.seats || 0}
        dateTimeLabel={translations.dateTime}
        distanceLabel={translations.distance}
        seatsLabel={translations.seats}
      />

      {ride.price && <PriceSection price={ride.price} priceLabel="Price" />}

      <ActionButtonsSection buttons={actionButtons} gap="gap-2" />
    </View>
  );
}
