import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale } from "@/src/utils/scaling";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CancelledRideScreen from "../driver/myTrip/screens/CancelledRideScreen";
import CompletedRideScreen from "../driver/myTrip/screens/CompletedRideScreen";
import OngoingRideScreen from "../driver/myTrip/screens/OngoingRideScreen";
import PublishedRideScreen from "../driver/myTrip/screens/PublishedRideScreen";
import RequestRideScreen from "../driver/myTrip/screens/RequestRideScreen";
import UpcomingRideScreen from "../driver/myTrip/screens/UpcomingRideScreen";

// ---------------------- Main MyRidesTab Component ----------------------
export default function MyTripsTab() {
  const { t } = useLanguage();

  const statuses = [
    t("driver.tabs.labels.publishedRequest"),
    t("driver.tabs.labels.rideRequests"),
    t("driver.tabs.labels.upcomingRides"),
    t("driver.tabs.labels.ongoingRides"),
    t("driver.tabs.labels.completedRides"),
    t("driver.tabs.labels.cancelledRides"),
  ];

  const [activeStatusIndex, setActiveStatusIndex] = useState<number>(0);

  const handleTabPress = (index: number) => {
    setActiveStatusIndex(index);
  };

  const screenComponents = [
    <PublishedRideScreen key="publishedRides" />,
    <RequestRideScreen key="rideRequests" />,
    <UpcomingRideScreen key="upcomingRides" />,
    <OngoingRideScreen key="ongoingRides" />,
    <CompletedRideScreen key="completedRides" />,
    <CancelledRideScreen key="cancelledRides" />,
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
