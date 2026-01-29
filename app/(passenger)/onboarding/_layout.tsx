import CustomStatusBar from "@/src/ui/CustomStatusBar";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      {/* Updated StatusBar Color */}
      <CustomStatusBar backgroundColor="#053F53" barStyle="light-content" />

      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
