// components/RideCard/LocationSection.tsx
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface LocationSectionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  address: string;
  marginBottom?: string;
}

export default function LocationSection({
  icon,
  label,
  address,
  marginBottom = "mb-3",
}: LocationSectionProps) {
  return (
    <View className={`flex-row items-center ${marginBottom}`}>
      <Ionicons
        name={icon}
        size={18}
        color="#4DB8B8"
        style={{ marginRight: 10 }}
      />
      <View className="flex-1">
        <Text className="font-poppins text-xs text-gray-500">{label}</Text>
        <Text className="font-poppinsMedium text-sm text-gray-800">
          {address}
        </Text>
      </View>
    </View>
  );
}
