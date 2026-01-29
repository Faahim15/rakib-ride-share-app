import AuthButton from "@/src/components/passenger/auth/AuthButton";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RidePreferencesScreen() {
  const [ladiesOnly, setLadiesOnly] = useState(true);
  const [luggageSize, setLuggageSize] = useState("S");
  const [conversational, setConversational] = useState("Talkative");
  const [musicPreference, setMusicPreference] = useState(true);
  const [petFriendly, setPetFriendly] = useState(false);

  const { t } = useLanguage();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-[6%] py-[8%]"
      >
        {/* Ladies-only preference */}
        <View className="flex-row justify-between items-center mb-[8%]">
          <Text className="font-poppinsMedium text-base text-gray-800">
            {t(
              "passenger.tabs.profileScreenText.ridePreferenceScreenText.ladiesOnlyPreference"
            )}
          </Text>
          <Switch
            value={ladiesOnly}
            onValueChange={setLadiesOnly}
            trackColor={{ false: "#d1d5db", true: "#00ABB0" }}
            thumbColor={ladiesOnly ? "#00ABB0" : "#f3f4f6"}
          />
        </View>

        {/* Luggage size */}
        <View className="mb-[8%]">
          <Text className="font-poppinsMedium text-base text-gray-800 mb-[4%]">
            {t(
              "passenger.tabs.profileScreenText.ridePreferenceScreenText.luggazeSize"
            )}
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setLuggageSize("S")}
              className="flex-row items-center mr-[8%]"
            >
              <Ionicons
                name={
                  luggageSize === "S" ? "radio-button-on" : "radio-button-off"
                }
                size={24}
                color={luggageSize === "S" ? "#00ABB0" : "#9ca3af"}
              />
              <Text className="font-poppins text-base text-gray-800 ml-[2%]">
                S
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLuggageSize("M")}
              className="flex-row items-center mr-[8%]"
            >
              <Ionicons
                name={
                  luggageSize === "M" ? "radio-button-on" : "radio-button-off"
                }
                size={24}
                color={luggageSize === "M" ? "#00ABB0" : "#9ca3af"}
              />
              <Text className="font-poppins  text-base text-gray-800 ml-[2%]">
                M
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLuggageSize("L")}
              className="flex-row items-center"
            >
              <Ionicons
                name={
                  luggageSize === "L" ? "radio-button-on" : "radio-button-off"
                }
                size={24}
                color={luggageSize === "L" ? "#00ABB0" : "#9ca3af"}
              />
              <Text className="font-poppins text-base text-gray-800 ml-[2%]">
                L
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Conversational preference */}
        <View className="mb-[8%]">
          <Text className="font-poppinsMedium text-base text-gray-800 mb-[4%]">
            {t(
              "passenger.tabs.profileScreenText.ridePreferenceScreenText.conversationalPreference"
            )}
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setConversational("Talkative")}
              className="flex-row items-center mr-[8%]"
            >
              <Ionicons
                name={
                  conversational === "Talkative"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={conversational === "Talkative" ? "#00ABB0" : "#9ca3af"}
              />
              <Text className="font-poppins text-base text-gray-800 ml-[2%]">
                {t(
                  "passenger.tabs.profileScreenText.ridePreferenceScreenText.talkative"
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setConversational("Quiet")}
              className="flex-row items-center"
            >
              <Ionicons
                name={
                  conversational === "Quiet"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={conversational === "Quiet" ? "#00ABB0" : "#9ca3af"}
              />
              <Text className="font-poppins text-base text-gray-800 ml-[2%]">
                {t(
                  "passenger.tabs.profileScreenText.ridePreferenceScreenText.quite"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Music preference */}
        <View className="flex-row justify-between items-center mb-[8%]">
          <Text className="font-poppinsMedium text-base text-gray-800">
            {t(
              "passenger.tabs.profileScreenText.ridePreferenceScreenText.musicPreference"
            )}
          </Text>
          <Switch
            value={musicPreference}
            onValueChange={setMusicPreference}
            trackColor={{ false: "#d1d5db", true: "#00ABB0" }}
            thumbColor={musicPreference ? "#00ABB0" : "#f3f4f6"}
          />
        </View>

        {/* Pet friendly */}
        <View className="flex-row justify-between items-center">
          <Text className="font-poppinsMedium text-base text-gray-800">
            {t("passenger.tabs.profileScreenText.ridePreferenceScreenText.pet")}
          </Text>
          <Switch
            value={petFriendly}
            onValueChange={setPetFriendly}
            trackColor={{ false: "#d1d5db", true: "#00ABB0" }}
            thumbColor={petFriendly ? "#00ABB0" : "#f3f4f6"}
          />
        </View>

        <View className="mt-[14%]">
          <AuthButton
            onPress={() => router.back()}
            title={t(
              "passenger.tabs.profileScreenText.ridePreferenceScreenText.saveBtn"
            )}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
