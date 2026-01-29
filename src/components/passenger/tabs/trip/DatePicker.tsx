import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import NextButton from "./NextButton";
type DatePickerProps = {
  onPress: () => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ onPress }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0] // gives "YYYY-MM-DD"
  );

  const { t } = useLanguage();
  const formatSelectedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const handleDateSelect = (day: any) => {
    const selectedDateObj = new Date(day.dateString);
    const todayObj = new Date(new Date().toISOString().split("T")[0]);

    // Only allow selection if date is today or in the future
    if (selectedDateObj >= todayObj) {
      setSelectedDate(day.dateString);
    }
  };

  const getDisabledDates = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const disabledDates: {
      [key: string]: {
        disabled: true;
        disabledColor: string;
        disabledTextColor: string;
      };
    } = {};

    // Disable dates before today in current month
    for (let i = 1; i < currentDate; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      disabledDates[dateStr] = {
        disabled: true,
        disabledColor: "#F3F4F6",
        disabledTextColor: "#D1D5DB",
      };
    }

    return disabledDates;
  };

  const markedDates = {
    ...getDisabledDates(),
    [selectedDate]: {
      selected: true,
      selectedColor: "#14B8A6",
    },
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-brandColor px-[6%] py-[6%]">
        <Text className="text-white text-xs font-poppinsMedium mb-[2%] tracking-wide">
          {t("passenger.tabs.trip.selectDate")}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-2xl font-poppins">
            {formatSelectedDate(selectedDate)}
          </Text>
        </View>
      </View>

      {/* Calendar */}
      <View className=" flex-1">
        <Calendar
          current={selectedDate}
          onDayPress={handleDateSelect}
          markedDates={markedDates}
          minDate={new Date().toISOString().split("T")[0]}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#6B7280",
            selectedDayBackgroundColor: "#14B8A6",
            selectedDayTextColor: "#fff",
            todayTextColor: "#00ABB0",
            dayTextColor: "#333333",
            textDisabledColor: "#D1D5DB",
            monthTextColor: "#374151",
            textMonthFontSize: 16,
            textMonthFontWeight: "500",
            textDayFontSize: 16,
            textDayHeaderFontSize: 14,
            arrowColor: "#000",

            textDayFontFamily: "Poppins_400Regular",
            textMonthFontFamily: "Poppins_500Medium",
            textDayHeaderFontFamily: "Poppins_500Medium",
          }}
          style={
            {
              // paddingTop: 10,
            }
          }
          renderArrow={(direction) => (
            <Ionicons
              name={direction === "left" ? "chevron-back" : "chevron-forward"}
              size={22}
              color="#6B7280"
            />
          )}
        />
      </View>

      {/* Next Button */}
      <View className="px-[6%] pb-[16%]">
        <NextButton onPress={onPress} />
      </View>
    </View>
  );
};

export default DatePicker;
