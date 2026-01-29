import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale } from "@/src/utils/scaling";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import RouteCard from "./RouteCard"; // make sure this path is correct

// ---------------------- Type Definitions ----------------------
interface Ride {
  pickupAddress: string;
  dropoffAddress: string;
}

// ---------------------- TransactionList Component ----------------------
interface TransactionListProps {
  month: string;
  rides: Ride[];
  noRidesText: string;
}

function TransactionList({ month, rides, noRidesText }: TransactionListProps) {
  const { t } = useLanguage();

  return (
    <View className="p-4">
      <Text className="font-poppinsMedium text-gray-800 mb-3">
        {t("driver.tabs.completedRides.completedRidesFor")}
        <Text className="text-brandColor">{month}</Text>
      </Text>

      {rides.length === 0 ? (
        <Text className="text-gray-400">{noRidesText}</Text>
      ) : (
        rides.map((ride, index) => (
          <RouteCard
            key={index}
            pickupAddress={ride.pickupAddress}
            dropoffAddress={ride.dropoffAddress}
          />
        ))
      )}
    </View>
  );
}

// ---------------------- NavigationTab Component ----------------------
const ridesData: Record<string, Ride[]> = {
  January: [
    {
      pickupAddress: "123 Main St, Los Angeles, CA",
      dropoffAddress: "456 Oak St, SF, CA",
    },
    {
      pickupAddress: "789 Elm St, Miami, FL",
      dropoffAddress: "321 Pine St, Orlando, FL",
    },
  ],
  February: [
    {
      pickupAddress: "11 First Ave, NY, NY",
      dropoffAddress: "22 Second St, NY, NY",
    },
  ],
  // ... other months
  March: [],
  April: [],
  May: [],
  June: [],
  July: [],
  August: [],
  September: [],
  October: [],
  November: [],
  December: [],
};

export default function NavigationTab() {
  const { t } = useLanguage();

  const months = [
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
    "December",
  ];

  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(0);

  const handleTabPress = (index: number) => {
    setActiveMonthIndex(index);
  };

  return (
    <View className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Month Tabs */}
      <View className="flex-row mt-[1.5%]">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: scale(16),
            paddingRight: scale(220),
          }}
        >
          {months.map((month, index) => (
            <TouchableOpacity
              key={month}
              onPress={() => handleTabPress(index)}
              className={`mr-[3%] pb-[1%] ${
                activeMonthIndex === index ? "border-b-2 border-[#00ABB0]" : ""
              }`}
            >
              <Text
                className={`text-base whitespace-nowrap ${
                  activeMonthIndex === index
                    ? "font-poppinsMedium text-base text-[#00ABB0]"
                    : "font-poppinsMedium text-base text-[#98A2B3]"
                }`}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Transaction Content */}
      <TransactionList
        month={months[activeMonthIndex]}
        rides={ridesData[months[activeMonthIndex]] || []}
        noRidesText={t("driver.tabs.completedRides.noRides")}
      />
    </View>
  );
}
