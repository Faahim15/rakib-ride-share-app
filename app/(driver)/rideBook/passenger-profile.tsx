import Passenger from "@/src/components/driver/profile/PassengerProfile";
import ActionButtons from "@/src/components/passenger/tabs/trip/ActionButtons";
import BlockModal from "@/src/components/passenger/tabs/trip/modal/BlockModal";
import ReportModal from "@/src/components/passenger/tabs/trip/modal/ReportModal";
import RenderReview from "@/src/components/passenger/tabs/trip/RenderReview";
import Statistics from "@/src/components/passenger/tabs/trip/Statistics";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { getDriverById } from "@/src/mockData/passenger/savedDriverData";
import { scale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RideHistory {
  id: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  status: "completed" | "cancelled";
}

const PassengerProfileScreen = () => {
  const [reportModalVisible, setReportModalVisible] = React.useState(false);
  const [blockModalVisible, setBlockModalVisible] = React.useState(false);
  const { t } = useLanguage();

  const rideHistory: RideHistory[] = [
    {
      id: "1",
      date: "10/12/2025",
      time: "10:30 AM",
      pickup: "2118 Thornridge Cir. Syracuse",
      dropoff: "55 park Ave",
      status: "completed",
    },
    {
      id: "2",
      date: "09/12/2025",
      time: "2:45 PM",
      pickup: "2118 Thornridge Cir. Syracuse",
      dropoff: "123 Main st",
      status: "completed",
    },
    {
      id: "3",
      date: "08/12/2025",
      time: "8:00 AM",
      pickup: "Downtown Amman",
      dropoff: "Queen Alia Airport",
      status: "completed",
    },
    {
      id: "4",
      date: "07/12/2025",
      time: "6:00 PM",
      pickup: "Jabal Amman",
      dropoff: "Dead Sea",
      status: "cancelled",
    },
  ];

  const handleReport = (reason: string, description: string) => {
    console.log("Report:", reason, description);
    Alert.alert("Success", "Report submitted successfully");
    setReportModalVisible(false);
  };

  const handleBlock = () => {
    console.log("Passenger blocked");
    Alert.alert("Success", "Passenger has been blocked");
    setBlockModalVisible(false);
  };

  const driverInfo = getDriverById("1");

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Passenger />

        <View className="px-[6%]">
          <View pointerEvents="none">
            <ActionButtons />
          </View>
          <Statistics rideShared={310} rideCancelled={5} />
        </View>

        {/* Trip History Header */}
        {/* <View className="px-[6%] mt-6 mb-4">
          <Text className="font-poppinsBold text-gray-900 text-lg">
            Trip History
          </Text>
        </View> */}

        {/* Ride History */}
        {/* <View className="mx-[6%] mb-6">
          <FlatList
            data={rideHistory}
            renderItem={renderRideHistory}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View> */}
        {/* Reviews Section */}
        <View className="mt-6 px-[6%] ">
          <View className="flex-row items-center mb-[1%]">
            <Text className="font-poppinsBold text-lg text-gray-900">
              {t("passenger.tabs.home.reviews")}
            </Text>
            <Text className="font-poppins text-sm text-gray-500 ml-2">
              ({driverInfo?.totalRatings || "235"}{" "}
              {t("passenger.tabs.home.reviews")})
            </Text>
          </View>
          <FlatList
            data={driverInfo?.reviews}
            renderItem={({ item }) => <RenderReview item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: scale(4) }}
          />
        </View>
        {/* Bottom Actions - Report and Block */}
        <View className="flex-row mx-[6%] mt-[6%] mb-8 gap-3">
          <TouchableOpacity
            onPress={() => setReportModalVisible(true)}
            className="flex-1 bg-orange-500 rounded-xl py-4 flex-row items-center justify-center gap-2"
          >
            <Ionicons name="flag-outline" size={18} color="white" />
            <Text className="text-white text-center font-poppinsSemiBold">
              {t("driver.tabs.passengerRequestList.reportUser")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setBlockModalVisible(true)}
            className="flex-1 bg-red-500 rounded-xl py-4 flex-row items-center justify-center gap-2"
          >
            <Ionicons name="ban-outline" size={18} color="white" />
            <Text className="text-white text-center font-poppinsSemiBold">
              {t("driver.tabs.passengerRequestList.blockUser")}
            </Text>
          </TouchableOpacity>
        </View>

        <ReportModal
          visible={reportModalVisible}
          onClose={() => setReportModalVisible(false)}
          onSubmit={handleReport}
        />

        <BlockModal
          visible={blockModalVisible}
          onClose={() => setBlockModalVisible(false)}
          onConfirm={handleBlock}
          driverName="Alex Jackob"
        />
      </ScrollView>
    </View>
  );
};

export default PassengerProfileScreen;
