import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Switch, Text, View } from "react-native";

interface AmenitiesProps {
  acEnabled: boolean;
  setAcEnabled: (value: boolean) => void;
  usbEnabled: boolean;
  setUsbEnabled: (value: boolean) => void;
  wifiEnabled: boolean;
  setWifiEnabled: (value: boolean) => void;
  smokingEnabled: boolean;
  setSmokingEnabled: (value: boolean) => void;
  musicEnabled: boolean;
  setMusicEnabled: (value: boolean) => void;
}

export default function Amenities({
  acEnabled,
  setAcEnabled,
  usbEnabled,
  setUsbEnabled,
  wifiEnabled,
  setWifiEnabled,
  smokingEnabled,
  setSmokingEnabled,
  musicEnabled,
  setMusicEnabled,
}: AmenitiesProps) {
  const { t } = useLanguage();

  return (
    <View className="mt-6 bg-white">
      <View className="flex-row justify-between items-center py-3 border-b border-brandColor">
        <Text className="font-poppinsMedium text-base text-gray-900">
          {t("driver.addVehicleDetails.amenities.ac")}
        </Text>
        <Switch
          value={acEnabled}
          onValueChange={setAcEnabled}
          trackColor={{ false: "#D1D5DB", true: "#BFEAEB" }}
          thumbColor={acEnabled ? "#00ABB0" : "#F3F4F6"}
        />
      </View>
      <View className="flex-row justify-between items-center py-3 border-b border-brandColor">
        <Text className="font-poppinsMedium text-base text-gray-900">
          {t("driver.addVehicleDetails.amenities.usb")}
        </Text>
        <Switch
          value={usbEnabled}
          onValueChange={setUsbEnabled}
          trackColor={{ false: "#D1D5DB", true: "#BFEAEB" }}
          thumbColor={usbEnabled ? "#00ABB0" : "#F3F4F6"}
        />
      </View>
      <View className="flex-row justify-between items-center py-3 border-b border-brandColor">
        <Text className="font-poppinsMedium text-base text-gray-900">
          {t("driver.addVehicleDetails.amenities.wifi")}
        </Text>
        <Switch
          value={wifiEnabled}
          onValueChange={setWifiEnabled}
          trackColor={{ false: "#D1D5DB", true: "#BFEAEB" }}
          thumbColor={wifiEnabled ? "#00ABB0" : "#F3F4F6"}
        />
      </View>
      <View className="flex-row justify-between items-center py-3 border-b border-brandColor">
        <Text className="font-poppinsMedium text-base text-gray-900">
          {t("driver.addVehicleDetails.amenities.smoking")}
        </Text>
        <Switch
          value={smokingEnabled}
          onValueChange={setSmokingEnabled}
          trackColor={{ false: "#D1D5DB", true: "#BFEAEB" }}
          thumbColor={smokingEnabled ? "#00ABB0" : "#F3F4F6"}
        />
      </View>
      <View className="flex-row justify-between items-center py-3">
        <Text className="font-poppinsMedium text-base text-gray-900">
          {t("driver.addVehicleDetails.amenities.music")}
        </Text>
        <Switch
          value={musicEnabled}
          onValueChange={setMusicEnabled}
          trackColor={{ false: "#D1D5DB", true: "#BFEAEB" }}
          thumbColor={musicEnabled ? "#00ABB0" : "#F3F4F6"}
        />
      </View>
    </View>
  );
}
