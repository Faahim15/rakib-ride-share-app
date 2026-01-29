import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function ChangePassword() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <View className="flex-1 px-[6%] bg-white">
      <View className="mt-[5%]">
        <CustomInput
          label={t("tabs.profile.changePasswordScreen.enterCurrentPass")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.passwordPlaceholder"),
            secureTextEntry: true,
            value: formData.currentPass,
            onChangeText: (text) => handleChange("password", text),
          }}
        />

        <CustomInput
          label={t("tabs.profile.changePasswordScreen.enterNewPass")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.passwordPlaceholder"),
            secureTextEntry: true,
            value: formData.newPass,
            onChangeText: (text) => handleChange("confirmPassword", text),
          }}
        />
        <CustomInput
          label={t("tabs.profile.changePasswordScreen.enterconfirmPass")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.passwordPlaceholder"),
            secureTextEntry: true,
            value: formData.confirmPass,
            onChangeText: (text) => handleChange("confirmPass", text),
          }}
        />
        <View className="pt-[4%]">
          <AuthButton
            onPress={() => router.back()}
            title={t("tabs.profile.changePasswordScreen.changePass")}
          />
        </View>
      </View>
    </View>
  );
}
