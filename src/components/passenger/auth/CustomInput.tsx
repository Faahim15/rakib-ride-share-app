import { verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type CustomInputProps = {
  label: string;
  textInputConfig?: TextInputProps;
  labelColor?: string;
};

export default function CustomInput({
  label,
  labelColor = "#6C6C70",
  textInputConfig = {},
}: CustomInputProps) {
  const isPassword = textInputConfig.secureTextEntry;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = isFocused ? "border-[#00ABB0]" : "border-gray-300";
  return (
    <View className="mb-2">
      {/* Label */}
      <Text
        style={{ color: labelColor }}
        className="font-poppins text-sm  mb-1"
      >
        {label}
      </Text>

      {/* Input Wrapper */}
      <View className="relative justify-center">
        <TextInput
          {...textInputConfig}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#898989"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ minHeight: verticalScale(40) }}
          className={`border ${borderColor}   font-poppins rounded-xl px-3 pr-10 text-sm text-black`}
        />

        {/* Eye Icon */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            className="absolute right-3"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={18}
              color="#6C6C70"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
