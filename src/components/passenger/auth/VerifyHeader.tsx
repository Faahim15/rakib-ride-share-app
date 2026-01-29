import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Text, View } from "react-native";

interface VerifyHeaderProps {
  title: string;
  subtitle: string;
}

export default function VerifyHeader({ title, subtitle }: VerifyHeaderProps) {
  const { t } = useLanguage();

  return (
    <View className="mt-[5%]  justify-center items-center ">
      <Text className="font-poppinsMedium text-2xl text-black ">{title}</Text>
      <Text className="font-poppins mt-1 text-gray text-justify text-base">
        {subtitle}
      </Text>
    </View>
  );
}
