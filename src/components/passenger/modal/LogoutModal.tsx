import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const { t } = useLanguage();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/50 px-[5%]"
        onPress={onClose}
        // activeOpacity={1}
      >
        <Pressable
          className="bg-white rounded-2xl p-[6%] w-full max-w-[400px] items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Icon Container */}
          <View className="w-[80px] h-[80px] rounded-full bg-red-100 justify-center items-center mb-[4%]">
            <Ionicons name="log-out-outline" size={48} color="#DC2626" />
          </View>

          {/* Title */}
          <Text className="text-2xl font-poppinsSemiBold text-gray-800 mb-[2%]">
            {t("passenger.tabs.profileScreenText.logout.logoutBtn")}
          </Text>

          {/* Description */}
          <Text className="text-sm font-poppins text-gray-500 text-center leading-5 mb-[6%] px-[2%]">
            {t("passenger.tabs.profileScreenText.logout.logoutText")}
          </Text>

          {/* Buttons */}
          <View className="flex-row w-full gap-[3%]">
            {/* Cancel Button */}
            <TouchableOpacity
              className="flex-1 h-[48px] rounded-lg bg-gray-100 border border-gray-300 justify-center items-center"
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text className="text-base font-poppinsSemiBold text-gray-700">
                {t("passenger.tabs.profileScreenText.logout.cancel")}
              </Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              className="flex-1 h-[48px] rounded-lg bg-red-600 justify-center items-center"
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text className="text-base font-poppinsSemiBold text-white">
                {t("passenger.tabs.profileScreenText.logout.logoutBtn")}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default LogoutModal;
