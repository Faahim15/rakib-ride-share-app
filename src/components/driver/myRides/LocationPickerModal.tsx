import { useLanguage } from "@/src/localization/LangaugeContext";
import { LocationCoords } from "@/src/mockData/driver/myRides.data";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const GOOGLE_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY || "";

// ============ Location Suggestion Interface ============
interface LocationSuggestion {
  id: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

// ============ Location Picker Modal Component ============
interface LocationPickerModalProps {
  onClose: () => void;
  onSelectLocation: (location: string, coords: LocationCoords) => void;
  locationType: "pickup" | "dropoff" | null;
}

export default function LocationPickerModal({
  onClose,
  onSelectLocation,
  locationType,
}: LocationPickerModalProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample locations for fallback when no API results
  const sampleLocations = [
    {
      name: "Downtown Amman",
      coords: { latitude: 31.9454, longitude: 35.9284 },
    },
    {
      name: "Queen Alia Airport",
      coords: { latitude: 31.7226, longitude: 35.9889 },
    },
    {
      name: "Abdoun Circle",
      coords: { latitude: 31.9343, longitude: 35.8065 },
    },
    {
      name: "Sweifieh Mall",
      coords: { latitude: 31.9461, longitude: 35.7903 },
    },
    {
      name: "Shmeisani",
      coords: { latitude: 31.9389, longitude: 35.7889 },
    },
    {
      name: "Dead Sea",
      coords: { latitude: 31.477, longitude: 35.5 },
    },
    {
      name: "University of Jordan",
      coords: { latitude: 31.94, longitude: 35.8 },
    },
    {
      name: "Rainbow Street",
      coords: { latitude: 31.9455, longitude: 35.9289 },
    },
  ];

  // Fetch autocomplete suggestions from Google Places API
  const fetchAutocompleteSuggestions = useCallback(
    async (input: string): Promise<LocationSuggestion[]> => {
      if (!input || input.length < 2) {
        return [];
      }

      try {
        let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
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
    []
  );

  // Get place details to extract coordinates
  const getPlaceDetails = useCallback(
    async (placeId: string): Promise<LocationCoords | null> => {
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
    },
    []
  );

  // Handle search input change
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
    [fetchAutocompleteSuggestions]
  );

  // Handle location selection from suggestions
  const handleSelectSuggestion = useCallback(
    async (suggestion: LocationSuggestion) => {
      setIsLoading(true);
      const coords = await getPlaceDetails(suggestion.id);

      if (coords) {
        onSelectLocation(suggestion.description, coords);
      }
      setIsLoading(false);
    },
    [getPlaceDetails, onSelectLocation]
  );

  // Handle location selection from sample locations
  const handleSelectSampleLocation = useCallback(
    (location: { name: string; coords: LocationCoords }) => {
      onSelectLocation(location.name, location.coords);
    },
    [onSelectLocation]
  );

  // Display suggestions if available, otherwise show filtered sample locations
  const displayLocations =
    suggestions.length > 0
      ? suggestions.map((sugg) => ({
          id: sugg.id,
          name: sugg.mainText,
          secondaryText: sugg.secondaryText,
          isSuggestion: true,
          coords: null as LocationCoords | null,
        }))
      : sampleLocations
          .filter((loc) =>
            loc.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((loc) => ({
            id: loc.name,
            name: loc.name,
            secondaryText: "",
            coords: loc.coords,
            isSuggestion: false,
          }));

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white pt-[10%] pb-2 px-4 border-b border-gray-200 flex-row items-center justify-between">
        <Text className="text-gray-900 font-poppinsBold text-lg">
          {locationType === "pickup"
            ? t("driver.tabs.myTrip.publishedRides.locationPickerTitle")
            : t("driver.tabs.myTrip.publishedRides.locationPickerSubtitle")}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 font-poppins text-gray-900"
            placeholder={t("driver.tabs.myTrip.publishedRides.searchLocation")}
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
            onPress={() => {
              if (item.isSuggestion) {
                handleSelectSuggestion(
                  suggestions.find((s) => s.id === item.id)!
                );
              } else {
                handleSelectSampleLocation({
                  name: item.name,
                  coords: item.coords!,
                });
              }
            }}
            className="px-4 py-3 border-b border-gray-100 flex-row items-center"
          >
            <Ionicons name="location" size={20} color="#3B82F6" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-900 font-poppinsMedium text-sm">
                {item.name}
              </Text>
              {item.secondaryText && (
                <Text className="text-gray-500 font-poppins text-xs">
                  {item.secondaryText}
                </Text>
              )}
              {!item.isSuggestion && item.coords && (
                <Text className="text-gray-500 font-poppins text-xs">
                  {t("driver.tabs.myTrip.publishedRides.latitudeLabel")}:{" "}
                  {item.coords.latitude.toFixed(4)},{" "}
                  {t("driver.tabs.myTrip.publishedRides.longitudeLabel")}:{" "}
                  {item.coords.longitude.toFixed(4)}
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
                {t("driver.tabs.myTrip.publishedRides.noLocationsFound")}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
