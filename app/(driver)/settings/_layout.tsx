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
          name="edit-availability"
          options={{
            title: t(
              "driver.tabs.profileScreenText.screenTitles.editAvailability",
            ),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="edit-routes"
          options={{
            title: t("driver.tabs.profileScreenText.screenTitles.editRoutes"),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="completed-rides"
          options={{
            title: t(
              "driver.tabs.profileScreenText.screenTitles.completedRides",
            ),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="upcoming-rides"
          options={{
            title: t(
              "driver.tabs.profileScreenText.screenTitles.upcomingRides",
            ),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="estimate-earning"
          options={{
            title: t(
              "driver.tabs.profileScreenText.screenTitles.estimateEarning",
            ),
            ...stackScreenOptions,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
