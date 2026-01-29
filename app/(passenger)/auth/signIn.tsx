import AuthButton from "@/src/components/passenger/auth/AuthButton";
import AuthFooter from "@/src/components/passenger/auth/AuthFooter";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import ForgetPassword from "@/src/components/passenger/auth/ForgetPassword";
import GoogleButton from "@/src/components/passenger/auth/GoogleButton";
import Logo from "@/src/components/passenger/auth/Logo";
import OrDivider from "@/src/components/passenger/auth/OrDivider";
import SignUpHeader from "@/src/components/passenger/auth/SignUpHeader";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function SignIn() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <View className="flex-1 bg-white px-[6%]">
      <Logo />
      <SignUpHeader
        title={t("auth.logIn.title")}
        subtitle={t("auth.logIn.subtitle")}
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

        <CustomInput
          label={t("auth.signUp.fields.password")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.passwordPlaceholder"),
            secureTextEntry: true,
            value: formData.password,
            onChangeText: (text) => handleChange("password", text),
          }}
        />
        <ForgetPassword
          onPress={() => router.push("/(passenger)/auth/forgot-password")}
          title={t("auth.logIn.forgotPassword")}
        />
      </View>
      <View className="mt-[5%]">
        <AuthButton
          onPress={() => router.replace("/(passenger)/shared/join-as")}
          title={t("auth.logIn.title")}
        />
        <OrDivider />
        <GoogleButton />
        <AuthFooter
          title={t("auth.logIn.footer.text")}
          subtitle={t("auth.logIn.footer.link")}
          onPress={() => router.push("/(passenger)/auth/signUp")}
        />
      </View>
    </View>
  );
}
