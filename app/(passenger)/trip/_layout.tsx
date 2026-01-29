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
          name="driver-profile"
          options={{
            title: t("passenger.tabs.trip.titles.driverProfile"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="cancel-ride"
          options={{
            title: t("passenger.tabs.trip.titles.rideCancellation"),
            ...stackScreenOptions,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
