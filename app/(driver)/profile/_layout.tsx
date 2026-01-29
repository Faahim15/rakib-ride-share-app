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
          name="driver-profile-setup"
          options={{
            title: t("driver.profileLayoutTitleText.driverProfileSetup"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="add-vehicle"
          options={{
            title: t("driver.profileLayoutTitleText.addVehicle"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="add-vechicle-details"
          options={{
            title: t("driver.profileLayoutTitleText.addVehicle"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="vehicle-summary"
          options={{
            title: t("driver.profileLayoutTitleText.vehicleSummary"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="passenger-rqst-list"
          options={{
            title: t("driver.profileLayoutTitleText.passengerRqstList"),
            ...stackScreenOptions,
          }}
        />

      </Stack>
    </SafeAreaProvider>
  );
}
