import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface BlockModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  driverName?: string;
}

export default function BlockModal({
  visible,
  onClose,
  onConfirm,
  driverName = "this driver",
}: BlockModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  const { t } = useLanguage();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          {/* Icon */}
          <View className="items-center mb-4">
            <View className="w-16 h-16 rounded-full bg-red-100 items-center justify-center">
              <Ionicons name="ban" size={32} color="#DC2626" />
            </View>
          </View>

          {/* Content */}
          <Text className="font-poppinsBold text-xl text-gray-900 text-center mb-2">
            {t("passenger.tabs.home.blockDriver")}
          </Text>
          <Text className="font-poppins text-sm text-gray-600 text-center mb-6">
            {t("passenger.tabs.home.confirm")} {driverName}?{" "}
            {t("passenger.tabs.home.confirm2")}
          </Text>

          {/* Action Buttons */}
          <View className="gap-3">
            <TouchableOpacity
              onPress={handleConfirm}
              className="bg-red-600 py-4 rounded-lg"
            >
              <Text className="font-poppinsMedium text-base text-white text-center">
                {t("passenger.tabs.home.yesBlock")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-100 py-4 rounded-lg"
            >
              <Text className="font-poppinsMedium text-base text-gray-700 text-center">
                {t("passenger.tabs.home.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
