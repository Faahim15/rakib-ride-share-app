// components/RideCard/RideHeader.tsx
import { Text, View } from "react-native";
import RideStatusBadge from "./RideStatusBadge";

interface RideHeaderProps {
  tripId: string;
  status: "upcoming" | "ongoing";
  tripIdLabel: string;
}

export default function RideHeader({
  tripId,
  status,
  tripIdLabel,
}: RideHeaderProps) {
  return (
    <View className="flex-row justify-between items-start mb-3">
      <View className="flex-1">
        <Text className="font-poppinsSemiBold text-sm text-gray-600">
          {tripIdLabel}: {tripId}
        </Text>
      </View>
      <RideStatusBadge status={status} />
    </View>
  );
}
