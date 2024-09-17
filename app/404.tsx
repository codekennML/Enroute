import Back from '@/components/ui/back';
import { Button } from '@/components/ui/button';
import { Link, router, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className='flex-1'>

        <View className='flex-1 justify-center items-center '>
          <Text className='text-lg font-semibold'>Oops, that page was not found</Text>
        </View>

        <View className='p-6' >
          <Button variant="default" size={"lg"} className='flex items-center justify-center' onPress={() => router.back()} >

            <Text>Go home</Text>
          </Button>
        </View>

      </View>
    </SafeAreaView>
  );
}
