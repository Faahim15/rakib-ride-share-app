import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, View } from "react-native";

interface PublishSucessModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PublishSucessModal({
  visible,
  onClose,
}: PublishSucessModalProps) {
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
              {t("driver.tabs.myTrip.publishSuccess.title")}
            </Text>
            <Text className="font-poppinsMedium text-center text-[#8C8C8C] text-lg">
              {t("driver.tabs.myTrip.publishSuccess.subtitle")}
            </Text>
          </View>

          {/* Cancel Button */}
          <View className="mt-6">
            <View
              className="border border-brandColor rounded-lg py-[4%] items-center"
              onTouchEnd={onClose}
            >
              <Text className="text-brandColor text-base font-poppinsMedium">
                {t("driver.tabs.myTrip.publishSuccess.done")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
