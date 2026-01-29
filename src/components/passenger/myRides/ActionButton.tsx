import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export default function ActionButton({
  icon,
  label,
  onPress,
  variant = "primary",
}: {
  icon: any;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
}) {
  const variantStyles = {
    primary: "bg-[#00ABB0]",
    secondary: "bg-gray-200",
    danger: "bg-red-500",
  };

  const textColors = {
    primary: "text-white",
    secondary: "text-gray-800",
    danger: "text-white",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-lg py-[6%] px-3 ${variantStyles[variant]}`}
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
