


// import React, { useEffect } from 'react';
// import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
// import { useAuth } from '@/lib/useAuth';
// import { ROLES } from '@/lib/config/enum';

// const RootLayoutNav = () => {

//     const { isAuthenticated, roles, verified } = useAuth();

//     console.log(isAuthenticated, roles, verified, "Velatya")

//     const router = useRouter();
//     const segments = useSegments();
//     const navigationState = useRootNavigationState();

//     useEffect(() => {
//         if (!navigationState?.key) return;

//         const inAuthGroup = segments[0] === '(auth)';
//         console.log("Here")
//         if (!isAuthenticated && !inAuthGroup) {
//             console.log("There")
//             router.replace('(auth)');
//         } else if (isAuthenticated) {

//             console.log("Villa")
//             if (!verified) {
//                 return router.replace("/verification")
//             }
//             console.log("Mazraoiu")
//             switch (roles) {

//                 case ROLES.DRIVER:
//                     if (segments[0] !== 'rider') router.replace('/rider');
//                     break;
//                 case ROLES.RIDER:
//                     if (segments[0] !== 'driver') router.replace('/driver');
//                     break;

//                 default:
//                     router.replace('404');
//             }
//         }
//     }, [roles, segments, navigationState]);

//     return (
//         <Stack />
//         // <Stack>
//         //     <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         //     <Stack.Screen name="rider" options={{ headerShown: false }} />
//         //     <Stack.Screen name="driver" options={{ headerShown: false }} />
//         //     <Stack.Screen name="verification" options={{ headerShown: false }} />

//         // </Stack>
//     );
// }


// export default RootLayoutNav
