// ProgressButton.tsx
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/* ---------------------- PROGRESS BUTTON COMPONENT ------------------------ */

interface ProgressButtonProps {
  progress: number;
  onPress: () => void;
  isLast?: boolean;
  onLocationReceived?: (location: Location.LocationObject) => void;
  onLocationError?: (error: string) => void;
  onLocationStatusChange?: (
    hasPermission: boolean,
    servicesEnabled: boolean
  ) => void;
}

const ProgressButton: React.FC<ProgressButtonProps> = ({
  progress = 0,
  onPress,
  isLast = false,
  onLocationReceived,
  onLocationError,
  onLocationStatusChange,
}) => {
  const size = 70;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const { t } = useLanguage();
  const animatedProgress = useSharedValue(0);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  // Check location status when button becomes last screen
  useEffect(() => {
    if (isLast) {
      checkLocationStatus();
    }
  }, [isLast]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - circumference * animatedProgress.value,
  }));

  const checkLocationStatus = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      const isEnabled = await Location.hasServicesEnabledAsync();

      onLocationStatusChange?.(status === "granted", isEnabled);
    } catch (error) {
      console.error("Error checking location status:", error);
    }
  };

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      // First check if location services are enabled
      const isEnabled = await Location.hasServicesEnabledAsync();
      if (!isEnabled) {
        Alert.alert(
          "Location Services Disabled",
          "Please enable location services in your device settings to continue.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: openAppSettings,
            },
          ]
        );
        return false;
      }

      // Check current permission status first
      const { status: currentStatus } =
        await Location.getForegroundPermissionsAsync();

      if (currentStatus === "granted") {
        return true;
      }

      // If permission was previously denied, explain why we need it
      if (currentStatus === "denied") {
        Alert.alert(
          "Location Permission Needed",
          "This app needs your location to provide nearby services and accurate ride information. Please enable location access in settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: openAppSettings,
            },
          ]
        );
        return false;
      }

      // Request permission if not already determined
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (foregroundStatus !== "granted") {
        const message =
          foregroundStatus === "denied"
            ? "Location access was denied. You can enable it in your device settings."
            : "Location access is required to continue. Please enable it in your device settings.";

        Alert.alert("Location Permission Required", message, [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: openAppSettings,
          },
        ]);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Permission error:", error);
      onLocationError?.("Failed to request location permission");
      return false;
    }
  };

  const saveLocationToStorage = async (location: Location.LocationObject) => {
    try {
      await AsyncStorage.setItem(
        "userLocation",
        JSON.stringify(location.coords)
      );
      console.log("Location saved to AsyncStorage:", location.coords);
    } catch (error) {
      console.error("Error saving location to AsyncStorage:", error);
    }
  };

  const getUserLocation = async () => {
    setIsGettingLocation(true);

    try {
      // Check if permission is already granted
      const { status: currentStatus } =
        await Location.getForegroundPermissionsAsync();

      if (currentStatus === "granted") {
        // Permission already granted, just navigate
        console.log("Location permission already granted");
        onPress();
        return;
      }

      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        setIsGettingLocation(false);
        return;
      }

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("Location request timed out")),
          15000
        );
      });

      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 0,
      });

      const location = await Promise.race([locationPromise, timeoutPromise]);

      console.log("Location obtained:", location.coords);

      // Save location to AsyncStorage
      await saveLocationToStorage(location);

      onLocationReceived?.(location);
      onPress();
    } catch (error) {
      console.error("Location error:", error);

      let errorMessage =
        "Unable to get your current location. Please try again.";
      let errorTitle = "Location Error";

      if (error instanceof Error) {
        if (error.message.includes("timed out")) {
          errorTitle = "Location Timeout";
          errorMessage =
            "Location request took too long. Please check your GPS signal and try again.";
        } else if (
          error.message.includes("denied") ||
          error.message.includes("permission")
        ) {
          errorTitle = "Permission Denied";
          errorMessage =
            "Location access was denied. Please enable it in settings to continue.";
        } else if (error.message.includes("unavailable")) {
          errorMessage =
            "Location services are currently unavailable. Please try again later.";
        } else {
          errorMessage = error.message;
        }
      }

      onLocationError?.(errorMessage);

      Alert.alert(errorTitle, errorMessage, [
        { text: "Try Again", style: "default" },
        {
          text: "Skip for Now",
          style: "cancel",
          onPress: () => {
            console.log("User chose to skip location");
            onPress(); // Navigate to next screen without location
          },
        },
        ...(errorTitle === "Permission Denied"
          ? [
              {
                text: "Open Settings",
                onPress: openAppSettings,
              },
            ]
          : []),
      ]);
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handlePress = () => {
    if (isLast) {
      getUserLocation();
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="items-center justify-center"
      activeOpacity={0.8}
      disabled={isGettingLocation}
    >
      {/* Animated Circular Progress */}
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        {/* Background Ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.3}
          strokeLinecap="round"
        />

        {/* Animated Progress Ring */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill="none"
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Inner Button */}
      <View
        className="w-[60px] h-[60px] rounded-full bg-white items-center justify-center"
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          opacity: isGettingLocation ? 0.6 : 1,
        }}
      >
        {isGettingLocation ? (
          <ActivityIndicator size="small" color="#0A5C6C" />
        ) : isLast ? (
          <Text className="font-poppinsSemiBold text-lg text-[#0A5C6C]">
            {t("onboarding.slide8.go")}
          </Text>
        ) : (
          <Ionicons name="arrow-forward" size={26} color="#0A5C6C" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProgressButton;
