import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PaymentMethod {
  id: string;
  name: string;
  icon: "cash" | "wallet" | "logo-paypal" | "card" | "qr-code";
  selected: boolean;
  available: boolean;
  color: string;
}

export default function PaymentMethodScreen() {
  const [amount] = useState("235");
  const [currency] = useState("JOD");
  const [selectedMethod, setSelectedMethod] = useState<string>("cash");
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [unavailableMethodName, setUnavailableMethodName] = useState("");
  const { t } = useLanguage();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "cash",
      name: "Cash",
      icon: "cash",
      selected: true,
      available: true,
      color: "bg-teal-100",
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: "wallet",
      selected: false,
      available: false,
      color: "bg-slate-300",
    },
    {
      id: "paypal",
      name: "Paypal",
      icon: "logo-paypal",
      selected: false,
      available: false,
      color: "bg-slate-300",
    },
    {
      id: "card",
      name: "Credit Card",
      icon: "card",
      selected: false,
      available: false,
      color: "bg-slate-300",
    },
    {
      id: "cliq",
      name: "CliQ",
      icon: "qr-code",
      selected: false,
      available: false,
      color: "bg-slate-300",
    },
  ]);

  const handleSelectMethod = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId);

    if (!method?.available) {
      setUnavailableMethodName(method?.name || "");
      setShowUnavailableModal(true);
      return;
    }

    setSelectedMethod(methodId);
    setPaymentMethods(
      paymentMethods.map((m) => ({
        ...m,
        selected: m.id === methodId,
        color: m.id === methodId ? "bg-brandColor" : "bg-slate-300",
      }))
    );
  };

  const renderPaymentMethod = ({ item }: { item: PaymentMethod }) => (
    <TouchableOpacity
      onPress={() => handleSelectMethod(item.id)}
      className={`w-[90%] mx-auto mb-[3%] p-[3%] rounded-xl flex-row items-center justify-between transition-colors duration-200 ${item.color} ${
        !item.available ? "opacity-70" : ""
      }`}
      activeOpacity={0.7}
      disabled={!item.available}
    >
      <View className="flex-row items-center flex-1">
        <View
          style={{ width: scale(38), height: verticalScale(38) }}
          className="rounded-lg bg-white/40 items-center justify-center mr-4"
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={item.selected ? "#14b8a6" : "#64748b"}
          />
        </View>
        <View className="flex-1">
          <Text
            className={`font-poppins text-base ${
              item.selected
                ? "text-brandColor font-poppinsMedium"
                : "text-slate-600"
            }`}
          >
            {item.name}
          </Text>
          {!item.available && (
            <Text className="text-xs font-poppins text-slate-500 mt-1">
              Coming soon
            </Text>
          )}
        </View>
      </View>
      {item.selected && (
        <View
          style={{ height: verticalScale(24), width: scale(24) }}
          className="rounded-full bg-brandColor items-center justify-center"
        >
          <Ionicons name="checkmark" size={16} color="white" />
        </View>
      )}
      {!item.selected && item.available && (
        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
      )}
      {!item.available && (
        <Ionicons name="lock-closed" size={20} color="#000" />
      )}
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: verticalScale(40),
        }}
        className="flex-1"
      >
        {/* Header Section */}
        <View className="pt-12 pb-6 px-[6%] bg-gradient-to-b from-slate-50 to-white">
          <Text className="text-slate-500 text-sm font-poppins mb-3">
            {t("passenger.tabs.paymentScreenTexts.header.amount")}
          </Text>
          <Text className="text-5xl font-poppinsBold text-slate-900 tracking-tight">
            <Text className="text-slate-400">{amount}</Text>
            <Text className="text-2xl text-brandColor">{currency}</Text>
          </Text>
        </View>

        {/* Payment Methods Section */}
        <View className="flex-1 px-[2%] py-[6%]">
          <Text className="text-xs font-poppinsSemiBold text-slate-500 uppercase tracking-widest px-[4%] mb-6">
            {t("passenger.tabs.paymentScreenTexts.section.selectPaymentMethod")}
          </Text>

          <FlatList
            data={paymentMethods}
            renderItem={renderPaymentMethod}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/* Action Buttons */}
        <View className="px-[5%] pb-8 gap-3">
          <TouchableOpacity
            className="w-full bg-brandColor rounded-xl py-4 shadow-lg shadow-teal-300 active:bg-teal-600"
            activeOpacity={0.85}
          >
            <Text className="text-white text-center font-poppinsSemiBold text-lg">
              {t("passenger.tabs.paymentScreenTexts.actions.payWith")}{" "}
              {paymentMethods.find((m) => m.selected)?.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(passenger)/profile/payments")}
            className="w-full bg-teal-500/10 border-2 border-brandColor rounded-xl py-4 active:bg-teal-500/20"
            activeOpacity={0.85}
          >
            <Text className="text-brandColor text-center font-poppinsSemiBold text-lg">
              {t("passenger.tabs.paymentScreenTexts.actions.topUp")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Unavailable Modal */}
      <Modal
        transparent
        visible={showUnavailableModal}
        animationType="fade"
        onRequestClose={() => setShowUnavailableModal(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center px-[10%]">
          <View className="bg-white rounded-2xl p-8 w-full shadow-2xl">
            <View className="items-center mb-6">
              <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4">
                <Ionicons name="information-circle" size={32} color="#64748b" />
              </View>
              <Text className="text-xl font-poppinsSemiBold text-slate-900 mb-2">
                Not Available Yet
              </Text>
              <Text className="text-center text-slate-600 font-poppins">
                {unavailableMethodName} payment option is coming soon. Please
                use Cash for now.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setShowUnavailableModal(false)}
              className="bg-teal-500 rounded-xl py-3 active:bg-teal-600"
              activeOpacity={0.85}
            >
              <Text className="text-white text-center font-poppinsSemiBold">
                Got It
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
