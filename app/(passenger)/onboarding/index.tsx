import OnboardingItem from "@/src/components/onboarding/OnboardingItem";
import ProgressButton from "@/src/components/onboarding/ProgressButton";
import { useLanguage } from "@/src/localization/LangaugeContext";
import onboardingData from "@/src/mockData/onboarding/SplashData";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OnboardingScreen: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locationStatus, setLocationStatus] = useState<{
    hasPermission: boolean;
    servicesEnabled: boolean;
  }>({ hasPermission: false, servicesEnabled: true });
  const { language, t } = useLanguage();

  const isLast = currentIndex === onboardingData.length - 1;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (isLast) {
      router.replace("/(passenger)/auth/signUp");
    } else {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handleLanguageNext = () => {
    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  const handleLocationReceived = (location: Location.LocationObject) => {
    console.log("User location:", location.coords);
    // Location is already saved to AsyncStorage by ProgressButton
  };

  const handleLocationError = (error: string) => {
    console.error("Location error:", error);
  };

  const handleLocationStatusChange = (
    hasPermission: boolean,
    servicesEnabled: boolean
  ) => {
    setLocationStatus({ hasPermission, servicesEnabled });
  };

  const handleSkipLocation = () => {
    console.log("User skipped location access");
    router.replace("/(passenger)/auth/signUp");
  };

  // Memoize renderItem to prevent unnecessary re-renders
  const renderItem = useCallback(
    ({ item }: { item: (typeof onboardingData)[0] }) => (
      <OnboardingItem item={item} onLanguageNext={handleLanguageNext} />
    ),
    [language] // Re-create when language changes
  );

  return (
    <View className="flex-1 bg-[#053F53]">
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        extraData={language} // Force re-render when language changes
      />

      {/* Location requirement indicator - shows on last screen */}
      {isLast && (
        <View className="px-6 mb-4">
          <View className="bg-white/10 rounded-2xl p-4 flex-row items-center">
            <View className="mr-3">
              <Ionicons
                name={
                  locationStatus.hasPermission ? "location" : "location-outline"
                }
                size={24}
                color={locationStatus.hasPermission ? "#4ADE80" : "#FFFFFF"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-poppinsSemiBold text-sm mb-1">
                {locationStatus.hasPermission
                  ? t("onboarding.slide8.locationAccessGranted")
                  : t("onboarding.slide8.locationAccessRequired")}
              </Text>
              <Text className="text-white/70 font-poppinsRegular text-xs">
                {locationStatus.hasPermission
                  ? t("onboarding.slide8.allSet")
                  : t("onboarding.slide8.pickupTimes")}
              </Text>
            </View>
          </View>

          {/* Skip button - only shows if location permission not granted */}
          {!locationStatus.hasPermission && (
            <TouchableOpacity
              onPress={handleSkipLocation}
              className="mt-3 items-center py-2"
              activeOpacity={0.7}
            >
              <Text className="text-white/60 font-poppinsRegular text-sm underline">
                {t("onboarding.slide8.skipforNow")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Progress dots */}
      <View className="flex-row justify-center items-center mb-[8%]">
        {onboardingData.map((_, index) => (
          <View
            key={index}
            className={`h-[8px] rounded-full mx-[1%] ${
              index === currentIndex
                ? "w-[24px] bg-white"
                : "w-[8px] bg-white/40"
            }`}
          />
        ))}
      </View>

      {/* Progress button */}
      <View className="items-center mb-[10%]">
        <ProgressButton
          progress={(currentIndex + 1) / onboardingData.length}
          onPress={handleNext}
          isLast={isLast}
          onLocationReceived={handleLocationReceived}
          onLocationError={handleLocationError}
          onLocationStatusChange={handleLocationStatusChange}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
