import React, { useState, useCallback, useEffect } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text'
import { CalendarClock, Clock, MapPin } from '@/lib/icons/icons';
import { router } from 'expo-router';
import { Skeleton } from '@/components/ui/skeleton';

interface Ride {
    id: string;
    from: string;
    to: string;
    date: string;
}

type TabType = 'upcoming' | 'completed';


const renderCardSkeletons = (count: number) => {
    return Array(count).fill(6).map((_, index) => (
        <CardLoader key={`skeleton-${index}`} />
    ))
}


const CardLoader = () => {

    return (
        <View className='p-4 shadow-md'>
            <View>
                <Skeleton className=" h-12 rounded" />
            </View>
            <View className='my-3'>
                <Skeleton className="h-5 my-2 rounded" />
                <Skeleton className="h-5 rounded" />
            </View>
            <View className='flex flex-row justify-between items-center '>
                <View className='w-1/2'>
                    <Skeleton className="w-full h-5 rounded-md" />
                    <Skeleton className="w-4/5 h-5  mt-3" />
                </View>
                <View>
                    <Skeleton className="w-12 h-10 " />
                </View>
            </View>
        </View>
    )
}

const RidesList: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('upcoming');
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        setTimeout(() => {

            //   setSchedules(dummySchedules)
            setIsLoading(false);
        }, 3000)

    }, [])

    const upcomingRides: Ride[] = [
        { id: '1', from: 'Home', to: 'Office', date: '2024-07-24 09:00 AM' },
        { id: '2', from: 'Office', to: 'Gym', date: '2024-07-24 06:00 PM' },
        { id: '3', from: 'Gym', to: 'Home', date: '2024-07-24 08:30 PM' },
        { id: '4', from: 'Home', to: 'Airport', date: '2024-07-25 10:00 AM' },
        { id: '5', from: 'Airport', to: 'Hotel', date: '2024-07-25 02:00 PM' },
        { id: '6', from: 'Hotel', to: 'Conference Center', date: '2024-07-26 08:00 AM' },
        { id: '7', from: 'Conference Center', to: 'Restaurant', date: '2024-07-26 07:00 PM' },
        { id: '8', from: 'Restaurant', to: 'Hotel', date: '2024-07-26 10:00 PM' },
        { id: '9', from: 'Hotel', to: 'Shopping Mall', date: '2024-07-27 11:00 AM' },
        { id: '10', from: 'Shopping Mall', to: 'Airport', date: '2024-07-27 04:00 PM' },
    ];

    const completedRides: Ride[] = [
        // { id: '11', from: 'Airport', to: 'Hotel', date: '2024-07-20 02:00 PM' },
        // { id: '12', from: 'Restaurant', to: 'Home', date: '2024-07-22 09:30 PM' },
        // { id: '13', from: 'Home', to: 'Gym', date: '2024-07-23 07:00 AM' },
        // { id: '14', from: 'Gym', to: 'Office', date: '2024-07-23 09:00 AM' },
        // { id: '15', from: 'Office', to: 'Supermarket', date: '2024-07-23 06:30 PM' },
        // { id: '16', from: 'Supermarket', to: 'Home', date: '2024-07-23 07:30 PM' },
        // { id: '17', from: 'Home', to: 'Dentist', date: '2024-07-24 02:00 PM' },
        // { id: '18', from: 'Dentist', to: 'Pharmacy', date: '2024-07-24 03:30 PM' },
        // { id: '19', from: 'Pharmacy', to: 'Home', date: '2024-07-24 04:00 PM' },
        // { id: '20', from: 'Home', to: 'Movie Theater', date: '2024-07-24 07:00 PM' },
    ];

    const renderRideItem: ListRenderItem<Ride> = useCallback(({ item }) => (
        <Button onPress={() => router.push({
            pathname: "/rideSummary"
        })} variant={"ghost"} className="bg-white rounded-lg shadow-md p-4 mb-4 ">

            <View className="mb-3">

                <View className='flex-row gap-x-2 items-center'>
                    <View className='h-2 w-2 rounded-full bg-destructive'></View>
                    <Text variant="body" className="font-bold">
                        1234 Bedford Avenue, Brooklyn, NY,11216
                    </Text>

                </View>
            </View>
            <View className="space-y-1 mb-6">
                <View className="flex-row items-center gap-x-2">
                    <MapPin size={18} className="text-foreground/60" />
                    <Text variant="body" className="text-foreground">1234 Bedford Avenue, Brooklyn, NY,11216</Text>
                </View>
                <View className='flex-row justify-between'>
                    <View>

                        <View className="flex-row items-center gap-x-2">
                            <CalendarClock size={18} className="text-foreground/60" />
                            <Text variant="body" className="text-foreground">Wednesday, 31 Jul</Text>
                        </View>
                        <View className="flex-row items-center gap-x-2">
                            <Clock size={18} className="text-foreground/60" />
                            <Text variant="body" className="text-gray-600">2:30 PM</Text>
                        </View>
                    </View>
                    <View className='flex-col items-end'>
                        <Image source={{ uri: "https://images.airtasker.com/v7/https://seo-assets.airtasker.com/en_AU/1670924334504_avatar-placeholder-240x240.png?w=80&h=80" }} resizeMode='cover' className='rounded-full h-12 w-12' />
                    </View>
                </View>
            </View>
            <View className='flex flex-row justify-between pt-2' >
                <Text variant="body" className="text-green-500 font-bold">
                    Scheduled
                </Text>

                <Text variant={"body"} className='text-primary font-medium'> Ride  </Text>

                <Text variant="subhead" className="font-bold ">
                    $2500
                </Text>

            </View>
        </Button>


    ), []);







    const renderEmptyList = useCallback(() => (
        <View className="flex-1 justify-center items-center">
            <Image
                source={{ uri: 'https://example.com/no-rides-image.png' }}
                style={{ width: 200, height: 200 }}
                className="mb-4"
            />
            <Text className="text-lg text-gray-600 text-center">No rides available</Text>
        </View>
    ), []);

    return (
        <SafeAreaView className="flex-1 ">
            <View className='px-4 pt-4'>
                <Text className='text-[30px] font-semibold font-header text-foreground'>Activity</Text>
            </View>
            <View className="flex-row bg-white border-b border-gray-200">
                <Button
                    variant={"ghost"}
                    className={`flex-1 py-4 ${activeTab === 'upcoming' ? 'border-b-2 border-blue-500' : ''}`}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text className={`text-center font-semibold ${activeTab === 'upcoming' ? 'text-primary' : 'text-foreground'}`}>
                        Upcoming
                    </Text>
                </Button>
                <Button
                    variant={"ghost"}
                    className={`flex-1 py-4 ${activeTab === 'completed' ? 'border-b-2 border-blue-500' : ''}`}
                    onPress={() => setActiveTab('completed')}
                >
                    <Text className={`text-center font-semibold ${activeTab === 'completed' ? 'text-primary' : 'text-foreground'}`}>
                        Completed
                    </Text>
                </Button>
            </View>
            <View className='h-full '>
                {
                    isLoading ? (
                        renderCardSkeletons(6)
                    ) : (
                        <FlashList<Ride>
                            data={activeTab === 'upcoming' ? upcomingRides : completedRides}
                            renderItem={renderRideItem}
                            estimatedItemSize={100}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ padding: 16 }}
                            ListEmptyComponent={renderEmptyList}
                        />)
                }
            </View>
        </SafeAreaView>
    );
};

export default RidesList;