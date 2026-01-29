import { scale, verticalScale } from "@/src/utils/scaling";
import React from "react";
import { Pressable, Text, View } from "react-native";
interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export default function CustomButton({
  title,
  onPress,
  backgroundColor,
  textColor,
}: CustomButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: scale(335),
          height: verticalScale(53),
          backgroundColor: backgroundColor,
        }}
        className=" border border-brandColor rounded-md items-center justify-center"
      >
        <Text style={{ color: textColor }} className="font-poppins text-base ">
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
