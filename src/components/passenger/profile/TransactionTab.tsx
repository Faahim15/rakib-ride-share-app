import { scale } from "@/src/utils/scaling";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// You can later replace this with a dynamic component
function TransactionList({ month }: { month: string }) {
  return (
    <View className="p-4">
      <Text className="font-poppinsMedium text-gray-800">
        Transactions for <Text className="text-brandColor">{month}</Text>
      </Text>
    </View>
  );
}

export default function TransactionHistoryTab() {
  // Months as array of strings
  const months: string[] = [
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

  const [activeMonth, setActiveMonth] = useState<string>(months[0]);

  const handleTabPress = (month: string): void => {
    setActiveMonth(month);
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
          {months.map((month) => (
            <TouchableOpacity
              key={month}
              onPress={() => handleTabPress(month)}
              className={`mr-[3%] pb-[1%] ${
                activeMonth === month ? "border-b-2 border-[#00ABB0]" : ""
              }`}
            >
              <Text
                className={`text-base whitespace-nowrap ${
                  activeMonth === month
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
      <TransactionList month={activeMonth} />
    </View>
  );
}
