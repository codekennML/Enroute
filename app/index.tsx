// import { Ionicons } from "@expo/vector-icons";

// import { router, Stack } from 'expo-router';
// import { Pressable, View, Text } from "react-native";
// import useNotify from "@/lib/useNotify";
// import { useSelector } from "react-redux";
// import { selectNotificationInfo, removeNotification } from "@/redux/slices/notifications/app";
// import { useAppDispatch } from "@/redux/hooks";
// import { useState, useRef, useEffect } from "react";
// import notifee, { AndroidImportance } from "@notifee/react-native"
// import { setWsNotification } from "@/redux/slices/wsNotifications";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ChatScreen from "@/components/ui/chat/chat";

// const Navigation = () => {

//     // useNotify()

//     const [role, setRole] = useState("rider")
//     const appNotification = useSelector(selectNotificationInfo)
//     const { notification } = appNotification

//     const dispatch = useAppDispatch();

//     const [currentNotification, setCurrentNotification] = useState<typeof notification[0] | undefined>(undefined);


//     // useEffect(() => {
//     //     if (notification.length > 0 && !currentNotification) {
//     //         processNextNotification();
//     //     }
//     //     //Ensure that the data that comes back does not have the immediately processed notification
//     //     if (currentNotification?.id === notification[0]?.id) {
//     //         dispatch(removeNotification(currentNotification?.id))
//     //     }

//     // }, [notification, currentNotification]);


//     const processNextNotification = async () => {

//         if (notification.length > 0) {

//             const nextNotification = notification[0];

//             // Remove the notification from Redux state immediately
//             dispatch(removeNotification(nextNotification.id));

//             // Set the current notification to display
//             setCurrentNotification(nextNotification);

//             const { type, active, topic } = nextNotification

//             if (active) {

//                 await notifee.displayNotification({
//                     title: nextNotification.title,
//                     body: nextNotification.body,
//                     android: {
//                         channelId: type,
//                         importance: AndroidImportance.HIGH,
//                     },
//                 });
//             }
//             else {

//                 //We will use this to handle missed ws messages 

//                 setWsNotification({ value: topic, data: { ...nextNotification } })
//                 console.log("NOTIFICATIONS")

//             }
//         }
//     };


//     // if (!currentNotification) return null;


//     return (

//         // <ChatScreen isModalOpen={true} />

//         // <SafeAreaView>
//         <>
//             {
//                 role === "rider" && <RiderScreens />
//             }
//             {
//                 role === "driver" && <DriverScreens />
//             }

//             {/* {
//             role === "dispatch" && <DispatchScreens />
//         } */}

//         </>
//         // </SafeAreaView >
//     )



// }


// const RiderScreens = () => {

//     return <>

//         {/* <Stack.Screen name="(auth)"

//             // initialParams={{ countryCode: countryCode }}
//             options={{
//                 headerShadowVisible: false,
//                 headerShown: true,
//                 title: "",
//                 headerLeft: () => (
//                     router.canGoBack() ? (
//                         <Pressable onPress={() => router.back()}>
//                             <Ionicons name="arrow-back" size={24} color="#134071" style={{ marginLeft: 6 }} />
//                         </Pressable>
//                     ) : null
//                 ),
//             }}
//         /> */}

//         <Stack.Screen name="/chat"
//             options={{
//                 headerShadowVisible: false,
//                 headerShown: false,
//                 title: "",
//                 headerLeft: () => (
//                     router.canGoBack() ? (
//                         <Pressable onPress={() => router.back()}>
//                             <Ionicons name="arrow-back" size={24} color="#134071" style={{ marginLeft: 6 }} />
//                         </Pressable>
//                     ) : null
//                 ),
//             }} />

//         <Stack.Screen name="documents" options={{ headerShown: false }} />


//         <Stack.Screen name="(verification)"
//             // initialParams={{ countryCode: countryCode }}

//             options={{
//                 headerShadowVisible: false,

//                 // headerStyle:{

//                 // },
//                 headerShown: false,
//                 title: "",
//                 headerLeft: () => (
//                     router.canGoBack() ? (
//                         <Pressable onPress={() => router.back()}>
//                             <Ionicons name="arrow-back" size={24} color="#134071" style={{ marginLeft: 6 }} />
//                         </Pressable>
//                     ) : null
//                 ),
//             }} />


//         {/* <Stack.Screen name="payment" options={{ headerShown: false }} /> */}

//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

//         <Stack.Screen name="(account)" options={{ headerShown: true, headerShadowVisible: false, title: "" }} />

//         <Stack.Screen name="rideSummary" options={{ headerShown: true, title: "", headerShadowVisible: false }} />

//         {/* <Stack.Screen name="search" options={({ route }) => ({
// headerShown: true,
// headerShadowVisible: false,
// title: route.params.type !== "courier" ? "Plan trip" : "Send Package",
// headerTitleStyle: {
// fontWeight: "700",
// fontSize: 17,
// color: "#333333",

// },
// // headerLargeTitle: true, // Use 

// headerRight: () => (

// <Button
// variant="default"
// rounded="full"
// className='flex flex-row items-center justify-between p-2 '
// onPress={() => alert('Book button pressed')}

// >
// <Users
// size={14}
// className='text-white' />

// <ChevronDown
// size={14} className='text-white' />

// </Button>

// ),
// })}
// /> */}
//         <Stack.Screen name="summary" options={{
//             headerShadowVisible: false,
//             headerShown: true,
//             title: ""
//             ,
//             headerTitleStyle: {
//                 fontWeight: "700",
//                 fontSize: 17,
//                 color: "#6F6F6F",
//             },
//         }} />

//         <Stack.Screen name="rideLive" options={{
//             headerShadowVisible: false,
//             headerShown: false,
//             title: ""

//         }} />
//         <Stack.Screen name="rideHelp" options={{
//             headerShadowVisible: false,
//             headerShown: true,
//             title: ""

//         }} />

//         <Stack.Screen name="+not-found" />
//     </>

// }



// const DriverScreens = () => {

//     return <>

//         {/* <Stack.Screen name="(auth)"

//         // initialParams={{ countryCode: countryCode }}
//         options={{
//             headerShadowVisible: false,
//             headerShown: true,
//             title: "",
//             headerLeft: () => (
//                 router.canGoBack() ? (
//                     <Pressable onPress={() => router.back()}>
//                         <Ionicons name="arrow-back" size={24} color="#134071" style={{ marginLeft: 6 }} />
//                     </Pressable>
//                 ) : null
//             ),
//         }}
//     /> */}

//         <Stack.Screen name="/driver/(tabs)" options={{ headerShown: false }} />


//         <Stack.Screen name="chat"
//             options={{
//                 headerShadowVisible: false,
//                 headerShown: false,
//                 title: "",
//                 headerLeft: () => (
//                     router.canGoBack() ? (
//                         <Pressable onPress={() => router.back()}>
//                             <Ionicons name="arrow-back" size={24} color="#134071" style={{ marginLeft: 6 }} />
//                         </Pressable>
//                     ) : null
//                 ),
//             }} />

//         <Stack.Screen name="documents" options={{ headerShown: false }} />


//         <Stack.Screen name="(verification)"
//             // initialParams={{ countryCode: countryCode }}

//             options={{
//                 headerShadowVisible: false,

//                 // headerStyle:{

//                 // },
//                 headerShown: false,
//                 title: "",
//                 headerLeft: () => (
//                     router.canGoBack() ? (
//                         <Pressable onPress={() => router.back()}>
//                             <Ionicons name="arrow-back" size={24} color="#134071" style={{ marginLeft: 6 }} />
//                         </Pressable>
//                     ) : null
//                 ),
//             }} />


//         {/* <Stack.Screen name="payment" options={{ headerShown: false }} /> */}


//         <Stack.Screen name="(account)" options={{ headerShown: true, headerShadowVisible: false, title: "" }} />

//         <Stack.Screen name="rideSummary" options={{ headerShown: true, title: "", headerShadowVisible: false }} />

//         {/* <Stack.Screen name="search" options={({ route }) => ({
// headerShown: true,
// headerShadowVisible: false,
// title: route.params.type !== "courier" ? "Plan trip" : "Send Package",
// headerTitleStyle: {
// fontWeight: "700",
// fontSize: 17,
// color: "#333333",

// },
// // headerLargeTitle: true, // Use 

// headerRight: () => (

// <Button
// variant="default"
// rounded="full"
// className='flex flex-row items-center justify-between p-2 '
// onPress={() => alert('Book button pressed')}

// >
// <Users
// size={14}
// className='text-white' />

// <ChevronDown
// size={14} className='text-white' />

// </Button>

// ),
// })}
// /> */}
//         <Stack.Screen name="summary" options={{
//             headerShadowVisible: false,
//             headerShown: true,
//             title: ""
//             ,
//             headerTitleStyle: {
//                 fontWeight: "700",
//                 fontSize: 17,
//                 color: "#6F6F6F",
//             },
//         }} />

//         <Stack.Screen name="rideLive" options={{
//             headerShadowVisible: false,
//             headerShown: false,
//             title: ""

//         }} />

//         <Stack.Screen name="rideHelp" options={{
//             headerShadowVisible: false,
//             headerShown: true,
//             title: ""

//         }} />

//         <Stack.Screen name="+not-found" />
//     </>

// }



// export default Navigation



import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from 'expo-router';
import axios from 'axios';
import { useAppDispatch } from '@/redux/hooks';




const WelcomeScreen = () => {

    const [countryCode, setCountryCode] = useState("")

    return (
        <View className="  h-full flex flex-col justify-between  ">
            <View className=" flex flex-col justify-center items-center flex-1 bg-white">
                <Image
                    source={require("../assets/images/welcome.png")}
                    // source={{
                    //     uri: "https://img.freepik.com/premium-vector/woman-driving-car-city-road-dashboard-interior-view-seen-map-tablet_142963-2182.jpg?size=626&ext=jpg&ga=GA1.1.1274777771.1721533660&semt=sph"
                    // }}
                    className="w-3/4 h-1/2"
                    resizeMode="contain"
                />
            </View>

            <View className="  items-center  justify-end pb-10 ">
                <Text variant="heading" className="mb-1 text-foreground font-header ">Skip the bus</Text>
                <Text variant="heading" color={"secondary"} className="mb-5 text-foreground font-header ">Grab a ride along now</Text>

                <Button onPress={() => {
                    router.push({
                        pathname: "(auth)/login",

                        // pathname: "/rideHelp",
                        params: {
                            type: "rider"
                        }
                    })
                }}
                    variant="default"
                    size="lg"
                    rounded="base"
                    className="w-4/5 mb-2 flex flex-row justify-center items-center"
                >
                    <Text variant={"mediumTitle"} className='font-semibold text-white'> Get started</Text>
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    rounded="base"
                    className='flex flex-row items-center gap-x-2'
                    onPress=
                    {() => {
                        router.push({
                            pathname: "/driver",
                            params: {
                                authType: "driver"
                            }
                        })
                    }}
                >
                    <Text variant="smallTitle" className="text-foreground font-medium ">
                        Ready to earn?
                    </Text>
                    <Text variant="smallTitle" className="text-foreground font-semibold">Become a driver</Text>
                </Button>
            </View>
        </View>
    );
};

export default WelcomeScreen;