// DateOfBirthPicker.tsx
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

interface DateOfBirthPickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

export default function DateOfBirthPicker({
  label = "Date of Birth",
  value,
  onChange,
  placeholder = "MM/DD/YYYY",
}: DateOfBirthPickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { t } = useLanguage();
  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "set" && selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <View className="mb-4">
      <Text className="font-poppins text-sm text-[#6C6C70] mb-2">
        {t("driver.driverProfileTexts.label")}
      </Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="flex-row items-center border border-gray-300 rounded-xl px-4 py-[3%] bg-white"
        activeOpacity={0.7}
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color="#6C6C70"
          style={{ marginRight: 12 }}
        />
        <Text
          className={`font-poppins text-base ${
            value ? "text-[#1C1C1E]" : "text-[#898989]"
          }`}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {/* DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1940, 0, 1)}
        />
      )}

      {/* iOS DatePicker Confirmation */}
      {showDatePicker && Platform.OS === "ios" && (
        <View className="flex-row justify-end mt-2">
          <TouchableOpacity
            onPress={() => setShowDatePicker(false)}
            className="bg-[#007AFF] px-6 py-2 rounded-lg"
          >
            <Text className="font-poppinsSemiBold text-white text-base">
              Done
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
