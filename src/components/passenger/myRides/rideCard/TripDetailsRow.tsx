// components/RideCard/TripDetailsRow.tsx
import { Text, View } from "react-native";

interface TripDetailsRowProps {
  date: string;
  time: string;
  distance: string;
  seats: number;
  dateTimeLabel: string;
  distanceLabel: string;
  seatsLabel: string;
}

export default function TripDetailsRow({
  date,
  time,
  distance,
  seats,
  dateTimeLabel,
  distanceLabel,
  seatsLabel,
}: TripDetailsRowProps) {
  return (
    <View className="flex-row justify-between mb-4 bg-white rounded-lg p-3">
      {/* Date & Time */}
      <View className="flex-1">
        <Text className="font-poppins text-xs text-gray-500 mb-1">
          {dateTimeLabel}
        </Text>
        <Text className="font-poppinsMedium text-sm text-gray-800">{date}</Text>
        <Text className="font-poppinsMedium text-sm text-[#00ABB0]">
          {time}
        </Text>
      </View>

      {/* Distance */}
      <View className="flex-1 items-center">
        <Text className="font-poppins text-xs text-gray-500 mb-1">
          {distanceLabel}
        </Text>
        <Text className="font-poppinsMedium text-sm text-gray-800">
          {distance}
        </Text>
      </View>

      {/* Seats */}
      <View className="flex-1 items-end">
        <Text className="font-poppins text-xs text-gray-500 mb-1">
          {seatsLabel}
        </Text>
        <View className="bg-blue-100 px-2 py-1 rounded-lg">
          <Text className="font-poppinsMedium text-sm text-blue-700">
            {seats} {seats === 1 ? "Seat" : "Seats"}
          </Text>
        </View>
      </View>
    </View>
  );
}
