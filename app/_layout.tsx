
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
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { COLOR_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/useColorScheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
import { ChevronDown, Users, } from '@/lib/icons/icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Pressable } from 'react-native';
import 'react-native-reanimated';
import { Button } from '@/components/ui/button';
import { Text } from "@/components/ui/text"
import { ArrowLeft } from "@/lib/icons/icons"
import { store } from "@/redux/store"
import { Provider } from 'react-redux'
import Geolocation from '@react-native-community/geolocation';
import useLocation from '@/lib/useLocation';
import { useAppDispatch } from '@/redux/hooks';
import Toast from "@/components/ui/toast"
import { useGetGeocodedLocationQuery } from '@/redux/api/maps';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import Ionicons from '@expo/vector-icons/Ionicons';




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

  useEffect(() => {
    const loadTheme = async () => {
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

    };

    loadTheme().finally(() => {
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    });
  }, [colorScheme, fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Font not loaded")
    return null;
  }


  //     const dispatch = useDispatch();

  //   useEffect(() => {
  //     // Establish WebSocket connection on mount
  //     dispatch(connect('ws://your-websocket-url'));

  //     return () => {
  //         // Clean up WebSocket connection on unmount
  //         dispatch(disconnect());
  //     };
  // }, [dispatch]);

  // const handleSendMessage = () => {
  //     dispatch(sendMessage({ type: 'TYPE_A', payload: { data: 'example data' } }));
  // };


  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={colorScheme === 'light' ? LIGHT_THEME : DARK_THEME}>
            <BottomSheetModalProvider>

              <Stack screenOptions={{ headerTitleAlign: "center", }}>

                {/* <Stack.Screen name="(auth)"
                  // initialParams={{ countryCode: countryCode }}
                  options={{
                    headerShadowVisible: false,
                    headerShown: true,
                    title: "",
                    headerLeft: () => (
                      router.canGoBack() ? (
                        <Pressable onPress={() => router.back()}>
                          <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 6 }} />
                        </Pressable>
                      ) : null
                    ),
                  }} /> */}


                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(account)" options={{ headerShown: true, headerShadowVisible: false, title: "" }} />

                <Stack.Screen name="rideSummary" options={{ headerShown: true, title: "", headerShadowVisible: false }} />

                <Stack.Screen name="search" options={({ route }) => ({
                  headerShown: true,
                  headerShadowVisible: false,
                  title: route.params.type !== "courier" ? "Plan trip" : "Send Package",
                  headerTitleStyle: {
                    fontWeight: "700",
                    fontSize: 17,
                    color: "#333333",

                  },
                  // headerLargeTitle: true, // Use 

                  headerRight: () => (

                    <Button
                      variant="default"
                      rounded="full"
                      className='flex flex-row items-center justify-between p-2 '
                      onPress={() => alert('Book button pressed')}

                    >
                      <Users
                        size={14}
                        className='text-white' />

                      <ChevronDown
                        size={14} className='text-white' />

                    </Button>

                  ),
                })}
                />
                <Stack.Screen name="summary" options={{
                  headerShadowVisible: false,
                  headerShown: true,
                  title: ""
                  ,
                  headerTitleStyle: {
                    fontWeight: "700",
                    fontSize: 17,
                    color: "#6F6F6F",
                  },
                }} />

                <Stack.Screen name="driversList" options={{
                  headerShadowVisible: false,
                  headerShown: false,
                  title: ""

                }} />
                <Stack.Screen name="rideHelp" options={{
                  headerShadowVisible: false,
                  headerShown: true,
                  title: ""

                }} />

                <Stack.Screen name="+not-found" />
              </Stack>
            </BottomSheetModalProvider>
            <Toast />
          </ThemeProvider>
          <PortalHost />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

