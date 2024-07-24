import { useState, useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const useLocation = (type: "locate" | "drive" = "locate") => {
    const [location, setLocation] = useState<null | { lat: number, lng: number }>(null);
    const [error, setError] = useState<null | Error>(null);
    const [permissionDenied, setPermissionDenied] = useState<boolean>(false)
    const [permissionGranted, setPermissionGranted] = useState(false);

    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                const status = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
                if (status === RESULTS.GRANTED) {
                    setPermissionGranted(true);
                } else {
                    handlePermissionDenied();
                }
            } else if (Platform.OS === 'android') {
                const fineStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                if (fineStatus === RESULTS.GRANTED) {
                    const backgroundStatus = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
                    if (backgroundStatus === RESULTS.GRANTED) {
                        setPermissionGranted(true);
                    } else {
                        handlePermissionDenied();
                    }
                } else {
                    handlePermissionDenied();
                }
            }
        } catch (err: unknown) {
            setError(err as Error);
        }
    };

    const handlePermissionDenied = () => {

        Alert.alert(
            'Location Permission Denied',
            'We need your location to provide the best service. Please enable it in settings.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() }
            ]
        );

        setPermissionDenied(true)
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        let watchId: number | null = null
        if (permissionGranted && type === "drive") {
            watchId = Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                    // Send location to your server or backend service if needed
                },
                (err) => {
                    setError(err as unknown as Error);
                },
                { enableHighAccuracy: true, distanceFilter: 10, maximumAge: 4000, interval: 5000, } // 5 minutes
            );
        }
        if (permissionGranted && type === "locate") {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                    setError(null);
                },
                (err) => {
                    setError(err as unknown as Error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        return () => {
            if (watchId) {
                Geolocation.clearWatch(watchId);
            }
        };
    }, [permissionGranted]);

    return { location, error, permissionGranted, permissionDenied };
};

export default useLocation;
