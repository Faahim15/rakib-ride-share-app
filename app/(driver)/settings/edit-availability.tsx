import CustomSwitch from "@/src/components/shared/CustomSwitch";
import { useLanguage } from "@/src/localization/LangaugeContext";
import React, { useState } from "react";
import { View } from "react-native";

export default function EditAvailability() {
  const [acEnabled, setAcEnabled] = useState(false);
  const { t } = useLanguage();

  return (
    <View className="flex-1 px-[6%] pt-[5%] bg-white">
      <CustomSwitch
        title={t("driver.tabs.overview.availability")}
        acEnabled={acEnabled}
        setAcEnabled={setAcEnabled}
      />
    </View>
  );
}
