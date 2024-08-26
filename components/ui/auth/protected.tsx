// // components/ProtectedStack.tsx
// import React from 'react';
// import { Redirect } from 'expo-router';
// import { useAuth } from '@/lib/useAuth';

// export function ProtectedStack({ component: Component, allowedRoles }) {

//     const { isAuthenticated, roles } = useAuth();
//     console.log(isAuthenticated, roles, "Autheye")

//     if (!isAuthenticated || !allowedRoles.includes(roles)) {
//         return <Redirect href="/404" />;
//     }
// // 
//     return <Component />;
// }

// components/ProtectedStack.tsx
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/lib/useAuth';
import { ROLES } from '@/lib/config/enum';

// Define the props for the ProtectedStack component
interface ProtectedStackProps {
    component: React.ComponentType;
    allowedRoles: number[];
}

export function ProtectedStack({ component: Component, allowedRoles }: ProtectedStackProps) {
    const { isAuthenticated, roles } = useAuth();

    console.log('ProtectedStack:', { isAuthenticated, roles, allowedRoles });

    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to auth');
        return <Redirect href="../(auth)" />;
    }

    if (roles && !allowedRoles.includes(roles)) {
        console.log('User role not allowed, redirecting to 404');
        return <Redirect href="../404" />;
    }

    console.log('Access granted, rendering component');
    return <Component />;
}