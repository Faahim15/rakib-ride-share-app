import {
  Alert,
  GestureResponderEvent,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
const DEFAULT_IMAGE = "https://i.pravatar.cc/150?img=5";
const REMOVED_IMAGE =
  "https://via.placeholder.com/300/cccccc/666666?text=No+Photo";

export default function EditProfile() {
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_IMAGE);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const requestPermissions = async (): Promise<boolean> => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const libraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraPermission.status !== "granted" ||
      libraryPermission.status !== "granted"
    ) {
      Alert.alert(
        "Permission needed",
        "Camera and photo library access are required to change your profile photo."
      );
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async (): Promise<void> => {
    setModalVisible(false);
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async (): Promise<void> => {
    setModalVisible(false);
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const removePhoto = (): void => {
    setModalVisible(false);
    Alert.alert(
      "Remove Photo",
      "Are you sure you want to remove your profile photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => setProfileImage(REMOVED_IMAGE),
        },
      ]
    );
  };

  return (
    <>
      <View
        style={{ height: verticalScale(56), width: scale(56) }}
        className="  relative"
      >
        <Image
          source={{ uri: profileImage }}
          className="w-full h-full rounded-full"
        />

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="absolute bottom-0 right-0 bg-[#00ABB0] w-[20px] h-[20px] rounded-full items-center justify-center border-2 border-white"
          activeOpacity={0.7}
        >
          <Ionicons name="pencil" size={10} color="white" />
        </TouchableOpacity>
      </View>
      <View className="pt-1">
        <Text className="font-poppinsSemiBold text-xl text-black ">
          Olivia Rae
        </Text>
      </View>

      {/* Modal for Image Options */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-end bg-black/50"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e: GestureResponderEvent) => e.stopPropagation()}
          >
            <View className="bg-white rounded-t-[24px] px-[6%] pb-[8%] pt-[4%]">
              <View className="w-[40px] h-[4px] bg-gray-300 rounded-full self-center mb-[6%]" />

              <Text className="text-[20px] font-poppinsSemiBold text-gray-900 mb-[4%]">
                Change Profile Photo
              </Text>

              {/* Take Photo */}
              <TouchableOpacity
                onPress={takePhoto}
                className="flex-row items-center py-[4%] border-b border-gray-100"
                activeOpacity={0.7}
              >
                <View className="w-[44px] h-[44px] bg-blue-50 rounded-full items-center justify-center">
                  <Ionicons name="camera" size={22} color="#3B82F6" />
                </View>
                <Text className="text-base font-poppins text-gray-900 ml-[4%]">
                  Take Photo
                </Text>
              </TouchableOpacity>

              {/* Gallery */}
              <TouchableOpacity
                onPress={pickImageFromGallery}
                className="flex-row items-center py-[4%] border-b border-gray-100"
                activeOpacity={0.7}
              >
                <View className="w-[44px] h-[44px] bg-green-50 rounded-full items-center justify-center">
                  <Ionicons name="images" size={22} color="#10B981" />
                </View>
                <Text className="text-base font-poppins text-gray-900 ml-[4%]">
                  Choose from Gallery
                </Text>
              </TouchableOpacity>

              {/* Remove */}
              <TouchableOpacity
                onPress={removePhoto}
                className="flex-row items-center py-[4%] border-b border-gray-100"
                activeOpacity={0.7}
              >
                <View className="w-[44px] h-[44px] bg-red-50 rounded-full items-center justify-center">
                  <Ionicons name="trash" size={22} color="#EF4444" />
                </View>
                <Text className="text-base font-poppins text-red-600 ml-[4%]">
                  Remove Photo
                </Text>
              </TouchableOpacity>

              {/* Cancel */}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-100 py-[4%] rounded-[12px] mt-[4%]"
                activeOpacity={0.7}
              >
                <Text className="text-[16px] font-poppinsSemiBold text-gray-900 text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
