import { View, Image } from 'react-native'
import React from 'react'
import { Text } from "@/components/ui/text"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Star, SendHorizonal, PhoneOutgoing, ShieldCheck, MessageCircle, MessageCircleMore } from '@/lib/icons/icons'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction } from 'react'
import { router } from 'expo-router'

interface DriverArrivedProps {
    timeToArrival: number
    carName: string
    licensePlate: string
    openPassengersSheet: (isOpen: boolean) => void
    openCancelRideSheet: (isOpen: boolean) => void
}

const DriverArrived: React.FC<DriverArrivedProps> = ({
    timeToArrival,
    carName,
    licensePlate,
    openCancelRideSheet,
    openPassengersSheet
}) => {
    return (
        <View className='pb-4 flex-1 h-full' >
            <View className='flex flex-row justify-between items-center'>
                <View className='flex flex-1 '>
                    <Text variant={"subhead"} className='font-bold'>{`Driver has arrived`}</Text>

                    <Text variant={"body"} className=''>{` 4 passengers onboard `}</Text>
                </View>



                <View>
                    <Text variant={"smallTitle"} className='font-bold leading-2 tracking-wide'>{` ${licensePlate} `}</Text>
                    <Text variant={"body"} >{` ${carName} `}</Text>


                </View>


            </View>


            {/* Avatar perch  */}
            <View className='flex flex-row items-center justify-between mt-3 py-3  '>

                <View className=' flex flex-row items-center gap-x-2 '>

                    <Avatar alt="user avatar" className='h-12 w-12 rounded-md' >
                        <AvatarImage source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kLuVl7_2soHqjgecM56X2AHaLL%26pid%3DApi&f=1&ipt=5ce178d3918a2527d8efd01f8162db3ab0581bb1a3fbf60331bd22cbb9f7a5bb&ipo=images" }} resizeMode='cover' className='object-fit' />
                        <AvatarFallback>
                            <Text>Driver Avatar</Text>
                        </AvatarFallback>
                    </Avatar>

                    <View>

                        <Text className='text-foreground font-semibold' variant={"body"}>A. Vernon</Text>
                        <View className='flex flex-row items-center gap-x-2 '>

                            <Text className='text-foreground font-medium' variant={"callout"}>1240 trips</Text>
                            <Text className='text-foreground font-medium pr-1' variant={"body"}>(4.8)</Text>
                        </View>
                    </View>

                </View>


                <View className='flex flex-row  items-end gap-x-4'>
                    <Button variant="ghost" rounded="full" className="px-3  py-2 flex-row items-center justify-center gap-x-2 bg-accent" onPress={() => { router.push("/map") }}>
                        <PhoneOutgoing size={20} className="text-primary p-2" />
                        <Text variant={"footnote"} className='font-semibold'>Call</Text>
                    </Button>



                    <Button variant="ghost" rounded="full" className="px-3 py-2  flex-row items-center justify-center gap-x-1 bg-accent ">
                        <MessageCircleMore size={20} className="p-2 text-primary" />
                        <Text variant={"footnote"} className='font-semibold'>Chat</Text>
                    </Button>

                    {/* <Button variant="ghost" rounded="full" className="bg-primary p-2  flex-row items-center justify-center gap-x-2 ">
                        <ShieldCheck size={20} className="text-white p-2" />
                    </Button> */}
                    {/* <Text variant={"footnote"} className='font-medium'>Chat</Text> */}

                </View>
            </View>

            <View className=' '>



                {/* Cancel && passengers */}
                <View className='flex flex-row items-center gap-2' >
                    <Button variant="ghost" rounded="base" className="bg-muted mt-5 flex-1" onPress={() => openPassengersSheet(true)}>
                        <Text className='text-center py-3 font-medium' variant="body">View Passengers </Text>
                    </Button>
                    <Button variant="destructive" rounded="base" className=" mt-5 flex-1" onPress={() => openCancelRideSheet(true)}>
                        <Text variant={"body"} color={"light"} className=' text-white text-center py-3 font-medium'>Cancel ride</Text>
                    </Button>
                </View >

            </View >
        </View>
    )
}

export default DriverArrived