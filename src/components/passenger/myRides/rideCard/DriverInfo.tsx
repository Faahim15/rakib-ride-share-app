// components/RideCard/DriverInfo.tsx
import AppImage from "@/src/components/image/AppImage";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Text, View } from "react-native";

interface DriverInfoProps {
  driverName: string;
  driverProfilePicture: string;
  driverLabel: string;
}

export default function DriverInfo({
  driverName,
  driverProfilePicture,
  driverLabel,
}: DriverInfoProps) {
  return (
    <View className="flex-row items-center mb-4 pb-3 border-b border-gray-200">
      <AppImage
        source={driverProfilePicture}
        height={verticalScale(48)}
        width={scale(48)}
        borderRadius={scale(24)}
      />
      <View className="flex-1 ml-3">
        <Text className="font-poppins text-xs text-gray-500">
          {driverLabel}
        </Text>
        <Text className="font-poppinsMedium text-sm text-gray-800">
          {driverName}
        </Text>
      </View>
    </View>
  );
}
