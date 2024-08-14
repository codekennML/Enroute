import { View, Image, Linking, Alert } from 'react-native'
import React, { FC } from 'react'
import { Text } from "@/components/ui/text"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '@/components/ui/button'
import { BadgeCheck, MessageCircle, PhoneOutgoing, Share, ShieldCheck, SquareArrowOutUpRightIcon } from "@/lib/icons/icons"
import { Dispatch, SetStateAction } from 'react'
import { router } from 'expo-router'

interface DestinationDriveProps {
    openPassengerModal: (isOpen: boolean) => void

}

const DestinationDrive: FC<DestinationDriveProps> = ({ openPassengerModal }) => {


    const handleRideHelp = () => {
        router.push({
            pathname: "/rideHelp",
            params: {

            }
        })
    }


    return (
        <View className='p-1 pb-3' >

            <View className='flex-row items-center justify-between mb-2'>

                <Text variant={"mediumTitle"} className='  ' style={{ color: "#007AFF" }}>Driving to destination</Text>
                <Text className='font-semibold text-primary' variant={"subhead"}>41 mins</Text>

            </View>



            <View className='flex  gap-x-2 mt-1   border-slate-200 rounded-md pb-2  pt-1 mb-1'>
                <View className='flex flex-row gap-x-1  items-center'>
                    <View className='flex-row items-center flex-1'>
                        <View className='border-2 border-red-500 bg-blue-50 h-3 w-3 rounded-full '></View>
                        <Text variant={"body"} className='font-semibold pl-2'>Destination</Text>

                    </View>

                    <Button variant="ghost" rounded="base" className="bg-accent p-2  flex-row items-center justify-center gap-x-2 " onPress={() => { router.push("/map") }}>
                        <SquareArrowOutUpRightIcon size={20} className="text-foreground p-2" />
                        <Text variant={"footnote"} className='font-medium'>Share</Text>
                    </Button>
                </View>

                <View className='flex flex-col pt-1 '>

                    <Text variant="callout" className='text-foreground font-medium  '>
                        -   Lekki, Etiosa, Lagos, Nigeria
                    </Text>
                </View>

            </View>

            {/* Cancel && passengers */}
            <View className='flex flex-row items-center gap-2 mt-1'>
                <Button variant="ghost" rounded="base" className="bg-muted  flex-1"

                    onPress={() => openPassengerModal(true)}
                >
                    <Text className='text-center py-3' variant="body">View Passengers </Text>
                </Button>
                <Button onPress={handleRideHelp} variant="default" rounded="base" className="  flex-1">
                    <Text variant={"body"} color={"light"} className=' text-white text-center py-3 font-semibold'>Get Help</Text>
                </Button>
            </View>

        </View >
    )
}

export default DestinationDrive