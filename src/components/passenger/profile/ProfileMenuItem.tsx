import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import AppImage from "../../image/AppImage";

interface ProfileMenuItemProps {
  source: string;
  label: string;
  onPress: () => void;
  color?: string;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  source,
  label,
  onPress,
  color = "#565656",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="border mb-[3%] px-[2%] flex-row justify-between items-center rounded-md border-[#D4E0EB]"
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          height: verticalScale(60),
        },
      ]}
    >
      <View className="flex-row items-center justify-center">
        <AppImage
          source={source}
          height={verticalScale(30)}
          width={scale(34)}
        />
        <Text
          style={{ color: color, marginLeft: scale(12) }}
          className="font-poppinsMedium text-sm"
        >
          {label}
        </Text>
      </View>
      <View
        style={{ width: scale(44), height: verticalScale(44) }}
        className="bg-[#053F53] rounded-md items-center justify-center"
      >
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
