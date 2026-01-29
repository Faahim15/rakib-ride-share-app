import Aminities from "@/src/components/driver/profile/Aminities";
import ActionButtons from "@/src/components/passenger/tabs/trip/ActionButtons";
import BlockModal from "@/src/components/passenger/tabs/trip/modal/BlockModal";
import ReportModal from "@/src/components/passenger/tabs/trip/modal/ReportModal";
import Quote from "@/src/components/passenger/tabs/trip/Quote";
import RenderReview from "@/src/components/passenger/tabs/trip/RenderReview";
import RenderVehicle from "@/src/components/passenger/tabs/trip/RenderVehicle";
import ReportButtons from "@/src/components/passenger/tabs/trip/ReportButtons";
import Statistics from "@/src/components/passenger/tabs/trip/Statistics";
import TripHeader from "@/src/components/passenger/tabs/trip/TripHeader";
import VehicleDetails from "@/src/components/passenger/tabs/trip/VehicleDetails";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { getDriverById } from "@/src/mockData/passenger/savedDriverData";
import { scale } from "@/src/utils/scaling";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";

export default function DriverProfile() {
  // const [acEnabled, setAcEnabled] = React.useState(true);
  // const [usbEnabled, setUsbEnabled] = React.useState(true);
  // const [wifiEnabled, setWifiEnabled] = React.useState(true);
  const [reportModalVisible, setReportModalVisible] = React.useState(false);
  const [blockModalVisible, setBlockModalVisible] = React.useState(false);
  const { t } = useLanguage();
  const { driverId } = useLocalSearchParams();

  const normalizedDriverId =
    typeof driverId === "string" ? driverId : undefined;

  const driverInfo = normalizedDriverId
    ? getDriverById(normalizedDriverId)
    : undefined;

  // console.log("driver", driverInfo);

  const { bio } = driverInfo || {};

  const handleReport = (reason: string, description: string) => {
    // Handle report submission
    console.log("Report:", reason, description);
    Alert.alert("Success", "Report submitted successfully");
  };

  const handleBlock = () => {
    // Handle block action
    console.log("Driver blocked");
    Alert.alert("Success", "Driver has been blocked");
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white"
      >
        <View className="px-[4%] pt-8 pb-4">
          <TripHeader item={driverInfo} />
          <Quote quote={bio} />
          <ActionButtons disabled={true} />
          <Statistics
            rideShared={driverInfo?.ridesShared}
            rideCancelled={driverInfo?.ridesCancelled}
          />

          {/* Vehicles */}
          <View className="mt-6">
            <FlatList
              data={driverInfo?.carImages}
              renderItem={({ item }) => <RenderVehicle item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <VehicleDetails />
          <Aminities
            iconName="snow-outline"
            title={t("driver.addVehicleDetails.amenities.ac")}
          />
          <Aminities
            iconName="musical-notes-outline"
            title={t("driver.addVehicleDetails.amenities.music")}
          />
          <Aminities
            iconName="ban-outline"
            disabled={true}
            title={t("driver.addVehicleDetails.amenities.smoking")}
          />
          <Aminities
            iconName="wifi-outline"
            title={t("driver.addVehicleDetails.amenities.wifi")}
          />
          <Aminities
            iconName="hardware-chip-outline"
            title={t("driver.addVehicleDetails.amenities.usb")}
          />

          {/* Reviews Section */}
          <View className="mt-6">
            <View className="flex-row items-center mb-3">
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
        </View>
      </ScrollView>
      <View className="border px-[3%] bg-white pb-[6%]  border-gray-100 justify-center items-center ">
        <ReportButtons
          onReportPress={() => setReportModalVisible(true)}
          onBlockPress={() => setBlockModalVisible(true)}
        />

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
      </View>
    </>
  );
}
