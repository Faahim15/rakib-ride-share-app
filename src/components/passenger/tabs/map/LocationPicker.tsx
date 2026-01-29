import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

interface LocationPickerProps {
  pickupLocation: string;
  dropoffLocation: string;
  onPickupChange: (text: string) => void;
  onDropoffChange: (text: string) => void;
  onPickupFocus: () => void;
  onDropoffFocus: () => void;
  onSwapLocations: () => void;
  pickupPlaceholder: string;
  dropoffPlaceholder: string;
}

export function LocationPicker({
  pickupLocation,
  dropoffLocation,
  onPickupChange,
  onDropoffChange,
  onPickupFocus,
  onDropoffFocus,
  onSwapLocations,
  pickupPlaceholder,
  dropoffPlaceholder,
}: LocationPickerProps) {
  return (
    <View className="bg-brandColor rounded-xl p-[15px]">
      {/* Pickup Location */}
      <View className="flex-row items-center">
        <View className="w-8 h-8 rounded-full bg-white/30 justify-center items-center mr-3">
          <Ionicons name="location" size={20} color="white" />
        </View>
        <View className="flex-1">
          <TextInput
            className="text-base text-white font-poppinsMedium"
            placeholder={pickupPlaceholder}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={pickupLocation}
            onChangeText={onPickupChange}
            onFocus={onPickupFocus}
          />
        </View>
      </View>

      <View className="flex-row items-center pl-4 py-2">
        <View className="w-[2px] h-[30px] border-l-2 border-white border-dotted mr-[10px]" />
        <TouchableOpacity
          className="absolute right-0 bg-white w-10 h-10 rounded-full justify-center items-center shadow-sm"
          onPress={onSwapLocations}
        >
          <Ionicons name="swap-vertical" size={20} color="#00BFA6" />
        </TouchableOpacity>
      </View>

      {/* Dropoff Location */}
      <View className="flex-row items-center">
        <View className="w-8 h-8 rounded-full bg-white/30 justify-center items-center mr-3">
          <Ionicons name="location-outline" size={20} color="white" />
        </View>
        <View className="flex-1">
          <TextInput
            className="text-base text-white font-poppinsMedium"
            placeholder={dropoffPlaceholder}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={dropoffLocation}
            onChangeText={onDropoffChange}
            onFocus={onDropoffFocus}
          />
        </View>
      </View>
    </View>
  );
}
