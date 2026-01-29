import AppImage from "@/src/components/image/AppImage";
import { CarImage } from "@/src/mockData/passenger/savedDriverData";
import { scale, verticalScale } from "@/src/utils/scaling";
import React from "react";
import { View } from "react-native";

interface RenderVehicleProps {
  item: CarImage;
}

export default function RenderVehicle({ item }: RenderVehicleProps) {
  return (
    <View className="mr-4">
      <AppImage
        height={verticalScale(145)}
        width={scale(120)}
        borderRadius={scale(8)}
        source={item.url}
      />
    </View>
  );
}
