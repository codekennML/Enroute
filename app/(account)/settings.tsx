import { View, ScrollView, Image } from 'react-native'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Pen } from '@/lib/icons/icons'
import { Text } from '@/components/ui/text'

const settings = () => {
    return (
        <>
            <View className='px-4  mt-4'>
                <Text className='text-[28px] font-semibold'>{`Personal `}</Text>
                <Text className='text-[24px] font-semibold '>Information</Text>
            </View>
            <ScrollView>

                <View className='flex-col items-center justify-center'>
                    <View className="my-4 mt-6 relative ">
                        <Image
                            source={{ uri: "https://randomuser.me/api/portraits/men/5.jpg" }}
                            resizeMode='cover'
                            className="w-24 h-24 rounded-full mr-4 border-4 border-primary/60"
                        />
                        <Button variant="ghost" rounded="full" className="w-6 h-6 bg-primary justify-center items-center flex-row absolute right-4 bottom-2 ">
                            <Pen size={10} className="text-white" />
                        </Button>


                        {/* <Text className="text-xl font-bold text-foreground">{driverProfile.name}</Text> */}
                        {/* <Text className="text-sm text-gray-600">{driverProfile.email}</Text> */}
                    </View>
                    <View className=' w-[60%] text-justify'>
                        <Text className='font-semibold text-center'>Add a profile photo so drivers can recognize you.</Text>
                        {/* <Text className='text-primary text-center'>Who can see my profile photo ?</Text> */}
                    </View>
                </View>
                <View className='text-foreground px-4 mt-6 border-t border-slate-100 pt-4  '>
                    {/* <Text variant={"mediumTitle"} className='my-3'>Personal Information</Text> */}
                    <View className=''>
                        <Text variant={"body"} className='font-medium'>Name </Text>
                        <View className='text-foreground'>
                            <Text variant={"body"} className='font-semibold text-[18px]'>Kennaya Jay</Text>

                        </View>


                        <View className='mt-2 '>
                            <Text className='font-medium'>Email address </Text>
                            <View className='flex-row items-center gap-x-2 justify-between'>
                                <Text variant={"body"} className='font-semibold text-[18px]'>xabc@gmail.com</Text>
                                <Button variant={"ghost"} onPress={() => { console.log("LOa") }} className='flex-row justify-center items-center'>
                                    <Text className='text-primary font-medium'>Edit</Text>

                                </Button>
                            </View>
                        </View>

                        <View className='mt-2'>
                            <Text className='font-medium'>Mobile Number</Text>
                            <View className='flex-row items-center justify-between gap-x-2'>
                                <Text variant={"body"} className='font-semibold text-[18px]'>+2348105481997</Text>
                                <Button variant={"ghost"} onPress={() => { console.log("LOa") }} className='flex-row justify-center items-center'>
                                    <Text className='text-primary font-medium'>Edit</Text>

                                </Button>
                            </View>
                        </View>
                        <View className='mt-2'>
                            <Text className='font-medium'>Gender</Text>
                            <View className='flex-row items-center justify-between gap-x-2'>
                                <Text variant={"body"} className='font-semibold text-[18px]'>Female</Text>

                            </View>
                        </View>

                        <View className='mt-2'>
                            <Text className='font-medium'>Joined</Text>
                            <View className='flex-row items-center justify-between gap-x-2'>
                                <Text variant={"body"} className='font-semibold text-[18px]'>04 Mar, 2022</Text>

                            </View>
                        </View>

                        <View className='mt-2'>
                            <Text className='font-medium'>Birthday</Text>
                            <View className='flex-row items-center gap-x-2 '>
                                <Text variant={"body"} className='font-semibold text-[18px]'>Wed, July 12, 1987</Text>

                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </>
    )
}

export default settings