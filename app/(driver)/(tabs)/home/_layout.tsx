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
          name="book-date"
          options={{
            title: t("driver.tabs.myTrip.screenTitles.bookDate"),
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="book-time"
          options={{
            title: t("driver.tabs.myTrip.screenTitles.bookTime"),
            ...stackScreenOptions,
          }}
        />

        <Stack.Screen
          name="trip"
          options={{
            title: t("driver.tabs.homeScreenText.publishARide"),
            ...stackScreenOptions,
          }}
        />
      </Stack>
    </View>
  );
}
