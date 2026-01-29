import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomInput from "@/src/components/passenger/auth/CustomInput";
import Logo from "@/src/components/passenger/auth/Logo";
import VerifyHeader from "@/src/components/passenger/auth/VerifyHeader";
import VerifyLogo from "@/src/components/passenger/auth/VerifyLogo";
import VerificationSuccessModal from "@/src/components/passenger/modal/VerificationSuccessModal";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function ForgotPassword() {
  const { t } = useLanguage();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleResetPassword = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      router.push("/(passenger)/shared/join-as");
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleContinue = () => {
    setShowSuccessModal(false);
    router.push("/(passenger)/shared/join-as");
    console.log("Continue to next screen");
  };
  return (
    <View className="flex-1 px-[6%] bg-white">
      <Logo />
      <VerifyLogo />
      <VerifyHeader
        title={t("auth.setPassword.title")}
        subtitle={t("auth.setPassword.subtitle")}
      />
      <View className="mt-[5%]">
        <CustomInput
          label={t("auth.setPassword.passwordHeader")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.passwordPlaceholder"),
            secureTextEntry: true,
            value: formData.password,
            onChangeText: (text) => handleChange("password", text),
          }}
        />

        <CustomInput
          label={t("auth.setPassword.confirmPassword")}
          textInputConfig={{
            placeholder: t("auth.signUp.fields.passwordPlaceholder"),
            secureTextEntry: true,
            value: formData.confirmPassword,
            onChangeText: (text) => handleChange("confirmPassword", text),
          }}
        />
      </View>

      <View className="mt-[5%]">
        <AuthButton
          onPress={handleResetPassword}
          title={t("auth.setPassword.buttonText")}
        />
      </View>
      <VerificationSuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onContinue={handleContinue}
        title={t("auth.verifyNumber.verifySuccessTitle")}
        subtitle={t("auth.setPassword.modalSubtitle")}
      />
    </View>
  );
}
