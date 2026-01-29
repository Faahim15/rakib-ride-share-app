import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface Governorate {
  id: string;
  label: string;
  arabicLabel: string;
}

interface StatePickerProps {
  value: Governorate | null;
  onChange: (value: Governorate) => void;
}

const jordanGovernorates: Governorate[] = [
  { id: "1", label: "Amman", arabicLabel: "عمان" },
  { id: "2", label: "Irbid", arabicLabel: "إربد" },
  { id: "3", label: "Zarqa", arabicLabel: "الزرقاء" },
  { id: "4", label: "Balqa", arabicLabel: "البلقاء" },
  { id: "5", label: "Madaba", arabicLabel: "مادبا" },
  { id: "6", label: "Jerash", arabicLabel: "جرش" },
  { id: "7", label: "Ajloun", arabicLabel: "عجلون" },
  { id: "8", label: "Mafraq", arabicLabel: "المفرق" },
  { id: "9", label: "Karak", arabicLabel: "الكرك" },
  { id: "10", label: "Tafilah", arabicLabel: "الطفيلة" },
  { id: "11", label: "Ma'an", arabicLabel: "معان" },
  { id: "12", label: "Aqaba", arabicLabel: "العقبة" },
];

export default function StatePicker({ value, onChange }: StatePickerProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();
  const filteredGovernorates = jordanGovernorates.filter(
    (gov) =>
      gov.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gov.arabicLabel.includes(searchQuery),
  );

  const handleSelectGovernorate = (gov: Governorate) => {
    onChange(gov);
    setIsDropdownVisible(false);
    setSearchQuery("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className=" pb-[3%]">
        <Text className="font-poppins text-sm text-[#6C6C70] mb-2">
          {t("driver.driverProfileTexts.governorateLabel")}
        </Text>

        <TouchableOpacity
          onPress={() => setIsDropdownVisible(true)}
          className="border border-gray-300 rounded-xl px-[4%] py-[3%] bg-white"
        >
          <View className="flex-row items-center justify-between">
            <Text
              className={`font-poppins text-sm ${
                value ? "text-gray-700" : "text-[#898989]"
              }`}
            >
              {value
                ? value.label
                : t("driver.driverProfileTexts.selectGovernorate")}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
          </View>
        </TouchableOpacity>

        <Modal transparent visible={isDropdownVisible} animationType="fade">
          <TouchableOpacity
            className="flex-1 bg-black/50"
            activeOpacity={1}
            onPress={() => setIsDropdownVisible(false)}
          >
            <View className="flex-1 justify-center px-[4%]">
              <TouchableOpacity
                activeOpacity={1}
                className="bg-white rounded-2xl max-h-[70%]"
              >
                <View className="px-[6%] py-4 border-b border-gray-200">
                  <Text className="font-poppinsSemiBold text-lg mb-3">
                    {t("driver.driverProfileTexts.modalTitle")}
                  </Text>

                  <View className="flex-row items-center border rounded-lg px-3 py-2">
                    <Ionicons name="search" size={20} color="#9CA3AF" />
                    <TextInput
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder={t(
                        "driver.driverProfileTexts.searchPlaceholder",
                      )}
                      className="flex-1 ml-2 font-poppins"
                    />
                  </View>
                </View>

                <FlatList
                  data={filteredGovernorates}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelectGovernorate(item)}
                      className="px-[6%] py-4 border-b border-gray-100"
                    >
                      <View className="flex-row justify-between items-center">
                        <View>
                          <Text className="font-poppinsMedium text-base">
                            {item.label}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {item.arabicLabel}
                          </Text>
                        </View>
                        {value?.id === item.id && (
                          <Ionicons
                            name="checkmark"
                            size={22}
                            color="#00BCD4"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
