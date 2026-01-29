import { verticalScale } from "@/src/utils/scaling";
import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type BioInputProps = {
  label: string;
  textInputConfig?: TextInputProps;
  labelColor?: string;
};

export default function BioInput({
  label,
  labelColor = "#6C6C70",
  textInputConfig = {},
}: BioInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = isFocused ? "border-[#00ABB0]" : "border-gray-300";
  return (
    <View className="mb-2">
      {/* Label */}
      <Text
        style={{ color: labelColor }}
        className="font-poppins text-base  mb-1"
      >
        {label}
      </Text>

      {/* Input Wrapper */}
      <View className="relative justify-center">
        <TextInput
          {...textInputConfig}
          placeholderTextColor="#898989"
          textAlignVertical="top"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ minHeight: verticalScale(100) }}
          className={`border ${borderColor}  font-poppins rounded-md px-2 pr-10 text-base text-black`}
        />
      </View>
    </View>
  );
}
