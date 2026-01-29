import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface TripSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onChatWithDriver?: () => void;
  onViewTrip?: () => void;
  onBackToHome?: () => void;
}

export default function TripSuccessModal({
  visible,
  onClose,
  onChatWithDriver,
  onViewTrip,
  onBackToHome,
}: TripSuccessModalProps) {
  const { t } = useLanguage();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1  bg-black/50 justify-end">
        <View className="bg-white  rounded-tl-2xl rounded-tr-2xl rounded-t-3xl px-[6%] pt-6 pb-8">
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

          {/* Action Buttons */}
          {/* <TouchableOpacity
            onPress={onChatWithDriver}
            className="bg-brandColor rounded-xl py-4 items-center mb-3"
            activeOpacity={0.8}
          >
            <Text className="font-poppinsSemiBold text-base text-white">
              {t("passenger.tabs.trip.chatWithDriver")}
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={onViewTrip}
            className="bg-brandColor rounded-xl py-4 items-center mb-3"
            activeOpacity={0.8}
          >
            <Text className="font-poppinsSemiBold text-base text-white">
              {t("passenger.tabs.trip.viewTrip")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onBackToHome}
            className="bg-brandColor rounded-xl py-4 items-center"
            activeOpacity={0.8}
          >
            <Text className="font-poppinsSemiBold text-base text-white">
              {t("passenger.tabs.trip.backtoHome")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
