import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  onPress?: () => void; // optional handler
};

export default function SkipButton({ onPress, title }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View className="mt-[3%] flex-row justify-end">
        <Text className="font-poppins text-base text-white">{title}</Text>
      </View>
    </Pressable>
  );
}
