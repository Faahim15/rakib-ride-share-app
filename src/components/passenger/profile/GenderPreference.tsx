import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type PreferenceType = string;

interface PreferenceItem {
  id: number;
  type: PreferenceType;
}

export default function GenderPreference() {
  const { t } = useLanguage();

  const [selected, setSelected] = useState<PreferenceType | null>(null);

  const handleSelected = (type: PreferenceType): void => {
    setSelected((prev) => (prev === type ? null : type));
  };
  const PREFERENCE_DATA: PreferenceItem[] = [
    { id: 1, type: t("auth.shared.male") },
    { id: 2, type: t("auth.shared.female") },
    { id: 3, type: t("auth.shared.noPreference") },
  ];
  return (
    <View className=" pb-[1.5%]">
      <Text className="font-poppinsSemiBold py-[2%] text-sm text-black">
        {t("auth.shared.genderTitle")}
      </Text>

      <View>
        {PREFERENCE_DATA.map((item) => {
          const isSelected = selected === item.type;

          return (
            <Pressable
              key={item.id}
              onPress={() => handleSelected(item.type)}
              className="flex-row items-center mt-[1.5%] gap-x-2"
            >
              <Ionicons
                name={isSelected ? "radio-button-on" : "radio-button-off"}
                size={16}
                color={isSelected ? "#00ABB0" : "#98A2B3"}
              />
              <Text className="font-poppins text-sm text-[#101828]">
                {item.type}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
