import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale } from "@/src/utils/scaling";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CancelledScreen from "../passenger/myRides/screens/CancelledScreen";
import CompletedScreen from "../passenger/myRides/screens/CompletedScreen";
import OngoingScreen from "../passenger/myRides/screens/OngoingScreen";
import RequestsScreen from "../passenger/myRides/screens/RequestScreen";
import UpcomingScreen from "../passenger/myRides/screens/UpcomingScreen";

// ---------------------- Main MyRidesTab Component ----------------------
export default function MyRidesTab() {
  const { t } = useLanguage();

  const statuses = [
    t("driver.tabs.labels.upcoming"),
    t("driver.tabs.labels.ongoing"),
    t("driver.tabs.labels.requests"),
    t("driver.tabs.labels.completed"),
    t("driver.tabs.labels.cancelled"),
  ];

  const [activeStatusIndex, setActiveStatusIndex] = useState<number>(0);

  const handleTabPress = (index: number) => {
    setActiveStatusIndex(index);
  };

  const screenComponents = [
    <UpcomingScreen key="upcoming" />,
    <OngoingScreen key="ongoing" />,
    <RequestsScreen key="requests" />,
    <CompletedScreen key="completed" />,
    <CancelledScreen key="cancelled" />,
  ];

  return (
    <View className="flex-1 w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Status Tabs */}
      <View className=" flex-row mt-[1.5%]">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: scale(16),
            paddingRight: scale(220),
          }}
        >
          {statuses.map((status, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabPress(index)}
              className={`mr-[3%] pb-[1%] ${
                activeStatusIndex === index ? "border-b-2 border-[#00ABB0]" : ""
              }`}
            >
              <Text
                className={`text-base whitespace-nowrap ${
                  activeStatusIndex === index
                    ? "font-poppinsMedium text-base text-[#00ABB0]"
                    : "font-poppinsMedium text-base text-[#98A2B3]"
                }`}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Dynamic Screen Content Based on Active Tab */}
      <View className="flex-1 p-[4%]">
        {screenComponents[activeStatusIndex]}
      </View>
    </View>
  );
}
