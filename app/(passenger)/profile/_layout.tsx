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
          name="profile-setup"
          options={{
            title: t("passenger.tabs.profileScreenText.titles.profileSetup"),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="payments"
          options={{
            title: t("passenger.tabs.profileScreenText.titles.payments"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="payment-method-screen"
          options={{
            title: t("passenger.tabs.profileScreenText.titles.payments"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="cash-input"
          options={{
            title: t("passenger.tabs.profileScreenText.titles.cashInput"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="transactions-history"
          options={{
            title: t(
              "passenger.tabs.profileScreenText.titles.transactionsHistory",
            ),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="my-ride"
          options={{
            title: t("tabs.profile.myRides"),
            ...stackScreenOptions,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
