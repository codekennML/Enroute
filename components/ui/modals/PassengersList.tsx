import React from 'react';
import { View, Image } from 'react-native';

import { Text } from '@/components/ui/text';
import { Star } from '@/lib/icons/icons';
import { FlashList } from "@shopify/flash-list";
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/redux/slices/user';

interface Passenger {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    pickupPoint: string;
    destination: string;
    joinedDate: string;
    boardedAt: Date;
}

interface PassengerListProps {
    passengers: Passenger[];
}

const PassengerItem: React.FC<{ passenger: Passenger }> = ({ passenger }) => {

    const userInfo = useSelector(selectUserInfo)

    const { role } = userInfo


    return (
        <View className="flex-row bg-white rounded-lg p-4 m-2 mb-3 border border-slate-200 ">


            <View className="flex-1">
                <View className="flex-row justify-between items-center mb-2">
                    <View className='flex-row items-center gap-x-2'>
                        <Avatar alt="user avatar" className='h-12 w-12' >
                            <AvatarImage source={{ uri: passenger.avatar }} />
                            <AvatarFallback>
                                <Text>User Avatar</Text>
                            </AvatarFallback>
                        </Avatar>
                        <Text variant={'subhead'} className="font-semibold">{passenger.name}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <Text className="ml-1 text-base font-bold">{passenger.rating.toFixed(1)}</Text>
                    </View>
                </View>
                <View className='flex flex-col gap-y-1 '>
                    <Text variant={"body"} className='font-semibold'>Pick-up location</Text>
                    <Text variant="callout" className='text-foreground font-medium'>
                        {passenger.pickupPoint}
                    </Text>
                </View>


                {/* <Text variant={"body"} className="font-semibold mt-1">Destination</Text>
                <Text variant={"callout"} className="mb-1">{passenger.destination}</Text> */}
                <View className="flex-row  justify-between mt-2  ">
                    <View>
                        <Text variant={"callout"} className="">Joined </Text>
                        <Text variant={"body"} className='font-semibold'>
                            {passenger.joinedDate}
                        </Text>

                    </View>

                    <View>
                        <Text variant={"callout"} className="">Boarded </Text>
                        <Text variant={"body"} className='font-semibold'>
                            {/* {passenger.totalTrips} */}
                            9:15 AM
                        </Text>

                    </View>


                </View>
            </View>
        </View>
    );
};

const PassengerList: React.FC<PassengerListProps> = ({ passengers }) => {
    console.log(passengers?.length, "Passenger")

    return (
        <FlashList
            data={passengers}
            renderItem={({ item }) => <PassengerItem passenger={item} />}
            keyExtractor={(item) => item.id}
            contentContainerClassName="p-4"
            estimatedItemSize={20}
        />
    );
};

export default PassengerList;