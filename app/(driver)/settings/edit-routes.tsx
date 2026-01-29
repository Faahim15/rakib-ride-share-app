import { LocationPicker } from "@/src/components/passenger/tabs/map/LocationPicker";
import { LocationSearchInput } from "@/src/components/passenger/tabs/map/LocationSearchInput";
import { useLanguage } from "@/src/localization/LangaugeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

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

export default function EditRoutes() {
  const router = useRouter();
  const { t } = useLanguage();

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
          t("driver.tabs.location.permissionDenied"),
          t("driver.tabs.location.permissionRequired")
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
      Alert.alert(
        t("driver.tabs.location.error"),
        t("driver.tabs.location.unableToGetLocation")
      );
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
        Alert.alert(
          t("driver.tabs.location.error"),
          t("driver.tabs.location.unableToGetLocationDetails")
        );
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
    } catch (error) {
      console.error("Error selecting location:", error);
      Alert.alert(
        t("driver.tabs.location.error"),
        t("driver.tabs.location.unableToGetLocationDetails")
      );
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

  const handleNext = () => {
    if (!pickupLocation.trim()) {
      Alert.alert(
        t("driver.tabs.editRoutes.required"),
        t("driver.tabs.editRoutes.enterPickupLocation")
      );
      return;
    }

    if (!dropoffLocation.trim()) {
      Alert.alert(
        t("driver.tabs.editRoutes.required"),
        t("driver.tabs.editRoutes.enterDropoffLocation")
      );
      return;
    }
    router.back();
  };

  return (
    <View className="flex-1 pt-[3%] px-[6%] bg-white">
      {/* Header */}

      {/* Main Content */}
      <View className="flex-1 ">
        {/* Dropoff Search Input */}
        <View className="mb-4">
          <LocationSearchInput
            placeholder={t("driver.tabs.map.titlePlaceholder")}
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
        </View>

        {/* Location Picker */}
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
          pickupPlaceholder={t("driver.tabs.map.pickUpLocation")}
          dropoffPlaceholder={t("driver.tabs.map.DroppingOff")}
        />

        {/* Pickup Suggestions */}
        {showPickupSuggestions && pickupSuggestions.length > 0 && (
          <View className="bg-white rounded-xl shadow-lg mt-3 max-h-[200px]">
            <FlatList
              data={pickupSuggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-3 border-b border-gray-100"
                  onPress={() => selectLocation(item, true)}
                >
                  <Text className="text-sm text-gray-800">
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Location Display (showing coordinates) */}
        {(pickupMarker || dropoffMarker) && (
          <View className="mt-6 p-4 bg-gray-50 rounded-xl">
            <Text className="text-base font-poppinsSemiBold mb-3 text-gray-800">
              {t("driver.tabs.location.selectedLocations")}
            </Text>

            {pickupMarker && (
              <View className="mb-3">
                <View className="flex-row items-center mb-1">
                  <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                  <Text className="font-poppinsMedium text-sm text-gray-700">
                    {t("driver.tabs.location.pickup")}
                  </Text>
                </View>
                <Text className="text-gray-600 font-poppins text-sm ml-5">
                  {pickupLocation}
                </Text>
                <Text className="text-sm font-poppins text-gray-500 ml-5">
                  {t("driver.tabs.location.latitude")}:{" "}
                  {pickupMarker.latitude.toFixed(6)},{" "}
                  {t("driver.tabs.location.longitude")}:{" "}
                  {pickupMarker.longitude.toFixed(6)}
                </Text>
              </View>
            )}

            {dropoffMarker && (
              <View>
                <View className="flex-row items-center mb-1">
                  <View className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  <Text className="font-poppinsMedium text-sm text-gray-700">
                    {t("driver.tabs.location.dropoff")}
                  </Text>
                </View>
                <Text className="text-gray-600 font-poppins text-sm ml-5">
                  {dropoffLocation}
                </Text>
                <Text className="text-sm font-poppins text-gray-500 ml-5">
                  {t("driver.tabs.location.latitude")}:{" "}
                  {dropoffMarker.latitude.toFixed(6)},{" "}
                  {t("driver.tabs.location.longitude")}:{" "}
                  {dropoffMarker.longitude.toFixed(6)}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-1 pb-[20%] justify-end space-y-3">
          <TouchableOpacity
            className="bg-brandColor rounded-xl py-4 items-center shadow-md"
            onPress={handleNext}
            disabled={!isFormValid}
            style={!isFormValid ? { opacity: 0.5 } : {}}
          >
            <Text className="text-white text-base font-poppinsSemiBold">
              {t("driver.tabs.myTrip.next")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
