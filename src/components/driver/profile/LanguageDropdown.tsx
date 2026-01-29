import { useLanguage } from "@/src/localization/LangaugeContext";
import { useGetAllLanguagesQuery } from "@/src/redux/languages-slice/languagesApi";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* ===== Types ===== */
export interface SelectedLanguage {
  code: string;
  name: string;
  nativeName: string;
  family: string;
}

interface LanguageDropdownProps {
  selectedLanguages: SelectedLanguage[];
  onLanguagesChange: (languages: SelectedLanguage[]) => void;
  placeholder?: string;
  maxSelections?: number;
  label?: string;
}

/* ===== Helper Functions ===== */
const filterLanguages = (
  languages: SelectedLanguage[],
  searchQuery: string,
): SelectedLanguage[] => {
  if (!searchQuery.trim()) {
    return languages;
  }

  const query = searchQuery.toLowerCase();
  return languages.filter(
    (language) =>
      language.name.toLowerCase().includes(query) ||
      language.code.toLowerCase().includes(query) ||
      language.nativeName.toLowerCase().includes(query),
  );
};

/* ===== Language Item Component ===== */
interface LanguageItemProps {
  language: SelectedLanguage;
  isSelected: boolean;
  onPress: (language: SelectedLanguage) => void;
}

const LanguageItem: React.FC<LanguageItemProps> = ({
  language,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    className={`flex-row items-center px-[4%] py-[3.5%] gap-3 ${
      isSelected
        ? "bg-blue-50 border-l-4 border-blue-500"
        : "bg-white border-b border-gray-100"
    }`}
    onPress={() => onPress(language)}
    activeOpacity={0.6}
  >
    <View className="flex-1">
      <Text className="font-poppins_600 text-sm text-gray-900">
        {language.name}
      </Text>
      <Text className="font-poppins_400 text-xs text-gray-500 mt-0.5">
        {language.nativeName}
      </Text>
    </View>
    {isSelected && (
      <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
        <Text className="text-sm font-bold text-white">✓</Text>
      </View>
    )}
  </TouchableOpacity>
);

/* ===== Selected Tag Component ===== */
interface LanguageTagProps {
  language: SelectedLanguage;
  onRemove: (code: string) => void;
}

const LanguageTag: React.FC<LanguageTagProps> = ({ language, onRemove }) => (
  <View className="flex-row items-center bg-brandColor2 rounded-full px-3 py-2 gap-2 mr-2 mb-2">
    <Text className="font-poppinsSemiBold text-xs text-[#111]">
      {language.name}
    </Text>
    <TouchableOpacity
      onPress={() => onRemove(language.code)}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text className="text-base text-brandColor font-poppinsBold ">×</Text>
    </TouchableOpacity>
  </View>
);

/* ===== Main Dropdown Component ===== */
const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  selectedLanguages,
  onLanguagesChange,
  placeholder,
  maxSelections = 5,
  label,
}) => {
  const { t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();
  const { data: languages = [], isLoading, error } = useGetAllLanguagesQuery();

  const defaultPlaceholder = t(
    "shared.languageDropdown.selectLanguagesYouSpeak",
  );

  const filteredLanguages = useMemo(
    () => filterLanguages(languages, searchQuery),
    [languages, searchQuery],
  );

  const handleLanguageToggle = (language: SelectedLanguage) => {
    const isSelected = selectedLanguages.some((l) => l.code === language.code);

    if (isSelected) {
      onLanguagesChange(
        selectedLanguages.filter((l) => l.code !== language.code),
      );
    } else if (selectedLanguages.length < maxSelections) {
      onLanguagesChange([...selectedLanguages, language]);
    }
  };

  const handleRemoveLanguage = (code: string) => {
    onLanguagesChange(selectedLanguages.filter((l) => l.code !== code));
  };

  const isLanguageSelected = (code: string) =>
    selectedLanguages.some((l) => l.code === code);

  return (
    <View className="w-full mb-4">
      <Text className="font-poppins text-sm text-[#6C6C70] mb-2">
        {t("shared.languageDropdown.selectLanguages")}
      </Text>

      <TouchableOpacity
        className="border border-gray-300 rounded-xl px-[4%] py-[3%] bg-white flex-row justify-between items-center"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View className="flex-1">
          {selectedLanguages.length > 0 ? (
            <View className="flex-row flex-wrap">
              {selectedLanguages.map((item) => (
                <LanguageTag
                  key={item.code}
                  language={item}
                  onRemove={handleRemoveLanguage}
                />
              ))}
            </View>
          ) : (
            <Text className="font-poppins text-base text-[#898989]">
              {defaultPlaceholder}
            </Text>
          )}
        </View>
        <Ionicons name="chevron-down" size={20} color="#6B7280" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <View
            className="bg-white rounded-t-3xl flex-1 mt-20"
            style={{ paddingTop: insets.top }}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center px-[5%] py-[4%] border-b border-gray-100">
              <View>
                <Text className="font-poppinsBold text-lg text-gray-900">
                  {t("shared.languageDropdown.selectLanguagesLabel")}
                </Text>
                <Text className="font-poppins text-xs text-gray-500 mt-1">
                  {t("shared.languageDropdown.selectLanguagesDescription")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text className="text-2xl text-gray-400 font-bold">✕</Text>
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View className="mx-[4%] my-[3%]">
              <TextInput
                className="px-4 py-3 border border-gray-300 rounded-xl font-poppins text-sm text-gray-900 bg-gray-50"
                placeholder={t("shared.languageDropdown.searchPlaceholder")}
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Selection Counter */}
            <View className="flex-row justify-between items-center px-[5%] pb-[2%]">
              <Text className="font-poppinsMedium text-xs text-gray-600">
                {t("shared.languageDropdown.selectedCounter")}:{" "}
                {selectedLanguages.length}/{maxSelections}
              </Text>
              {selectedLanguages.length === maxSelections && (
                <Text className="font-poppins text-xs text-orange-500">
                  {t("shared.languageDropdown.maximumSelected")}
                </Text>
              )}
            </View>

            {/* Language List */}
            {isLoading ? (
              <View className="flex-1 justify-center items-center">
                <Text className="font-poppinsMedium text-sm text-gray-500">
                  {t("shared.languageDropdown.loadingLanguages")}
                </Text>
              </View>
            ) : error ? (
              <View className="flex-1 justify-center items-center">
                <Text className="font-poppinsMedium text-sm text-red-500">
                  {t("shared.languageDropdown.failedToLoadLanguages")}
                </Text>
              </View>
            ) : filteredLanguages.length === 0 ? (
              <View className="flex-1 justify-center items-center">
                <Text className="font-poppins text-sm text-gray-400">
                  {t("shared.languageDropdown.noLanguagesFound")}
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredLanguages}
                renderItem={({ item }) => (
                  <LanguageItem
                    language={item}
                    isSelected={isLanguageSelected(item.code)}
                    onPress={handleLanguageToggle}
                  />
                )}
                keyExtractor={(item) => item.code}
                scrollEnabled
                bounces={true}
                showsVerticalScrollIndicator={true}
              />
            )}

            {/* Bottom Safe Area */}
            <View style={{ height: insets.bottom }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LanguageDropdown;
