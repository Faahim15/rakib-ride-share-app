import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface AuthFooterProps {
  onPress?: () => void;
  title: string;
  subtitle: string;
}

export default function AuthFooter({
  title,
  subtitle,
  onPress,
}: AuthFooterProps) {
  const { t } = useLanguage();
  return (
    <View className="flex-row mt-2 justify-center items-center gap-x-1">
      <Text className="font-poppins text-base text-gray">{title}</Text>
      <Pressable onPress={onPress}>
        <Text className="font-poppins text-base underline text-brandColor">
          {subtitle}
        </Text>
      </Pressable>
    </View>
  );
}
