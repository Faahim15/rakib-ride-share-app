import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import EditProfile from "@/src/components/passenger/profile/EditProfile";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function edit_profile() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "Olivia Rae",
    // email: "oliviarae12@gmail.com",
    phone: "+390612345678",
    location: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View className="bg-white flex-1">
      <View className="pt-[2%] justify-center items-center">
        <EditProfile />
      </View>

      <View className="px-[6%]">
        <CustomInput
          label={t("auth.signUp.fields.name")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.namePlaceholder"),
            autoCapitalize: "words",
            value: formData.fullName,
            onChangeText: (text) => handleChange("fullName", text),
          }}
        />
        {/* <CustomInput
          label={t("auth.signUp.fields.email")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.emailPlaceholder"),
            keyboardType: "email-address",
            autoCapitalize: "none",
            value: formData.email,
            onChangeText: (text) => handleChange("email", text),
          }}
        /> */}

        <CustomInput
          label={t("auth.signUp.fields.phone")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.phonePlaceholder"),
            keyboardType: "phone-pad",
            value: formData.phone,
            onChangeText: (text) => handleChange("phone", text),
          }}
        />
        <CustomInput
          label={t("auth.signUp.fields.location")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.locationPlaceholder"),
            keyboardType: "default",
            value: formData.location,
            onChangeText: (text) => handleChange("location", text),
          }}
        />
        <View className="pt-[3%]">
          <AuthButton
            onPress={() => router.back()}
            title={t("auth.signUp.editButton")}
          />
        </View>
      </View>
    </View>
  );
}
