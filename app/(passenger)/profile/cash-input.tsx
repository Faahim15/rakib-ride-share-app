import AuthButton from "@/src/components/passenger/auth/AuthButton";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

export default function CashInputScreen() {
  const [cashAmount, setCashAmount] = useState("");
  const { t } = useLanguage();

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center px-[6%]">
          <View className="w-full">
            <TextInput
              value={cashAmount}
              onChangeText={setCashAmount}
              placeholder={t(
                "passenger.tabs.paymentScreenTexts.actions.enterCash"
              )}
              placeholderTextColor="#898989"
              keyboardType="numeric"
              className="font-poppins text-base text-gray-400 border-b border-gray-300 pb-[2%] text-center"
              style={{ fontFamily: "Poppins_400Regular" }}
            />
          </View>
        </View>
        <View className="px-[6%] pb-[20%]">
          <AuthButton
            onPress={() => router.back()}
            title={t("passenger.tabs.paymentScreenTexts.actions.proceed")}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
