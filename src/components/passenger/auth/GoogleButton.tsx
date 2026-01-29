import { googleIcon } from "@/assets/svg/auth-svg";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale, verticalScale } from "@/src/utils/scaling";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface GoogleButtonProps {
  onPress?: () => void;
  context?: "signUp" | "logIn"; // Add context to know which screen we're on
}

export default function GoogleButton({
  onPress,
  context = "signUp",
}: GoogleButtonProps) {
  const { t } = useLanguage();

  return (
    <Pressable onPress={onPress}>
      <View
        style={{ width: scale(335), height: verticalScale(45) }}
        className="bg-white border mt-[1%] border-brandColor flex-row gap-x-2 rounded-md items-center justify-center"
      >
        <SvgXml xml={googleIcon} width={20} height={20} />
        <Text className="font-poppins text-sm text-black">
          {t(`auth.${context}.googleButton`)}
        </Text>
      </View>
    </Pressable>
  );
}
