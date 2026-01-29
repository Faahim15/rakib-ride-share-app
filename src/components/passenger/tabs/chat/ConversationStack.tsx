import { scale, verticalScale } from "@/src/utils/scaling";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

/* =======================
   Types & Interfaces
======================= */

interface UserData {
  userId: string;
  name: string;
  profileImage: string;
}

interface Conversation {
  conversationId: string;
  userData: UserData;
  lastMsg: string;
  lastMsgCreatedAt: string;
}

interface MessageItemProps {
  item: Conversation;
}

/* =======================
   Mock Data
======================= */

const mockConversations: Conversation[] = [
  {
    conversationId: "1",
    userData: {
      userId: "101",
      name: "Maria Hossain",
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    lastMsg: "Hey! Are you available tomorrow?",
    lastMsgCreatedAt: "1:20 PM",
  },
  {
    conversationId: "2",
    userData: {
      userId: "102",
      name: "Tanvir Rahman",
      profileImage: "https://i.pravatar.cc/150?img=2",
    },
    lastMsg: "Thanks for the session!",
    lastMsgCreatedAt: "1:11 PM",
  },
];

/* =======================
   Message Item
======================= */

const MessageItem = ({ item }: MessageItemProps) => {
  const navigateToChat = () => {
    router.push({
      pathname: "/(passenger)/shared/chat-screen",
      params: {
        conversationId: item.conversationId,
        userId: item.userData.userId,
      },
    });
  };

  return (
    <Pressable onPress={navigateToChat}>
      <View className="flex-row items-center px-[4%] py-[2%] bg-white border-b border-gray2">
        <Image
          source={{ uri: item.userData.profileImage }}
          style={{ height: verticalScale(44), width: scale(44) }}
          className="aspect-square rounded-full"
        />

        <View className="flex-1 ml-2">
          <Text className="font-poppinsMedium text-sm text-black">
            {item.userData.name}
          </Text>
          <Text className="font-poppins text-xs text-[#475467] mt-[1%]">
            {item.lastMsg}
          </Text>
        </View>

        <Text className="font-poppins text-xs text-[#98A2B3]">
          {item.lastMsgCreatedAt}
        </Text>
      </View>
    </Pressable>
  );
};

/* =======================
   Conversation Stack
======================= */

export default function ConversationStack() {
  return (
    <View className="flex-1 bg-white">
      <FlatList<Conversation>
        data={mockConversations}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={(item) => item.conversationId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
