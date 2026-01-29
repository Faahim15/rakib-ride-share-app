import LogoutModal from "@/src/components/passenger/modal/LogoutModal";
import ProfileHeader from "@/src/components/passenger/profile/ProfileHeader";
import ProfileMenuItem from "@/src/components/passenger/profile/ProfileMenuItem";
import { useLanguage } from "@/src/localization/LangaugeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const USER_MODE_KEY = "@user_mode";

export default function ProfileScreen() {
  const { t } = useLanguage();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentMode, setCurrentMode] = useState<"passenger" | "driver">(
    "passenger",
  );

  // Load current mode on mount
  useEffect(() => {
    loadUserMode();
  }, []);

  const loadUserMode = async () => {
    try {
      const mode = await AsyncStorage.getItem(USER_MODE_KEY);
      if (mode === "driver" || mode === "passenger") {
        setCurrentMode(mode);
      }
    } catch (error) {
      console.error("Error loading user mode:", error);
    }
  };

  const toggleMode = async () => {
    try {
      const newMode = currentMode === "passenger" ? "driver" : "passenger";
      await AsyncStorage.setItem(USER_MODE_KEY, newMode);
      setCurrentMode(newMode);

      // Navigate to the appropriate profile screen
      if (newMode === "driver") {
        router.replace("/(driver)/(tabs)/profile");
      } else {
        router.replace("/(passenger)/(tabs)/profile");
      }
    } catch (error) {
      console.error("Error toggling user mode:", error);
    }
  };
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: "4%",
          paddingTop: "4%",
          paddingBottom: "6%",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Mode Toggle Button */}
        <View className="mb-4">
          {/* Current Mode Display */}
          <View className="mb-3 px-2 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <Text className="text-center">
              <Text className="text-gray-700 text-sm font-poppinsMedium">
                {t("passenger.tabs.profileScreenText.currentModePrefix")}
              </Text>
              <Text
                className="text-sm font-poppinsBold"
                style={{
                  color: currentMode === "driver" ? "#F59E0B" : "#14B8A6",
                }}
              >
                {t(`passenger.tabs.profileScreenText.${currentMode}`)}
              </Text>
              <Text className="text-gray-700 text-sm font-medium"> Mode</Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={toggleMode}
            className="bg-[#14B8A6] rounded-lg py-3 px-4 items-center justify-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">
              {currentMode === "passenger"
                ? t("passenger.tabs.profileScreenText.enableDriverMode")
                : t("passenger.tabs.profileScreenText.enablePassengerMode")}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <ProfileHeader />
        </View>
        <View className="pt-[3%]">
          <ProfileMenuItem
            source={require("@/assets/images/profile/edit-profile.png")}
            label={t("tabs.profile.editProfile")}
            onPress={() =>
              router.push("/(passenger)/(tabs)/profile/edit_profile")
            }
          />
          {/* <ProfileMenuItem
            source={require("@/assets/images/profile/change-password.png")}
            label={t("tabs.profile.changePassword")}
            onPress={() => router.push("/(passenger)/profile/change-password")}
          /> */}
          <ProfileMenuItem
            source={require("@/assets/images/profile/translation.png")}
            label={t("tabs.profile.changeLanguage")}
            onPress={() =>
              router.push("/(passenger)/(tabs)/profile/language-change")
            }
          />

          {/* <ProfileMenuItem
            source={require("@/assets/images/profile/geolocation.png")}
            label={t("tabs.profile.myRides")}
            onPress={() => router.push("/(passenger)/profile/my-ride")}
          /> */}
          <ProfileMenuItem
            source={require("@/assets/images/profile/road.png")}
            label={t("tabs.profile.savedDriver")}
            onPress={() =>
              router.push("/(passenger)/(tabs)/profile/saved-driver")
            }
          />
          {/* <ProfileMenuItem
            source={require("@/assets/images/profile/atm-card.png")}
            label={t("tabs.profile.payments")}
            onPress={() =>
              router.push("/(passenger)/profile/payment-method-screen")
            }
          /> */}
          {/* <ProfileMenuItem
            source={require("@/assets/images/profile/preferences.png")}
            label={t("tabs.profile.preferences")}
            onPress={() => router.push("/(passenger)/profile/preference")}
          /> */}

          <ProfileMenuItem
            source={require("@/assets/images/profile/crown.png")}
            label={t("driver.tabs.overview.changeMembership")}
            onPress={() =>
              router.push("/(passenger)/(tabs)/profile/change-membership")
            }
          />

          <ProfileMenuItem
            source={require("@/assets/images/profile/support.png")}
            label={t("tabs.profile.helpAndSupport")}
            onPress={() =>
              router.push("/(passenger)/(tabs)/profile/help-and-support")
            }
          />
          <ProfileMenuItem
            source={require("@/assets/images/profile/settings.png")}
            label={t("tabs.profile.settings")}
            onPress={() =>
              router.push("/(passenger)/(tabs)/profile/passenger-acc-settings")
            }
          />
          <ProfileMenuItem
            source={require("@/assets/images/profile/contract.png")}
            label={t("tabs.profile.privacy")}
            onPress={() => router.push("/(passenger)/(tabs)/profile/privacy")}
          />
          <ProfileMenuItem
            source={require("@/assets/images/profile/terms-and-conditions.png")}
            label={t("tabs.profile.terms")}
            onPress={() =>
              router.push("/(passenger)/(tabs)/profile/terms-conditions")
            }
          />

          <ProfileMenuItem
            source={require("@/assets/images/profile/group.png")}
            label={t("passenger.tabs.trip.titles.aboutUs")}
            onPress={() => router.push("/(passenger)/(tabs)/profile/about-us")}
          />
          <ProfileMenuItem
            source={require("@/assets/images/profile/logout.png")}
            label={t("tabs.profile.logout")}
            onPress={() => setShowLogoutModal(true)}
            color="#DC2626"
          />
        </View>

        {/* Add the modal */}
        <LogoutModal
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={async () => {
            try {
              // 🔴 Remove user mode from AsyncStorage on logout
              await AsyncStorage.removeItem(USER_MODE_KEY);
            } catch (error) {
              console.error("Error clearing user mode:", error);
            } finally {
              setShowLogoutModal(false);
              router.replace("/(passenger)/shared/join-as");
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
