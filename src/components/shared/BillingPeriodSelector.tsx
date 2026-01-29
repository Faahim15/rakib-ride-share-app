import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface BillingPeriod {
  value: string;
  label: string;
}

interface BillingPeriodSelectorProps {
  selectedPeriod: string;
  onSelectPeriod: (period: BillingPeriod) => void;
  billingPeriods?: BillingPeriod[];
}

export default function BillingPeriodSelector({
  selectedPeriod,
  onSelectPeriod,
  billingPeriods = [
    { value: "monthly", label: "Monthly, 4 JOD" },
    { value: "yearly", label: "Yearly, 40 JOD" },
  ],
}: BillingPeriodSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useLanguage();
  const selectedLabel =
    billingPeriods.find((p) => p.value === selectedPeriod)?.label || "Select";

  const handleSelectPeriod = (period: BillingPeriod) => {
    onSelectPeriod(period);
    setModalVisible(false);
  };

  const renderBillingItem = ({
    item,
    index,
  }: {
    item: BillingPeriod;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => handleSelectPeriod(item)}
      className={`px-[6%] py-4 ${index === 0 ? "bg-blue-600" : "bg-white"} ${
        index < billingPeriods.length - 1 ? "border-b border-gray-200" : ""
      }`}
    >
      <Text
        className={`text-base font-poppins ${index === 0 ? "text-white" : "text-gray-900"}`}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mb-[3%]">
      <Text className="text-base font-poppins font-semibold text-gray-800 mb-[1%]">
        {t("shared.rakibPaymentForm.billingPeriod")}
      </Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="border border-gray-300 rounded-lg bg-white px-4 py-3 flex-row justify-between items-center"
      >
        <Text className="text-base font-poppins text-gray-700">
          {selectedLabel}
        </Text>
        <Ionicons name="chevron-down" size={24} color="#9CA3AF" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center px-4">
          <View className="bg-white rounded-lg overflow-hidden">
            <FlatList
              data={billingPeriods}
              renderItem={renderBillingItem}
              keyExtractor={(item) => item.value}
              scrollEnabled={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
