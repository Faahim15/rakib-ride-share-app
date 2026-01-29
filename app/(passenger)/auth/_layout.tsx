import CustomStatusBar from "@/src/ui/CustomStatusBar";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      {/* Updated StatusBar Color */}
      <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
