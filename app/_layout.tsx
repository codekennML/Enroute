
import '@/global.css'
import React, { useEffect, useState } from "react";
import { Theme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from "@expo-google-fonts/inter"

import * as SplashScreen from 'expo-splash-screen';
import { COLOR_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/useColorScheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Pressable } from 'react-native';
import 'react-native-reanimated';
import { store } from "@/redux/store"
import { Provider } from 'react-redux'
import Toast from "@/components/ui/toast"
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  useCameraPermission
} from 'react-native-vision-camera'

import { router, Slot, Stack } from "expo-router"
import * as SecureStore from "expo-secure-store"

import { updateOtherUserData } from '@/redux/slices/user';



// Geolocation.setRNConfiguration(config)

const LIGHT_THEME: Theme = {
  dark: false,
  colors: COLOR_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: COLOR_THEME.dark,
};

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [countryCode, setCountryCode] = useState("")
  const { hasPermission, requestPermission } = useCameraPermission()
  const [userRole, setUserRole] = useState<number | null | undefined>(null)
  const [isReady, setIsReady] = useState(false);


  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    // Inter_800ExtraBold,
    // Inter_900Black,
    "EudoxusBold": require("../assets/fonts/eudoxusBold.ttf"),
    "Roboto": require("../assets/fonts/Roboto.ttf"),
  });


  const handleAuthentication = async () => {

    try {

      const accessToken = await SecureStore.getItemAsync("x_a_t")
      const refreshToken = await SecureStore.getItemAsync("x_r_t")
      const user = await SecureStore.getItemAsync("user") || "66c4acbec38b4f7853d71031"


      const apiUrl = Platform.OS === "ios" ? "http://127.0.0.1:3500/api" : "http://10.0.2.2:3500/api"

      const response = await axios.get(`${apiUrl}/user/${user}`, {
        headers: {
          x_r_t: refreshToken,
          x_a_t: accessToken,
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      const { data } = response?.data?.data

      await store.dispatch(updateOtherUserData({
        ...data
      }))
      if (data) {

        setUserRole(data.roles)
      } else {
        setUserRole(undefined)
      }


    } catch (e) {
      setUserRole(undefined)
      console.log(JSON.stringify(e))

    }
  }

  useEffect(() => {
    const loadApp = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }

      if (!theme) {
        await AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }

      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
      }

      setIsColorSchemeLoaded(true);

      const fetchCountry = async (ipaddress: string) => {
        try {
          // console.log(ipaddress)
          const ipaddress = "101.0.2.133"

          const response = await axios.get(`https://api.findip.net/${ipaddress}/?token=356ee8ee1d174f0b857f2740d9861802`);

          // console.log(response.data, "response");

          if (response.data && response.data.country) {
            const country = response.data.country;
            // setCountryState(country); // Update local state
            const isoCode = country.iso_code
            return isoCode
          }
        } catch (error) {
          return "none"
        }
      };

      const setCountryData = async () => {
        try {

          const getIpAddress = async () => {
            try {
              const state = await NetInfo.fetch();

              if (state.isConnected && state.details) {
                // console.log(state.details)
                // @ts-expect-error ts error inferring type
                const ipAddress = state.details?.ipAddress;
                // console.log('IP Address:', ipAddress);
                return ipAddress
              } else {
                return "none"
              }
            } catch (error) {
              return "none"
            }
          };

          const ipv4 = await getIpAddress();

          // Fetch country short code using the IP address
          const countryShortCode = await fetchCountry(ipv4);

          // console.log(countryShortCode);

          // Dispatch the country code to the Redux store
          if (countryShortCode && countryShortCode !== "none") {

            setCountryCode(countryShortCode)

          }
          else {

            if (countryShortCode === "none" || !countryShortCode) {
              setCountryCode("NG")

            }

          }
        } catch (error) {
          console.error("Error fetching country data:", error);
        }
      };
      // console.log("Emama")
      setCountryData();

      await handleAuthentication()
    };

    if (fontsLoaded && (userRole === undefined || typeof userRole === 'number')) {
      setIsReady(true); // Mark the app as ready only when all data is loaded
    }

    loadApp().finally(() => {
      if (isReady) {
        SplashScreen.hideAsync();
      }
    });
  }, [fontsLoaded, userRole, isReady]);

  if (!isReady) {
    return null;
  }

  return (


    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={colorScheme === 'light' ? LIGHT_THEME : DARK_THEME}>
            <BottomSheetModalProvider>
              <Slot />
            </BottomSheetModalProvider>
            <Toast />
          </ThemeProvider>
          <PortalHost />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

