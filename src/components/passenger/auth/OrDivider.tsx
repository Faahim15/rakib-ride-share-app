import { useLanguage } from "@/src/localization/LangaugeContext";
import { Text, View } from "react-native";

export default function OrDivider() {
  const { t } = useLanguage();

  return (
    <View className="flex-row items-center justify-center w-full  my-[4%]">
      {/* Left line */}
      <View className="flex-1 h-[1px] bg-brandColor" />

      {/* Center text */}
      <Text className="mx-[3%] text-black text-base font-poppins ">
        {t("auth.logIn.or")}
      </Text>

      {/* Right line */}
      <View className="flex-1 h-[1px] bg-teal-500" />
    </View>
  );
}
