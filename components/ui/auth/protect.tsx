// // components/ProtectedRoute.tsx
// import React from 'react';
// import { Redirect } from 'expo-router';
// import { useAuth } from "@/lib/useAuth"

// export function ProtectedRoute({ component: Component, allowedTypes, ...rest }) {

//     const { isAuthenticated, roles } = useAuth();

//     if (!isAuthenticated || !allowedTypes.includes(roles)) {
//         return <Redirect href="/404" />;
//     }

//     return <Component {...rest} />;
// }