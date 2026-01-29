// components/RideCard/PriceSection.tsx
import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface PriceSectionProps {
  price: string | number;
  priceLabel?: string;
  currency?: string;
}

export default function PriceSection({
  price,
  priceLabel = "Price",
  currency = "د.ا", // Jordanian Dinar
}: PriceSectionProps) {
  const { t } = useLanguage();

  return (
    <View className="flex-row items-center justify-between bg-white rounded-lg p-3 mb-4 border border-blue-100">
      <View className="flex-row items-center">
        <Ionicons
          name="wallet-outline"
          size={18}
          color="#00ABB0"
          style={{ marginRight: 10 }}
        />
        <Text className="font-poppins text-xs text-gray-500">
          {priceLabel === "Offered Price"
            ? t("driver.rideDetail.offeredPrice")
            : t("driver.rideDetail.price")}
        </Text>
      </View>
      <View className="bg-blue-50 px-3 py-2 rounded-lg">
        <Text className="font-poppinsSemiBold text-sm text-[#00ABB0]">
          {price} {t("shared.currency.symbol")}
        </Text>
      </View>
    </View>
  );
}
