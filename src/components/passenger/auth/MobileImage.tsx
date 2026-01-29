import { mobileIcon } from "@/assets/svg/auth-svg";
import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
export default function MobileImage() {
  return (
    <View className="justify-center items-center ">
      <SvgXml xml={mobileIcon} />
    </View>
  );
}
