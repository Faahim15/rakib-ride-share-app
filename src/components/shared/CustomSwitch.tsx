import React from "react";
import { Switch, Text, View } from "react-native";
interface AmenitiesProps {
  acEnabled: boolean;
  setAcEnabled: (value: boolean) => void;
  title: string;
}
export default function CustomSwitch({
  acEnabled,
  setAcEnabled,
  title,
}: AmenitiesProps) {
  return (
    <View className="flex-row justify-between items-center py-[1%] ">
      <Text className="font-poppinsMedium text-base text-gray-900">
        {title}
      </Text>
      <Switch
        value={acEnabled}
        onValueChange={setAcEnabled}
        trackColor={{ false: "#D1D5DB", true: "#BFEAEB" }}
        thumbColor={acEnabled ? "#00ABB0" : "#F3F4F6"}
      />
    </View>
  );
}
