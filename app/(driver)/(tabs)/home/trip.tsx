import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import CustomSwitch from "@/src/components/shared/CustomSwitch";
import LocationInput from "@/src/components/shared/LocationInput";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { verticalScale } from "@/src/utils/scaling";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface LocationData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupMarker: LocationCoords | null;
  dropoffMarker: LocationCoords | null;
}

export default function MyTrip() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    numberOfSeat: "",
    pricePerSeat: "",
    fullCarPrice: "",
    acEnabled: false,
    locationData: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupMarker: null as LocationCoords | null,
      dropoffMarker: null as LocationCoords | null,
    },
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (data: LocationData) => {
    setFormData((prev) => ({ ...prev, locationData: data }));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: verticalScale(80),
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-[6%] pt-[4%] bg-white">
          <LocationInput onLocationChange={handleLocationChange} />

          <View>
            <CustomInput
              label={t("driver.tabs.myTrip.numberOfSeat")}
              labelColor="#111827"
              textInputConfig={{
                placeholder: t("driver.tabs.myTrip.numberOfSeatPlaceholder"),
                keyboardType: "phone-pad",
                value: formData.numberOfSeat,
                onChangeText: (text) => handleChange("numberOfSeat", text),
              }}
            />
            <CustomInput
              label={t("driver.tabs.myTrip.pricePerSeat")}
              labelColor="#111827"
              textInputConfig={{
                placeholder: t("driver.tabs.myTrip.pricePerSeatPlaceholder"),
                keyboardType: "phone-pad",
                value: formData.pricePerSeat,
                onChangeText: (text) => handleChange("pricePerSeat", text),
              }}
            />
            <CustomInput
              label={t("driver.tabs.myTrip.fullCarPrice")}
              labelColor="#111827"
              textInputConfig={{
                placeholder: t("driver.tabs.myTrip.fullCarPricePlaceholder"),
                keyboardType: "phone-pad",
                value: formData.fullCarPrice,
                onChangeText: (text) => handleChange("fullCarPrice", text),
              }}
            />
            <CustomSwitch
              title={t("driver.tabs.myTrip.ladiesOnlyPreference")}
              acEnabled={formData.acEnabled}
              setAcEnabled={(value) => {
                handleChange("acEnabled", value);
              }}
            />

            <View className="mt-[5%]">
              <AuthButton
                onPress={() => {
                  console.log("Form Data:", formData);
                  router.push("/(driver)/(tabs)/home/book-date");
                }}
                title={t("driver.tabs.myTrip.next")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
