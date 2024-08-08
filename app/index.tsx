import { Ionicons } from "@expo/vector-icons";

import { router, Stack } from 'expo-router';
import { Pressable } from "react-native";
import useNotify from "@/lib/useNotify";
import { useSelector } from "react-redux";
import { selectNotificationInfo, removeNotification } from "@/redux/slices/notifications/app";
import { useAppDispatch } from "@/redux/hooks";
import { useState, useRef, useEffect } from "react";
import notifee, { AndroidImportance } from "@notifee/react-native"
import { setWsNotification } from "@/redux/slices/wsNotifications";

const index = () => {

    useNotify()


    const appNotification = useSelector(selectNotificationInfo)
    const { notification } = appNotification

    const dispatch = useAppDispatch();

    const [currentNotification, setCurrentNotification] = useState<typeof notification[0] | undefined>(undefined);


    useEffect(() => {
        if (notification.length > 0 && !currentNotification) {
            processNextNotification();
        }

        //Ensure that the data that comes back does not have the immediately processed notification
        if (currentNotification?.id === notification[0]?.id) {
            dispatch(removeNotification(currentNotification?.id))
        }

    }, [notification, currentNotification]);


    const processNextNotification = async () => {

        if (notification.length > 0) {

            const nextNotification = notification[0];

            // Remove the notification from Redux state immediately
            dispatch(removeNotification(nextNotification.id));

            // Set the current notification to display
            setCurrentNotification(nextNotification);

            const { type, active, topic } = nextNotification

            if (active) {

                await notifee.displayNotification({
                    title: nextNotification.title,
                    body: nextNotification.body,
                    android: {
                        channelId: type,
                        importance: AndroidImportance.HIGH,
                    },
                });
            }
            else {

                //We will use this to handle missed ws messages 

                setWsNotification({ value: topic, data: { ...nextNotification } })
                console.log("NOTIFICATIONS")

            }
        }
    };


    // if (!currentNotification) return null;






    return (
        <Stack screenOptions={{ headerTitleAlign: "center" }}>

            <Stack.Screen name="(auth)"
                // initialParams={{ countryCode: countryCode }}
                options={{
                    headerShadowVisible: false,
                    headerShown: true,
                    title: "",
                    headerLeft: () => (
                        router.canGoBack() ? (
                            <Pressable onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={24} color="#134071" style={{ marginLeft: 6 }} />
                            </Pressable>
                        ) : null
                    ),
                }} />

            <Stack.Screen name="documents" options={{ headerShown: false }} />


            <Stack.Screen name="(verification)"
                // initialParams={{ countryCode: countryCode }}

                options={{
                    headerShadowVisible: false,

                    // headerStyle:{

                    // },
                    headerShown: false,
                    title: "",
                    headerLeft: () => (
                        router.canGoBack() ? (
                            <Pressable onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={24} color="#134071" style={{ marginLeft: 6 }} />
                            </Pressable>
                        ) : null
                    ),
                }} />


            {/* <Stack.Screen name="payment" options={{ headerShown: false }} /> */}

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="(account)" options={{ headerShown: true, headerShadowVisible: false, title: "" }} />

            <Stack.Screen name="rideSummary" options={{ headerShown: true, title: "", headerShadowVisible: false }} />

            {/* <Stack.Screen name="search" options={({ route }) => ({
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
      /> */}
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

            <Stack.Screen name="rideLive" options={{
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
    )
}

export default index