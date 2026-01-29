import AppImage from "@/src/components/image/AppImage";
import TransactionHistoryTab from "@/src/components/passenger/profile/TransactionTab";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StatusBar, Text, View } from "react-native";

// Sample transaction data
const transactionData = [
  {
    id: "1",
    date: "08 JANUARY",
    transactions: [
      {
        id: "1-1",
        name: "Esther Howard",
        account: "Account ending in 2983",
        amount: "15.00",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "1-2",
        name: "Bessie Cooper",
        account: "Account ending in 2983",
        amount: "15.00",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "1-3",
        name: "Sarah Jones",
        account: "Account ending in 2983",
        amount: "15.00",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
    ],
  },
  {
    id: "2",
    date: "07 JANUARY",
    transactions: [
      {
        id: "2-1",
        name: "Robert Fox",
        account: "Account ending in 2983",
        amount: "15.00",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
    ],
  },
  {
    id: "3",
    date: "06 JANUARY",
    transactions: [
      {
        id: "3-1",
        name: "Cameron Willan",
        account: "Account ending in 2983",
        amount: "15.00",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
    ],
  },
];

export default function TransactionHistory() {
  const renderTransaction = ({ item }: any) => (
    <View className="flex-row items-center justify-between px-[6%] py-4 bg-white">
      <View className="flex-row items-center flex-1">
        {item?.avatar ? (
          <AppImage
            source={item.avatar}
            width={scale(44)}
            height={verticalScale(44)}
            borderRadius={scale(22)}
          />
        ) : (
          <View
            className="items-center justify-center bg-gray-200"
            style={{
              width: scale(44),
              height: verticalScale(44),
              borderRadius: scale(22),
            }}
          >
            <Ionicons name="person" size={scale(24)} color="#6C6C70" />
          </View>
        )}
        <View className="ml-3 flex-1">
          <Text className="font-poppins text-base text-[#1C1C1E]">
            {item.name}
          </Text>
          <Text className="font-poppins text-xs text-[#6C6C70] mt-0.5">
            {item.account}
          </Text>
        </View>
      </View>
      <Text className="font-poppinsSemiBold text-base text-[#00BCD4]">
        {item.amount}JOD
      </Text>
    </View>
  );

  const renderDateGroup = ({ item }: any) => (
    <View className="mb-4">
      <View className="px-[6%] py-3 bg-gray-50">
        <Text className="font-poppinsMedium text-[11px] text-gray-400 tracking-wide">
          {item.date}
        </Text>
      </View>
      {item.transactions.map((transaction: any, index: number) => (
        <View key={transaction.id}>
          {renderTransaction({ item: transaction })}
          {index < item.transactions.length - 1 && (
            <View className="h-[1px] bg-gray-100 mx-[6%]" />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Filter Tabs */}
      <TransactionHistoryTab />

      {/* Transaction List */}
      <FlatList
        data={transactionData}
        renderItem={renderDateGroup}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-6"
      />

      {/* Bottom Indicator */}
      <View className="items-center pb-4">
        <View className="w-[35%] h-1 bg-gray-900 rounded-full" />
      </View>
    </View>
  );
}
