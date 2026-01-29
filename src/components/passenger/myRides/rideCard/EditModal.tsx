import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import moment from "moment";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  ScrollView,
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

interface EditModalProps {
  visible: boolean;
  ride: {
    id: string;
    pickupAddress: string;
    dropoffAddress: string;
    scheduledDate: string;
    scheduledTime: string;
    distance: string;
    seats: number;
    luggageSize?: string;
    genderPreference?: string;
  };
  onClose: () => void;
  onSave: (updatedRide: any) => void;
}

export function EditRequestModal({
  visible,
  ride,
  onClose,
  onSave,
}: EditModalProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    pickupAddress: ride.pickupAddress,
    dropoffAddress: ride.dropoffAddress,
    scheduledDate: ride.scheduledDate,
    scheduledTime: ride.scheduledTime,
    seats: ride.seats.toString(),
    luggageSize: ride.luggageSize || "medium",
    genderPreference: ride.genderPreference || "no_preference",
  });

  const [pickupSuggestions, setPickupSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDropoff, setLoadingDropoff] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showLuggageDropdown, setShowLuggageDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const luggageSizeOptions = [
    { label: t("shared.luggageSize.small") || "Small", value: "small" },
    { label: t("shared.luggageSize.medium") || "Medium", value: "medium" },
    { label: t("shared.luggageSize.large") || "Large", value: "large" },
  ];

  const genderPreferenceOptions = [
    { label: t("shared.genderPreference.male") || "Male", value: "male" },
    { label: t("shared.genderPreference.female") || "Female", value: "female" },
    {
      label: t("shared.genderPreference.noPreference") || "No Preference",
      value: "no_preference",
    },
  ];

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const parseTime = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date;
  };

  const fetchAutocompleteSuggestions = async (
    input: string,
    types: string | null = null,
    components: string | null = null,
  ): Promise<LocationSuggestion[]> => {
    if (!input || input.length < 2) {
      return [];
    }

    try {
      let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input,
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

  const handlePickupChange = async (value: string) => {
    setFormData((prev) => ({ ...prev, pickupAddress: value }));
    setLoadingPickup(true);
    const suggestions = await fetchAutocompleteSuggestions(value);
    setPickupSuggestions(suggestions);
    setLoadingPickup(false);
    setShowPickupSuggestions(true);
  };

  const handleDropoffChange = async (value: string) => {
    setFormData((prev) => ({ ...prev, dropoffAddress: value }));
    setLoadingDropoff(true);
    const suggestions = await fetchAutocompleteSuggestions(value);
    setDropoffSuggestions(suggestions);
    setLoadingDropoff(false);
    setShowDropoffSuggestions(true);
  };

  const selectPickupLocation = (location: LocationSuggestion) => {
    setFormData((prev) => ({ ...prev, pickupAddress: location.description }));
    setShowPickupSuggestions(false);
    setPickupSuggestions([]);
  };

  const selectDropoffLocation = (location: LocationSuggestion) => {
    setFormData((prev) => ({ ...prev, dropoffAddress: location.description }));
    setShowDropoffSuggestions(false);
    setDropoffSuggestions([]);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        scheduledDate: moment(selectedDate).format("DD/MM/YYYY"),
      }));
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      setFormData((prev) => ({
        ...prev,
        scheduledTime: moment(selectedTime).format("HH:mm"),
      }));
    }
  };

  const handleSave = () => {
    if (
      !formData.pickupAddress.trim() ||
      !formData.dropoffAddress.trim() ||
      !formData.scheduledDate.trim() ||
      !formData.scheduledTime.trim()
    ) {
      Alert.alert(
        t("driver.tabs.editRequestModal.error"),
        t("driver.tabs.editRequestModal.fillAllFields"),
      );
      return;
    }

    onSave({
      pickupAddress: formData.pickupAddress,
      dropoffAddress: formData.dropoffAddress,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      seats: parseInt(formData.seats) || 1,
      luggageSize: formData.luggageSize,
      genderPreference: formData.genderPreference,
    });
  };

  const getLuggageLabel = () => {
    const option = luggageSizeOptions.find(
      (opt) => opt.value === formData.luggageSize,
    );
    return option?.label || "Select";
  };

  const getGenderLabel = () => {
    const option = genderPreferenceOptions.find(
      (opt) => opt.value === formData.genderPreference,
    );
    return option?.label || "Select";
  };

  // Handle dropdown opening - close others when one opens
  const handleOpenLuggageDropdown = () => {
    setShowGenderDropdown(false);
    setShowLuggageDropdown(!showLuggageDropdown);
  };

  const handleOpenGenderDropdown = () => {
    setShowLuggageDropdown(false);
    setShowGenderDropdown(!showGenderDropdown);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <ScrollView
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* Header */}
        <View className="bg-white px-4 py-4 flex-row justify-between items-center border-b border-gray-200 mt-10">
          <Text className="text-lg font-poppinsSemiBold text-gray-800">
            {t("driver.tabs.editRequestModal.editRequest")}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Form Content */}
        <View className="p-4">
          {/* Pickup Address */}
          <View className="mb-6">
            <Text className="font-poppinsMedium text-sm text-gray-700 mb-2">
              {t("driver.tabs.editRequestModal.pickupAddress")} *
            </Text>
            <View className="relative z-50">
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShowPickupSuggestions(true)}
                className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4"
              >
                <Ionicons name="location-outline" size={18} color="#4DB8B8" />
                <TextInput
                  className="flex-1 py-3 px-2 font-poppins text-gray-800"
                  placeholder={t("driver.tabs.editRequestModal.searchPickup")}
                  placeholderTextColor="#9CA3AF"
                  value={formData.pickupAddress}
                  onChangeText={handlePickupChange}
                  onFocus={() => setShowPickupSuggestions(true)}
                />
                {loadingPickup && (
                  <ActivityIndicator size="small" color="#4DB8B8" />
                )}
              </TouchableOpacity>
              {showPickupSuggestions && pickupSuggestions.length > 0 && (
                <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-50 max-h-48">
                  <ScrollView nestedScrollEnabled={true}>
                    {pickupSuggestions.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => selectPickupLocation(item)}
                        className="px-4 py-3 border-b border-gray-200 flex-row items-center"
                      >
                        <Ionicons
                          name="location-outline"
                          size={16}
                          color="#4DB8B8"
                          style={{ marginRight: 8 }}
                        />
                        <View className="flex-1">
                          <Text className="font-poppinsMedium text-sm text-gray-800">
                            {item.mainText}
                          </Text>
                          {item.secondaryText && (
                            <Text className="font-poppins text-xs text-gray-500 mt-1">
                              {item.secondaryText}
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>

          {/* Dropoff Address */}
          <View className="mb-6">
            <Text className="font-poppinsMedium text-sm text-gray-700 mb-2">
              {t("driver.tabs.editRequestModal.dropoffAddress")} *
            </Text>
            <View className="relative z-50">
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShowDropoffSuggestions(true)}
                className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4"
              >
                <Ionicons name="flag-outline" size={18} color="#4DB8B8" />
                <TextInput
                  className="flex-1 py-3 px-2 font-poppins text-gray-800"
                  placeholder={t("driver.tabs.editRequestModal.searchDropoff")}
                  placeholderTextColor="#9CA3AF"
                  value={formData.dropoffAddress}
                  onChangeText={handleDropoffChange}
                  onFocus={() => setShowDropoffSuggestions(true)}
                />
                {loadingDropoff && (
                  <ActivityIndicator size="small" color="#4DB8B8" />
                )}
              </TouchableOpacity>
              {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-50 max-h-48">
                  <ScrollView nestedScrollEnabled={true}>
                    {dropoffSuggestions.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => selectDropoffLocation(item)}
                        className="px-4 py-3 border-b border-gray-200 flex-row items-center"
                      >
                        <Ionicons
                          name="flag-outline"
                          size={16}
                          color="#4DB8B8"
                          style={{ marginRight: 8 }}
                        />
                        <View className="flex-1">
                          <Text className="font-poppinsMedium text-sm text-gray-800">
                            {item.mainText}
                          </Text>
                          {item.secondaryText && (
                            <Text className="font-poppins text-xs text-gray-500 mt-1">
                              {item.secondaryText}
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>

          {/* Scheduled Date */}
          <View className="mb-4">
            <Text className="font-poppinsMedium text-sm text-gray-700 mb-2">
              {t("driver.tabs.editRequestModal.date")} *
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4 py-3"
            >
              <Ionicons name="calendar-outline" size={18} color="#4DB8B8" />
              <Text className="flex-1 px-2 font-poppins text-gray-800">
                {formData.scheduledDate}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#9CA3AF"
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={parseDate(formData.scheduledDate)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Scheduled Time */}
          <View className="mb-4">
            <Text className="font-poppinsMedium text-sm text-gray-700 mb-2">
              {t("driver.tabs.editRequestModal.time")} *
            </Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4 py-3"
            >
              <Ionicons name="time-outline" size={18} color="#4DB8B8" />
              <Text className="flex-1 px-2 font-poppins text-gray-800">
                {formData.scheduledTime}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#9CA3AF"
              />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={parseTime(formData.scheduledTime)}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleTimeChange}
                is24Hour={false}
              />
            )}
          </View>

          {/* Seats */}
          <View className="mb-6">
            <Text className="font-poppinsMedium text-sm text-gray-700 mb-2">
              {t("driver.tabs.editRequestModal.seats")}
            </Text>
            <View className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4">
              <Ionicons name="people-outline" size={18} color="#4DB8B8" />
              <TextInput
                className="flex-1 py-3 px-2 font-poppins text-gray-800"
                placeholder={t("driver.tabs.editRequestModal.numberOfSeats")}
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                value={formData.seats}
                onChangeText={(value) => handleChange("seats", value)}
              />
            </View>
          </View>

          {/* Luggage Size Dropdown */}
          <View className="mb-6">
            <Text className="font-poppinsMedium text-sm text-gray-700 mb-2">
              {t("shared.tripDetailScreen.luggageSize")}
            </Text>
            <View className="relative z-40">
              <TouchableOpacity
                onPress={handleOpenLuggageDropdown}
                className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4 py-3"
              >
                <Ionicons name="briefcase-outline" size={18} color="#4DB8B8" />
                <Text className="flex-1 px-2 font-poppins text-gray-800">
                  {getLuggageLabel()}
                </Text>
                <Ionicons
                  name={
                    showLuggageDropdown
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={18}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
              {showLuggageDropdown && (
                <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-40 shadow-lg">
                  {luggageSizeOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => {
                        handleChange("luggageSize", option.value);
                        setShowLuggageDropdown(false);
                      }}
                      className="px-4 py-3 border-b border-gray-200"
                    >
                      <Text className="font-poppins text-gray-800">
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Gender Preference Dropdown */}
          <View className="mb-20">
            <Text className="font-poppinsMedium text-sm text-gray-700 mb-2">
              {t("shared.tripDetailScreen.genderPreference")}
            </Text>
            <View className="relative z-30">
              <TouchableOpacity
                onPress={handleOpenGenderDropdown}
                className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4 py-3"
              >
                <Ionicons name="people-outline" size={18} color="#4DB8B8" />
                <Text className="flex-1 px-2 font-poppins text-gray-800">
                  {getGenderLabel()}
                </Text>
                <Ionicons
                  name={
                    showGenderDropdown
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={18}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
              {showGenderDropdown && (
                <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-30 shadow-lg max-h-56">
                  <ScrollView nestedScrollEnabled={true}>
                    {genderPreferenceOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => {
                          handleChange("genderPreference", option.value);
                          setShowGenderDropdown(false);
                        }}
                        className="px-4 py-3 border-b border-gray-200"
                      >
                        <Text className="font-poppins text-gray-800">
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-200 rounded-lg py-3 items-center"
            >
              <Text className="font-poppinsSemiBold text-gray-800">
                {t("driver.tabs.editRequestModal.cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-teal-500 rounded-lg py-3 items-center"
            >
              <Text className="font-poppinsSemiBold text-white">
                {t("driver.tabs.editRequestModal.saveChanges")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
