
import { ProtectedStack } from '@/components/ui/auth/protected';
import { ROLES } from '@/lib/config/enum';
import { Drawer } from 'expo-router/drawer';
import DrawerContent from './content';


export function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerType: 'front', // Overlay type
        headerShown: false,
        overlayColor: 'rgba(0, 0, 0, 0.8)', // Optional: set overlay color for the background

      }}
      drawerContent={(props) => <DrawerContent />}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Tabs' }} />
      <Drawer.Screen name="(account)" options={{ drawerLabel: 'account' }} />
      <Drawer.Screen name="trip/summary" options={{ drawerLabel: 'account' }} />
    </Drawer>)
}


export default function ProtectedRiderStack() {
  return (
    <ProtectedStack
      component={DrawerLayout}
      allowedRoles={[parseInt(ROLES.RIDER)]}
    />
  );
}