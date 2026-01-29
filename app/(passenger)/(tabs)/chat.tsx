import ConversationStack from "@/src/components/passenger/tabs/chat/ConversationStack";
import React from "react";
import { View } from "react-native";

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-white">
      <ConversationStack />
    </View>
  );
}
