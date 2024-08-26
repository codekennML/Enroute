// import { ProtectedStack } from '@/components/ui/auth/protected';
// import { ROLES } from '@/lib/config/enum';
// import { Slot, Stack } from 'expo-router';
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native'

// function VerificationLayout() {

//     return <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="personalInfo" />
//         <Stack.Screen name="photo" />
//         <Stack.Screen name="emergency" />
//         <Stack.Screen name="identity" />
//         <Stack.Screen name="awaitingVerification" />
//     </Stack>

//     // <SafeAreaView>
//     //     <Slot />
//     // </SafeAreaView>
// }

// // export default VerificationLayout

// export default function ProtectedVerificationStack() {
//     console.log("KIiis")
//     return (
//         <ProtectedStack
//             component={VerificationLayout}
//             allowedRoles={[ROLES.RIDER, ROLES.DRIVER]}
//         />
//     );
// }

import { ProtectedStack } from '@/components/ui/auth/protected';
import { ROLES } from '@/lib/config/enum';
import { Slot, Stack } from 'expo-router';
import React from 'react';

function VerificationLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="documents" />
            <Stack.Screen name="personalInfo" />
            <Stack.Screen name="photo" />
            <Stack.Screen name="emergency" />
            <Stack.Screen name="identity" />
            <Stack.Screen name="vehicleData" />
            <Stack.Screen name="vehicleInsurance" />
            <Stack.Screen name="vehicleInspection" />
            <Stack.Screen name="processing" />
        </Stack>
    );
}

function ProtectedVerificationStack() {

    return (
        <ProtectedStack
            component={VerificationLayout}
            allowedRoles={[parseInt(ROLES.RIDER), parseInt(ROLES.DRIVER)]}
        />
    );
}

// This is the key change
export default function VerificationRoot() {
    return <ProtectedVerificationStack />;
}
