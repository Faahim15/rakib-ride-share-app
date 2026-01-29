import { cancelModalIcon } from "@/assets/svg/auth-svg";
import { useLanguage } from "@/src/localization/LangaugeContext";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface CancelModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelModal({
  visible,
  onClose,
  onConfirm,
}: CancelModalProps) {
  const { t } = useLanguage();
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white rounded-2xl px-6 py-8 w-full max-w-sm">
          {/* Illustration */}
          <View className="justify-center items-center">
            <SvgXml xml={cancelModalIcon} />
          </View>

          {/* Question Text */}
          <Text className="text-center text-gray-800 mt-[3%] font-poppinsMedium text-base mb-[4%]">
            {t("passenger.tabs.trip.cancelModalTitle")}
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-800 rounded-xl py-4 items-center"
              activeOpacity={0.8}
            >
              <Text className="font-poppinsSemiBold text-base text-white">
                {t("passenger.tabs.trip.noBtn")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-teal-500 rounded-xl py-4 items-center"
              activeOpacity={0.8}
            >
              <Text className="font-poppinsSemiBold text-base text-white">
                {t("passenger.tabs.trip.yesBtn")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
