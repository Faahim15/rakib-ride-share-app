// components/RideCard/ActionButtonsSection.tsx
import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import RideButton from "./RideButton";

interface ActionButtonConfig {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
}

interface ActionButtonsSectionProps {
  buttons: ActionButtonConfig[];
  layoutStyle?: "row" | "column";
  gap?: string;
}

export default function ActionButtonsSection({
  buttons,
  layoutStyle = "row",
  gap = "gap-2",
}: ActionButtonsSectionProps) {
  const containerClass =
    layoutStyle === "row" ? `flex-row ${gap}` : `flex-col ${gap}`;

  return (
    <View className={containerClass}>
      {buttons.map((button, index) => (
        <RideButton
          key={index}
          icon={button.icon}
          label={button.label}
          onPress={button.onPress}
          variant={button.variant}
        />
      ))}
    </View>
  );
}
