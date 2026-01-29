import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

type AgreeWithTermsProps = {
  agreed: boolean;
  onToggle: () => void;
};

export default function AgreeWithTerms({
  agreed,
  onToggle,
}: AgreeWithTermsProps) {
  // functions to open URLs
  const openTerms = () => {
    Linking.openURL("https://www.rakibapp.com/terms.html");
  };

  const openPrivacy = () => {
    Linking.openURL("https://www.rakibapp.com/privacy-policy.html");
  };
  const { t } = useLanguage();
  return (
    <View className="mt-[2%] mb-1 flex-row items-center">
      <Pressable onPress={onToggle} className="mr-3 ">
        <Ionicons
          name={agreed ? "checkbox" : "square-outline"}
          size={18}
          color={agreed ? "#00ABB0" : "#9CA3AF"} // blue / gray
        />
      </Pressable>

      <Text className="flex-1 text-xs font-poppins text-gray-900 ">
        {t("auth.signUp.agree1")}{" "}
        <Text className="text-brandColor" onPress={openTerms}>
          {t("auth.signUp.agree2")}
        </Text>{" "}
        {t("auth.signUp.agree3")}{" "}
        <Text className="text-brandColor" onPress={openPrivacy}>
          {t("auth.signUp.agree4")}
        </Text>
        .
      </Text>
    </View>
  );
}
