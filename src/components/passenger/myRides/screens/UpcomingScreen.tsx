import { useLanguage } from "@/src/localization/LangaugeContext";
import mockRides, { Ride } from "@/src/mockData/driver/trip.data";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import EmptyState from "../rideCard/EmptyState";
import RideCard from "../rideCard/RideCard";

export default function UpcomingScreen() {
  const { t } = useLanguage();
  const [rides, setRides] = useState<Ride[]>(mockRides);

  const handleChat = (rideId: string) => {
    router.push({
      pathname: "/(passenger)/shared/chat-screen",
      params: { rideId },
    });
  };

  const handleCancel = (rideId: string) => {
    router.push("/(passenger)/trip/cancel-ride");
  };

  const translations = {
    tripId: t("driver.rideDetail.tripId") || "Trip ID",
    driver: t("driver.rideDetail.driver") || "Driver",
    pickup: t("driver.rideDetail.pickup") || "Pickup",
    dropoff: t("driver.rideDetail.dropoff") || "Dropoff",
    dateTime: t("driver.rideDetail.dateTime") || "Date & Time",
    distance: t("driver.rideDetail.distance") || "Distance",
    seats: t("driver.rideDetail.seats") || "Seats",
    editTime: t("driver.tabs.upcomingScreen.editTime") || "Edit Time",
    chat: t("passenger.tabs.home.chat") || "Chat",
    call: t("passenger.tabs.home.call") || "Call",
    cancel: t("passenger.tabs.profileScreenText.logout.cancel") || "Cancel",
  };

  const renderRideCard = ({ item: ride }: { item: Ride }) => (
    <RideCard
      ride={ride}
      onChat={handleChat}
      onCancel={handleCancel}
      translations={translations}
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      title={t("driver.tabs.upcomingScreen.emptyTitle") || "No upcoming rides"}
      message={
        t("driver.tabs.upcomingScreen.emptyMessage") ||
        "You don't have any upcoming rides at the moment"
      }
    />
  );

  return (
    <View className="flex-1 w-full bg-white">
      <FlatList
        data={rides}
        renderItem={renderRideCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        scrollEnabled={true}
      />
    </View>
  );
}
