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
import BioInput from "@/src/components/driver/settings/BioInput";
import LocationPicker from "@/src/components/driver/settings/LocationPicker";
import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import EditProfile from "@/src/components/passenger/profile/EditProfile";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { LocationCoords } from "@/src/mockData/driver/myRides.data";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Edit_Profile() {
  const { t } = useLanguage();
  const [image, setImage] = useState<SelectedFile | null>(null);
  const [selectedState, setSelectedState] = useState<Governorate | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [languages, setLanguages] = useState<SelectedLanguage[]>([]);
  const [locationCoords, setLocationCoords] = useState<LocationCoords | null>(
    null,
  );
  const [formData, setFormData] = useState({
    fullName: "Mrs Letizia",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    state: "",
    licenseNumber: "",
    dateOfBirth: "",
    bio: "Hello i'm a driver",
    latitude: "",
    longitude: "",
  });

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, dateOfBirth: formattedDate }));
    } else {
      setFormData((prev) => ({ ...prev, dateOfBirth: "" }));
    }
  };

  const handleLocationSelect = (location: string, coords: LocationCoords) => {
    setLocationCoords(coords);
    setFormData((prev) => ({
      ...prev,
      location: location,
      latitude: coords.latitude.toString(),
      longitude: coords.longitude.toString(),
    }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (!formData.fullName) {
      alert("Please enter your full name");
      return;
    }
    if (!formData.email) {
      alert("Please enter your email");
      return;
    }
    if (!formData.phone) {
      alert("Please enter your phone number");
      return;
    }
    if (!formData.location) {
      alert("Please select a location");
      return;
    }
    if (!dateOfBirth) {
      alert("Please select your date of birth");
      return;
    }
    if (!selectedState) {
      alert("Please select a state");
      return;
    }

    // Log or submit the form data
    console.log("Form Data:", formData);
    console.log("Languages:", languages);
    console.log("Image:", image);

    // TODO: Submit to backend
    router.back();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-[2%] justify-center items-center">
          <EditProfile />
        </View>

        <View className="px-[6%] pb-[6%]">
          {/* Bio */}
          <BioInput
            label={t("auth.signUp.fields.bio")}
            textInputConfig={{
              placeholder: t("auth.signUp.fields.bioPlaceholder"),
              autoCapitalize: "none",
              value: formData.bio,
              onChangeText: (text) => handleChange("bio", text),
            }}
          />
          {/* Image Upload */}
          <View className="mb-[2%]">
            <Text className="font-poppins text-sm text-[#6C6C70] mt-4 mb-2">
              {t("driver.driverProfileTexts.nidUpload")}
            </Text>
            <ImageSelector selectedFile={image} onFileSelect={setImage} />
          </View>

          {/* License Number */}
          <CustomInput
            label={t("driver.driverProfileTexts.licenseNumberLabel")}
            textInputConfig={{
              placeholder: t("driver.driverProfileTexts.licenseNumberLabel"),
              keyboardType: "phone-pad",
              value: formData.licenseNumber,
              onChangeText: (text) => handleChange("licenseNumber", text),
            }}
          />

          {/* Full Name */}
          <CustomInput
            label="Full Name"
            textInputConfig={{
              placeholder: t("auth.signUp.fields.namePlaceholder"),
              autoCapitalize: "words",
              value: formData.fullName,
              onChangeText: (text) => handleChange("fullName", text),
            }}
          />

          {/* Email */}
          <CustomInput
            label="Email Address"
            textInputConfig={{
              placeholder: t("auth.signUp.fields.emailPlaceholder"),
              keyboardType: "email-address",
              autoCapitalize: "none",
              value: formData.email,
              onChangeText: (text) => handleChange("email", text),
            }}
          />

          {/* Phone */}
          <CustomInput
            label="Phone Number"
            textInputConfig={{
              placeholder: t("auth.signUp.fields.phonePlaceholder"),
              keyboardType: "phone-pad",
              value: formData.phone,
              onChangeText: (text) => handleChange("phone", text),
            }}
          />

          {/* Location Picker */}
          <LocationPicker
            label="Select Your Location"
            value={formData.location}
            onLocationSelect={handleLocationSelect}
            placeholder="Tap to search location"
          />

          {/* Date of Birth */}
          <DateOfBirthPicker value={dateOfBirth} onChange={handleDateChange} />

          {/* Languages */}
          <LanguageDropdown
            selectedLanguages={languages}
            onLanguagesChange={setLanguages}
            maxSelections={5}
            placeholder="Select your languages"
          />

          {/* State/Governorate */}
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

          {/* Submit Button */}
          <View className="pt-[3%]">
            <AuthButton
              onPress={handleSubmit}
              title={t("auth.signUp.editButton")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
