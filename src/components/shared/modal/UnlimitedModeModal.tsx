import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface UnlimitedMode {
  value: string;
  label: string;
}

interface UnlimitedModeHandler {
  selectedMode: string | null;
  setSelectedMode: (mode: string) => void;
  handleUnlimitedMode: (mode: UnlimitedMode) => void;
}

export default function UnlimitedModeModal({
  selectedMode,
  setSelectedMode,
  handleUnlimitedMode,
}: UnlimitedModeHandler) {
  const { t } = useLanguage();

  const unlimitedModes: UnlimitedMode[] = [
    {
      value: "passenger",
      label: t("shared.rakibPaymentForm.unlimitedModeModal.passengerModeOnly"),
    },
    {
      value: "driver",
      label: t("shared.rakibPaymentForm.unlimitedModeModal.driverModeOnly"),
    },
  ];

  const renderModeItem = ({
    item,
    index,
  }: {
    item: UnlimitedMode;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedMode(item.value);
        handleUnlimitedMode(item);
      }}
      className={`px-[6%] py-4 bg-white ${
        index < unlimitedModes.length - 1 ? "border-b border-gray-200" : ""
      }`}
    >
      <Text
        className={`text-base font-poppins ${
          selectedMode === item.value
            ? "text-blue-600 font-semibold"
            : "text-gray-900"
        }`}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black/50 justify-center px-4">
      <View className="bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <View className="bg-blue-600 px-[6%] py-4">
          <Text className="text-base font-poppins font-semibold text-white">
            {t("shared.rakibPaymentForm.unlimitedModeModal.selectMode")}
          </Text>
        </View>

        {/* Mode Options */}
        <FlatList
          data={unlimitedModes}
          renderItem={renderModeItem}
          keyExtractor={(item) => item.value}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}
