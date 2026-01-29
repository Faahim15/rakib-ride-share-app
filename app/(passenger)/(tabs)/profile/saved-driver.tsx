import SavedDrivers from "@/src/components/passenger/tabs/trip/SavedDrivers";
import { savedDriversData } from "@/src/mockData/passenger/savedDriverData";
import { verticalScale } from "@/src/utils/scaling";
import React from "react";
import { FlatList, View } from "react-native";

export default function SavedDriver() {
  return (
    <View className=" flex-1 px-[6%] bg-white">
      <View className="mt-6">
        <FlatList
          data={savedDriversData}
          renderItem={({ item }) => <SavedDrivers item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(80) }}
        />
      </View>
    </View>
  );
}
