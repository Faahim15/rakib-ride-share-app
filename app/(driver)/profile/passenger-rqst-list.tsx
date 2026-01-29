import AppImage from "@/src/components/image/AppImage";
import BlockModal from "@/src/components/passenger/tabs/trip/modal/BlockModal";
import ReportModal from "@/src/components/passenger/tabs/trip/modal/ReportModal";
import { useLanguage } from "@/src/localization/LangaugeContext";
import passengerData, {
  PassengerRequest,
} from "@/src/mockData/driver/passenger.rqst.data";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

const PassengerRequestList = () => {
  const { t } = useLanguage();

  /* -------------------- STATE -------------------- */
  const [reportModalVisible, setReportModalVisible] = React.useState(false);
  const [blockModalVisible, setBlockModalVisible] = React.useState(false);
  const [selectedPassenger, setSelectedPassenger] =
    React.useState<PassengerRequest | null>(null);

  /* -------------------- HANDLERS -------------------- */
  const handleReport = (reason: string, description: string) => {
    console.log("Report:", selectedPassenger?.id, reason, description);
    Alert.alert(
      t("driver.tabs.passengerRequestList.successTitle"),
      t("driver.tabs.passengerRequestList.reportSubmitted")
    );
    setReportModalVisible(false);
  };

  const handleBlock = () => {
    console.log("Blocked:", selectedPassenger?.id);
    Alert.alert(
      t("driver.tabs.passengerRequestList.successTitle"),
      t("driver.tabs.passengerRequestList.passengerBlocked")
    );
    setBlockModalVisible(false);
  };

  /* -------------------- RENDER ITEM -------------------- */
  const renderItem = ({ item }: { item: PassengerRequest }) => {
    return (
      <View className="bg-white mx-[4%] mb-4 rounded-2xl shadow-sm">
        {/* Header */}
        <View className="flex-row items-center justify-between px-[4%] pt-[3%] pb-[2%]">
          <View className="flex-row items-center flex-1">
            <AppImage
              source={item.avatar}
              width={scale(45)}
              height={verticalScale(45)}
              borderRadius={scale(22)}
            />

            <View className="ml-[3%] flex-1">
              <Text className="font-poppinsSemiBold text-base text-gray-900">
                {item.name}
              </Text>
              <View className="flex-row items-center mt-0.5">
                <Ionicons name="star" size={14} color="#FFA500" />
                <Text className="font-poppins text-xs text-gray-500 ml-1">
                  ({item.rating.toFixed(1)})
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              router.push("/(driver)/profile/passenger-rqst-details")
            }
          >
            <Ionicons name="chevron-forward" size={24} color="#00ABB0" />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View className="px-[4%] pb-[2%]">
          <Text className="font-poppins text-sm text-gray-600 mb-1">
            {item.pickup}
          </Text>
          <Text className="font-poppins text-sm text-gray-600">
            {item.destination}
          </Text>
        </View>

        {/* Seats & Distance */}
        <View className="flex-row items-center justify-between px-[4%] pb-[3%]">
          <Text className="font-poppinsMedium text-sm text-gray-700">
            {item.seats} {t("driver.tabs.passengerRequestList.seats")}
          </Text>
          <Text className="font-poppinsMedium text-sm text-gray-700">
            {item.distance} {t("driver.tabs.passengerRequestList.km")}
          </Text>
        </View>

        {/* Open Request */}
        <TouchableOpacity
          onPress={() =>
            router.push("/(driver)/profile/passenger-rqst-details")
          }
          className="bg-brandColor mx-[4%] mb-[3%] py-[3.5%] rounded-xl items-center"
          activeOpacity={0.8}
        >
          <Text className="font-poppinsSemiBold text-white text-base">
            {t("driver.tabs.passengerRequestList.openRequest")}
          </Text>
        </TouchableOpacity>

        {/* Actions */}
        <View className="flex-row items-center justify-between px-[4%] pb-[4%] gap-3">
          <TouchableOpacity
            onPress={() => {
              setSelectedPassenger(item);
              setReportModalVisible(true);
            }}
            className="flex-1 bg-amber-500 py-[3%] rounded-xl items-center flex-row justify-center"
            activeOpacity={0.8}
          >
            <Ionicons name="flag-outline" size={16} color="white" />
            <Text className="font-poppinsMedium text-white text-sm ml-1.5">
              {t("driver.tabs.passengerRequestList.reportUser")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedPassenger(item);
              setBlockModalVisible(true);
            }}
            className="flex-1 bg-red-500 py-[3%] rounded-xl items-center flex-row justify-center"
            activeOpacity={0.8}
          >
            <Ionicons name="ban-outline" size={16} color="white" />
            <Text className="font-poppinsMedium text-white text-sm ml-1.5">
              {t("driver.tabs.passengerRequestList.blockUser")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /* -------------------- UI -------------------- */
  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={passengerData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Report Modal */}
      <ReportModal
        visible={reportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onSubmit={handleReport}
      />

      {/* Block Modal */}
      <BlockModal
        visible={blockModalVisible}
        onClose={() => setBlockModalVisible(false)}
        onConfirm={handleBlock}
        driverName={selectedPassenger?.name ?? ""}
      />
    </View>
  );
};

export default PassengerRequestList;
