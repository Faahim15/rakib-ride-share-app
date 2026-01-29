import { logo } from "@/assets/svg/auth-svg";
import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
export default function Logo() {
  return (
    <View className="bg-white justify-center items-center">
      <SvgXml
        xml={logo}
        //   height={verticalScale()}
        //   width={scale()}
      />
    </View>
  );
}
