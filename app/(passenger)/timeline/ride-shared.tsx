import { useLanguage } from "@/src/localization/LangaugeContext";
import { RideSharedItem } from "@/src/types/rides.cancelled.types";
import { verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Extended interface with profile pictures and dual reviews
interface RideSharedItemExtended extends RideSharedItem {
  driverProfilePicture?: string;
  passengerProfilePicture?: string;
  driverRating?: number;
  driverReview?: string;
  passengerRating?: number;
  passengerReview?: string;
}

// Sample fake data
const SAMPLE_SHARED_RIDES: RideSharedItemExtended[] = [
  {
    id: "1",
    driverName: "Marcus Johnson",
    passengerName: "Alex Turner",
    date: "January 3, 2026 at 2:30 PM",
    pickupLocation: "Central Station",
    dropoffLocation: "Downtown Business Plaza",
    fare: 18.5,
    rating: 5,
    review:
      "Excellent driver! Very professional and arrived exactly on time. The car was clean and comfortable. Highly recommended!",
    driverProfilePicture: "https://i.pravatar.cc/150?img=1",
    passengerProfilePicture: "https://i.pravatar.cc/150?img=2",
    driverRating: 5,
    driverReview:
      "Great passenger! Was on time and very respectful. Had a smooth and pleasant interaction.",
    passengerRating: 5,
    passengerReview:
      "Excellent driver! Very professional and arrived exactly on time. The car was clean and comfortable.",
  },
  {
    id: "2",
    driverName: "Patricia Chen",
    passengerName: "Sophie Williams",
    date: "January 2, 2026 at 7:15 PM",
    pickupLocation: "Shopping Mall Entrance",
    dropoffLocation: "Riverside Community Center",
    fare: 22.0,
    rating: 4.5,
    review:
      "Great ride overall. Driver knew the best routes and was very friendly. Minor issue with air conditioning but not a big deal.",
    driverProfilePicture: "https://i.pravatar.cc/150?img=3",
    passengerProfilePicture: "https://i.pravatar.cc/150?img=4",
    driverRating: 4.5,
    driverReview:
      "Pleasant passenger. Good conversation and friendly attitude throughout the journey.",
    passengerRating: 4.5,
    passengerReview:
      "Driver knew the best routes and was very friendly. Smooth and enjoyable ride.",
  },
  {
    id: "3",
    driverName: "Thomas Anderson",
    passengerName: "Jennifer Lopez",
    date: "December 31, 2025 at 9:45 PM",
    pickupLocation: "Holiday Inn Hotel",
    dropoffLocation: "Downtown Entertainment District",
    fare: 35.75,
    rating: 5,
    review:
      "Perfect New Year's Eve ride! Driver was cheerful and helped with luggage. Beautiful car and smooth driving experience.",
    driverProfilePicture: "https://i.pravatar.cc/150?img=5",
    passengerProfilePicture: "https://i.pravatar.cc/150?img=6",
    driverRating: 5,
    driverReview:
      "Wonderful passenger! Made the evening special with great conversation. Very respectful and courteous.",
    passengerRating: 5,
    passengerReview:
      "Perfect New Year's Eve ride! Driver was cheerful and helped with luggage. Beautiful car.",
  },
  {
    id: "4",
    driverName: "David Kumar",
    passengerName: "Michael Brown",
    date: "December 28, 2025 at 10:20 AM",
    pickupLocation: "Airport Terminal 1",
    dropoffLocation: "Grand Hotel Downtown",
    fare: 42.5,
    rating: 4,
    review:
      "Good service from airport. Driver was polite and took the fastest route. Vehicle was well-maintained.",
    driverProfilePicture: "https://i.pravatar.cc/150?img=7",
    passengerProfilePicture: "https://i.pravatar.cc/150?img=8",
    driverRating: 4,
    driverReview:
      "Professional passenger. Clear instructions and punctual. Appreciated the straightforward communication.",
    passengerRating: 4,
    passengerReview:
      "Driver was polite and took the fastest route. Vehicle was well-maintained and comfortable.",
  },
  {
    id: "5",
    driverName: "Isabella Rodriguez",
    passengerName: "Emma Davis",
    date: "December 26, 2025 at 3:50 PM",
    pickupLocation: "Community Library",
    dropoffLocation: "Westside Apartment Complex",
    fare: 15.25,
    rating: 5,
    review:
      "Amazing driver! Very helpful and kind. Played good music during the ride. Will definitely book again next time!",
    driverProfilePicture: "https://i.pravatar.cc/150?img=9",
    passengerProfilePicture: "https://i.pravatar.cc/150?img=10",
    driverRating: 5,
    driverReview:
      "Lovely passenger! Kind and thoughtful. Made the ride enjoyable with positive energy.",
    passengerRating: 5,
    passengerReview:
      "Amazing driver! Very helpful and kind. Played good music during the ride. Will definitely book again!",
  },
  {
    id: "6",
    driverName: "Christopher Walsh",
    passengerName: "Rachel Green",
    date: "December 24, 2025 at 6:30 PM",
    pickupLocation: "Shopping Center",
    dropoffLocation: "Family Residence on Oak Street",
    fare: 28.0,
    rating: 4.5,
    review:
      "Smooth ride home for the holidays. Driver was courteous and took care while handling my packages.",
    driverProfilePicture: "https://i.pravatar.cc/150?img=11",
    passengerProfilePicture: "https://i.pravatar.cc/150?img=12",
    driverRating: 4.5,
    driverReview:
      "Great passenger with holiday spirit! Careful with items and made the season brighter.",
    passengerRating: 4.5,
    passengerReview:
      "Driver was courteous and took care while handling my packages. Very attentive service.",
  },
];

// Ride Shared Screen
export default function RidesSharedScreen({
  rides = SAMPLE_SHARED_RIDES,
}: {
  rides?: RideSharedItemExtended[];
}) {
  const { t } = useLanguage();
  const [selectedRide, setSelectedRide] =
    useState<RideSharedItemExtended | null>(null);

  const renderRideItem = ({ item }: { item: RideSharedItemExtended }) => (
    <TouchableOpacity
      className="border border-gray-300 rounded-lg p-4 mb-3 bg-white"
      onPress={() => setSelectedRide(item)}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="font-poppinsBold text-base text-black mb-2">
            {item.driverName}
          </Text>
          <View className="gap-2">
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color="#666" />
              <Text className="font-poppins text-sm text-gray2 ml-2">
                {item.pickupLocation}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color="#666" />
              <Text className="font-poppins text-sm text-gray2 ml-2">
                {item.dropoffLocation}
              </Text>
            </View>
          </View>
          <Text className="font-poppins text-xs text-gray2 mt-2">
            {item.date}
          </Text>
        </View>
        <Text className="font-poppinsBold text-lg text-brandColor">
          {t("shared.currency.symbol")}
          {item.fare}
        </Text>
      </View>
      {item.rating && (
        <View className="flex-row items-center mt-3 pt-3 border-t border-gray-200">
          <View className="flex-row">
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < Math.floor(item.rating!) ? "star" : "star-outline"}
                size={14}
                color="#FFC107"
              />
            ))}
          </View>
          <Text className="font-poppins text-xs text-gray2 ml-2">
            {item.rating.toFixed(1)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={rides}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: verticalScale(60),
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-8">
            <Ionicons name="car-outline" size={48} color="#ccc" />
            <Text className="font-poppins text-gray2 mt-2">
              {t("shared.rideSharedScreen.noRides")}
            </Text>
          </View>
        }
      />

      {/* Ride Details Modal */}
      <Modal
        visible={selectedRide !== null}
        animationType="slide"
        onRequestClose={() => setSelectedRide(null)}
      >
        <ScrollView className="flex-1 bg-white">
          <View className="p-4">
            <TouchableOpacity
              onPress={() => setSelectedRide(null)}
              className="mb-4"
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <View className="bg-gray-50 rounded-lg p-4 mb-4">
              <Text className="font-poppinsBold text-lg text-black mb-4">
                {t("shared.rideSharedScreen.rideDetails")}
              </Text>

              <View className="gap-3">
                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideSharedScreen.driver")}
                  </Text>
                  <Text className="font-poppinsBold text-base text-black">
                    {selectedRide?.driverName}
                  </Text>
                </View>

                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideSharedScreen.date")}
                  </Text>
                  <Text className="font-poppinsBold text-base text-black">
                    {selectedRide?.date}
                  </Text>
                </View>

                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideSharedScreen.from")}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={16} color="#666" />
                    <Text className="font-poppinsBold text-base text-black ml-2">
                      {selectedRide?.pickupLocation}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideSharedScreen.to")}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={16} color="#666" />
                    <Text className="font-poppinsBold text-base text-black ml-2">
                      {selectedRide?.dropoffLocation}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideSharedScreen.fare")}
                  </Text>
                  <Text className="font-poppinsBold text-lg text-brandColor">
                    {t("shared.currency.symbol")}
                    {selectedRide?.fare}
                  </Text>
                </View>
              </View>
            </View>

            {selectedRide?.review && (
              <View className="bg-blue-50 rounded-lg p-4">
                <Text className="font-poppinsBold text-base text-black mb-4">
                  {t("shared.rideSharedScreen.reviews")}
                </Text>

                {/* Driver Review */}
                <View className="mb-4 pb-4 border-b border-blue-200">
                  <View className="flex-row items-center mb-3">
                    <Image
                      source={{ uri: selectedRide?.driverProfilePicture }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <View className="ml-3 flex-1">
                      <Text className="font-poppinsBold text-sm text-black">
                        {selectedRide?.driverName}
                      </Text>
                      <Text className="font-poppins text-xs text-gray2">
                        {t("shared.rideSharedScreen.driver")}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Ionicons
                        key={i}
                        name={
                          i < Math.floor(selectedRide?.driverRating || 0)
                            ? "star"
                            : "star-outline"
                        }
                        size={14}
                        color="#FFC107"
                      />
                    ))}
                    <Text className="font-poppins text-xs text-gray2 ml-2">
                      {selectedRide?.driverRating?.toFixed(1)}
                    </Text>
                  </View>
                  <Text className="font-poppins text-sm text-black">
                    {selectedRide?.driverReview}
                  </Text>
                </View>

                {/* Passenger Review */}
                <View>
                  <View className="flex-row items-center mb-3">
                    <Image
                      source={{ uri: selectedRide?.passengerProfilePicture }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <View className="ml-3 flex-1">
                      <Text className="font-poppinsBold text-sm text-black">
                        {selectedRide?.passengerName}
                      </Text>
                      <Text className="font-poppins text-xs text-gray2">
                        {t("shared.rideSharedScreen.passenger")}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Ionicons
                        key={i}
                        name={
                          i < Math.floor(selectedRide?.passengerRating || 0)
                            ? "star"
                            : "star-outline"
                        }
                        size={14}
                        color="#FFC107"
                      />
                    ))}
                    <Text className="font-poppins text-xs text-gray2 ml-2">
                      {selectedRide?.passengerRating?.toFixed(1)}
                    </Text>
                  </View>
                  <Text className="font-poppins text-sm text-black">
                    {selectedRide?.passengerReview}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
