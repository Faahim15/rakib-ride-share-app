import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface LocationSuggestion {
  id: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

interface LocationSearchInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  suggestions: LocationSuggestion[];
  showSuggestions: boolean;
  onSelectSuggestion: (suggestion: LocationSuggestion) => void;
}

export function LocationSearchInput({
  placeholder,
  value,
  onChangeText,
  onFocus,
  suggestions,
  showSuggestions,
  onSelectSuggestion,
}: LocationSearchInputProps) {
  return (
    <View>
      <View className="bg-white rounded-xl border-2 border-brandColor mb-[15px]">
        <TextInput
          className="text-base text-[#333] px-[15px] py-[14px]"
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View className="bg-white rounded-xl shadow-lg mb-[15px] max-h-[200px]">
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-[15px] py-[12px] border-b border-gray-100"
                onPress={() => onSelectSuggestion(item)}
              >
                <Text className="text-sm text-[#333]">{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
