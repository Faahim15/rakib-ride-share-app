import { verticalScale } from "@/src/utils/scaling";
import React from "react";
import { Dimensions, KeyboardAvoidingView, Platform, View } from "react-native";
import Swiper from "react-native-swiper";
import AppImage from "../../image/AppImage";

const { width } = Dimensions.get("window");

const carImages = [
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400",
];

export default function CarImageSwiper() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <View style={{ height: verticalScale(200) }} className="w-full ">
        <Swiper
          showsPagination
          autoplay
          autoplayTimeout={3}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.25)" }}
          activeDotStyle={{ backgroundColor: "#00ABB0" }}
        >
          {carImages.map((image, index) => (
            <View key={index} className="flex-1  items-center justify-center">
              <AppImage source={image} width={width} height={300} />
            </View>
          ))}
        </Swiper>
      </View>
    </KeyboardAvoidingView>
  );
}
