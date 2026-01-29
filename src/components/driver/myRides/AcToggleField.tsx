import { useLanguage } from "@/src/localization/LangaugeContext";
import { Text, TouchableOpacity, View } from "react-native";

export default function ACToggleField({
  acEnabled,
  onToggle,
}: {
  acEnabled: boolean;
  onToggle: (value: boolean) => void;
}) {
  const { t } = useLanguage();

  return (
    <View className="mb-6 flex-row items-center justify-between bg-gray-50 p-4 rounded-lg">
      <Text className="text-gray-700 font-poppinsSemiBold text-sm">
        {t("driver.tabs.myTrip.publishedRides.acLabel")}
      </Text>
      <TouchableOpacity
        onPress={() => onToggle(!acEnabled)}
        className={`w-14 h-8 rounded-full flex-row items-center ${
          acEnabled ? "bg-brandColor" : "bg-gray-300"
        }`}
      >
        <View
          className={`w-6 h-6 rounded-full bg-white transition-all ${
            acEnabled ? "ml-7" : "ml-1"
          }`}
        />
      </TouchableOpacity>
    </View>
  );
}
