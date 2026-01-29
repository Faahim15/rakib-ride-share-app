import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import Logo from "@/src/components/passenger/auth/Logo";
import VerifyHeader from "@/src/components/passenger/auth/VerifyHeader";
import VerifyLogo from "@/src/components/passenger/auth/VerifyLogo";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function ForgotPassword() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <View className="flex-1 px-[6%] bg-white">
      <Logo />
      <VerifyLogo />
      <VerifyHeader
        title={t("auth.forgotPassword.title")}
        subtitle={t("auth.forgotPassword.subtitle")}
      />
      <View className="mt-[5%]">
        <CustomInput
          label={t("auth.signUp.fields.email")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.emailPlaceholder"),
            keyboardType: "email-address",
            autoCapitalize: "none",
            value: formData.email,
            onChangeText: (text) => handleChange("email", text),
          }}
        />
      </View>

      <View className="mt-[5%]">
        <AuthButton
          onPress={() => router.push("/(passenger)/auth/verify-password")}
          title={t("auth.forgotPassword.send")}
        />
      </View>
    </View>
  );
}
