import DateOfBirthPicker from "@/src/components/driver/profile/DateOfBirthPicker";
import ImageSelector, {
  SelectedFile,
} from "@/src/components/driver/profile/ImageSelector";
import LanguageDropdown, {
  SelectedLanguage,
} from "@/src/components/driver/profile/LanguageDropdown";
import StatePicker, {
  Governorate,
} from "@/src/components/driver/profile/StatePicker";
import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import EditProfile from "@/src/components/passenger/profile/EditProfile";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { verticalScale } from "@/src/utils/scaling";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function DriverProfileSetup() {
  const [image, setImage] = useState<SelectedFile | null>(null);
  const [selectedState, setSelectedState] = useState<Governorate | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    state: "",
    licenseNumber: "",
    dateOfBirth: "",
  });
  const [languages, setLanguages] = useState<SelectedLanguage[]>([]);
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
    // Update formData with formatted date
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
      setFormData((prev) => ({ ...prev, dateOfBirth: formattedDate }));
    } else {
      setFormData((prev) => ({ ...prev, dateOfBirth: "" }));
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: verticalScale(80) }}
      >
        <View className="px-[6%]">
          <View className="items-center pt-[3%]">
            <EditProfile />
          </View>

          <Text className="font-poppins text-sm text-[#6C6C70] mt-4 mb-2">
            {t("driver.driverProfileTexts.nidUpload")}
          </Text>

          <ImageSelector selectedFile={image} onFileSelect={setImage} />

          <View className="mt-6">
            <CustomInput
              label={t("driver.driverProfileTexts.licenseNumberLabel")}
              textInputConfig={{
                placeholder: t("driver.driverProfileTexts.licenseNumberLabel"),
                keyboardType: "phone-pad",
                value: formData.licenseNumber,
                onChangeText: (text) => handleChange("licenseNumber", text),
              }}
            />
            {/* <CustomInput
              label={t("driver.driverProfileTexts.firstNameLabel")}
              textInputConfig={{
                placeholder: t(
                  "driver.driverProfileTexts.firstNamePlaceholder",
                ),
                value: formData.firstName,
                onChangeText: (text) => handleChange("firstName", text),
              }}
            />

            <CustomInput
              label={t("driver.driverProfileTexts.lastNameLabel")}
              textInputConfig={{
                placeholder: t("driver.driverProfileTexts.lastNamePlaceholder"),
                value: formData.lastName,
                onChangeText: (text) => handleChange("lastName", text),
              }}
            /> */}

            <DateOfBirthPicker
              value={dateOfBirth}
              onChange={handleDateChange}
            />

            {/* <LanguageSelector /> */}
            <LanguageDropdown
              selectedLanguages={languages}
              onLanguagesChange={setLanguages}
              maxSelections={5}
              placeholder="Select your languages"
            />
            <StatePicker
              value={selectedState}
              onChange={(gov) => {
                setSelectedState(gov);
                setFormData((prev) => ({
                  ...prev,
                  state: gov.label,
                }));
              }}
            />
          </View>
        </View>

        <View className="px-[6%] pt-[3%]">
          <AuthButton
            onPress={() => router.push("/(driver)/profile/add-vehicle")}
            title={t("driver.driverProfileTexts.saveButton")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
