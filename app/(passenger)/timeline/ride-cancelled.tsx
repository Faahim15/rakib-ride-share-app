import { useLanguage } from "@/src/localization/LangaugeContext";
import { RideCancelledItem } from "@/src/types/rides.cancelled.types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Sample fake data
const SAMPLE_CANCELLED_RIDES: RideCancelledItem[] = [
  {
    id: "1",
    driverName: "John Smith",
    passengerName: "Sarah Johnson",
    date: "January 2, 2026 at 3:45 PM",
    pickupLocation: "123 Main Street, Downtown",
    dropoffLocation: "456 Park Avenue, Uptown",
    reason: "priceHigher",
    comment:
      "The estimated fare was much higher than usual. Expected around $15 but it showed $28.",
  },
  {
    id: "2",
    driverName: "Michael Brown",
    passengerName: "Emily Davis",
    date: "January 1, 2026 at 7:20 PM",
    pickupLocation: "Airport Terminal 2",
    dropoffLocation: "Grand Hotel Downtown",
    reason: "driverMisconduct",
    comment:
      "Driver was rude and refused to follow the route I suggested. Very unprofessional behavior.",
  },
  {
    id: "3",
    driverName: "Robert Wilson",
    passengerName: "Jessica Martinez",
    date: "December 30, 2025 at 5:15 PM",
    pickupLocation: "Shopping Mall Entrance",
    dropoffLocation: "Riverside Apartments",
    reason: "lostItem",
    comment:
      "I left my phone in the car after the driver cancelled. Never got it back despite multiple contact attempts.",
  },
  {
    id: "4",
    driverName: "David Lee",
    passengerName: "Amanda White",
    date: "December 28, 2025 at 9:30 AM",
    pickupLocation: "Central Station",
    dropoffLocation: "Business District Tower A",
    reason: "priceHigher",
    comment:
      "Surge pricing made the fare unreasonable for a short distance trip.",
  },
  {
    id: "5",
    driverName: "Christopher Taylor",
    passengerName: "Rachel Green",
    date: "December 26, 2025 at 6:00 PM",
    pickupLocation: "Restaurant Downtown",
    dropoffLocation: "Residential Area Block 5",
    reason: "driverMisconduct",
    comment:
      "Driver kept asking personal questions and made me uncomfortable during the ride.",
  },
];

export default function RidesCancelledScreen({
  rides = SAMPLE_CANCELLED_RIDES,
}: {
  rides?: RideCancelledItem[];
}) {
  const { t } = useLanguage();
  const [selectedRide, setSelectedRide] = useState<RideCancelledItem | null>(
    null
  );

  const cancellationReasons: Record<string, string> = {
    priceHigher: t("shared.rideCancelledScreen.reasons.priceHigher"),
    driverMisconduct: t("shared.rideCancelledScreen.reasons.driverMisconduct"),
    lostItem: t("shared.rideCancelledScreen.reasons.lostItem"),
  };

  const renderRideItem = ({ item }: { item: RideCancelledItem }) => (
    <TouchableOpacity
      className="border border-red-200 rounded-lg p-4 mb-3 bg-red-50"
      onPress={() => setSelectedRide(item)}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="font-poppinsBold text-base text-black mb-2">
            {item.driverName || item.passengerName}
          </Text>
          <View className="gap-2">
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color="#dc2626" />
              <Text className="font-poppins text-sm text-red-600 ml-2">
                {item.pickupLocation}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color="#dc2626" />
              <Text className="font-poppins text-sm text-red-600 ml-2">
                {item.dropoffLocation}
              </Text>
            </View>
          </View>
          <Text className="font-poppins text-xs text-red-500 mt-2">
            {item.date}
          </Text>
        </View>
        {/* <View className="bg-red-200 rounded-full p-2">
          <Ionicons name="close-circle" size={24} color="#dc2626" />
        </View> */}
      </View>
      <View className="mt-3 pt-3 border-t border-red-200">
        <Text className="font-poppins text-xs text-red-600">
          {t("shared.rideCancelledScreen.cancellationReason")}:
        </Text>
        <Text className="font-poppinsBold text-sm text-red-700 mt-1">
          {cancellationReasons[item.reason] || item.reason}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={rides}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-8">
            <Ionicons name="close-circle-outline" size={48} color="#ccc" />
            <Text className="font-poppins text-gray2 mt-2">
              {t("shared.rideCancelledScreen.noCancelledRides")}
            </Text>
          </View>
        }
      />

      {/* Cancellation Details Modal */}
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

            <View className="bg-red-50 rounded-lg p-4 mb-4">
              <Text className="font-poppinsBold text-lg text-black mb-4">
                {t("shared.rideCancelledScreen.cancellationDetails")}
              </Text>

              <View className="gap-3">
                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideCancelledScreen.user")}
                  </Text>
                  <Text className="font-poppinsBold text-base text-black">
                    {selectedRide?.driverName || selectedRide?.passengerName}
                  </Text>
                </View>

                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideCancelledScreen.date")}
                  </Text>
                  <Text className="font-poppinsBold text-base text-black">
                    {selectedRide?.date}
                  </Text>
                </View>

                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideCancelledScreen.from")}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={16} color="#dc2626" />
                    <Text className="font-poppinsBold text-base text-black ml-2">
                      {selectedRide?.pickupLocation}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideCancelledScreen.to")}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={16} color="#dc2626" />
                    <Text className="font-poppinsBold text-base text-black ml-2">
                      {selectedRide?.dropoffLocation}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="font-poppins text-xs text-gray2 mb-1">
                    {t("shared.rideCancelledScreen.cancellationReason")}
                  </Text>
                  <Text className="font-poppinsBold text-base text-red-700">
                    {cancellationReasons[selectedRide?.reason!] ||
                      selectedRide?.reason}
                  </Text>
                </View>
              </View>
            </View>

            {selectedRide?.comment && (
              <View className="bg-gray-50 rounded-lg p-4">
                <Text className="font-poppinsBold text-base text-black mb-2">
                  {t("shared.rideCancelledScreen.additionalComment")}
                </Text>
                <Text className="font-poppins text-sm text-black">
                  {selectedRide.comment}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
