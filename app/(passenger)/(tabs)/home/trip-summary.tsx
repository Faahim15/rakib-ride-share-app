import TripSuccessModal from "@/src/components/passenger/modal/TripSucessModal";
import SummaryDetails from "@/src/components/passenger/tabs/trip/SummaryDetails";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function TripRequestForm() {
  const [multiDaySelection, setMultiDaySelection] = useState(true);
  const [stops, setStops] = useState([
    { location: "Petra", date: "28/10/2012", time: "08:30 AM" },
    { location: "Amman", date: "29/10/2012", time: "02:00 PM" },
  ]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { t } = useLanguage();

  const addStop = () => {
    router.push("/(passenger)/(tabs)/home/my-trip");
  };

  const removeStop = (index: number) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const handlePublishRequest = () => {
    Toast.show({
      type: "success",
      text1: "Tour trip request has been published",
      text2: "We will notify you when you receive a travel offer",
      position: "top",
    });

    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1500); // Delay modal by 1.5 seconds
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleChatWithDriver = () => {
    console.log("Chat with driver");
    setShowSuccessModal(false);
    router.push("/(passenger)/(tabs)/chat");
  };

  const handleViewTrip = () => {
    console.log("View trip");
    setShowSuccessModal(false);
    router.push("/(passenger)/(tabs)/home/trip-details");
  };

  const handleBackToHome = () => {
    console.log("Back to homes");
    setShowSuccessModal(false);
    router.push("/(passenger)/(tabs)/home");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
    >
      <View className="px-[6%] py-[4%]">
        {/* Trip Information */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-4">
          {/* Pickup Location */}
          <SummaryDetails
            title={t("passenger.tabs.trip.pickUplocation")}
            subtitle="Amman"
            iconName="location-outline"
          />

          {/* Drop-off Location */}
          <SummaryDetails
            title={t("passenger.tabs.trip.dropOffLocation")}
            subtitle="Airport"
            iconName="flag-outline"
          />

          {/* Trip Date */}
          <SummaryDetails
            title={t("passenger.tabs.trip.tripDate")}
            subtitle="28/10/2012"
            iconName="calendar-outline"
          />

          {/* Trip Time */}
          <SummaryDetails
            title={t("passenger.tabs.trip.tripTime")}
            subtitle="08:30AM"
            iconName="time-outline"
          />

          {/* Distance */}
          <SummaryDetails
            title={t("passenger.tabs.trip.distance")}
            subtitle="6.7 miles"
            iconName="speedometer-outline"
          />

          {/* Seat */}
          <SummaryDetails
            title={t("passenger.tabs.trip.seat")}
            subtitle="2 seats"
            iconName="person-outline"
          />

          {/* Luggage Size */}
          <SummaryDetails
            title={t("passenger.tabs.trip.luggageSize")}
            subtitle="M"
            iconName="briefcase-outline"
          />

          {/* Gender Preference */}
          <SummaryDetails
            title={t("passenger.tabs.trip.genderPreference")}
            subtitle="Female"
            iconName="people-outline"
          />
        </View>

        {/* Multi-day Selection */}
        <View className="flex-row justify-between items-center mb-6 bg-gray-50 rounded-2xl p-4">
          <View className="flex-row items-center">
            <Ionicons
              name="repeat-outline"
              size={20}
              color="#4DB8B8"
              style={{ marginRight: 8 }}
            />
            <Text className="font-poppinsMedium text-sm text-gray-800">
              {t("passenger.tabs.trip.multiDaySelection")}
            </Text>
          </View>
          <Switch
            value={multiDaySelection}
            onValueChange={setMultiDaySelection}
            trackColor={{ false: "#D1D5DB", true: "#00ABB0" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Stops Section - Only show if multi-day selection is true */}
        {multiDaySelection && (
          <View className="mb-6 bg-gray-50 rounded-2xl p-4">
            {/* Stops Header */}
            <View className="flex-row items-center mb-4">
              <Ionicons
                name="map-outline"
                size={20}
                color="#4DB8B8"
                style={{ marginRight: 8 }}
              />
              <Text className="font-poppinsSemiBold text-base text-gray-800">
                {t("passenger.tabs.trip.yourRoute")}
              </Text>
              <Text className="font-poppins text-sm text-gray-600 ml-2">
                ({stops.length} {t("passenger.tabs.trip.stops")})
              </Text>
            </View>

            {/* Route Visualization */}
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
                        pathname: "/(passenger)/(tabs)/home/single-trip",
                        params: { location: stop.location, showButton: "No" },
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

                  {/* Delete Button */}
                  <TouchableOpacity
                    onPress={() => removeStop(index)}
                    className="bg-red-500 rounded-lg p-2 ml-2"
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={18} color="white" />
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

            {/* Add Stop Button */}
            <TouchableOpacity
              onPress={addStop}
              className="flex-row items-center justify-center border-2 border-[#4DB8B8] rounded-xl py-3 mt-4"
              activeOpacity={0.7}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color="#4DB8B8"
                style={{ marginRight: 8 }}
              />
              <Text className="font-poppinsMedium text-base text-[#4DB8B8]">
                {t("passenger.tabs.trip.addStop")}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Publish Request Button */}
        <TouchableOpacity
          onPress={handlePublishRequest}
          className="bg-brandColor rounded-xl py-4 mb-[3%] items-center"
          activeOpacity={0.8}
        >
          <Text className="font-poppinsSemiBold text-base text-white">
            {t("passenger.tabs.trip.publishRequest")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <TripSuccessModal
        visible={showSuccessModal}
        onClose={handleCloseModal}
        onChatWithDriver={handleChatWithDriver}
        onViewTrip={handleViewTrip}
        onBackToHome={handleBackToHome}
      />
    </ScrollView>
  );
}
