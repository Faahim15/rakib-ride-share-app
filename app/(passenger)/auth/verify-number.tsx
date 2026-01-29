import AuthButton from "@/src/components/passenger/auth/AuthButton";
import Logo from "@/src/components/passenger/auth/Logo";
import OtpField from "@/src/components/passenger/auth/OtpField";
import ResendCode from "@/src/components/passenger/auth/ResendCode";
import VerifyHeader from "@/src/components/passenger/auth/VerifyHeader";
import VerifyLogo from "@/src/components/passenger/auth/VerifyLogo";
import VerificationSuccessModal from "@/src/components/passenger/modal/VerificationSuccessModal";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function VerifyNumber() {
  const { t } = useLanguage();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otpValue, setOtpValue] = useState(""); // store OTP here

  const handleVerify = () => {
    console.log("OTP entered:", otpValue); // You can use this OTP
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.push("/(passenger)/shared/join-as");
    console.log("Continue to next screen");
  };

  return (
    <View className="px-[6%] flex-1 bg-white">
      <Logo />
      <VerifyLogo />
      <VerifyHeader
        title={t("auth.verifyNumber.title")}
        subtitle={t("auth.verifyNumber.subtitle")}
      />
      <OtpField onOtpChange={(otpArray) => setOtpValue(otpArray.join(""))} />
      <AuthButton
        title={t("auth.verifyNumber.buttonTitle")}
        onPress={handleVerify}
      />
      <ResendCode />
      <VerificationSuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onContinue={handleContinue}
        title={t("auth.verifyNumber.verifySuccessTitle")}
        subtitle={t("auth.verifyNumber.verifySuccessSubtitle")}
      />
    </View>
  );
}
