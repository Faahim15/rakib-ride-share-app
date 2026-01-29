import React from "react";
import { Text, View } from "react-native";

export default function Quote({ quote }: { quote?: string }) {
  return (
    <View className="bg-gray-50 rounded-lg px-4 py-3 mt-[2%]">
      <Text className="font-poppins text-sm text-gray-700 text-center">
        {quote
          ? quote
          : "I like peaceful trips and always drive safely. Happy to help with luggage."}
      </Text>
    </View>
  );
}
