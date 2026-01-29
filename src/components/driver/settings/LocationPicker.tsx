import { useLanguage } from "@/src/localization/LangaugeContext";
import { LocationCoords } from "@/src/mockData/driver/myRides.data";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const GOOGLE_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY || "";

interface LocationSuggestion {
  id: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

interface LocationItem {
  id: string;
  name: string;
  secondaryText: string;
  coords: LocationCoords | null;
  isSuggestion: boolean;
}

interface LocationPickerProps {
  label?: string;
  value: string;
  onLocationSelect: (location: string, coords: LocationCoords) => void;
  placeholder?: string;
}

export default function LocationPicker({
  label = "Select Location",
  value,
  onLocationSelect,
  placeholder = "Search location",
}: LocationPickerProps) {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    name: string;
    coords: LocationCoords;
  } | null>(null);

  // Get user's current location on component mount
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Get address from coordinates using reverse geocoding
        const addresses = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (addresses.length > 0) {
          const addr = addresses[0];
          const locationName =
            `${addr.city || addr.name || ""}, ${addr.country || ""}`.trim();
          setCurrentLocation({
            name: `Current Location (${locationName})`,
            coords: { latitude, longitude },
          });
        }
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    })();
  }, []);

  const fetchAutocompleteSuggestions = useCallback(
    async (input: string): Promise<LocationSuggestion[]> => {
      if (!input || input.length < 2) return [];

      try {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input,
        )}&key=${GOOGLE_API_KEY}&language=en&components=country:jo`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          return data.predictions.map((prediction: any) => ({
            id: prediction.place_id,
            description: prediction.description,
            mainText:
              prediction.structured_formatting?.main_text ||
              prediction.description,
            secondaryText:
              prediction.structured_formatting?.secondary_text || "",
          }));
        }
        return [];
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        return [];
      }
    },
    [],
  );

  const getPlaceDetails = useCallback(
    async (placeId: string): Promise<LocationCoords | null> => {
      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}&fields=geometry`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          const { lat, lng } = data.result.geometry.location;
          return { latitude: lat, longitude: lng };
        }
        return null;
      } catch (error) {
        console.error("Error fetching place details:", error);
        return null;
      }
    },
    [],
  );

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);

      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      const results = await fetchAutocompleteSuggestions(query);
      setSuggestions(results);
      setIsLoading(false);
    },
    [fetchAutocompleteSuggestions],
  );

  const handleSelectLocation = useCallback(
    async (item: LocationItem) => {
      if (item.isSuggestion) {
        setIsLoading(true);
        const coords = await getPlaceDetails(item.id);
        if (coords) {
          onLocationSelect(item.name, coords);
          setShowModal(false);
          setSearchQuery("");
          setSuggestions([]);
        }
        setIsLoading(false);
      } else {
        onLocationSelect(item.name, item.coords!);
        setShowModal(false);
        setSearchQuery("");
        setSuggestions([]);
      }
    },
    [getPlaceDetails, onLocationSelect],
  );

  const sampleLocations = currentLocation ? [currentLocation] : [];

  const displayLocations: LocationItem[] =
    suggestions.length > 0
      ? suggestions.map((sugg) => ({
          id: sugg.id,
          name: sugg.mainText,
          secondaryText: sugg.secondaryText,
          isSuggestion: true,
          coords: null,
        }))
      : sampleLocations
          .filter((loc) =>
            loc.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((loc) => ({
            id: loc.name,
            name: loc.name,
            secondaryText: "",
            coords: loc.coords,
            isSuggestion: false,
          }));

  return (
    <View>
      {/* Input Field */}
      {label && (
        <Text className="font-poppins text-sm text-[#6C6C70]  mb-2">
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="flex-row items-center bg-white border  border-gray-300 rounded-xl px-3 py-[3%] mb-[2%]"
      >
        <Ionicons name="location" size={18} color="#00ABB0" />
        <Text
          className={`flex-1 ml-2 text-sm font-poppins  ${
            value ? "text-gray-900" : "text-[#898989]"
          }`}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="bg-white pt-[10%] pb-2 px-4 border-b border-gray-200 flex-row items-center justify-between">
            <Text className="text-gray-900 font-poppinsBold text-lg">
              Select Location
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                setSearchQuery("");
                setSuggestions([]);
              }}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-2 font-poppins text-gray-900"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              {isLoading && <ActivityIndicator size="small" color="#3B82F6" />}
            </View>
          </View>

          {/* Location List */}
          <FlatList
            data={displayLocations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectLocation(item)}
                className="px-4 py-3 border-b border-gray-100 flex-row items-center"
              >
                <Ionicons name="location" size={18} color="#00ABB0" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-900 font-poppinsMedium text-sm">
                    {item.name}
                  </Text>
                  {item.secondaryText && (
                    <Text className="text-gray-500 font-poppins text-xs">
                      {item.secondaryText}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              !isLoading ? (
                <View className="items-center justify-center py-12">
                  <Ionicons name="location-outline" size={40} color="#D1D5DB" />
                  <Text className="text-gray-600 font-poppinsMedium text-sm mt-2">
                    No locations found
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      </Modal>
    </View>
  );
}
