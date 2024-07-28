import { View, Image } from 'react-native'
import React from 'react'
import { Text } from "@/components/ui/text"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dot, ShieldCheck } from '@/lib/icons/icons'
import { router } from 'expo-router'


const documents = () => {
    return (
        <View className=' flex flex-col h-full p-4'>

            <View className='p-4 flex-1 mt-5'>
                <View className=' flex-row items-center justify-center'>
                    <Image source={require("../assets/images/verify2.png")} resizeMode='cover' className='h-[120px] w-[120px] justify-center' />
                    <View>

                    </View>
                </View>
                <View className='  mt-[10%] flex-row items-center'>
                    <Text className='text-[24px] font-semibold'>{`Verify your identity`}</Text>
                    {/* <Text className='text-[24px] font-semibold '></Text> */}
                </View>
                <View className='mt-3'><Text>To comply with local laws and regulations,and to help prevent identity theft and fraud,  assist us to keep our platform secure by completing your identity verification </Text></View>
                <View className='mt-6'><Text variant={"mediumTitle"} className='font-semibold'>You'll need to provide  </Text></View>


                <View className='mt-4 flex-col gap-y-2'>
                    <View className='flex-row gap-x-2 items-center'>
                        <Dot size={20} className='text-foreground' />
                        <Text>ID & Personal Information </Text>

                    </View>
                    <View className='flex-row gap-x-2 items-center'>
                        <Dot size={20} className='text-foreground' />
                        <Text>Clear selfie and passport photograph </Text>

                    </View>
                    <View className='flex-row gap-x-2 items-center'>
                        <Dot size={20} className='text-foreground' />
                        <Text>Driving license and registration  </Text>

                    </View>

                    <View className='flex-row gap-x-2 items-center'>
                        <Dot size={20} className='text-foreground' />
                        <Text>Emergency contacts  </Text>

                    </View>
                    <View className='flex-row gap-x-2 items-center'>
                        <Dot size={20} className='text-foreground' />
                        <Text>Vehicle inspection and insurance documents  </Text>

                    </View>




                </View>



            </View>
            <View>

                <Button
                    onPress={() => router.push({
                        pathname: "(verification)/personalInfo"
                    })}
                    size={"lg"} rounded="base" className='flex-row items-center justify-center  text-white'>
                    <Text className='font-semibold'>Begin</Text>
                </Button>
            </View>
        </View>
    )
}

export default documents

