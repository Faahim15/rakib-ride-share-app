import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Language {
  id: string;
  name: string;
  code: "en" | "ar";
}

export default function LanguageChange() {
  const { language, changeLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages: Language[] = [
    { id: "1", name: "English", code: "en" },
    { id: "2", name: "العربية", code: "ar" },
  ];

  const selectedLanguage = languages.find((l) => l.code === language);

  const handleLanguageSelect = async (lang: Language) => {
    if (lang.code !== language) {
      await changeLanguage(lang.code);
    }
    setIsDropdownOpen(false);
  };

  return (
    <View className="flex-1 bg-white px-[6%] pt-[4%]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-[6%]">
          <Text className="text-base font-poppinsBold text-gray-900 mb-1">
            {t("languageChange.header")}
          </Text>
          <Text className="text-sm font-poppins text-gray-600">
            {t("languageChange.selectYourPreferredLanguage")}
          </Text>
        </View>

        {/* Language Selection Card */}
        <View className="bg-gray-50 rounded-2xl p-[5%]">
          <Text className="text-base font-poppinsSemiBold text-gray-800 mb-[4%]">
            {t("languageChange.currentLanguage")}
          </Text>

          {/* Dropdown */}
          <TouchableOpacity
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white  rounded-lg px-[5%] py-[4%] flex-row justify-between items-center border border-gray-200"
            activeOpacity={0.8}
          >
            <Text className="text-gray-900 text-sm font-poppinsMedium">
              {selectedLanguage?.name || t("languageChange.chooseLanguage")}
            </Text>
            <Ionicons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={18}
              color="#00ABB0"
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View className="bg-white rounded-lg mt-[3%] overflow-hidden border border-gray-200">
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              >
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.id}
                    onPress={() => handleLanguageSelect(lang)}
                    className={`px-[5%] py-[4%] border-b border-gray-100 flex-row items-center justify-between ${
                      selectedLanguage?.code === lang.code
                        ? "bg-brandColor/10"
                        : ""
                    }`}
                  >
                    <Text
                      className={`text-sm font-poppinsMedium ${
                        selectedLanguage?.code === lang.code
                          ? "text-brandColor"
                          : "text-gray-900"
                      }`}
                    >
                      {lang.name}
                    </Text>
                    {selectedLanguage?.code === lang.code && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#00ABB0"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View className="bg-blue-50 rounded-lg p-[4%] mt-[6%]">
          <View className="flex-row items-flex-start">
            <Ionicons
              name="information-circle"
              size={18}
              color="#00ABB0"
              style={{ marginRight: scale(5), marginTop: 2 }}
            />
            <View className="flex-1">
              <Text className="font-poppinsMedium text-base text-brandColor mb-1">
                {t("languageChange.languageInfo")}
              </Text>
              <Text className="font-poppins text-brandColor text-sm">
                {t("languageChange.languageDescription")}
              </Text>
            </View>
          </View>
        </View>

        {/* Selected Language Details */}
        <View className="mt-[6%] bg-white rounded-lg border border-gray-200 p-[4%]">
          <Text className="text-base font-poppinsMedium text-gray-900 mb-[3%]">
            {t("languageChange.selectedLanguage")}
          </Text>
          <View className="bg-gray-50 rounded-lg p-[4%]">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-poppins text-gray-600">
                {t("languageChange.languageName")}
              </Text>
              <Text className="text-sm font-poppinsMedium text-gray-900">
                {selectedLanguage?.name}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-poppins text-gray-600">
                {t("languageChange.languageCode")}
              </Text>
              <Text className="text-sm font-poppinsMedium text-gray-900">
                {selectedLanguage?.code.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
