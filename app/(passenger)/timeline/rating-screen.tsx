import AuthButton from "@/src/components/passenger/auth/AuthButton";
import CustomButton from "@/src/components/passenger/profile/CustomButton";
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

export default function RatingScreen() {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const { t } = useLanguage();
  const ratingLabels: { [key: number]: string } = {
    1: t("passenger.tabs.ratingScreenText.ratingLabels.1"),
    2: t("passenger.tabs.ratingScreenText.ratingLabels.2"),
    3: t("passenger.tabs.ratingScreenText.ratingLabels.3"),
    4: t("passenger.tabs.ratingScreenText.ratingLabels.4"),
    5: t("passenger.tabs.ratingScreenText.ratingLabels.5"),
  };

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    // Handle submit logic here
    alert(`Rating: ${rating} (${ratingLabels[rating]})\nComment: ${comment}`);
  };

  const handleNotNow = () => {
    console.log("Not now pressed");
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-[3%] justify-center px-[6%] ">
          {/* Header */}
          <View className="mb-8 mt-4">
            <Text className="text-center text-2xl font-poppinsSemiBold text-gray-800 mb-2">
              {t("passenger.tabs.ratingScreenText.headerTitle")}
            </Text>
            <Text className="text-center text-base font-poppins text-gray-600">
              {t("passenger.tabs.ratingScreenText.headerSubtitle")}
            </Text>
          </View>

          {/* Star Rating */}
          <View className="flex-row justify-center items-center mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
                className="mx-1"
              >
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={40}
                  color={star <= rating ? "#FFC107" : "#E0E0E0"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Rating Label */}
          <Text className="text-center text-lg font-poppinsMedium text-[#00BCD4] mb-8">
            {ratingLabels[rating]}
          </Text>

          {/* Comment Input */}
          <View className="mb-[6%]">
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder={t(
                "passenger.tabs.ratingScreenText.commentPlaceholder"
              )}
              placeholderTextColor="#B0B0B0"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="border border-brandColor rounded-lg px-4 py-3 font-poppins text-gray-800 min-h-[120px]"
              style={{ fontFamily: "Poppins_400Regular" }}
            />
          </View>

          <AuthButton
            title={t("passenger.tabs.ratingScreenText.submitBtn")}
            onPress={handleSubmit}
          />

          <View className="mt-[2%]">
            <CustomButton
              textColor="#00ABB0"
              title={t("passenger.tabs.ratingScreenText.notNowBtn")}
              onPress={handleNotNow}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
