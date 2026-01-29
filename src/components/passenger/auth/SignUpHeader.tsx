import React from "react";
import { Text, View } from "react-native";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function SignUpHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <View className=" justify-center items-center">
      <Text className="font-poppinsBold text-2xl text-black">{title}</Text>
      <Text className="font-poppins text-lg pt-[1%] text-[#6C6C70]">
        {subtitle}
      </Text>
    </View>
  );
}
