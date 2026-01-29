import React from "react";
import { Pressable, Text, View } from "react-native";
interface ForgetPasswordProps {
  title: string;
  onPress?: () => void;
}
export default function ForgetPassword({
  title,
  onPress,
}: ForgetPasswordProps) {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row justify-end">
        <Text className="font-poppinsMedium underline text-brandColor text-sm">
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
