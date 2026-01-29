import Aminities from "@/src/components/driver/profile/Aminities";
import { EditRequestModal } from "@/src/components/passenger/myRides/rideCard/EditModal";
import CancelModal from "@/src/components/passenger/tabs/trip/modal/CancelModat";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface TripDetail {
  label: string;
  value: string;
  icon: string;
}
interface EditRequestType {
  id: string;
  pickupAddress: string;
  dropoffAddress: string;
  scheduledDate: string;
  scheduledTime: string;
  distance: string;
  seats: number;
}
const TripsDetailScreen = () => {
  const { t } = useLanguage();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const stops = [
    { location: "Petra", date: "28/10/2012", time: "08:30 AM" },
    { location: "Amman", date: "29/10/2012", time: "02:00 PM" },
  ];
  // const [editingRide, setEditingRide] = useState(null);
  const [editingRide, setEditingRide] = useState<EditRequestType | null>(null);
  const tripDetails: TripDetail[] = [
    {
      label: t("shared.tripDetailScreen.pickupLocation"),
      value: "Amphitheatre Parkway Mountain View",
      icon: "location-outline",
    },
    {
      label: t("shared.tripDetailScreen.dropoffLocation"),
      value: "Airport Terminal 2",
      icon: "flag-outline",
    },
    {
      label: t("shared.tripDetailScreen.tripDate"),
      value: "31 Dec, 2025",
      icon: "calendar-outline",
    },
    {
      label: t("shared.tripDetailScreen.tripTime"),
      value: "2:30 PM",
      icon: "time-outline",
    },
    {
      label: t("shared.tripDetailScreen.numberOfSeats"),
      value: "2 seats",
      icon: "person-outline",
    },
    {
      label: t("shared.tripDetailScreen.luggageSize"),
      value: "Medium",
      icon: "briefcase-outline",
    },
    {
      label: t("shared.tripDetailScreen.genderPreference"),
      value: "Female",
      icon: "people-outline",
    },
  ];

  const handleCancelRide = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    Alert.alert(
      t("shared.tripDetailScreen.cancelRequest"),
      t("shared.tripDetailScreen.cancelSuccess"),
      [
        {
          text: t("shared.tripDetailScreen.ok"),
          onPress: () => router.push("/(passenger)/(tabs)/trip"),
        },
      ],
    );
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleEditRequest = () => {
    setEditingRide({
      id: "trip-id", // Get from your actual trip data
      pickupAddress: "Amphitheatre Parkway Mountain View",
      dropoffAddress: "Airport Terminal 2",
      scheduledDate: "31/12/2025",
      scheduledTime: "14:30",
      distance: "15 km",
      seats: 2,
    });
  };
  const handleSaveEdit = (updatedRide: any) => {
    // Handle save logic here
    console.log("Updated ride:", updatedRide);
    setEditingRide(null); // Close modal after save
    Alert.alert("Success", "Ride updated successfully");
  };
  const handleBackHome = () => {
    router.push("/(passenger)/(tabs)/home");
  };

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-5 pt-6">
          {/* Trip Summary Section */}
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
            {tripDetails.map((detail, index) => (
              <View key={index}>
                <View className="flex-row items-center px-5 py-4">
                  <View className="w-10 h-10 bg-[#F0F0F0] rounded-full items-center justify-center mr-4">
                    <Ionicons
                      name={detail.icon as any}
                      size={20}
                      color="#00BFA6"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs font-poppins text-[#999] mb-1">
                      {detail.label}
                    </Text>
                    <Text className="text-sm font-poppinsMedium text-[#333]">
                      {detail.value}
                    </Text>
                  </View>
                </View>
                {index < tripDetails.length - 1 && (
                  <View className="mx-5 h-px bg-[#E8E8E8]" />
                )}
              </View>
            ))}
          </View>

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
                          pathname: "/(passenger)/(tabs)/home/single-trip",
                          params: { location: stop.location },
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

          {/* Info Box */}
          <View className="bg-[#FFF9E6] rounded-2xl p-4 mb-6 flex-row">
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#FFA500"
              style={{ marginRight: 12, marginTop: 2 }}
            />
            <View className="flex-1">
              <Text className="text-sm font-poppinsMedium text-[#333] mb-1">
                {t("shared.tripDetailScreen.waitingForOffers")}
              </Text>
              <Text className="text-xs font-poppins text-[#666]">
                {t("shared.tripDetailScreen.waitingForOffersDesc")}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            onPress={handleEditRequest}
            className="bg-[#00BFA6] rounded-2xl py-4 items-center justify-center mb-3 shadow-sm active:opacity-80"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="car-outline"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white text-base font-poppinsBold">
                {t("shared.tripDetailScreen.editRequest")}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancelRide}
            className="bg-white border-2 border-[#FF6B6B] rounded-2xl py-4 items-center justify-center mb-3 shadow-sm active:opacity-80"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="trash-outline"
                size={20}
                color="#FF6B6B"
                style={{ marginRight: 8 }}
              />
              <Text className="text-[#FF6B6B] text-base font-poppinsBold">
                {t("shared.tripDetailScreen.cancelRequest")}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBackHome}
            className="bg-[#F0F0F0] rounded-2xl py-4 items-center justify-center shadow-sm active:opacity-80"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="home-outline"
                size={20}
                color="#333"
                style={{ marginRight: 8 }}
              />
              <Text className="text-[#333] text-base font-poppinsBold">
                {t("shared.tripDetailScreen.backToHome")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Cancel Confirmation Modal */}
      <CancelModal
        visible={showCancelModal}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
      />
      {editingRide && (
        <EditRequestModal
          visible={!!editingRide}
          ride={editingRide}
          onClose={() => setEditingRide(null)}
          onSave={handleSaveEdit}
        />
      )}
    </View>
  );
};

export default TripsDetailScreen;
