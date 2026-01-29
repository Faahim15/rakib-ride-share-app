import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

/** File object passed to parent */
export interface SelectedFile {
  name: string;
  uri: string;
  type: string;
}

/** Component props */
interface ImageSelectorProps {
  selectedFile?: SelectedFile | null;
  onFileSelect: (file: SelectedFile) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  selectedFile,
  onFileSelect,
}) => {
  const { t } = useLanguage();

  const handleUpload = async (): Promise<void> => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          t("driver.driverProfileTexts.permissionTitle"),
          t("driver.driverProfileTexts.permissionMessage"),
        );
        return;
      }

      Alert.alert(
        t("driver.driverProfileTexts.uploadTitle"),
        t("driver.driverProfileTexts.uploadMessage"),
        [
          {
            text: t("driver.driverProfileTexts.photoLibrary"),
            onPress: async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                allowsMultipleSelection: false,
              });

              if (!result.canceled && result.assets?.length > 0) {
                const asset = result.assets[0];

                const mimeType = asset.mimeType ?? "image/jpeg";
                const filename = asset.fileName ?? `photo_${Date.now()}.jpg`;

                onFileSelect({
                  name: filename,
                  uri: asset.uri,
                  type: mimeType,
                });
              }
            },
          },
          {
            text: t("driver.driverProfileTexts.camera"),
            onPress: async () => {
              const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

              if (!result.canceled && result.assets?.length > 0) {
                const asset = result.assets[0];

                onFileSelect({
                  name: asset.fileName ?? "camera_photo.jpg",
                  uri: asset.uri,
                  type: asset.mimeType ?? "image/jpeg",
                });
              }
            },
          },
          {
            text: t("driver.driverProfileTexts.cancel"),
            style: "cancel",
          },
        ],
      );
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert(
        t("driver.driverProfileTexts.errorTitle"),
        t("driver.driverProfileTexts.errorMessage"),
      );
    }
  };

  return (
    <View className=" bg-white">
      <View className="w-full">
        <TouchableOpacity
          onPress={handleUpload}
          className="bg-white border border-gray-300 rounded-xl active:bg-blue-50/50"
          activeOpacity={0.7}
        >
          {selectedFile ? (
            <View className="flex-row py-[5%] px-[3%] justify-between items-center">
              <View
                style={{ width: scale(122), height: verticalScale(40) }}
                className="flex-row gap-[4%]"
              >
                <Ionicons name="checkmark-circle" size={26} color="#10b981" />
                <Text className="text-sm pt-[1%] font-poppins text-[#6C6C70]">
                  {selectedFile.name}
                </Text>
              </View>

              <Text className="text-base pt-[1%] font-poppins-500medium text-[#319FCA]">
                {t("driver.driverProfileTexts.tapToChange")}
              </Text>
            </View>
          ) : (
            <View className="flex-row px-[3%] gap-[5%] py-[2%] w-full items-center">
              <View className="w-[30px] h-[30px] bg-blue-100 rounded-full items-center justify-center">
                <Ionicons
                  name="cloud-upload-outline"
                  size={16}
                  color="#3b82f6"
                />
              </View>
              <Text className="font-poppins text-sm text-[#6B7280]">
                {t("driver.driverProfileTexts.clickToUpload")}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageSelector;
