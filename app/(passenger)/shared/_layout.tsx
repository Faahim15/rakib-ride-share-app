import { useLanguage } from "@/src/localization/LangaugeContext";
import { stackScreenOptions } from "@/src/utils/styles";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  const { t } = useLanguage();
  const { id } = useLocalSearchParams();

  // normalize id (since it can be string | string[] | undefined)
  const normalizedId = Array.isArray(id) ? id[0] : (id ?? "");

  // map id to translation keys
  const titleMap: Record<string, string> = {
    premium: t("shared.rakibPaymentForm.titles.premium"),
    allAccess: t("shared.rakibPaymentForm.titles.allAccess"),
    getplus: t("shared.rakibPaymentForm.titles.premiumPlus"),
  };

  const dynamicTitle = titleMap[normalizedId] || "Upgrade Plan";

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="rakib-payment-form"
          options={{
            title: dynamicTitle,
            ...stackScreenOptions,
          }}
        />
        <Stack.Screen
          name="upgrade-to-allAccess"
          options={{
            title: t("shared.rakibPaymentForm.titles.allAccess"),
            ...stackScreenOptions,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
