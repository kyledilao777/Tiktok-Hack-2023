import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { AuthProvider } from "../contexts/auth";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Calibri: require("../assets/fonts/Calibri-Bold.ttf"),
    Regencie: require("../assets/fonts/RegencieLight-M2gn.ttf"),
    Lato: require("../assets/fonts/Lato-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
