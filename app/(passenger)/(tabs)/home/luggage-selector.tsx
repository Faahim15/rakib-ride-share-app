import NextButton from "@/src/components/passenger/tabs/trip/NextButton";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LuggageSelector() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | null>(
    null
  );

  const { t } = useLanguage();

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View className="flex-1 bg-white px-[6%] pt-[8%]">
      <View>
        <Text className="font-poppinsMedium text-base text-black">
          {t("passenger.tabs.trip.howManyseats")}
        </Text>
      </View>

      {/* Quantity Controls */}
      <View className="flex-row items-center justify-center mb-[8%] mt-[10%]">
        {/* Minus Button */}
        <TouchableOpacity
          onPress={handleDecrement}
          className="w-14 h-14 rounded-full bg-[#B8E6E6] items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="remove" size={28} color="#4DB8B8" />
        </TouchableOpacity>

        {/* Quantity Display */}
        <Text className="font-poppinsSemiBold text-4xl text-brandColor mx-8">
          {quantity}
        </Text>

        {/* Plus Button */}
        <TouchableOpacity
          onPress={handleIncrement}
          className="w-14 h-14 rounded-full bg-brandColor items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Luggage Size Section */}
      <View>
        <Text className="font-poppinsMedium text-base text-[#0D0D0D] mb-[3%]">
          {t("passenger.tabs.trip.luggageSize")}
        </Text>

        {/* Size Options */}
        <View className="flex-row items-center">
          {/* Small */}
          <TouchableOpacity
            onPress={() => setSelectedSize("S")}
            className="flex-row items-center mr-6"
            activeOpacity={0.7}
          >
            <Ionicons
              name={
                selectedSize === "S" ? "radio-button-on" : "radio-button-off"
              }
              size={24}
              color={selectedSize === "S" ? "#00ABB0" : "#D1D5DB"}
              style={{ marginRight: 8 }}
            />
            <Text className="font-poppins text-base text-gray-700">S</Text>
          </TouchableOpacity>

          {/* Medium */}
          <TouchableOpacity
            onPress={() => setSelectedSize("M")}
            className="flex-row items-center mr-6"
            activeOpacity={0.7}
          >
            <Ionicons
              name={
                selectedSize === "M" ? "radio-button-on" : "radio-button-off"
              }
              size={24}
              color={selectedSize === "M" ? "#00ABB0" : "#D1D5DB"}
              style={{ marginRight: 8 }}
            />
            <Text className="font-poppins text-base text-gray-700">M</Text>
          </TouchableOpacity>

          {/* Large */}
          <TouchableOpacity
            onPress={() => setSelectedSize("L")}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons
              name={
                selectedSize === "L" ? "radio-button-on" : "radio-button-off"
              }
              size={24}
              color={selectedSize === "L" ? "#00ABB0" : "#D1D5DB"}
              style={{ marginRight: 8 }}
            />
            <Text className="font-poppins text-base text-gray-700">L</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Next Button */}
      <View className=" flex-1 justify-end mb-[14%]">
        <NextButton
          onPress={() =>
            router.push("/(passenger)/(tabs)/home/preferred-gender")
          }
        />
      </View>
    </View>
  );
}
