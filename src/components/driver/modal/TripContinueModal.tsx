import { correctIcon } from "@/assets/svg/tabs-svg";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface TripContinueModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function TripContinueModal({
  visible,
  onClose,
}: TripContinueModalProps) {
  const { t } = useLanguage();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1  bg-black/50 justify-end">
        <View className="bg-white   gap-y-[3%] rounded-tl-2xl rounded-tr-2xl rounded-t-3xl px-[6%] pt-6 pb-8">
          {/* Success Badge */}
          <View className="items-center mb-6">
            <View
              className="w-24 h-24 bg-brandColor rounded-full items-center justify-center"
              style={{
                transform: [{ rotate: "0deg" }],
                shadowColor: "#4DB8B8",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <View
                className="absolute inset-0 bg-brandColor rounded-full opacity-20"
                style={{ transform: [{ scale: 1.2 }] }}
              />
              <View
                className="absolute inset-0 bg-brandColor rounded-full opacity-10"
                style={{ transform: [{ scale: 1.4 }] }}
              />
              <Ionicons name="checkmark" size={48} color="#FFFFFF" />
            </View>
          </View>

          <View className="justify-center gap-y-1 items-center">
            <Text className="font-poppinsMedium text-lg text-[#0D0D0D] ">
              {t("passenger.tabs.trip.continueModalTitle")}
            </Text>
            <View className="flex-row items-center gap-x-1">
              <SvgXml xml={correctIcon} />
              <Text className="font-poppins text-lg text-brandColor">
                {t("passenger.tabs.trip.continueModalSubtitle")}
              </Text>
            </View>
          </View>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => router.push("/(passenger)/timeline/rating-screen")}
          >
            <View className="mt-6">
              <View
                className="border bg-brandColor border-brandColor rounded-lg py-[4%] items-center"
                onTouchEnd={onClose}
              >
                <Text className="text-white text-base font-poppinsMedium">
                  {t("passenger.tabs.trip.leaveReview")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <View className="mt-[0%]">
              <View
                className="border  border-brandColor rounded-lg py-[4%] items-center"
                onTouchEnd={onClose}
              >
                <Text className="text-brandColor text-base font-poppinsMedium">
                  {t("passenger.tabs.trip.goBack")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
