import { useLanguage } from "@/src/localization/LangaugeContext";
import { stackScreenOptions } from "@/src/utils/styles";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  const { t } = useLanguage();

  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />

      <Stack>
        <Stack.Screen
          name="rating-screen"
          options={{
            title: t("passenger.tabs.trip.titles.rating"),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="ride-cancelled"
          options={{
            title: t("passenger.tabs.trip.titles.cancelledRides"),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="ride-shared"
          options={{
            title: t("passenger.tabs.trip.titles.ridesShared"),
            ...stackScreenOptions,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
