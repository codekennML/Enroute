import { Slot } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, SafeAreaView } from 'react-native'

export default function SearchLayout() {

    return <SafeAreaView>
        <Slot />
    </SafeAreaView>
}

