import { scale, verticalScale } from "@/src/utils/scaling";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface AuthButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean; // <-- added disabled prop
}

export default function AuthButton({
  title,
  onPress,
  disabled,
}: AuthButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled} // disables press when true
      className="rounded-md"
    >
      <View
        style={{ width: scale(335), height: verticalScale(45) }}
        className={`items-center justify-center rounded-md ${
          disabled
            ? "bg-gray-400 border-gray-400" // gray out when disabled
            : "bg-brandColor border border-brandColor" // normal style
        }`}
      >
        <Text
          className={`font-poppins text-base ${
            disabled ? "text-gray-200" : "text-white"
          }`}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
