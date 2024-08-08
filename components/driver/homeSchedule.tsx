import React from 'react';
import { View } from 'react-native';
import { FlashList } from "@shopify/flash-list"
import { Text } from "../ui/text"
import { Landmark } from '@/lib/icons/icons';
import { Button } from '../ui/button';

const rides = [
    {
        id: '1',
        destination: 'Mr Biggs',
        city: 'Lekki',
        state: "Lagos",
        country: 'Nigeria',
        time: '10:00 AM'
    },
    {
        id: '2',

        destination: 'Blenco',
        city: 'Etiosa',
        state: "Lagos",
        country: 'Nigeria',
        time: '5:00 PM'
    },
];

const RideItem: React.FC<{ ride: typeof rides[0] }> = ({ ride }) => (
    <Button className='w-full py-2  rounded-md' variant={"ghost"} >
        <View className='flex flex-row items-center justify-start gap-x-3 '>
            <View className='bg-muted dark:bg-transparent bg-gray-100 rounded-md  items-center flex flex-row justify-center'>
                <Landmark size={28} className="text-primary" />
            </View>
            <View className='flex-1'>
                <View className='flex-row justify-between items-center '>
                    <Text variant="subhead" color="primary" className=' tracking-wide text-ellipsis overflow-hidden  font-medium '>
                        {`${ride.destination} ${ride.city}`}
                    </Text>
                    <Text variant={"smallTitle"}>{ride.time}</Text>
                </View>
                <View className=''>
                    <Text variant="body" color="primary" className='text-ellipsis overflow-hidden  '>
                        {`${ride.state}, ${ride.country}`}
                    </Text>
                </View>
            </View>
        </View>
    </Button>
);

const EmptyState = () => (
    <View className="p-4">
        <Text className="text-gray-500">No upcoming rides</Text>
    </View>
);

const UpcomingSchedules = () => {
    return (
        <View className="flex-1 ">
            {rides.length > 0 ? (
                <FlashList
                    data={rides}
                    estimatedItemSize={2}
                    renderItem={({ item }) => <RideItem ride={item} />}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <EmptyState />
            )}
        </View>
    );
};

export default UpcomingSchedules
