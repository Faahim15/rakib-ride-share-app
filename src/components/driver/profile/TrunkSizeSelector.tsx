import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TrunkSizeSelector() {
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | null>(
    null,
  );

  return (
    <View>
      {/* Luggage Size Section */}
      <View className="bg-white">
        <Text className="font-poppins text-sm text-[#0D0D0D] mb-[1%]">
          Trunk Size
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
              size={20}
              color={selectedSize === "S" ? "#00ABB0" : "#D1D5DB"}
              style={{ marginRight: 8 }}
            />
            <Text className="font-poppins text-sm text-gray-700">S</Text>
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
              size={20}
              color={selectedSize === "M" ? "#00ABB0" : "#D1D5DB"}
              style={{ marginRight: 8 }}
            />
            <Text className="font-poppins text-sm text-gray-700">M</Text>
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
              size={20}
              color={selectedSize === "L" ? "#00ABB0" : "#D1D5DB"}
              style={{ marginRight: 8 }}
            />
            <Text className="font-poppins text-sm text-gray-700">L</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
