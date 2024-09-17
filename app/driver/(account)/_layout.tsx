import Back from '@/components/ui/back';
import { Button } from '@/components/ui/button';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { Navigation } from 'lucide-react-native';
import { ArrowLeft } from "@/lib/icons/icons"

import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function AccountLayout() {

    const navigation = useNavigation()

    return <SafeAreaView>
        <View className=' px-4'>
            <Button variant={"ghost"} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <ArrowLeft size={22} className="text-foreground" />

            </Button>

        </View>
        <Slot />
    </SafeAreaView>
}

