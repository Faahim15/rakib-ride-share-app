import AppImage from "@/src/components/image/AppImage";
import { useLanguage } from "@/src/localization/LangaugeContext";
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

interface LanguageSelectionProps {
  onNext: () => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onNext }) => {
  const { language, changeLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages: Language[] = [
    { id: "1", name: "English", code: "en" },
    { id: "2", name: "العربية", code: "ar" },
  ];

  const selectedLanguage = languages.find((l) => l.code === language);

  const handleLanguageSelect = async (lang: Language) => {
    if (lang.code !== language) {
      await changeLanguage(lang.code); // update language instantly
    }
    setIsDropdownOpen(false); // close dropdown
  };

  return (
    <View
      className="flex-1 items-center justify-between px-[6%] pt-[10%]"
      style={{ width: SCREEN_WIDTH }}
    >
      {/* Image */}
      <View className="items-center justify-center mb-[5%]">
        <AppImage
          source={require("@/assets/images/onboarding/frame.png")}
          width={280}
          height={280}
          style={{ resizeMode: "contain" }}
        />
      </View>

      {/* Dropdown */}
      <View className="w-full mb-[10%]">
        <TouchableOpacity
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-white rounded-lg px-[5%] py-[3%] flex-row justify-between items-center"
          activeOpacity={0.8}
        >
          <Text className="text-[#0A5C6C] text-base font-poppinsSemiBold">
            {selectedLanguage?.name || "Choose Language"}
          </Text>
          <Ionicons
            name={isDropdownOpen ? "chevron-up" : "chevron-down"}
            size={24}
            color="#0A5C6C"
          />
        </TouchableOpacity>

        {isDropdownOpen && (
          <View className="bg-white rounded-lg mt-[2%] overflow-hidden">
            <ScrollView showsVerticalScrollIndicator={false}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.id}
                  onPress={() => handleLanguageSelect(lang)}
                  className="px-[5%] py-[4%] border-b border-gray-200"
                >
                  <Text className="text-base font-poppinsSemiBold text-[#000]">
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View className="flex-1" />
    </View>
  );
};

export default LanguageSelection;
