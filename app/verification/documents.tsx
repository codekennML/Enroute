import { View, Image } from 'react-native'
import React from 'react'
import { Text } from "@/components/ui/text"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dot, ShieldCheck } from '@/lib/icons/icons'
import { router, useSegments } from 'expo-router'
import useLocation from '@/lib/useLocation'
import { useAuth } from '@/lib/useAuth'
import { ROLES } from '@/lib/config/enum'


const documents = () => {
    //Request location intel 
    useLocation("locate")

    const { roles } = useAuth()

    const segments = useSegments();

    // Access the current path
    const currentRoute = `/${segments.join('/')}`;

    console.log('Current Route:', currentRoute);


    return (
        <View className=' flex flex-col h-full p-4'>

            <View className='p-4 flex-1 mt-5'>
                <View className=' flex-row items-center justify-center'>
                    <Image source={require("../../assets/images/verify2.png")} resizeMode='cover' className='h-[120px] w-[120px] justify-center' />
                    <View>

                    </View>
                </View>
                <View className='  mt-[10%] flex-row items-center'>
                    <Text className='text-[24px] font-semibold'>{`Verify your identity`}</Text>
                </View>
                <View className='mt-3'><Text className='text-muted-foreground dark:text-muted-foreground'>To comply with local laws and regulations,and to help prevent identity theft and fraud,  assist us to keep our platform secure by completing your identity verification </Text></View>
                <View className='mt-6'><Text variant={"mediumTitle"} className='font-semibold'>You'll need to provide  </Text></View>

                <View className='mt-4 flex-col gap-y-2'>
                    <View className='flex-row gap-x-2 items-center'>
                        <Dot size={32} className='text-primary' />
                        <Text className='text-muted-foreground dark:text-muted-foreground'>ID & Personal Information </Text>

                    </View>
                    <View className='flex-row gap-x-2 items-center'>
                        <Dot size={32} className='text-primary' />
                        <Text className='text-muted-foreground dark:text-muted-foreground'>Clear selfie or passport photograph </Text>

                    </View>
                    {
                        roles === ROLES.DRIVER && <View className='flex-row gap-x-2 items-center'>
                            <Dot size={32} className='text-primary' />
                            <Text className='text-muted-foreground dark:text-muted-foreground'>Driving license and registration  </Text>

                        </View>

                    }

                    <View className='flex-row gap-x-2 items-center'>
                        <Dot size={32} className='text-primary' />
                        <Text className='text-muted-foreground dark:text-muted-foreground'>Emergency contacts  </Text>

                    </View>
                    {
                        roles === ROLES.DRIVER && <View className='flex-row gap-x-2 items-center'>
                            <Dot size={32} className='text-foreground' />
                            <Text className='text-muted-foreground dark:text-muted-foreground'>Vehicle inspection and insurance documents  </Text>

                        </View>
                    }

                </View>

            </View>
            <View>

                <Button
                    onPress={() => router.push({
                        pathname: "/verification/serviceCountry"
                    })}
                    size={"lg"} rounded="base" className='flex-row items-center justify-center  text-white'>
                    <Text variant="body" className='font-medium dark:text-white'>Begin</Text>
                </Button>
            </View>
        </View>
    )
}

export default documents

