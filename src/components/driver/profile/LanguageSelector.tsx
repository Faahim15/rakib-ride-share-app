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

interface Language {
  id: string;
  label: string;
  value: string;
}

const languages: Language[] = [
  { id: "1", label: "English", value: "en" },
  { id: "2", label: "Arabic", value: "ar" },
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0]
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { t } = useLanguage();
  const handleSelectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsDropdownVisible(false);
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      onPress={() => handleSelectLanguage(item)}
      className="px-[6%] py-4 border-b border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between">
        <Text className="font-poppins text-base text-gray-800">
          {item.label}
        </Text>
        {selectedLanguage.id === item.id && (
          <Ionicons name="checkmark" size={24} color="#00BCD4" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className=" bg-white"
    >
      <View className="">
        {/* Label */}
        <Text className="font-poppins text-base text-[#6C6C70] mb-2">
          {t("driver.driverProfileTexts.language")}
        </Text>

        {/* Dropdown Button */}
        <TouchableOpacity
          onPress={() => setIsDropdownVisible(true)}
          className="border border-brandColor rounded-xl px-[4%] py-[5%] bg-white"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-between">
            <Text className="font-poppins text-base text-gray-700">
              {selectedLanguage.label}
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
          transparent={true}
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
                onPress={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Header */}
                <View className="px-[6%] py-4 border-b border-gray-200 bg-gray-50">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-poppinsSemiBold text-lg text-gray-800">
                      {t("driver.driverProfileTexts.selectLanguage")}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setIsDropdownVisible(false)}
                      className="p-1"
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Language List */}
                <FlatList
                  data={languages}
                  renderItem={renderLanguageItem}
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
