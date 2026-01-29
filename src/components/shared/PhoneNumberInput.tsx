import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SkeletonElement from "../skeleton/SkeletonElement";

interface PickerCountry {
  cca2: string;
  name: string;
  phoneCode: string;
  flag: string;
}

interface PhoneNumberInputProps {
  value?: string;
  countries?: any[]; // data from parent
  isLoading?: boolean;
  error?: any;
}

const DEFAULT_PHONE_CODE = "+962"; // Jordan default

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  countries = [],
  isLoading,
  error,
}) => {
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState(value || "791234567");
  const [selectedCountry, setSelectedCountry] = useState<PickerCountry | null>(
    null,
  );
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Format countries
  const formattedCountries = useMemo(() => {
    return countries.map((c: any) => ({
      cca2: c.cca2,
      name: c.name.common,
      phoneCode: c.idd.root + (c.idd.suffixes?.[0] ?? ""),
      flag: c.flags.png,
    }));
  }, [countries]);

  // Default selected country
  useEffect(() => {
    if (formattedCountries.length && !selectedCountry) {
      const defaultCountry = formattedCountries.find(
        (c) => c.phoneCode === DEFAULT_PHONE_CODE,
      );
      if (defaultCountry) setSelectedCountry(defaultCountry);
    }
  }, [formattedCountries, selectedCountry]);

  const filteredCountries = formattedCountries.filter((c) =>
    c.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setPhoneNumber(cleaned);
  };

  if (isLoading) {
    // Skeleton for phone input
    return (
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
    );
  }

  if (error) {
    return (
      <Text className="text-red-600 text-center">
        {t("shared.rakibPaymentForm.failedToLoadCountries")}
      </Text>
    );
  }

  return (
    <View>
      <Text className="text-base font-poppins font-semibold text-gray-800 mb-[1%]">
        {t("shared.rakibPaymentForm.phoneNumberInternational")}
      </Text>
      <View className="bg-white">
        {/* Phone Input Container */}
        <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
          {/* Country Code Selector */}
          <TouchableOpacity
            onPress={() => setShowCountryPicker(true)}
            className="flex-row items-center pr-3 border-r border-gray-300"
            activeOpacity={0.7}
          >
            {selectedCountry && (
              <>
                <Image
                  source={{ uri: selectedCountry.flag }}
                  className="w-6 h-4 rounded-sm mr-2"
                />
                <Text className="font-poppinsMedium text-sm text-gray-900">
                  {selectedCountry.phoneCode}
                </Text>
              </>
            )}
            <Ionicons
              name="chevron-down"
              size={16}
              color="#666"
              className="ml-2"
            />
          </TouchableOpacity>

          {/* Phone Number Input */}
          <TextInput
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholder="1234567890"
            placeholderTextColor="#898989"
            keyboardType="phone-pad"
            className="flex-1 ml-3 font-poppins text-sm text-gray-900"
          />

          {/* Clear Button */}
          {phoneNumber.length > 0 && (
            <TouchableOpacity
              onPress={() => setPhoneNumber("")}
              className="p-2"
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Country Picker Modal */}
        <Modal
          visible={showCountryPicker}
          animationType="slide"
          transparent
          onRequestClose={() => setShowCountryPicker(false)}
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl h-[75%] overflow-hidden">
              {/* Drag Indicator */}
              <View className="items-center py-2">
                <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </View>

              {/* Header */}
              <View className="px-5 pb-3 flex-row items-center justify-between border-b border-gray-100">
                <Text className="text-lg font-Inter font-semibold text-[#0C243D]">
                  Select Country
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCountryPicker(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="close" size={18} color="#0C243D" />
                </TouchableOpacity>
              </View>

              {/* Search */}
              <View className="px-5 py-3 border-b border-gray-100">
                <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
                  <Ionicons name="search" size={18} color="#6B7280" />
                  <TextInput
                    placeholder="Search country"
                    value={searchText}
                    onChangeText={setSearchText}
                    className="flex-1 px-2 py-2 font-Inter text-sm text-[#0C243D]"
                    placeholderTextColor="#6B7280"
                  />
                </View>
              </View>

              {/* Country List */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
              >
                {filteredCountries.map((c) => (
                  <TouchableOpacity
                    key={c.cca2}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedCountry(c);
                      setShowCountryPicker(false);
                    }}
                    className="flex-row items-center px-5 py-4 border-b border-gray-100"
                  >
                    <Image
                      source={{ uri: c.flag }}
                      className="w-9 h-6 rounded-sm mr-4"
                    />
                    <View className="flex-1">
                      <Text className="font-Inter text-sm font-medium text-[#0C243D]">
                        {c.name}
                      </Text>
                    </View>
                    <Text className="font-Inter text-sm font-semibold text-gray-700">
                      {c.phoneCode}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PhoneNumberInput;
