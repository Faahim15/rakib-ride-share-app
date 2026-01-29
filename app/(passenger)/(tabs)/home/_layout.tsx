import { useLanguage } from "@/src/localization/LangaugeContext";
import { stackScreenOptions } from "@/src/utils/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  const { t } = useLanguage();
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="select-driver"
          options={{
            title: t("passenger.tabs.trip.titles.availableRides"),
            ...stackScreenOptions,
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
          name="trip-details"
          options={{
            title: t("passenger.tabs.trip.titles.tripDetails"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="availabe-ride"
          options={{
            title: t("passenger.tabs.trip.titles.availableRides"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="date-picker"
          options={{
            title: t("passenger.tabs.trip.titles.pickADate"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="time-picker"
          options={{
            title: t("passenger.tabs.trip.titles.pickATime"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="luggage-selector"
          options={{
            title: t("passenger.tabs.trip.titles.selectLuggage"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="preferred-gender"
          options={{
            title: t("passenger.tabs.trip.titles.selectPreferredGender"),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="trip-summary"
          options={{
            title: t("passenger.tabs.trip.titles.tripSummary"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="my-trip"
          options={{
            title: t("passenger.tabs.titles.myTrip"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="ride-action-modal"
          options={{
            title: t("shared.formSheet.formsheetTitle"),
            presentation: "formSheet",
            gestureDirection: "vertical",
            animation: "slide_from_bottom",
            sheetGrabberVisible: true,
            sheetInitialDetentIndex: 0,
            sheetAllowedDetents: [0.3, 0.75, 1],
            sheetCornerRadius: 20,
            sheetExpandsWhenScrolledToEdge: true,
            sheetElevation: 24,
          }}
        />
      </Stack>
    </View>
  );
}
