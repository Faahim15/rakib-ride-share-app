import SendOfferModalModal from "@/src/components/driver/modal/SendOfferModal";
import Aminities from "@/src/components/driver/profile/Aminities";
import PassengerProfile from "@/src/components/driver/profile/PassengerProfile";
import BlockModal from "@/src/components/passenger/tabs/trip/modal/BlockModal";
import ReportModal from "@/src/components/passenger/tabs/trip/modal/ReportModal";
import SummaryDetails from "@/src/components/passenger/tabs/trip/SummaryDetails";
import PassengerRequestSkeleton from "@/src/components/skeleton/PassengerRqstSkeleton";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PassengerRequestDetails() {
  const { t } = useLanguage();
  const stops = [
    { location: "Petra", date: "28/10/2012", time: "08:30 AM" },
    { location: "Amman", date: "29/10/2012", time: "02:00 PM" },
  ];
  const passengerName = "Ahmed Hassan";
  const [showOffer, setShowOffer] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const { hasMultiDayItineraryRequest } = useLocalSearchParams();

  const hasMultiDayRequest = hasMultiDayItineraryRequest === "true";

  useEffect(() => {
    // simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePublishRequest = () => {
    setShowOffer(true);
  };

  const handleCancelRequest = () => {
    Alert.alert(
      "Cancel Request",
      "Are you sure you want to cancel this request?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            Alert.alert("Cancelled", "Request has been cancelled");
            router.back();
          },
        },
      ],
    );
  };

  const handleReport = (reason: string, description: string) => {
    console.log("Report:", reason, description);
    Alert.alert("Success", "Thank you for reporting this passenger");
    setReportModalVisible(false);
  };

  const handleBlock = () => {
    console.log("Blocked:", passengerName);
    Alert.alert("Success", `${passengerName} has been blocked`);
    setBlockModalVisible(false);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }} className="flex-1 ">
      {loading ? (
        <PassengerRequestSkeleton />
      ) : (
        <View className="px-[6%] py-[4%]">
          <PassengerProfile
            onPress={() => router.push("/(driver)/rideBook/passenger-profile")}
          />

          {/* Trip Information */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-4">
            <SummaryDetails
              title={t("driver.tabs.passengerRequestDetails.pickupLocation")}
              subtitle="Amman"
              iconName="location-outline"
            />
            <SummaryDetails
              title={t("driver.tabs.passengerRequestDetails.dropoffLocation")}
              subtitle="Airport"
              iconName="flag-outline"
            />
            <SummaryDetails
              title={t("driver.tabs.passengerRequestDetails.tripDate")}
              subtitle="28/10/2012"
              iconName="calendar-outline"
            />
            <SummaryDetails
              title={t("driver.tabs.passengerRequestDetails.tripTime")}
              subtitle="08:30AM"
              iconName="time-outline"
            />
            <SummaryDetails
              title={t("driver.tabs.passengerRequestDetails.distance")}
              subtitle="6.7 miles"
              iconName="speedometer-outline"
            />
            <SummaryDetails
              title={t("driver.tabs.passengerRequestDetails.seat")}
              subtitle="2 seats"
              iconName="person-outline"
            />
            <SummaryDetails
              title={t("driver.tabs.passengerRequestDetails.luggageSize")}
              subtitle="M"
              iconName="briefcase-outline"
            />
            <SummaryDetails
              title={t("driver.tabs.passengerRequestDetails.genderPreference")}
              subtitle="Female"
              iconName="people-outline"
            />
          </View>
          {hasMultiDayRequest && (
            <>
              {/* Stops */}
              <Aminities
                iconName="calendar-outline"
                title={t("passenger.tabs.trip.multiDaySelection")}
              />

              <View className="mb-6">
                {stops.map((stop, index) => (
                  <View key={index}>
                    {/* Stop Item */}
                    <View className="flex-row items-center mb-3">
                      {/* Stop Indicator */}
                      <View className="relative mr-3">
                        <View className="bg-[#4DB8B8] rounded-full p-2 items-center justify-center">
                          <Text className="font-poppinsSemiBold text-white text-sm">
                            {index + 1}
                          </Text>
                        </View>
                      </View>

                      {/* Stop Details */}
                      <TouchableOpacity
                        onPress={() =>
                          router.push({
                            pathname: "/(driver)/(tabs)/trip/single-trip",
                            params: {
                              showButton: "No",
                              location: stop.location,
                            },
                          })
                        }
                        className="flex-1 bg-white rounded-lg px-3 py-3 flex-row items-center justify-between"
                        activeOpacity={0.7}
                      >
                        <View className="flex-1">
                          <Text className="font-poppins text-xs text-gray-500">
                            {t("passenger.tabs.trip.stop")} {index + 1}
                          </Text>
                          <Text className="font-poppinsMedium text-base text-[#4DB8B8]">
                            {stop.location}
                          </Text>
                          <Text className="font-poppins text-xs text-gray-500 mt-1">
                            {stop.date} • {stop.time}
                          </Text>
                        </View>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={20}
                          color="#4DB8B8"
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Connector Line */}
                    {index < stops.length - 1 && (
                      <View className="ml-6 mb-2">
                        <View className="w-0.5 h-4 bg-[#D1D5DB]" />
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Send Offer and Cancel Buttons */}
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              onPress={handlePublishRequest}
              className="flex-1 bg-brandColor rounded-xl py-4 items-center"
              activeOpacity={0.8}
            >
              <Text className="font-poppinsSemiBold text-base text-white">
                {t("driver.tabs.passengerRequestDetails.sendOffer")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancelRequest}
              className="flex-1 bg-red-500 rounded-xl py-4 items-center"
              activeOpacity={0.8}
            >
              <Text className="font-poppinsSemiBold text-base text-white">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          {/* Report and Block Buttons */}
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={() => setReportModalVisible(true)}
              className="flex-1 bg-amber-500 rounded-xl py-4 items-center flex-row justify-center gap-2"
              activeOpacity={0.8}
            >
              <Ionicons name="flag-outline" size={18} color="white" />
              <Text className="font-poppinsSemiBold text-base text-white">
                {t("driver.tabs.passengerRequestList.reportUser")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setBlockModalVisible(true)}
              className="flex-1 bg-red-700 rounded-xl py-4 items-center flex-row justify-center gap-2"
              activeOpacity={0.8}
            >
              <Ionicons name="ban-outline" size={18} color="white" />
              <Text className="font-poppinsSemiBold text-base text-white">
                {t("driver.tabs.passengerRequestList.blockUser")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Send Offer Modal */}
      <SendOfferModalModal
        visible={showOffer}
        onClose={() => setShowOffer(false)}
      />

      {/* Report Modal */}
      <ReportModal
        visible={reportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onSubmit={handleReport}
      />

      {/* Block Modal */}
      <BlockModal
        visible={blockModalVisible}
        onClose={() => setBlockModalVisible(false)}
        onConfirm={handleBlock}
        driverName={passengerName}
      />
    </ScrollView>
  );
}
