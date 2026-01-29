// ============ CarInfo.tsx ============
import { useLanguage } from "@/src/localization/LangaugeContext";
import { View } from "react-native";
import Aminities from "./Aminities";
import Details from "./Details";
import TrunkInfo from "./TrunkInfo";

export default function CarInfo() {
  const { t } = useLanguage();

  return (
    <View className="px-[6%] mt-[5%] bg-white">
      {/* Car Model */}
      <Details
        iconName="car-sport-outline"
        title={t("driver.vehicleSummary.carModel")}
        subtitle="Toyota Axio 2018"
      />
      {/* Vehicle Type */}
      <Details
        iconName="car-outline"
        title={t("driver.vehicleSummary.vehicleType")}
        subtitle="SUV"
      />
      {/* Number of Seats */}
      <Details
        iconName="people-outline"
        title={t("driver.vehicleSummary.numberOfSeats")}
        subtitle="4"
      />
      {/* Trunk size */}
      <TrunkInfo />
      {/* AC */}
      <Aminities
        iconName="snow-outline"
        title={t("driver.vehicleSummary.amenities.ac")}
      />

      {/* USB ports */}
      <Aminities
        iconName="hardware-chip-outline"
        title={t("driver.vehicleSummary.amenities.usb")}
      />

      {/* WiFi */}
      <Aminities
        iconName="wifi-outline"
        title={t("driver.vehicleSummary.amenities.wifi")}
      />

      {/* Smoking allowed */}
      <Aminities
        iconName="ban-outline"
        title={t("driver.vehicleSummary.amenities.smoking")}
      />

      {/* Music */}
      <Aminities
        iconName="musical-notes-outline"
        title={t("driver.vehicleSummary.amenities.music")}
      />
    </View>
  );
}
