import AppImage from "@/src/components/image/AppImage";
import { useLanguage } from "@/src/localization/LangaugeContext";
import passengerData, {
  PassengerRequest,
} from "@/src/mockData/driver/passenger.rqst.data";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SendOfferModalModal from "../../modal/SendOfferModal";

const RequestRideScreen = () => {
  const { t } = useLanguage();

  /* -------------------- STATE -------------------- */

  const [showOffer, setShowOffer] = useState(false);
  // const [selectedPassenger, setSelectedPassenger] =
  //   React.useState<PassengerRequest | null>(null);

  /* -------------------- HANDLERS -------------------- */

  const handleSendOffer = (passenger: PassengerRequest) => {
    setShowOffer(true);
  };

  const handleCancelRide = (passenger: PassengerRequest) => {
    Alert.alert(
      "Cancel Ride",
      `Are you sure you want to cancel this ride with ${passenger.name}?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            Alert.alert("Cancelled", "Ride has been cancelled");
          },
        },
      ],
    );
  };

  /* -------------------- RENDER ITEM -------------------- */
  const renderItem = ({ item }: { item: PassengerRequest }) => {
    return (
      <View className="bg-white border border-gray-200 mb-4 rounded-2xl shadow-sm">
        {/* Header */}
        <View className="flex-row items-center justify-between px-[4%] pt-[3%] pb-[2%]">
          <Pressable
            onPress={() => router.push("/(driver)/rideBook/passenger-profile")}
            className="flex-row items-center flex-1"
          >
            <AppImage
              source={item.avatar}
              width={scale(45)}
              height={verticalScale(45)}
              borderRadius={scale(22)}
            />

            <View className="ml-[3%] flex-1">
              <Text className="font-poppinsSemiBold text-base text-gray-900">
                {item.name}
              </Text>
              {/* <View className="flex-row items-center mt-0.5">
                <Ionicons name="star" size={14} color="#FFA500" />
                <Text className="font-poppins text-xs text-gray-500 ml-1">
                  ({item.rating.toFixed(1)})
                </Text>
              </View> */}
            </View>
          </Pressable>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(driver)/(tabs)/trip/passenger-rqst-details",
                params: {
                  hasMultiDayItineraryRequest:
                    item.hasMultiDayItineraryRequest?.toString(),
                },
              })
            }
          >
            <Ionicons name="chevron-forward" size={24} color="#00ABB0" />
          </TouchableOpacity>
        </View>

        {/* Multi-day Itinerary Warning */}
        {item.hasMultiDayItineraryRequest && (
          <View className="mx-[4%] mb-[2%] bg-blue-50 rounded-lg px-3 py-2 flex-row items-center gap-2">
            <Ionicons name="information-circle" size={16} color="#2563EB" />
            <Text className="text-blue-700 font-poppins text-xs flex-1">
              The passenger has requested a multi-day itinerary
            </Text>
          </View>
        )}

        {/* Location */}
        <View className="px-[4%] pb-[2%]">
          <View className="flex-row items-start mb-1">
            <Ionicons
              name="location-outline"
              size={16}
              color="#6B7280"
              style={{ marginTop: 2 }}
            />
            <Text className="font-poppins text-sm text-gray-600 ml-1 flex-1">
              {item.pickup}
            </Text>
          </View>
          <View className="flex-row items-start">
            <Ionicons
              name="flag-outline"
              size={16}
              color="#6B7280"
              style={{ marginTop: 2 }}
            />
            <Text className="font-poppins text-sm text-gray-600 ml-1 flex-1">
              {item.destination}
            </Text>
          </View>
        </View>

        {/* Seats & Distance */}
        <View className="flex-row items-center justify-between px-[4%] pb-[3%]">
          <Text className="font-poppinsMedium text-sm text-gray-700">
            {item.seats} {t("driver.tabs.passengerRequestList.seats")}
          </Text>
          <Text className="font-poppinsMedium text-sm text-gray-700">
            {item.distance} {t("driver.tabs.passengerRequestList.km")}
          </Text>
        </View>

        {/* Open Request */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(driver)/(tabs)/trip/passenger-rqst-details",
              params: {
                hasMultiDayItineraryRequest:
                  item.hasMultiDayItineraryRequest?.toString(),
              },
            })
          }
          className="bg-brandColor mx-[4%] mb-[3%] py-[3%] rounded-xl items-center"
          activeOpacity={0.8}
        >
          <Text className="font-poppinsSemiBold text-white text-sm">
            {t("driver.tabs.passengerRequestList.openRequest")}
          </Text>
        </TouchableOpacity>

        {/* Action Buttons - Cancel Only */}
        <View className="px-[4%] pb-[3%]">
          <TouchableOpacity
            onPress={() => handleCancelRide(item)}
            className="bg-red-500 py-[3%] rounded-xl items-center flex-row justify-center"
            activeOpacity={0.8}
          >
            <Ionicons name="close-circle-outline" size={16} color="white" />
            <Text className="font-poppinsSemiBold text-white text-sm ml-1.5">
              {t("driver.tabs.myTrip.publishedRides.cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /* -------------------- UI -------------------- */
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={passengerData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      <SendOfferModalModal
        visible={showOffer}
        onClose={() => setShowOffer(false)}
      />
    </View>
  );
};

export default RequestRideScreen;
