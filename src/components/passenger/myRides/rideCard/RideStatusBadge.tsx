import { Text, View } from "react-native";

interface RideStatusBadgeProps {
  status: "upcoming" | "ongoing";
}

export default function RideStatusBadge({ status }: RideStatusBadgeProps) {
  const bgColor = status === "upcoming" ? "bg-blue-100" : "bg-green-100";
  const textColor = status === "upcoming" ? "text-blue-700" : "text-green-700";
  const label = status === "upcoming" ? "Upcoming" : "Ongoing";

  return (
    <View className={`px-3 py-1 rounded-full ${bgColor}`}>
      <Text className={`text-xs font-poppinsMedium ${textColor}`}>{label}</Text>
    </View>
  );
}
