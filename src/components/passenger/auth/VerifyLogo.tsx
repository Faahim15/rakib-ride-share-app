import { verifyIcon } from "@/assets/svg/auth-svg";
import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function VerifyLogo() {
  return (
    <View className="mt-[4%] justify-center items-center">
      <SvgXml xml={verifyIcon} />
    </View>
  );
}
