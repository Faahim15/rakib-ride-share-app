import BillingPeriodSelector from "@/src/components/shared/BillingPeriodSelector";
import UnlimitedModeModal from "@/src/components/shared/modal/UnlimitedModeModal";
import PhoneNumberInput from "@/src/components/shared/PhoneNumberInput";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface BillingPeriod {
  value: string;
  label: string;
}

interface UnlimitedMode {
  value: string;
  label: string;
}

export default function RakibPaymentForm() {
  const { t } = useLanguage();
  const [billingPeriod, setBillingPeriod] = useState("");
  const [unlimitedMode, setUnlimitedMode] = useState("");
  const [unlimitedModeLabel, setUnlimitedModeLabel] = useState(
    t("shared.rakibPaymentForm.selectMode"),
  );
  const { id } = useLocalSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rakibUsername, setRakibUsername] = useState("");
  const [modeModalVisible, setModeModalVisible] = useState(false);

  const billingPeriods: BillingPeriod[] = [
    { value: "monthly", label: t("shared.rakibPaymentForm.monthly") },
    { value: "yearly", label: t("shared.rakibPaymentForm.yearly") },
  ];

  const handleBillingPeriodSelect = (period: BillingPeriod) => {
    setBillingPeriod(period.value);
  };

  const handleUnlimitedModeSelect = (mode: UnlimitedMode) => {
    setUnlimitedMode(mode.value);
    setUnlimitedModeLabel(mode.label);
    setModeModalVisible(false);
  };

  const labelColor: Record<string, string> = {
    getplus: "#7C3AED",
    allAccess: "#D97706",
    premium: "#2563EB",
  };
  const bgColor: Record<string, string> = {
    getplus: "#F5F3FF",
    allAccess: "#FFFBEB",
    premium: "#EFF6FF",
  };

  const normalizedId = Array.isArray(id) ? id[0] : (id ?? "");

  const btnColor = labelColor[normalizedId];
  const backgroundColor = bgColor[normalizedId] ?? "#eff6ff";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: backgroundColor }}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Container */}
        <View className="px-[6%] mt-8">
          {/* Billing Period Selector Component */}
          <BillingPeriodSelector
            selectedPeriod={billingPeriod}
            onSelectPeriod={handleBillingPeriodSelect}
            billingPeriods={billingPeriods}
          />

          {/* Choose Unlimited Mode */}
          <View className="mb-[3%]">
            <Text className="text-base font-poppins font-semibold text-gray-800 mb-[1%]">
              {t("shared.rakibPaymentForm.chooseUnlimitedMode")}
            </Text>
            <TouchableOpacity
              onPress={() => setModeModalVisible(true)}
              className="border border-gray-300 rounded-lg bg-white px-4 py-3 flex-row justify-between items-center mb-3"
            >
              <Text className="text-base font-poppins text-gray-700">
                {unlimitedModeLabel}
              </Text>
              <Ionicons name="chevron-down" size={24} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Upgrade Link */}

            {id === "premium" && (
              <View className="flex-row flex-wrap">
                <Text className="text-sm font-poppins text-gray-600">
                  {t("shared.rakibPaymentForm.wantUnlimitedRides")}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/shared/rakib-payment-form",
                      params: { id: "allAccess" },
                    })
                  }
                >
                  <Text className="text-sm font-poppins font-semibold text-blue-600 underline">
                    {t("shared.rakibPaymentForm.upgradeToAllAccess")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Unlimited Mode Modal */}
          <Modal
            visible={modeModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModeModalVisible(false)}
          >
            <UnlimitedModeModal
              selectedMode={unlimitedMode}
              setSelectedMode={setUnlimitedMode}
              handleUnlimitedMode={handleUnlimitedModeSelect}
            />
          </Modal>

          {/* Rakib Username */}
          <View className="mb-[3%]">
            <Text className="text-base font-poppins font-semibold text-gray-800 mb-[1%]">
              {t("shared.rakibPaymentForm.rakibUsername")}
            </Text>
            <TextInput
              value={rakibUsername}
              onChangeText={setRakibUsername}
              placeholder={t(
                "shared.rakibPaymentForm.rakibUsernamePlaceholder",
              )}
              placeholderTextColor="#D1D5DB"
              className="border border-gray-300 rounded-lg bg-white px-4 py-3 font-poppins text-gray-700"
            />
          </View>

          {/* Full Name */}
          <View className="mb-[3%]">
            <Text className="text-base font-poppins font-semibold text-gray-800 mb-[1%]">
              {t("shared.rakibPaymentForm.fullName")}
            </Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder={t("shared.rakibPaymentForm.fullNamePlaceholder")}
              placeholderTextColor="#D1D5DB"
              className="border border-gray-300 rounded-lg bg-white px-4 py-3 font-poppins text-gray-700"
            />
          </View>

          {/* Email */}
          <View className="mb-[3%]">
            <Text className="text-base font-poppins font-semibold text-gray-800 mb-[1%]">
              {t("shared.rakibPaymentForm.emailUsedOnRakib")}
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={t("shared.rakibPaymentForm.emailPlaceholder")}
              placeholderTextColor="#D1D5DB"
              keyboardType="email-address"
              className="border border-gray-300 rounded-lg bg-white px-4 py-3 font-poppins text-gray-700"
            />
          </View>

          {/* Phone Number */}
          {/* Phone Number */}
          <View className="mb-[3%]">
            <PhoneNumberInput />
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-4">
            {/* Credit Card Button - Disabled */}
            <TouchableOpacity
              disabled
              className="bg-gray-300 rounded-lg py-4 flex-row items-center justify-center"
            >
              <Ionicons name="card" size={20} color="#6B7280" />
              <Text className="font-poppins font-semibold text-gray-600 ml-2">
                {t("shared.rakibPaymentForm.payNowWithCreditCard")}
              </Text>
            </TouchableOpacity>

            {/* Email Payment Button */}
            <TouchableOpacity
              style={{ backgroundColor: btnColor }}
              className=" rounded-lg py-4 flex-row items-center justify-center"
            >
              <Ionicons name="mail" size={20} color="#FFFFFF" />
              <Text className="font-poppins font-semibold text-white ml-2">
                {t("shared.rakibPaymentForm.receivePaymentInfoByEmail")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
