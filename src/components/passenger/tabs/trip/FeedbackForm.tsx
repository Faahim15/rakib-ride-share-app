import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

interface FeedbackOption {
  id: string;
  label: string;
}

export default function DriverFeedbackForm() {
  const { t } = useLanguage();

  const options: FeedbackOption[] = [
    { id: "1", label: t("shared.driverFeedback.priceHigher") },
    {
      id: "2",
      label: t("shared.driverFeedback.driverMisconduct"),
    },
    { id: "3", label: t("shared.driverFeedback.lostItem") },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("2");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    const selected = options.find((opt) => opt.id === selectedOption);
    console.log("Selected option:", selected);
    console.log("Comment:", comment);

    // Show toast message
    Toast.show({
      type: "success",
      position: "top",
      text1: t("shared.driverFeedback.rideCancelled"),
      text2: t("shared.driverFeedback.feedbackSubmitted"),
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
    });

    // Navigate back
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1">
        <View className="px-[6%] py-[8%]">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedOption(option.id)}
              className="flex-row items-center mb-[2%]"
              activeOpacity={0.7}
            >
              <Ionicons
                name={
                  selectedOption === option.id
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
                color={selectedOption === option.id ? "#00ABB0" : "#D1D5DB"}
              />
              <Text
                className={`font-poppins text-sm ml-[3%] ${
                  selectedOption === option.id
                    ? "text-[#00ABB0]"
                    : "text-[#9CA3AF]"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}

          <Text className="font-poppinsMedium text-sm text-[#374151] mb-[3%] mt-[4%]">
            {t("shared.driverFeedback.addComment")}
          </Text>

          <TextInput
            className="bg-[#F1F1F5] rounded-lg px-[4%] py-[3%] font-poppins text-sm min-h-[120px] mb-[8%]"
            multiline
            textAlignVertical="top"
            value={comment}
            onChangeText={setComment}
            placeholder={t("shared.driverFeedback.feedbackPlaceholder")}
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-brandColor rounded-[8px] py-[4%] items-center"
            activeOpacity={0.8}
          >
            <Text className="font-poppinsMedium text-base text-white">
              {t("shared.driverFeedback.submit")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
