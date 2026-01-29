import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface VehicleType {
  id: string;
  label: string;
  value: string;
}

interface VehicleTypeSelectorProps {
  value: VehicleType | null;
  onChange: (value: VehicleType) => void;
}

const vehicleTypes: VehicleType[] = [
  { id: "1", label: "Car", value: "car" },
  { id: "5", label: "Minivan", value: "van" },
  { id: "6", label: "Van", value: "pickup" },
];

export default function VehicleTypeSelector({
  value,
  onChange,
}: VehicleTypeSelectorProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { t } = useLanguage();
  const handleSelectVehicle = (vehicle: VehicleType) => {
    onChange(vehicle);
    setIsDropdownVisible(false);
  };

  const renderVehicleItem = ({ item }: { item: VehicleType }) => (
    <TouchableOpacity
      onPress={() => handleSelectVehicle(item)}
      className="px-[6%] py-4 border-b border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between">
        <Text className="font-poppins text-sm text-gray-800">{item.label}</Text>
        {value?.id === item.id && (
          <Ionicons name="checkmark" size={24} color="#00BCD4" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-white"
    >
      <View>
        {/* Label */}
        <Text className="font-poppins text-sm text-black mb-1">
          {t("driver.addVehicleDetails.vehicleType")}
        </Text>

        {/* Dropdown Button */}
        <TouchableOpacity
          onPress={() => setIsDropdownVisible(true)}
          className="border border-gray-300 rounded-xl px-[4%] py-[3%] bg-white"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-between">
            <Text
              className={`font-poppins text-base ${
                value ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {value
                ? value.label
                : t("driver.addVehicleDetails.vehicleTypePlaceholder")}
            </Text>
            <Ionicons
              name={isDropdownVisible ? "chevron-up" : "chevron-down"}
              size={20}
              color="#6B7280"
            />
          </View>
        </TouchableOpacity>

        {/* Dropdown Modal */}
        <Modal
          visible={isDropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsDropdownVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsDropdownVisible(false)}
            className="flex-1 bg-black/50"
          >
            <View className="flex-1 justify-center px-[4%]">
              <TouchableOpacity
                activeOpacity={1}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Header */}
                <View className="px-[6%] py-4 border-b border-gray-200 bg-gray-50">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-poppinsSemiBold text-lg text-gray-800">
                      {t("driver.addVehicleDetails.vehicleTypeTitle")}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setIsDropdownVisible(false)}
                      className="p-1"
                    >
                      <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Vehicle List */}
                <FlatList
                  data={vehicleTypes}
                  renderItem={renderVehicleItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
