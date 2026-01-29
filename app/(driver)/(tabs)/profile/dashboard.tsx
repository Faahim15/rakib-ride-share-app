import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type StatCard = {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  count: string;
  labelKey: string;
  route: Href;
  colors: [string, string];
  iconColor: string;
};

const StatCardItem = ({
  card,
  onPress,
}: {
  card: StatCard;
  onPress: (route: Href) => void;
}) => {
  const { t } = useLanguage();
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => onPress(card.route)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={0.9}
      style={{
        transform: [{ scale: pressed ? 0.95 : 1 }],
      }}
      className="rounded-2xl overflow-hidden mb-5"
    >
      <LinearGradient
        colors={card.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 py-8 items-center justify-center"
      >
        {/* Icon */}
        <View
          className="mb-4 w-16 h-16 rounded-full items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <Ionicons name={card.icon} size={40} color={card.iconColor} />
        </View>

        {/* Label */}
        <Text
          className="font-poppinsSemiBold text-center px-2 mb-3"
          style={{ fontSize: 14, color: "#FFFFFF" }}
        >
          {t(card.labelKey)}
        </Text>

        {/* Count */}
        <Text className="font-poppinsBold text-white" style={{ fontSize: 36 }}>
          {card.count}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const OverviewScreen = () => {
  const router = useRouter();

  const statsCards: StatCard[] = [
    // {
    //   id: 1,
    //   icon: "car-outline",
    //   count: "52",
    //   labelKey: "driver.tabs.overview.completedRides",
    //   route: "/(driver)/settings/completed-rides" as Href,
    //   colors: ["#00ABB0", "#00D4D4"], // Completed Rides gradient
    //   iconColor: "#FFFFFF",
    // },
    // {
    //   id: 2,
    //   icon: "calendar-outline",
    //   count: "4",
    //   labelKey: "driver.tabs.overview.upcomingRides",
    //   route: "/(driver)/settings/upcoming-rides" as Href,
    //   colors: ["#00ABB0", "#00FFC2"], // Upcoming Rides gradient
    //   iconColor: "#FFFFFF",
    // },
    {
      id: 3,
      icon: "cash-outline",
      count: "500-100",
      labelKey: "driver.tabs.overview.estimatedEarnings",
      route: "/(driver)/settings/estimate-earning" as Href,
      colors: ["#00ABB0", "#007F9E"], // Earnings gradient
      iconColor: "#FFFFFF",
    },
  ];

  const handleNavigation = (route: Href) => {
    router.push(route);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        {/* Stats Cards */}
        <View className="px-5 pt-8 pb-6">
          {statsCards.map((card) => (
            <StatCardItem
              key={card.id}
              card={card}
              onPress={handleNavigation}
            />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OverviewScreen;
