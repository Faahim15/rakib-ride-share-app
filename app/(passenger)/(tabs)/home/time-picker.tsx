import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TimePickerScreen() {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  const getClockHandRotation = () => {
    const hours = selectedTime.getHours() % 12;
    const minutes = selectedTime.getMinutes();
    const hourAngle = hours * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
    return { hourAngle, minuteAngle };
  };

  const { t } = useLanguage();

  const { hourAngle, minuteAngle } = getClockHandRotation();

  return (
    <View className="flex-1 bg-gray-50 px-[6%] py-[8%]">
      {/* Header */}
      <View className="bg-brandColor rounded-2xl p-[5%] mb-[8%]">
        <Text className="text-white font-poppinsMedium text-xs mb-2">
          {t("passenger.tabs.trip.selectTime")}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text
            className="text-white text-4xl"
            style={{ fontFamily: "Poppins_600SemiBold" }}
          >
            {formatTime(selectedTime)}
          </Text>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Ionicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Clock Display */}
      <View className="items-center mb-[10%]">
        <View
          className="w-[280px] h-[280px] bg-white rounded-full items-center justify-center"
          style={styles.clockShadow}
        >
          {/* Clock numbers */}
          <View style={styles.clockContainer}>
            <Text
              style={[styles.clockNumber, { top: 10 }]}
              className="text-gray-800"
            >
              12
            </Text>
            <Text
              style={[styles.clockNumber, { right: 10, top: "45%" }]}
              className="text-gray-800"
            >
              3
            </Text>
            <Text
              style={[styles.clockNumber, { bottom: 10 }]}
              className="text-gray-800"
            >
              6
            </Text>
            <Text
              style={[styles.clockNumber, { left: 10, top: "45%" }]}
              className="text-gray-800"
            >
              9
            </Text>

            {/* Clock tick marks */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x = 120 * Math.cos(angle);
              const y = 120 * Math.sin(angle);
              return (
                <View
                  key={i}
                  style={{
                    position: "absolute",
                    width: 2,
                    height: 10,
                    backgroundColor: "#CBD5E1",
                    left: 140 + x - 1,
                    top: 140 + y - 5,
                    transform: [{ rotate: `${i * 30}deg` }],
                  }}
                />
              );
            })}

            {/* Center dot */}
            <View
              className="absolute w-3 h-3 bg-brandColor rounded-full"
              style={{ top: 134, left: 134 }}
            />

            {/* Hour hand */}
            <View
              style={{
                position: "absolute",
                width: 4,
                height: 70,
                backgroundColor: "#374151",
                left: 138,
                top: 70,
                transformOrigin: "bottom center",
                transform: [{ rotate: `${hourAngle}deg` }],
                borderRadius: 2,
              }}
            />

            {/* Minute hand */}
            <View
              style={{
                position: "absolute",
                width: 3,
                height: 100,
                backgroundColor: "#EF4444",
                left: 138.5,
                top: 40,
                transformOrigin: "bottom center",
                transform: [{ rotate: `${minuteAngle}deg` }],
                borderRadius: 2,
              }}
            />
          </View>
        </View>
      </View>

      {/* Next Button */}
      <View className=" flex-1 justify-end mb-[4%]">
        <TouchableOpacity
          onPress={() =>
            router.push("/(passenger)/(tabs)/home/luggage-selector")
          }
          className="bg-brandColor py-[4%] rounded-lg items-center"
        >
          <Text className="text-white text-base font-poppinsSemiBold">
            {t("passenger.tabs.trip.next")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* DateTime Picker */}
      {showPicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  clockShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  clockContainer: {
    width: 280,
    height: 280,
    position: "relative",
  },
  clockNumber: {
    position: "absolute",
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    alignSelf: "center",
  },
});
