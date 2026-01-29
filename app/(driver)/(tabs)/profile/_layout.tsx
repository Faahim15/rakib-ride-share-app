import { useLanguage } from "@/src/localization/LangaugeContext";
import { stackScreenOptions } from "@/src/utils/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function ProfileLayout() {
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
          name="add-vehicle"
          options={{
            title: t("driver.profileLayoutTitleText.addVehicle"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="add-vehicle-details"
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
          name="edit-profile"
          options={{
            title: t("driver.tabs.profileScreenText.screenTitles.editProfile"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="change-password"
          options={{
            title: t("passenger.tabs.profileScreenText.titles.changePassword"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="preference"
          options={{
            title: t("passenger.tabs.profileScreenText.titles.preference"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="help-and-support"
          options={{
            title: t("passenger.tabs.profileScreenText.titles.helpAndSupport"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="language-change"
          options={{
            title: t("tabs.profile.changeLanguage"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="change-membership"
          options={{
            title: t(
              "driver.tabs.profileScreenText.screenTitles.changeMembership",
            ),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="myVehicle"
          options={{
            title: t("driver.tabs.profileScreenText.screenTitles.myVehicle"),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="dashboard"
          options={{
            title: t("driver.tabs.profileScreenText.screenTitles.dashboard"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="my-rides"
          options={{
            title: t("tabs.profile.myRides"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="account-settings"
          options={{
            title: t("tabs.profile.settings"),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="terms-conditions"
          options={{
            title: t("passenger.tabs.trip.titles.termsConditions"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="privacy"
          options={{
            title: t("passenger.tabs.trip.titles.privacyPolicy"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="about-us"
          options={{
            title: t("passenger.tabs.trip.titles.aboutUs"),
            ...stackScreenOptions,
          }}
        />
      </Stack>
    </View>
  );
}
