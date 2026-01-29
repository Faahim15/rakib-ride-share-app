import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
interface ResendCodeProps {
  onPress?: () => void;
}
export default function ResendCode({ onPress }: ResendCodeProps) {
  const { t } = useLanguage();

  return (
    <Pressable onPress={onPress}>
      <View className="mt-[3%] justify-center items-center ">
        <Text className="font-poppins text-brandColor text-sm">
          {t("auth.verifyNumber.resend")}{" "}
        </Text>
      </View>
    </Pressable>
  );
}
