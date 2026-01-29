import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type MenuItem = {
  id: number;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Href;
};

const SettingsScreen = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const menuItems: MenuItem[] = [
    {
      id: 0,
      labelKey: "tabs.profile.changePassword",
      icon: "chevron-forward",
      route: "/(passenger)/profile/change-password" as Href,
    },
    {
      id: 1,
      labelKey: "tabs.profile.preferences",
      icon: "chevron-forward",
      route: "/(passenger)/(tabs)/profile/preference" as Href,
    },

    // {
    //   id: 5,
    //   labelKey: "tabs.profile.terms",
    //   icon: "chevron-forward",
    //   route: "/(passenger)/timeline/terms-conditions" as Href,
    // },
    // {
    //   id: 6,
    //   labelKey: "tabs.profile.privacy",
    //   icon: "chevron-forward",
    //   route: "/(passenger)/timeline/privacy" as Href,
    // },
  ];

  const handleNavigation = (route: Href) => {
    router.push(route);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Stats Cards */}

        {/* Menu Items */}
        <View className="px-[4%]">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center justify-between py-5 border-b border-gray-200"
              activeOpacity={0.7}
              onPress={() => handleNavigation(item.route)}
            >
              <Text className="text-base font-poppins text-black">
                {t(item.labelKey)}
              </Text>
              <Ionicons name={item.icon} size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
