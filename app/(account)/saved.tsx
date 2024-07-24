import { View } from 'react-native'
import React from 'react'
import { Home, BriefcaseBusiness, Plus } from '@/lib/icons/icons'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

const saved = () => {
    return (
        <View className='px-4'>
            <>
                <View className='mt-4'>
                    <Text className='text-[28px] font-semibold text-foreground'>{`Your`}</Text>
                    <Text className='text-[24px] font-semibold text-foreground'>Saved Places</Text>
                </View>

                <Text className='font-medium my-3'>Add your favourite stops for easy commute and movement </Text>


                <View className='flex-col gap-y-2 mt-4'>

                    <Button variant="ghost" rounded="base" className='p-1 '>
                        <View className='flex-row items-center gap-x-3 '>
                            <View className='p-2 rounded-full bg-primary '>
                                <Plus size={18} className='text-white' />
                            </View>
                            <Text className='font-semibold' variant={"mediumTitle"}>Add Place </Text>
                        </View>

                        <View>
                        </View>
                    </Button>
                    <Button variant={"ghost"} rounded="base" className='p-1 '>
                        <View className='flex-row items-center gap-x-3 '>
                            <View className='p-2 rounded-full bg-primary '>
                                <Home size={18} className='text-white' />
                            </View>
                            <View>
                                <Text className='font-semibold' variant={"mediumTitle"}>Home</Text>
                                <Text className='font-medium' variant={"callout"}>Mile 12 Bus stop, Kosofe, Lagos</Text>
                            </View>
                        </View>

                        <View>
                        </View>
                    </Button>


                    <Button variant="ghost" rounded="base" className='p-1 '>
                        <View className='flex-row items-center gap-x-3 '>
                            <View className='p-2 rounded-full bg-primary '>
                                <BriefcaseBusiness size={18} className='text-white' />
                            </View>
                            <View>
                                <Text className='font-semibold' variant={"mediumTitle"}>Work</Text>
                                <Text className='font-medium' variant={"callout"}>Irawo Bus stop, Kosofe, Lagos</Text>

                            </View>
                        </View>

                        <View>
                        </View>
                    </Button>


                </View>
            </>
        </View>
    )
}

export default saved