import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

/* ======================
   Types
====================== */

interface UserData {
  name: string;
  profilePhoto?: string;
  isOnline: boolean;
  lastActive?: string;
}

interface ChatHeaderProps {
  userData?: UserData;
}

/* ======================
   Fake User Data
====================== */

const FAKE_USER_DATA: UserData = {
  name: "John Doe Support",
  profilePhoto: "https://i.pravatar.cc/150?img=12",
  isOnline: true,
  lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
};

/* ======================
   Component
====================== */

const ChatHeader: React.FC<ChatHeaderProps> = ({
  userData = FAKE_USER_DATA,
}) => {
  const handleCall = () => {
    Alert.alert(
      "Premium Feature",
      "Call feature is available for premium users only. Upgrade your account to unlock calling.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Upgrade Now",
          onPress: () => {
            router.push("/(driver)/settings/change-membership");
          },
        },
      ]
    );
  };

  return (
    <View className="bg-white border-b border-[#f3f4f6] pt-[3%] pb-[1%] px-[4%] shadow-sm flex-row items-center">
      <TouchableOpacity onPress={() => router.back()} className="mr-4">
        <Ionicons name="arrow-back" size={22} color="#000" />
      </TouchableOpacity>

      {userData?.profilePhoto ? (
        <Image
          source={{ uri: userData.profilePhoto }}
          style={{ width: scale(38), height: verticalScale(38) }}
          className="rounded-full mr-[3%]"
        />
      ) : (
        <View
          style={{ width: scale(38), height: verticalScale(38) }}
          className="rounded-full mr-[3%] bg-gray-300 items-center justify-center"
        >
          <Ionicons name="person" size={24} color="#6B7280" />
        </View>
      )}

      <View className="flex-1">
        <Text className="text-gray-800 text-base font-poppinsMedium">
          {userData?.name?.split(" ").slice(0, 2).join(" ")}
        </Text>

        {userData?.isOnline ? (
          <Text className="text-gray-500 font-poppins text-sm">Active now</Text>
        ) : userData?.lastActive ? (
          <Text className="text-gray-500 font-poppins text-sm">
            {moment(userData.lastActive).fromNow()}
          </Text>
        ) : null}
      </View>

      <View className="flex-row">
        <TouchableOpacity onPress={handleCall}>
          <Ionicons name="call" size={22} color="#00ABB0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
