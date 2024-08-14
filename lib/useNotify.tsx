import { View, Text, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import { selectNotificationInfo, setEnabled, addNotification, setToken } from "@/redux/slices/notifications/app";
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks';
import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';




const useNotify = () => {

    const dispatch = useAppDispatch()

    const appNotification = useSelector(selectNotificationInfo)

    const [tokenEnabled, setTokenEnabled] = useState(appNotification.enabled || false)

    const [token, setPushToken] = useState("")



    const handleNotificationPermissionGranted = (token: string) => {

        //Set permission enabled to true 
        dispatch(setToken(token))
        dispatch(setEnabled(true))
        setPushToken(token)
    }


    const handleNotificationPermissionRejected = () => {

        Alert.alert(
            'Notification Permission Denied',
            'You need to enable notification permission to enable us to provide the best services. Please enable it in settings.',
            [

                //TODO CLOSE APP IF USER CANCELS
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() }
            ]
        );
    }

    async function requestUserPermission() {

        // if(Platform.OS === "ios")

        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        let token = null

        if (enabled) {

            const fcmToken = await messaging().getToken();
            token = fcmToken
        }

        if (enabled && token) {
            handleNotificationPermissionGranted(token)
        } else {
            handleNotificationPermissionRejected()
        }

    }

    // useEffect(() => {
    //     if (!tokenEnabled) {
    //         requestUserPermission()
    //     }
    // }, [tokenEnabled])


    // useEffect(() => {
    //     const subscribe = messaging().onMessage(async remoteMessage => {

    //         const notifee = remoteMessage.data?.notifee

    //         const { title, active, body, imageUrl, topic, type } = notifee as Record<string, string>

    //         dispatch(addNotification({ title, body, type, active, imageUrl, topic }));


    //     });

    //     // Register background handler
    //     const subscribeBackground =
    //         messaging().setBackgroundMessageHandler(async remoteMessage => {
    //             console.log('Message handled in the background!', remoteMessage);
    //         });

    //     return () => {
    //         subscribe
    //         subscribeBackground
    //     }
    // }, [dispatch])


    // return { hasToken: !!token, token }
}

export default useNotify