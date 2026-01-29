import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ride } from "@/src/mockData/driver/trip.data";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import ActionButton from "./ActionButton";
import { StatusBadge } from "./StatusBadge";
import PriceSection from "./rideCard/PriceSection";
import DriverInfo from "./rideCard/RideDriverInfo";

export default function RideDetailCard({
  ride,
  actions,
}: {
  ride: Ride & { cancellationReason?: string };
  actions: {
    label: string;
    icon: any;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
  }[];
}) {
  const { t } = useLanguage();
  const isDriverOffer = (ride as any).requestType === "driver-offer";
  const isOngoing = (ride as any).requestType === "ongoing";
  const isCancelled = ride.status === "cancelled";

  // console.log("cancelled", isCancelled);

  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-200">
      {/* Header with Status Badge */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="font-poppinsSemiBold text-sm text-gray-600">
            {t("driver.rideDetail.tripId")}: {ride.id}
          </Text>
        </View>
        <StatusBadge status={ride.status} />
      </View>

      {/* Driver Info - Only show for driver offers */}
      {(isOngoing ||
        isDriverOffer ||
        ride.status === "completed" ||
        ride.status === "cancelled") && (
        <DriverInfo
          driverName={ride.driverName || "Unknown Driver"}
          driverProfilePicture={ride.driverProfilePicture || ""}
          driverLabel={t("driver.rideDetail.driver") || "Driver"}
        />
      )}

      {/* Pickup Location */}
      <View className="flex-row items-center mb-3">
        <Ionicons
          name="location-outline"
          size={18}
          color="#4DB8B8"
          style={{ marginRight: 10 }}
        />
        <View className="flex-1">
          <Text className="font-poppins text-xs text-gray-500">
            {t("driver.rideDetail.pickup")}
          </Text>
          <Text className="font-poppinsMedium text-sm text-gray-800">
            {ride.pickupAddress}
          </Text>
        </View>
      </View>

      {/* Dropoff Location */}
      <View className="flex-row items-center mb-4">
        <Ionicons
          name="flag-outline"
          size={18}
          color="#4DB8B8"
          style={{ marginRight: 10 }}
        />
        <View className="flex-1">
          <Text className="font-poppins text-xs text-gray-500">
            {t("driver.rideDetail.dropoff")}
          </Text>
          <Text className="font-poppinsMedium text-sm text-gray-800">
            {ride.dropoffAddress}
          </Text>
        </View>
      </View>

      {/* Trip Details Row */}
      <View className="flex-row justify-between mb-4 bg-white rounded-lg p-3">
        <View className="flex-1">
          <Text className="font-poppins text-xs text-gray-500">
            {t("driver.rideDetail.dateTime")}
          </Text>
          <Text className="font-poppinsMedium text-sm text-gray-800">
            {ride.scheduledDate}
            {"\n"}
            {ride.scheduledTime}
          </Text>
        </View>

        <View className="flex-1">
          <Text className="font-poppins text-xs text-gray-500">
            {t("driver.rideDetail.distance")}
          </Text>
          <Text className="font-poppinsMedium text-sm text-gray-800">
            {ride.distance}
          </Text>
        </View>

        <View className="flex-1">
          <Text className="font-poppins text-xs text-gray-500">
            {t("driver.rideDetail.seats")}
          </Text>
          <Text className="font-poppinsMedium text-sm text-gray-800">
            {ride.seats}
          </Text>
        </View>
      </View>

      {ride.price && (
        <PriceSection
          price={ride.price}
          priceLabel={isDriverOffer ? "Offered Price" : "Price"}
        />
      )}

      {/* Cancellation Reason - Only show for cancelled rides */}
      {isCancelled && (ride as any).cancellationReason && (
        <View className="bg-red-50 rounded-lg p-3 mb-4 border border-red-200 flex-row items-start gap-2">
          <Ionicons
            name="information-circle"
            size={18}
            color="#DC2626"
            style={{ marginTop: 2 }}
          />
          <View className="flex-1">
            <Text className="text-red-700 font-poppinsSemiBold text-xs">
              {t("shared.rideCancelledScreen.cancellationReason") ||
                "Cancellation Reason"}
            </Text>
            <Text className="text-red-600 font-poppins text-sm mt-1">
              {(ride as any).cancellationReason}
            </Text>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row gap-2">
        {actions.map((action, index) => (
          <View key={index} className="flex-1">
            <ActionButton
              icon={action.icon}
              label={action.label}
              onPress={action.onPress}
              variant={action.variant || "primary"}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
