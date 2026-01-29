import { EditRequestModal } from "@/src/components/passenger/myRides/rideCard/EditModal";
import SummaryDetails from "@/src/components/passenger/tabs/trip/SummaryDetails";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
interface EditRequestType {
  id: string;
  pickupAddress: string;
  dropoffAddress: string;
  scheduledDate: string;
  scheduledTime: string;
  distance: string;
  seats: number;
}
export default function SinlgeTripDetails() {
  const { t } = useLanguage();
  const { location, showButton } = useLocalSearchParams<{
    location: string;
    showButton: string;
  }>();
  const [editingRide, setEditingRide] = useState<EditRequestType | null>(null);
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
    // Alert.alert("Success", "Ride updated successfully");
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
            subtitle={location}
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
      </View>
      {/* Action Buttons */}
      {showButton !== "No" && (
        <TouchableOpacity
          onPress={handleEditRequest}
          className="bg-[#00BFA6] rounded-2xl mx-[6%] py-4 items-center justify-center mb-3 shadow-sm active:opacity-80"
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
      )}

      {editingRide && (
        <EditRequestModal
          visible={!!editingRide}
          ride={editingRide}
          onClose={() => setEditingRide(null)}
          onSave={handleSaveEdit}
        />
      )}
    </ScrollView>
  );
}
