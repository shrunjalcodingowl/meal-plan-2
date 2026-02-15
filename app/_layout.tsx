import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import Colors from "@/constants/colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { store, persistor } from '../Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();

      const loaded = async () => {
        const value = await AsyncStorage.getItem("isFirstTime");
        const isLogin = await AsyncStorage.getItem("isLogin");
        if (value !== null || value === false) {
          if (isLogin) {
            router.replace("/(tabs)");
          } else {
            router.replace("/welcome");
          }
        } else {
          await AsyncStorage.setItem("isFirstTime", JSON.stringify(false));
        }
      }
      loaded()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,

              animation: "fade",
              animationDuration: 100,

              contentStyle: {
                backgroundColor: Colors.bg,
              },

              gestureEnabled: true,
            }}
          >
            {/* Entry / Auth */}
            <Stack.Screen name="index" />

            {/* Tabs */}
            <Stack.Screen name="(tabs)" />

            {/* Other screens automatically fade */}
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>

          <StatusBar style="dark" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
