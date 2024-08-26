import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { COLOR_THEME } from '@/lib/constants';
import { Home, CalendarDays, BarChart, CircleUserRound, CalendarClock } from '@/lib/icons/icons';
import { useGetGeocodedLocationQuery } from '@/redux/api/maps';
import useLocation from '@/lib/useLocation';
import { setOrigin } from '@/redux/slices/search';
import { useAppDispatch } from '@/redux/hooks';
import { ProtectedStack } from '@/components/ui/auth/protected';
import { ROLES } from '@/lib/config/enum';


function TabLayout() {
  const { colorScheme } = useColorScheme();


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "light" ? COLOR_THEME.dark.primary : COLOR_THEME.light.text,
        headerShown: false,
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home color={color} size={28} className={`${focused ? "text-foreground" : "text-primary"}`} />
            // <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />


      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, focused }) => (
            <CalendarClock color={color} size={28} className={`${focused ? "text-foreground" : "text-primary"}`} />
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, focused }) => (
            <BarChart color={color} size={28} className={`${focused ? "text-foreground" : "text-primary"}`} />
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />


      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <CircleUserRound className={`${focused ? "text-foreground" : "text-primary"}`} size={28} />
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />

    </Tabs>


  );
}


export default function ProtectedRiderStack() {
  return (
    <ProtectedStack
      component={TabLayout}
      allowedRoles={[parseInt(ROLES.RIDER)]}
    />
  );
}