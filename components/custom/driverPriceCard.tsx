import { View } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Clock3, Dot, Star } from '@/lib/icons/icons'
import { Text } from "@/components/ui/text"
import { Button } from '../ui/button'
import Ionicons from '@expo/vector-icons/Ionicons'
import { removeOffer } from '@/redux/slices/offers'
import { useAppDispatch } from '@/redux/hooks'


export interface OfferCardProps {
    id: string,
    driverPushId?: string
    availableSeats: number
    driverName: string
    driverId: string,
    tripId: string,
    driverAvatar: string
    arrivalTime: number,
    trips: number
    rating: number
    destination?: string,
    amount: number
    carType?: string
    expiresAt: Date,
    estimatedArrivalTimeInMinutes: number
    currency: string
    ridersCount?: number

}

const DriverPriceCard: React.FC<OfferCardProps> = ({ availableSeats, driverName, arrivalTime, trips, rating, destination, amount, carType, expiresAt, driverAvatar, tripId, estimatedArrivalTimeInMinutes, currency, ridersCount, id: offerId }) => {


    const dispatch = useAppDispatch()

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            dispatch(removeOffer(offerId))
        }, 10000)

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            dispatch(removeOffer(offerId))
        }


    }, [])

    const dismissOffer = (offerId: string) => {
        dispatch(removeOffer(offerId))
    }

    return (
        <View className="space-y-3 mt-3  rounded-md border-muted-foreground bg-white p-3 shadow-lg">

            <View className='flex flex-row items-center justify-between mt-1'>

                <View className=' flex flex-row items-center gap-x-2 '>

                    <Avatar alt="user avatar" className='h-8 w-8' >
                        <AvatarImage source={{ uri: driverAvatar }} />
                        <AvatarFallback>
                            <Text>Driver Avatar</Text>
                        </AvatarFallback>
                    </Avatar>
                    <View>
                        <Text className='text-foreground font-semibold' variant={"subhead"}>{driverName}</Text>


                    </View>

                </View>
                <View className='flex flex-row items-center gap-x-1'>
                    <Star size={16} className='text-foreground' />
                    <Text className='font-bold text-[18px]' variant="body">{rating}</Text>
                </View>
            </View>


            <View className=' flex justify-between flex-row items-center mt-2 '>

                <Text className='' variant={"body"}>
                    Destination
                </Text>
                <View className='flex flex-row items-center gap-x-2'>
                    <View className='flex flex-row items-center gap-x-1.5 border-foreground '>
                        <Ionicons name="car-sport-outline" className='text-primary' size={22} color={"#134071"} />
                        <Text className='font-medium '>{carType}</Text>
                    </View>
                    <View className='flex flex-row items-center gap-x-1.5  pl-1 border-foreground '>
                        <Ionicons name="people-outline" className='text-primary' size={22} color={"#134071"} />
                        <Text className='font-medium '>{ridersCount}</Text>
                    </View>
                </View>
            </View>
            <View className='overflow-hidden text-ellipsis whitespace-nowrap '>

                <Text variant={"body"} className='font-semibold  opacity-85 truncate mt-1'>
                    {destination}

                </Text>
            </View>

            <View className='flex flex-row-reverse justify-between gap-x-1 my-2'>
                <View>
                    <View>
                        <Text className='align-super text-xs font-semibold' >{currency}</Text>
                    </View>
                    <View>
                        <Text variant={"largeTitle"} className='font-semibold text-[25px]' >{amount}</Text>
                    </View>
                </View>
                <View className='flex flex-col justify-end'>
                    <Text>Arrives in </Text>
                    <Text className='' variant="largeTitle"> 11 mins</Text>
                </View>
            </View>



            <View className='flex flex-row items-center max-w-full gap-x-2'>


                <Button variant={"destructive"} size="default" rounded={"base"} onPress={() => dismissOffer(offerId)} className=' flex flex-row justify-center items-center font-semibold  text-[20px]  flex-1'>
                    <Text className="text-white font-bold" style={{ color: "white", fontWeight: 700 }}>Decline </Text>
                </Button>

                <Button variant={"default"} size="default" rounded={"base"} onPress={() => console.log("Submit button")} className=' flex flex-row justify-center items-center font-semibold text-white text-[40px]  flex-1'>
                    <Text className='text-white' style={{ color: "white", fontWeight: 700 }}>Accept</Text>
                </Button>




            </View>
        </View>
    )
}

export default DriverPriceCard