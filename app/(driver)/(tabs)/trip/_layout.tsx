import { useLanguage } from "@/src/localization/LangaugeContext";
import { stackScreenOptions } from "@/src/utils/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  const { t } = useLanguage();
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="single-trip"
          options={{
            title: t("passenger.tabs.trip.titles.tripSummary"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="passenger-rqst-details"
          options={{
            title: t("driver.profileLayoutTitleText.passengerRqstDetails"),
            ...stackScreenOptions,
          }}
        />
      </Stack>
    </View>
  );
}
