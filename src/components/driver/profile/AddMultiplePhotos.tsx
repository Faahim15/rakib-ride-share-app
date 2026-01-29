import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImageItem {
  id: string;
  uri: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CarImageUpload() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [viewerVisible, setViewerVisible] = useState(false);
  const { t } = useLanguage();
  const pickImagesFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        t("driver.carImageUploadTexts.permissionTitle"),
        t("driver.carImageUploadTexts.permissionGallery")
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newImages: ImageItem[] = result.assets.map((asset, index) => ({
        id: `${Date.now()}_${index}`,
        uri: asset.uri,
      }));
      setImages([...images, ...newImages]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        t("driver.carImageUploadTexts.permissionTitle"),
        t("driver.carImageUploadTexts.permissionCamera")
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets) {
      const newImage: ImageItem = {
        id: `${Date.now()}`,
        uri: result.assets[0].uri,
      };
      setImages([...images, newImage]);
    }
  };

  const removeImage = (id: string) => {
    Alert.alert(
      t("driver.carImageUploadTexts.removeImageTitle"),
      t("driver.carImageUploadTexts.removeImageMessage"),
      [
        { text: t("driver.carImageUploadTexts.cancel"), style: "cancel" },
        {
          text: t("driver.carImageUploadTexts.remove"),
          onPress: () => {
            setImages(images.filter((img) => img.id !== id));
            if (selectedImage?.id === id) {
              setViewerVisible(false);
              setSelectedImage(null);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const openImageViewer = (image: ImageItem) => {
    setSelectedImage(image);
    setViewerVisible(true);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    }

    setSelectedImage(images[newIndex]);
  };

  const showUploadOptions = () => {
    Alert.alert(
      t("driver.carImageUploadTexts.addPhotosTitle"),
      t("driver.carImageUploadTexts.addPhotosMessage"),
      [
        {
          text: t("driver.carImageUploadTexts.takePhoto"),
          onPress: takePhoto,
        },
        {
          text: t("driver.carImageUploadTexts.chooseFromGallery"),
          onPress: pickImagesFromGallery,
        },
        {
          text: t("driver.carImageUploadTexts.cancel"),
          style: "cancel",
        },
      ]
    );
  };

  const renderImageItem = ({ item }: { item: ImageItem }) => (
    <TouchableOpacity
      onPress={() => openImageViewer(item)}
      className="mr-[3%] mb-[3%]"
      activeOpacity={0.7}
    >
      <View
        style={{ width: scale(110), height: verticalScale(110) }}
        className="rounded-2xl overflow-hidden bg-gray-100 shadow-md"
      >
        <Image
          source={{ uri: item.uri }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => removeImage(item.id)}
          className="absolute top-2 right-2 bg-black/70 rounded-full w-7 h-7 items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderUploadButton = () => (
    <TouchableOpacity
      onPress={showUploadOptions}
      style={{ width: scale(110), height: verticalScale(110) }}
      className="rounded-2xl border-2 border-dashed border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center mr-[3%] mb-[3%] shadow-sm"
      activeOpacity={0.7}
    >
      <View className="items-center">
        <View className="bg-blue-500 rounded-full w-12 h-12 items-center justify-center mb-2">
          <Ionicons name="add" size={28} color="white" />
        </View>
        <Text className="text-blue-600 text-xs font-poppinsSemiBold">
          {t("driver.carImageUploadTexts.addPhotosTitle")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-[5%] py-[6%]">
          {/* Header Section */}
          <View className="mb-8 mt-4">
            <View className="flex-row items-center mb-3">
              <View className="bg-brandColor rounded-xl p-2 mr-3">
                <Ionicons name="car-sport" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 text-3xl font-poppinsBold">
                  {t("driver.carImageUploadTexts.headerTitle")}
                </Text>
                <Text className="text-gray-500 text-sm font-poppins mt-1">
                  {t("driver.carImageUploadTexts.headerSubtitle")}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats Card */}
          {images.length > 0 && (
            <View className="bg-white rounded-2xl p-5 mb-6 shadow-lg border border-gray-100">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-blue-100 rounded-full w-12 h-12 items-center justify-center mr-4">
                    <Ionicons name="images" size={24} color="#3b82f6" />
                  </View>
                  <View>
                    <Text className="text-gray-900 text-2xl font-poppinsBold">
                      {images.length}
                    </Text>
                    <Text className="text-gray-500 text-sm font-poppins">
                      {images.length === 1 ? "Photo" : "Photos"} Added
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      t("driver.carImageUploadTexts.clearAllTitle"),
                      t("driver.carImageUploadTexts.clearAllMessage"),
                      [
                        {
                          text: t("driver.carImageUploadTexts.cancel"),
                          style: "cancel",
                        },
                        {
                          text: t("driver.carImageUploadTexts.clearAllButton"),
                          onPress: () => setImages([]),
                          style: "destructive",
                        },
                      ]
                    );
                  }}
                  className="bg-red-50 px-5 py-3 rounded-xl border border-red-200"
                  activeOpacity={0.8}
                >
                  <Text className="text-red-600 text-sm font-poppinsSemiBold">
                    {t("driver.carImageUploadTexts.clearAllButton")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Gallery Grid */}
          <View className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <Text className="text-gray-900 text-lg font-poppinsSemiBold mb-4">
              {t("driver.carImageUploadTexts.galleryTitle")}
            </Text>

            {images.length === 0 ? (
              <View className="items-center justify-center py-16">
                <View className="bg-gray-100 rounded-full w-24 h-24 items-center justify-center mb-4">
                  <Ionicons name="images-outline" size={48} color="#9ca3af" />
                </View>
                <Text className="text-gray-400 text-base font-poppinsMedium mb-2">
                  {t("driver.carImageUploadTexts.noPhotos")}
                </Text>
                <Text className="text-gray-400 text-sm font-poppins text-center px-8">
                  {t("driver.carImageUploadTexts.startMessage")}
                </Text>
              </View>
            ) : (
              <FlatList
                data={[{ id: "upload-button" }, ...images]}
                renderItem={({ item }) => {
                  if (item.id === "upload-button") {
                    return renderUploadButton();
                  }
                  return renderImageItem({ item: item as ImageItem });
                }}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 8, paddingRight: 16 }}
              />
            )}
          </View>

          {/* Quick Actions */}
          <View className="mt-6 flex-row gap-3">
            <TouchableOpacity
              onPress={takePhoto}
              className="flex-1 bg-brandColor rounded-xl py-[4%] flex-row items-center justify-center shadow-md"
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={20} color="white" />
              <Text className="text-white text-base font-poppins ml-2">
                {t("driver.carImageUploadTexts.takePhoto")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickImagesFromGallery}
              className="flex-1 bg-brandColor rounded-xl py-[4%] flex-row items-center justify-center shadow-md"
              activeOpacity={0.8}
            >
              <Ionicons name="folder-open" size={20} color="white" />
              <Text className="text-white text-base font-poppins ml-2">
                {t("driver.carImageUploadTexts.gallery")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Image Viewer Modal */}
      <Modal
        visible={viewerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setViewerVisible(false)}
      >
        <View className="flex-1 bg-black">
          <StatusBar barStyle="light-content" />

          {/* Header */}
          <View className="absolute top-0 left-0 right-0 z-10 pt-12 pb-4 px-5 bg-gradient-to-b from-black/80 to-transparent">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => setViewerVisible(false)}
                className="bg-white/20 rounded-full w-10 h-10 items-center justify-center"
                activeOpacity={0.8}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>

              <Text className="text-white text-base font-poppinsMedium">
                {images.findIndex((img) => img.id === selectedImage?.id) + 1} /{" "}
                {images.length}
              </Text>

              <TouchableOpacity
                onPress={() => selectedImage && removeImage(selectedImage.id)}
                className="bg-red-500/90 rounded-full w-10 h-10 items-center justify-center"
                activeOpacity={0.8}
              >
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image */}
          <View className="flex-1 items-center justify-center">
            {selectedImage && (
              <Image
                source={{ uri: selectedImage.uri }}
                style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.7 }}
                resizeMode="contain"
              />
            )}
          </View>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <View className="absolute bottom-0 left-0 right-0 pb-12 px-5 bg-gradient-to-t from-black/80 to-transparent">
              <View className="flex-row items-center justify-center gap-6">
                <TouchableOpacity
                  onPress={() => navigateImage("prev")}
                  className="bg-white/20 rounded-full w-14 h-14 items-center justify-center"
                  activeOpacity={0.8}
                >
                  <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigateImage("next")}
                  className="bg-white/20 rounded-full w-14 h-14 items-center justify-center"
                  activeOpacity={0.8}
                >
                  <Ionicons name="chevron-forward" size={28} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
