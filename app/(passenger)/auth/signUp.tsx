import AgreeWithTerms from "@/src/components/passenger/auth/AgreeWithTerms";
import AuthButton from "@/src/components/passenger/auth/AuthButton";
import AuthFooter from "@/src/components/passenger/auth/AuthFooter";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import GoogleButton from "@/src/components/passenger/auth/GoogleButton";
import Logo from "@/src/components/passenger/auth/Logo";
import OrDivider from "@/src/components/passenger/auth/OrDivider";
import SignUpHeader from "@/src/components/passenger/auth/SignUpHeader";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { verticalScale } from "@/src/utils/scaling";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SignUpScreen() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      {/* Dismiss keyboard when tapping outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: verticalScale(80),
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-[6%]">
            <Logo />
            <SignUpHeader
              title={t("auth.signUp.title")}
              subtitle={t("auth.signUp.subtitle")}
            />

            <View className="mt-[5%]">
              <CustomInput
                label={t("auth.signUp.fields.userName")}
                textInputConfig={{
                  placeholder: t("auth.signUp.fields.userNamePlaceholder"),
                  autoCapitalize: "words",
                  value: formData.userName,
                  onChangeText: (text) => handleChange("userName", text),
                }}
              />
              <CustomInput
                label={t("auth.signUp.fields.name")}
                textInputConfig={{
                  placeholder: t("auth.signUp.fields.namePlaceholder"),
                  autoCapitalize: "words",
                  value: formData.fullName,
                  onChangeText: (text) => handleChange("fullName", text),
                }}
              />

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
                label={t("auth.signUp.fields.phone")}
                textInputConfig={{
                  placeholder: t("auth.signUp.fields.phonePlaceholder"),
                  keyboardType: "phone-pad",
                  value: formData.phone,
                  onChangeText: (text) => handleChange("phone", text),
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

              <CustomInput
                label={t("auth.signUp.fields.confirmPassword")}
                textInputConfig={{
                  placeholder: t("auth.signUp.fields.passwordPlaceholder"),
                  secureTextEntry: true,
                  value: formData.confirmPassword,
                  onChangeText: (text) => handleChange("confirmPassword", text),
                }}
              />
              <AgreeWithTerms
                agreed={agreed}
                onToggle={() => setAgreed((prev) => !prev)}
              />
            </View>
          </View>

          <View className="px-[5.5%]">
            <AuthButton
              disabled={!agreed}
              onPress={() => router.push("/(passenger)/auth/verify-number")}
              title={t("auth.signUp.button")}
            />
            <OrDivider />
            <GoogleButton />
            <AuthFooter
              onPress={() => router.push("/(passenger)/auth/signIn")}
              title={t("auth.signUp.footer.text")}
              subtitle={t("auth.signUp.footer.link")}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
