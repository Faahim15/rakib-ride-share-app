import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface VerificationSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onContinue?: () => void;
  title: string;
  subtitle: string;
}

const { height } = Dimensions.get("window");

export default function VerificationSuccessModal({
  visible,
  onClose,
  onContinue,
  title,
  subtitle,
}: VerificationSuccessModalProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { t } = useLanguage();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
          className="flex-1 bg-black/50"
        >
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="bg-white rounded-t-[30px] px-[8%] pt-[6%] pb-[10%] absolute bottom-0 left-0 right-0"
        >
          {/* Handle Bar */}
          <View className="w-[15%] h-1 bg-gray-300 rounded-full self-center mb-6" />

          {/* Success Icon */}
          <View className="items-center mb-6">
            <View className="w-[120px] h-[120px] bg-brandColor rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={70} color="white" />
            </View>
          </View>

          {/* Success Message */}
          <Text className="text-2xl font-poppinsSemiBold text-center text-[#0D0D0D] mb-2">
            {title}
          </Text>
          <Text className="text-base font-poppins text-gray text-center mb-8">
            {subtitle}
          </Text>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-brandColor py-4 rounded-lg mb-4"
            onPress={onContinue || onClose}
          >
            <Text className="text-white text-center text-lg font-poppinsSemiBold">
              {t("auth.verifyNumber.continue")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}
