import React, { useEffect } from 'react';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/lib/useAuth';
import { ROLES } from '@/lib/config/enum';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/redux/slices/user';

const RootLayoutNav = () => {

    const { isAuthenticated, roles, verified } = useAuth();
    const user = useSelector(selectUserInfo)
    const router = useRouter();
    const segments = useSegments();
    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!navigationState?.key) return;

        const inAuthGroup = segments[0] === '(auth)';
        const inVerificationGroup = segments[0] === 'verification';

        console.log('Navigation State:', { isAuthenticated, roles, verified, inAuthGroup, inVerificationGroup });

        if (!isAuthenticated) {
            if (!inAuthGroup) {
                console.log('Redirecting to auth');
                // 
                router.replace('/verification/documents');
                // router.replace('/(auth)');
            }
        } else if (!verified) {
            if (!inVerificationGroup) {
                console.log('Redirecting to verification');
                // router.replace('/rider');

                router.replace('/verification/documents');
                // router.replace('/(auth)');
            }
        } else {
            console.log('Authenticated and verified, checking role');
            switch (roles) {
                case ROLES.DRIVER:
                    if (segments[0] !== 'driver') {
                        console.log('Redirecting to driver');
                        router.replace('/driver');
                    }
                    break;
                case ROLES.RIDER:
                    if (segments[0] !== 'rider') {
                        console.log('Redirecting to rider');
                        router.replace('/rider');
                    }
                    break;
                default:
                    console.log('Invalid role, redirecting to 404');
                    router.replace('/404');
            }
        }
    }, [isAuthenticated, roles, verified, segments, navigationState]);
    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="rider" options={{ headerShown: false }} />
            <Stack.Screen name="driver" options={{ headerShown: false }} />
            <Stack.Screen name="verification" options={{ headerShown: false }} />
            <Stack.Screen name="duplicateAccount" options={{ headerShown: false }} />
            <Stack.Screen name="404" options={{ headerShown: false }} />
        </Stack>
    );
}

export default RootLayoutNav;