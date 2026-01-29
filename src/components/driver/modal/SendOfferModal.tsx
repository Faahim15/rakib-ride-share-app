import { women } from "@/assets/svg/driver-svg";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";

interface SendOfferModalModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SendOfferModalModal({
  visible,
  onClose,
}: SendOfferModalModalProps) {
  const { t } = useLanguage();
  const [offerText, setOfferText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitOffer = async () => {
    if (!offerText.trim()) {
      Toast.show({
        type: "error",
        position: "top",
        text1: t("driver.tabs.sendOfferModal.text1_empty"),
        text2: t("driver.tabs.sendOfferModal.text2_empty"),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      return;
    }

    setIsLoading(true);

    // Show loading toast
    Toast.show({
      type: "info",
      position: "top",
      text1: t("driver.tabs.sendOfferModal.text1_sending"),
      text2: t("driver.tabs.sendOfferModal.text2_sending"),
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
    });

    // Simulate API call - replace with your actual API call
    setTimeout(() => {
      setIsLoading(false);

      // Show success toast
      Toast.show({
        type: "success",
        position: "top",
        text1: t("driver.tabs.sendOfferModal.text1_success"),
        text2: t("driver.tabs.sendOfferModal.text2_success"),
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
      });

      // Reset form and close modal
      setOfferText("");
      setTimeout(() => {
        router.push("/(driver)/(tabs)/trip");
      }, 1000);
    }, 2000);
  };

  const handleCancel = () => {
    setOfferText("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white gap-y-[3%] rounded-tl-2xl rounded-tr-2xl rounded-t-3xl px-[6%] pt-6 pb-8">
              <View className="items-center justify-center">
                <SvgXml xml={women} />
                <View className="mt-[2%]">
                  <Text className="font-poppins text-xl text-[#0D0D0D]">
                    {t("driver.tabs.sendOfferModal.typeYourOffer")}
                  </Text>
                </View>
              </View>
              <View>
                <TextInput
                  className="text-sm border rounded-md border-brandColor font-poppins text-black px-[3%] py-[4%]"
                  placeholder={t("driver.tabs.sendOfferModal.placeholder")}
                  keyboardType="phone-pad"
                  placeholderTextColor="#898989"
                  value={offerText}
                  onChangeText={setOfferText}
                  editable={!isLoading}
                  multiline
                />
              </View>

              <TouchableOpacity
                onPress={handleSubmitOffer}
                disabled={isLoading}
              >
                <View className="mt-[1%]">
                  <View
                    className={`border rounded-lg py-[3%] items-center ${
                      isLoading
                        ? "bg-gray-300 border-gray-300"
                        : "bg-brandColor border-brandColor"
                    }`}
                  >
                    <Text className="text-white text-base font-poppinsMedium">
                      {isLoading
                        ? "Sending..."
                        : t("passenger.tabs.ratingScreenText.submitBtn")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Cancel Button */}
              <View className="">
                <TouchableOpacity onPress={handleCancel} disabled={isLoading}>
                  <View className="border border-brandColor rounded-lg py-[3%] items-center">
                    <Text
                      className={`text-base font-poppinsMedium ${
                        isLoading ? "text-gray-400" : "text-brandColor"
                      }`}
                    >
                      {t("driver.tabs.sendOfferModal.cancel")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Toast notification */}
      <Toast />
    </Modal>
  );
}
