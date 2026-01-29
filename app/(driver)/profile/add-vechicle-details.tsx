import TrunkSizeSelector from "@/src/components/driver/profile/TrunkSizeSelector";
import VehicleTypeSelector, {
  VehicleType,
} from "@/src/components/driver/profile/VehicleType";
import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import Amenities from "@/src/components/passenger/tabs/trip/Amenities";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { verticalScale } from "@/src/utils/scaling";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

export default function AddVehicleDetails() {
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null);
  const [acEnabled, setAcEnabled] = React.useState(false);
  const [usbEnabled, setUsbEnabled] = React.useState(false);
  const [wifiEnabled, setWifiEnabled] = React.useState(false);
  const [smokingEnabled, setSmokingEnabled] = React.useState(false);
  const [musicEnabled, setMusicEnabled] = React.useState(false);
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    carModel: "",
    licensePlate: "",
    numberOfSeats: "",
    vehicleType: "",
    acEnabled: false,
    usbEnabled: false,
    wifiEnabled: false,
    smokingAllowed: false,
    musicEnabled: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: verticalScale(80) }}
    >
      <View className="px-[6%] mt-[5%]">
        <CustomInput
          label={t("driver.addVehicleDetails.carModel")}
          labelColor="#000"
          textInputConfig={{
            placeholder: t("driver.addVehicleDetails.carModelPlaceholder"),
            value: formData.carModel,
            onChangeText: (text) => handleChange("carModel", text),
          }}
        />

        <CustomInput
          label={t("driver.addVehicleDetails.licensePlate")}
          labelColor="#000"
          textInputConfig={{
            placeholder: t("driver.addVehicleDetails.licensePlatePlaceholder"),
            value: formData.licensePlate,
            onChangeText: (text) => handleChange("licensePlate", text),
          }}
        />

        <VehicleTypeSelector
          value={vehicleType}
          onChange={(vehicle) => {
            setVehicleType(vehicle);
            handleChange("vehicleType", vehicle.value);
          }}
        />
        <View className="mt-[3%]">
          <CustomInput
            label={t("driver.addVehicleDetails.numberOfSeats")}
            labelColor="#000"
            textInputConfig={{
              placeholder: t(
                "driver.addVehicleDetails.numberOfSeatsPlaceholder"
              ),
              keyboardType: "phone-pad",
              value: formData.numberOfSeats,
              onChangeText: (text) => handleChange("numberOfSeats", text),
            }}
          />
        </View>
        <View className="mt-[3%]">
          <TrunkSizeSelector />
        </View>
        {/* Amenities */}
        <Amenities
          acEnabled={acEnabled}
          setAcEnabled={(value) => {
            setAcEnabled(value);
            handleChange("acEnabled", value);
          }}
          usbEnabled={usbEnabled}
          setUsbEnabled={(value) => {
            setUsbEnabled(value);
            handleChange("usbEnabled", value);
          }}
          wifiEnabled={wifiEnabled}
          setWifiEnabled={(value) => {
            setWifiEnabled(value);
            handleChange("wifiEnabled", value);
          }}
          smokingEnabled={smokingEnabled}
          setSmokingEnabled={(value) => {
            setSmokingEnabled(value);
            handleChange("smokingAllowed", value);
          }}
          musicEnabled={musicEnabled}
          setMusicEnabled={(value) => {
            setMusicEnabled(value);
            handleChange("musicEnabled", value);
          }}
        />
      </View>

      <View className="px-[6%] mt-[3%] ">
        <AuthButton
          title={t("driver.addVehicleDetails.save")}
          onPress={() => router.push("/(driver)/profile/vehicle-summary")}
        />
      </View>
    </ScrollView>
  );
}
