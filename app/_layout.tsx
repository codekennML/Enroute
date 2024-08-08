
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
import messaging from '@react-native-firebase/messaging';
import { Slot } from "expo-router"


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






  //Request Push Notification persmission 

  async function requestUserPermission() {

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }


  //Check for ongoing trip  asn redirect to rideLive

  //update firebase user token , if it is different from the current one 



  //Set the user location in state , 




  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [countryCode, setCountryCode] = useState("")
  const { hasPermission, requestPermission } = useCameraPermission()

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

