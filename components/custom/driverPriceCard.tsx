import { View } from 'react-native'
import React, { SetStateAction, useEffect, Dispatch } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CircleCheck, Clock3, Dot, Star } from '@/lib/icons/icons'
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

    estimatedArrivalTimeInMinutes: number
    currency: string
    ridersCount?: number

}

type DriverPriceCardProps = {
    offer: OfferCardProps
    setAcceptedOffer: Dispatch<SetStateAction<OfferCardProps | undefined>>
}

const DriverPriceCard: React.FC<DriverPriceCardProps> = ({ offer, setAcceptedOffer }) => {

    const { availableSeats, driverName, arrivalTime, trips, rating, destination, amount, carType, driverAvatar, tripId, estimatedArrivalTimeInMinutes, currency, ridersCount, id: offerId } = offer

    const dispatch = useAppDispatch()

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            dispatch(removeOffer(offerId))
        }, 20000)

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            dispatch(removeOffer(offerId))
        }

    }, [])

    const handleSelectedOffer = (offer: OfferCardProps) => {
        setAcceptedOffer(offer)
    }



    return (
        <View className="space-y-3 mt-3  rounded-md border-muted-foreground bg-white p-3 shadow-lg">

            <View className='flex flex-row items-center justify-between mt-1'>

                <View className=' flex flex-row items-center gap-x-2 '>

                    <Avatar alt="user avatar" className='h-10 w-10' >
                        <AvatarImage source={{ uri: driverAvatar }} />
                        <AvatarFallback>
                            <Text>Driver Avatar</Text>
                        </AvatarFallback>
                    </Avatar>
                    <View>
                        <View className='flex-row items-center gap-x-1'>
                            <Text variant={"body"} className='text-foreground font-semibold' >{driverName}</Text>
                            <Text className='font-bold' variant="body">( {rating})</Text>
                        </View>
                        <View className='flex-row gap-x-1'>

                            <Text className='font-bold text-green-500'>Verified</Text>
                            {/* <View className='bg-green-400  rounded-full p-1'>
                                <CircleCheck className='text-white ' size={18} />
                            </View> */}
                        </View>

                    </View>

                </View>
                {
                    ridersCount &&
                    <View className='flex justify-between gap-x-2'>
                        <View className='flex flex-row items-center gap-x-1.5  pl-1 border-foreground '>
                            <Ionicons name="people-outline" className='text-primary' size={22} color={"#134071"} />
                            <Text className='font-medium '>{ridersCount}</Text>
                        </View>


                    </View>
                }

            </View>


            <View className=' mt-3 '>
                <Text className='font-semibold ' variant={"body"}>
                    Destination
                </Text>



                <View className='overflow-hidden text-ellipsis whitespace-nowrap mt-1 '>

                    <Text variant={"callout"} className='font-medium  opacity-85 truncate'>
                        {destination}
                    </Text>

                </View>
            </View>

            <View className='flex-row  items-center justify-between gap-x-1.5 mt-1.5'>

                <Text variant={"largeTitle"} className='font-semibold text-base' >11 mins</Text>


                <View className='flex-row gap-x-2'>
                    <Text variant={"largeTitle"} className=' font-semibold' >{currency}</Text>
                    <Text variant={"largeTitle"} className='font-semibold ' >{amount}</Text>
                </View>
            </View>


            <View className='flex flex-row justify-between gap-x-1 my-2'>
                <View className='flex flex-row items-center gap-x-1.5 border-foreground '>
                    <Ionicons name="car-sport-outline" className='text-primary' size={18} color={"#134071"} />
                    <Text variant={"callout"} className='font-medium text-sm'>{carType}</Text>
                </View>

            </View>



            <View className='flex flex-row items-center max-w-full gap-x-2'>



                <Button variant={"default"} size="lg" rounded={"base"} onPress={() => handleSelectedOffer(offer)} className=' flex flex-row justify-center items-center font-semibold text-white text-[40px]  flex-1'>
                    <Text variant={"smallTitle"} className='text-white' style={{ color: "white", fontWeight: 700 }}>Join</Text>
                </Button>




            </View>
        </View>

    )
}

export default DriverPriceCard