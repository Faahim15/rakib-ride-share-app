import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ride, statusColors } from "@/src/mockData/driver/myRides.data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import DetailItem from "./DetailItem";

interface RideCardProps {
  ride: Ride;
  onEdit: (ride: Ride) => void;
  onDelete: (rideId: string) => void;
  onStatusChange: (rideId: string, newStatus: Ride["status"]) => void;
}

export default function RideCard({
  ride,
  onEdit,
  onDelete,
  onStatusChange,
}: RideCardProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const { bg, text } = statusColors[ride.status];
  const availableSeats = parseInt(ride.numberOfSeats) - ride.seatsBooked;

  const handleOpenRequest = () => {
    router.push({
      pathname: "/(driver)/(tabs)/trip/passenger-rqst-details",
      params: {
        rideId: ride.id,
        hasMultiDayItineraryRequest: String(ride.hasMultiDayItineraryRequest),
      },
    });
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200">
      {/* Header with Status Badge */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text className="text-gray-900 font-poppinsSemiBold text-base mb-1">
            {ride.pickupLocation} → {ride.dropoffLocation}
          </Text>
          <View className="flex-row items-center gap-2">
            <Ionicons name="calendar" size={14} color="#6B7280" />
            <Text className="text-gray-600 font-poppins text-xs">
              {ride.date} at {ride.time}
            </Text>
          </View>
        </View>
        <View className="items-end gap-2">
          <View
            style={{ backgroundColor: bg }}
            className="px-3 py-1 rounded-full"
          >
            <Text
              style={{ color: text }}
              className="text-xs font-poppinsSemiBold"
            >
              {t(`driver.tabs.myTrip.rideCard.${ride.status}`)}
            </Text>
          </View>
        </View>
      </View>

      {/* Multi-day Itinerary Warning */}
      {ride.hasMultiDayItineraryRequest && (
        <View className="bg-blue-50 rounded-lg p-3 mb-3 flex-row items-center gap-2">
          <Ionicons name="information-circle" size={16} color="#2563EB" />
          <Text className="text-blue-700 font-poppins text-xs flex-1">
            The passenger has requested a multi-day itinerary
          </Text>
        </View>
      )}

      {/* Multi-day Itinerary Warning */}
      {/* {item.hasMultiDayItineraryRequest && (
  <View className="mx-[4%] mb-[2%] bg-blue-50 rounded-lg px-3 py-2 flex-row items-center gap-2">
    <Ionicons name="information-circle" size={16} color="#2563EB" />
    <Text className="text-blue-700 font-poppins text-xs flex-1">
      The passenger has requested a multi-day itinerary
    </Text>
  </View>
)} */}

      {/* Ride Details Grid */}
      <View className="bg-gray-50 rounded-xl p-3 mb-3">
        <View className="flex-row justify-between mb-2">
          <DetailItem
            label={t("driver.tabs.myTrip.rideCard.seats")}
            value={ride.numberOfSeats}
          />
          <DetailItem
            label={t("driver.tabs.myTrip.rideCard.available")}
            value={availableSeats.toString()}
          />
          <DetailItem
            label={t("driver.tabs.myTrip.rideCard.perSeat")}
            value={`${ride.pricePerSeat} ${t("shared.currency.symbol")}`}
          />
        </View>
        <View className="flex-row justify-between">
          <DetailItem
            label={t("driver.tabs.myTrip.rideCard.fullCar")}
            value={`${ride.fullCarPrice} ${t("shared.currency.symbol")}`}
          />
          <DetailItem
            label={t("driver.tabs.myTrip.rideCard.ac")}
            value={
              ride.acEnabled
                ? t("driver.tabs.myTrip.rideCard.acYes")
                : t("driver.tabs.myTrip.rideCard.acNo")
            }
          />
        </View>
      </View>

      {/* Action Buttons */}
      {ride.status === "pending" && (
        <View className="flex-row gap-2 mb-2">
          {ride.hasBookingRequests ? (
            // Show "Open Request" button if there are booking requests
            <TouchableOpacity
              onPress={handleOpenRequest}
              className="flex-1 bg-brandColor rounded-lg py-2.5 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="mail-open" size={16} color="white" />
              <Text className="text-white font-poppinsSemiBold text-sm">
                {t("driver.tabs.passengerRequestList.openRequest")}
              </Text>
            </TouchableOpacity>
          ) : (
            // Show "Edit" button if no booking requests
            <TouchableOpacity
              onPress={() => onEdit(ride)}
              className="flex-1 bg-brandColor rounded-lg py-2.5 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="pencil" size={16} color="white" />
              <Text className="text-white font-poppinsSemiBold text-sm">
                {t("driver.tabs.myTrip.publishedRides.editButton")}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => onDelete(ride.id)}
            className="flex-1 bg-red-500 rounded-lg py-2.5 flex-row items-center justify-center gap-2"
          >
            <Ionicons name="trash" size={16} color="white" />
            <Text className="text-white font-poppinsSemiBold text-sm">
              {t("driver.tabs.myTrip.publishedRides.cancelButton")}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Status Change Button */}
      {ride.status === "ongoing" && (
        <TouchableOpacity
          onPress={() => onStatusChange(ride.id, "completed")}
          className="bg-green-100 rounded-lg py-2"
        >
          <Text className="text-green-700 font-poppinsSemiBold text-sm text-center">
            {t("driver.tabs.myTrip.publishedRides.markCompleted")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
