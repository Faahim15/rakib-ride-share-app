import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditTimeModal({
  visible,
  onClose,
  onSave,
  currentTime,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (time: string) => void;
  currentTime: string;
}) {
  const [editTime, setEditTime] = useState(currentTime);

  const handleSave = () => {
    if (editTime.trim()) {
      onSave(editTime);
      onClose();
    } else {
      Alert.alert("Error", "Please enter a valid time");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 pb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-poppinsSemiBold text-lg text-gray-800">
              Edit Schedule Time
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text className="font-poppins text-sm text-gray-600 mb-3">
            Enter new departure time (HH:MM AM/PM)
          </Text>
          <TextInput
            value={editTime}
            onChangeText={setEditTime}
            placeholder="08:30 AM"
            className="border border-gray-300 rounded-lg px-4 py-3 font-poppins text-base mb-6"
            placeholderTextColor="#9CA3AF"
          />

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 border border-gray-300 rounded-lg py-3 items-center"
            >
              <Text className="font-poppinsMedium text-base text-gray-800">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-[#00ABB0] rounded-lg py-3 items-center"
            >
              <Text className="font-poppinsMedium text-base text-white">
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
