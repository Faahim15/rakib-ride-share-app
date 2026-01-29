import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* ======================
   Types
====================== */

interface ImageViewerModalProps {
  visible: boolean;
  onClose: () => void;
  imageUrl?: string;
  images?: string[];
  currentIndex?: number;
}

/* ======================
   Component
====================== */

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  visible,
  onClose,
  imageUrl,
  images = [],
  currentIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(currentIndex);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const hasMultiple: boolean = images.length > 1;
  const currentImage: string | undefined = hasMultiple
    ? images[activeIndex]
    : imageUrl;

  const goToNext = () => {
    if (activeIndex < images.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  if (!currentImage) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black">
        {/* Header */}
        <View
          className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-4 py-3 bg-black/50"
          style={{
            paddingTop:
              Platform.OS === "android"
                ? (StatusBar.currentHeight ?? 0) + 8
                : 50,
          }}
        >
          <TouchableOpacity onPress={onClose} className="p-2">
            <Ionicons name="close" size={28} color="#FFF" />
          </TouchableOpacity>

          {hasMultiple && (
            <Text className="text-white text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </Text>
          )}

          <View className="w-10" />
        </View>

        {/* Image */}
        <View className="flex-1 justify-center items-center">
          <Image
            source={{ uri: currentImage }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            resizeMode="contain"
          />
        </View>

        {/* Navigation */}
        {hasMultiple && (
          <>
            {activeIndex > 0 && (
              <TouchableOpacity
                onPress={goToPrevious}
                className="absolute left-4 top-1/2 bg-black/60 rounded-full p-3"
                style={{ marginTop: -24 }}
              >
                <Ionicons name="chevron-back" size={24} color="#FFF" />
              </TouchableOpacity>
            )}

            {activeIndex < images.length - 1 && (
              <TouchableOpacity
                onPress={goToNext}
                className="absolute right-4 top-1/2 bg-black/60 rounded-full p-3"
                style={{ marginTop: -24 }}
              >
                <Ionicons name="chevron-forward" size={24} color="#FFF" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </Modal>
  );
};

export default ImageViewerModal;
