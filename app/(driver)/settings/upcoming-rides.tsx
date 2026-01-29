import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale, verticalScale } from "@/src/utils/scaling";
import { router } from "expo-router";
import { MapPin, Navigation, Star } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// ---------------------- Type Definitions ----------------------
interface Driver {
  name: string;
  rating: number;
  avatar: string;
  price: string;
}

interface Ride {
  id: string;
  driver: Driver;
  seats: number;
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
}

// ---------------------- RideCard Component ----------------------
interface RideCardProps {
  ride: Ride;
}

function RideCard({ ride }: RideCardProps) {
  return (
    <View className="bg-white rounded-lg mb-[4%] shadow-sm border border-gray-100">
      {/* Driver Info */}

      <TouchableOpacity
        onPress={() => router.push("/(driver)/rideBook/passenger-profile")}
      >
        <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
          <View className="flex-row items-center flex-1">
            <View
              style={{ height: verticalScale(48), width: scale(48) }}
              className=" rounded-full bg-gray-200 mr-3 overflow-hidden"
            >
              <View className="w-full h-full bg-brandColor items-center justify-center">
                <Text className="text-white font-poppinsMedium text-lg">
                  {ride.driver.name.charAt(0)}
                </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="font-poppinsMedium text-gray-800 text-base">
                {ride.driver.name}
              </Text>
              <View className="flex-row items-center">
                <Star size={14} color="#FFA500" fill="#FFA500" />
                <Text className="ml-1 text-gray-500 font-poppins text-sm">
                  ({ride.driver.rating.toFixed(1)})
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="font-poppinsMedium text-gray-800 text-base mr-2">
              {ride.driver.price}
            </Text>
            <TouchableOpacity>
              <Text className=" text-brandColor text-2xl">›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* Seats and Route Info */}
      <View className="p-[4%]">
        <Text className="font-poppins text-gray-600 text-sm mb-[3%]">
          {ride.seats} seats
        </Text>

        {/* Route Card */}
        <View className="bg-brandColor rounded-lg p-[4%]">
          {/* Pickup */}
          <View className="flex-row items-center mb-3">
            <View style={{ marginTop: 4, marginRight: 12 }}>
              <Navigation
                size={20}
                color="white"
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </View>
            <Text className="flex-1 text-white font-poppins text-sm">
              {ride.pickupAddress}
            </Text>
          </View>

          {/* Dotted Line */}
          <View className="ml-2 mb-3">
            <View
              style={{
                width: 2,
                height: 30,
                borderLeftWidth: 2,
                borderLeftColor: "white",
                borderStyle: "dotted",
              }}
            />
          </View>

          {/* Dropoff */}
          <View className="flex-row items-center">
            <View
              style={{ marginTop: verticalScale(3), marginRight: scale(10) }}
            >
              <MapPin size={20} color="white" />
            </View>
            <Text className="flex-1 text-white font-poppins text-sm">
              {ride.dropoffAddress}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ---------------------- RidesList Component ----------------------
interface RidesListProps {
  date: string;
  rides: Ride[];
  noRidesText: string;
}

function RidesList({ date, rides, noRidesText }: RidesListProps) {
  return (
    <View className="px-4 py-2">
      <Text className="font-poppinsMedium text-gray-600 text-sm mb-4">
        {date}
      </Text>

      {rides.length === 0 ? (
        <Text className="text-gray-400 text-center py-8">{noRidesText}</Text>
      ) : (
        rides.map((ride) => <RideCard key={ride.id} ride={ride} />)
      )}
    </View>
  );
}

// ---------------------- Main Component ----------------------
const ridesData: Record<string, Ride[]> = {
  December: [],
  January: [
    {
      id: "1",
      driver: {
        name: "Lucy Jonas",
        rating: 5.0,
        avatar: "",
        price: "220JOD",
      },
      seats: 4,
      pickupAddress: "2972 Westheimer Rd. Santa Ana",
      dropoffAddress: "2118 Thornridge Cir. Syracuse",
      date: "09 JANUARY",
    },
    {
      id: "2",
      driver: {
        name: "Olivia Rae",
        rating: 5.0,
        avatar: "",
        price: "220JOD",
      },
      seats: 4,
      pickupAddress: "2972 Westheimer Rd. Santa Ana",
      dropoffAddress: "2118 Thornridge Cir. Syracuse",
      date: "09 JANUARY",
    },
  ],
  February: [],
  March: [],
  April: [],
  May: [],
  June: [],
  July: [],
  August: [],
  September: [],
  October: [],
  November: [],
};

export default function UpcomingRides() {
  const { t } = useLanguage();

  const months = [
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ];

  const [activeTab, setActiveTab] = useState<string>("January");

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 pt-6 pb-2">
        <Text className="font-poppinsMedium text-gray-800 text-xl mb-4">
          {t("driver.tabs.upcomingRides.header")}
        </Text>

        {/* Month Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {months.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`mr-6 pb-3 ${
                activeTab === tab ? "border-b-2 border-teal-500" : ""
              }`}
            >
              <Text
                className={`text-base whitespace-nowrap ${
                  activeTab === tab
                    ? "font-poppinsMedium text-teal-500"
                    : "font-poppins text-gray-500"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Rides List */}
      <ScrollView className="flex-1">
        <RidesList
          date={activeTab === "January" ? "09 JANUARY" : ""}
          rides={ridesData[activeTab] || []}
          noRidesText={t("driver.tabs.upcomingRides.noRides")}
        />
      </ScrollView>
    </View>
  );
}
