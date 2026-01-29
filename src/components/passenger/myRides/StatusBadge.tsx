import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { bg: string; text: string; icon: any }> =
    {
      upcoming: { bg: "#E3F2FD", text: "#1976D2", icon: "calendar-outline" },
      ongoing: {
        bg: "#F3E5F5",
        text: "#7B1FA2",
        icon: "navigate-circle-outline",
      },
      request: { bg: "#FFF3E0", text: "#E65100", icon: "alert-circle-outline" },
      "driver-offer": {
        bg: "#D1FAE520",
        text: "#059669",
        icon: "pricetag-outline",
      },
      "booking-pending": {
        bg: "#FEF3C720",
        text: "#D97706",
        icon: "time-outline",
      },
      completed: {
        bg: "#E8F5E9",
        text: "#2E7D32",
        icon: "checkmark-circle-outline",
      },
      cancelled: {
        bg: "#FFEBEE",
        text: "#C62828",
        icon: "close-circle-outline",
      },
    };

  const config = statusConfig[status] || statusConfig.upcoming;

  const displayLabel = (status: string) => {
    const labels: Record<string, string> = {
      "driver-offer": "Driver Offer",
      "booking-pending": "Booking Pending",
      request: "Pending",
    };
    return labels[status] || status;
  };

  return (
    <View
      style={{ backgroundColor: config.bg }}
      className="flex-row items-center rounded-full px-3 py-1"
    >
      <Ionicons name={config.icon} size={14} color={config.text} />
      <Text
        style={{ color: config.text }}
        className="font-poppinsMedium text-xs ml-1 capitalize"
      >
        {displayLabel(status)}
      </Text>
    </View>
  );
}
