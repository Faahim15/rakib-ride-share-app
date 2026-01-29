// components/RideCard/RideButton.tsx
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

type Variant = "primary" | "secondary" | "danger";

interface RideButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-[#00ABB0]",
  secondary: "bg-gray-200",
  danger: "bg-red-500",
};

const textColors: Record<Variant, string> = {
  primary: "text-white",
  secondary: "text-gray-800",
  danger: "text-white",
};

export default function RideButton({
  icon,
  label,
  onPress,
  variant = "secondary",
}: RideButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-lg py-[4%] px-3 flex-1 ${variantStyles[variant]}`}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={16}
        color={variant === "secondary" ? "#6B7280" : "white"}
        style={{ marginRight: 6 }}
      />
      <Text className={`font-poppinsSemiBold text-xs ${textColors[variant]}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
