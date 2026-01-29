import { useLanguage } from "@/src/localization/LangaugeContext";
import { styles } from "@/src/utils/home.style";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { t } = useLanguage();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert(
          "Location Permission",
          "Please enable location permissions to use this feature"
        );
        setLoading(false);
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });

      // Animate map to user's location
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
      }

      setLoading(false);
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMsg("Failed to get current location");
      setLoading(false);
      Alert.alert("Error", "Unable to fetch your current location");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#053F53" />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View className="absolute top-0 left-3 right-0 z-10  pt-[5%] bg-transparent">
        <View className="justify-start  py-[4%] flex-row items-center">
          <Text className="text-xl mr-[12%]">🔔</Text>
        </View>
      </View>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 23.8103,
          longitude: location?.longitude || 90.4125,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        loadingEnabled={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="You are here"
            pinColor="#00ABB0"
          />
        )}
      </MapView>

      {/* Publish A Ride Button */}
      <View style={[styles.buttonContainer, { bottom: insets.bottom + 80 }]}>
        <TouchableOpacity
          style={styles.publishButton}
          onPress={() => {
            router.push("/(driver)/(tabs)/home/trip");
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {t("driver.tabs.homeScreenText.publishARide")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
