import { LocationPicker } from "@/src/components/passenger/tabs/map/LocationPicker";
import { LocationSearchInput } from "@/src/components/passenger/tabs/map/LocationSearchInput";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

const GOOGLE_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY || "";
interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface LocationSuggestion {
  id: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(
    null
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [pickupMarker, setPickupMarker] = useState<LocationCoords | null>(null);
  const [dropoffMarker, setDropoffMarker] = useState<LocationCoords | null>(
    null
  );
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const lang = await AsyncStorage.getItem("language");
      if (lang) setLanguage(lang);
    })();
  }, []);

  useEffect(() => {
    setIsFormValid(
      pickupLocation.trim().length > 0 && dropoffLocation.trim().length > 0
    );
  }, [pickupLocation, dropoffLocation]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        getCurrentLocation();
      } else {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature."
        );
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
      setPickupMarker({ latitude, longitude });

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 500);

      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addresses.length > 0) {
        const address = addresses[0];
        const formattedAddress =
          `${address.street || ""} ${address.city || ""}`.trim();
        setPickupLocation(formattedAddress);
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Unable to get current location");
    }
  };

  const fetchAutocompleteSuggestions = async (
    input: string,
    types: string | null = null,
    components: string | null = null
  ) => {
    if (!input || input.length < 2) {
      return [];
    }

    try {
      let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&key=${GOOGLE_API_KEY}&language=en`;

      if (types) {
        url += `&types=${types}`;
      }

      if (components) {
        url += `&components=${components}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        return data.predictions.map((prediction: any) => ({
          id: prediction.place_id,
          description: prediction.description,
          mainText:
            prediction.structured_formatting?.main_text ||
            prediction.description,
          secondaryText: prediction.structured_formatting?.secondary_text || "",
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      return [];
    }
  };

  const getPlaceDetails = async (
    placeId: string
  ): Promise<LocationCoords | null> => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}&fields=geometry`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.result.geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching place details:", error);
      return null;
    }
  };

  const searchLocation = async (query: string, isPickup: boolean) => {
    if (query.length < 2) {
      isPickup ? setPickupSuggestions([]) : setDropoffSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const suggestions = await fetchAutocompleteSuggestions(query);

      if (isPickup) {
        setPickupSuggestions(suggestions);
        setShowPickupSuggestions(true);
      } else {
        setDropoffSuggestions(suggestions);
        setShowDropoffSuggestions(true);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const selectLocation = async (
    suggestion: LocationSuggestion,
    isPickup: boolean
  ) => {
    try {
      const coords = await getPlaceDetails(suggestion.id);

      if (!coords) {
        Alert.alert("Error", "Unable to get location details");
        return;
      }

      if (isPickup) {
        setPickupLocation(suggestion.description);
        setPickupMarker(coords);
        setShowPickupSuggestions(false);
        setPickupSuggestions([]);
      } else {
        setDropoffLocation(suggestion.description);
        setDropoffMarker(coords);
        setShowDropoffSuggestions(false);
        setDropoffSuggestions([]);
      }

      mapRef.current?.animateToRegion(
        {
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500
      );
    } catch (error) {
      console.error("Error selecting location:", error);
      Alert.alert("Error", "Unable to get location details");
    }
  };

  const handleRecenterMap = () => {
    if (currentLocation) {
      const newRegion = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(newRegion, 500);
    } else {
      getCurrentLocation();
    }
  };

  const handleSwapLocations = () => {
    const temp = pickupLocation;
    setPickupLocation(dropoffLocation);
    setDropoffLocation(temp);
    const tempMarker = pickupMarker;
    setPickupMarker(dropoffMarker);
    setDropoffMarker(tempMarker);
  };

  const handleSearch = () => {
    if (!pickupLocation.trim()) {
      Alert.alert("Required", "Please enter pickup location");
      return;
    }

    if (!dropoffLocation.trim()) {
      Alert.alert("Required", "Please enter drop-off location");
      return;
    }

    const pickupLat =
      pickupMarker?.latitude || currentLocation?.latitude || region.latitude;
    const pickupLng =
      pickupMarker?.longitude || currentLocation?.longitude || region.longitude;

    router.push({
      pathname: "/home/select-driver",
      params: {
        pickupLocation,
        dropoffLocation,
        pickupLat,
        pickupLng,
      },
    });
  };

  const handleScheduleRide = () => {
    router.push("/(passenger)/(tabs)/home/date-picker");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F5F5F5]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View className="flex-1 bg-[#F5F5F5]">
        <View
          className={`flex-row justify-end items-center px-[5%] ${Platform.OS === "ios" ? "pt-[50px]" : "pt-[20px]"} pb-[15px] bg-[#F5F5F5] z-10`}
        >
          {/* <TouchableOpacity
            className="flex-row items-center gap-[5px]"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
            <Text className="text-base text-[#333] font-medium">Back</Text>
          </TouchableOpacity> */}

          <View className="flex-row items-center gap-[15px]">
            {/* <Text className="text-base text-[#333] font-poppinsSemiBold">
              {language === "ar" ? "Ar" : "En"}
            </Text> */}
            <TouchableOpacity className="p-[5px]">
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-[#F5F5F5] px-[5%] pb-[20px] z-[5]">
          {/* Search Input */}
          <LocationSearchInput
            placeholder={t("tabs.map.titlePlaceholder")}
            value={dropoffLocation}
            onChangeText={(text) => {
              setDropoffLocation(text);
              searchLocation(text, false);
            }}
            onFocus={() => {
              if (dropoffSuggestions.length > 0) {
                setShowDropoffSuggestions(true);
              }
            }}
            suggestions={dropoffSuggestions}
            showSuggestions={showDropoffSuggestions}
            onSelectSuggestion={(suggestion) =>
              selectLocation(suggestion, false)
            }
          />

          <LocationPicker
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            onPickupChange={(text) => {
              setPickupLocation(text);
              searchLocation(text, true);
            }}
            onDropoffChange={(text) => {
              setDropoffLocation(text);
              searchLocation(text, false);
            }}
            onPickupFocus={() => {
              if (pickupSuggestions.length > 0) {
                setShowPickupSuggestions(true);
              }
            }}
            onDropoffFocus={() => {
              if (dropoffSuggestions.length > 0) {
                setShowDropoffSuggestions(true);
              }
            }}
            onSwapLocations={handleSwapLocations}
            pickupPlaceholder={t("tabs.map.pickUpLocation")}
            dropoffPlaceholder={t("tabs.map.DroppingOff")}
          />

          {showPickupSuggestions && pickupSuggestions.length > 0 && (
            <View className="bg-white rounded-xl shadow-lg mt-[10px] max-h-[200px]">
              <FlatList
                data={pickupSuggestions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="px-[15px] py-[12px] border-b border-gray-100"
                    onPress={() => selectLocation(item, true)}
                  >
                    <Text className="text-sm text-[#333]">
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <View className="flex-1">
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ ...StyleSheet.absoluteFillObject }}
            region={region}
            onRegionChangeComplete={setRegion}
            showsUserLocation
            showsMyLocationButton={false}
            toolbarEnabled={false}
          >
            {pickupMarker && (
              <Marker
                coordinate={pickupMarker}
                title="Pickup Location"
                pinColor="#00BFA6"
              />
            )}
            {dropoffMarker && (
              <Marker
                coordinate={dropoffMarker}
                title="Drop-off Location"
                pinColor="#FF6B6B"
              />
            )}

            {pickupMarker && dropoffMarker && (
              <Polyline
                coordinates={[pickupMarker, dropoffMarker]}
                strokeColor="#00BFA6"
                strokeWidth={3}
                lineDashPattern={[10, 5]}
              />
            )}
          </MapView>
        </View>

        <TouchableOpacity
          className="absolute bottom-[250px] right-[20px] bg-white w-[50px] h-[50px] rounded-full justify-center items-center shadow-lg"
          onPress={handleRecenterMap}
        >
          <Ionicons name="locate" size={24} color="#00BFA6" />
        </TouchableOpacity>

        <View
          className={`bg-white px-[5%] pt-[20px] ${Platform.OS === "ios" ? "pb-[30px]" : "pb-[20px]"}`}
        >
          {/* Estimated Time */}
          {/* <TouchableOpacity className="bg-white rounded-xl py-[15px] px-[20px] mb-[15px] items-center border-2 border-[#00BFA6]">
            <Text className="text-base font-semibold text-[#333]">
              Est. 5 mins away
            </Text>
          </TouchableOpacity> */}

          {/* Book Now Button */}
          <TouchableOpacity
            className="bg-brandColor rounded-xl py-4 items-center mb-3 shadow-md"
            onPress={handleSearch}
            disabled={!isFormValid}
            style={!isFormValid ? { opacity: 0.5 } : {}}
          >
            <Text className="text-white text-base font-poppinsMedium">
              {t("tabs.map.bookNow")}
            </Text>
          </TouchableOpacity>

          {/* Schedule Ride Button */}
          {/* <TouchableOpacity
            className="bg-brandColor rounded-xl py-4 items-center"
            onPress={handleScheduleRide}
          >
            <Text className="text-white text-base font-poppinsMedium">
              {t("tabs.map.scheduleRide")}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            className="bg-brandColor rounded-xl py-4 items-center"
            onPress={handleScheduleRide}
            disabled={!isFormValid}
            style={!isFormValid ? { opacity: 0.5 } : {}}
          >
            <Text className="text-white text-base font-poppinsMedium">
              {t("tabs.map.scheduleRide")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
