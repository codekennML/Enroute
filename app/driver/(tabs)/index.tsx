import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { selectUserInfo } from '@/redux/slices/user';

import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';
import { Text } from "@/components/ui/text"
import { useColorScheme } from '@/lib/useColorScheme';
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarRange, Route } from "@/lib/icons/icons"
import { Toggle } from '@/components/ui/toggle';
import UpcomingSchedules from '@/components/driver/homeSchedule';
import { AppBottomSheet, useAppBottomSheetRef } from '@/components/ui/BottomSheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { X } from "@/lib/icons/icons"
import { router } from 'expo-router';
import { Sheet, useSheetRef } from '@/components/ui/sheets';
import ScheduleFilters from '@/components/driver/scheduleFilters';
const DashboardScreen = () => {

    const user = useSelector(selectUserInfo)
    const { colorScheme } = useColorScheme()
    const createTripSheetRef = useSheetRef()
    const tripSheetRef = useAppBottomSheetRef()

    const handleSelectTripSheet = (isOpen: boolean) => {

        if (isOpen) {
            tripSheetRef?.current?.expand()
        } else {
            tripSheetRef?.current?.close()
        }


    }




    const screenWidth = Dimensions.get("window").width;

    const barData = [
        { value: 40, label: '16' },
        { value: 60, label: '17' },
        { value: 40, label: '18' },
        { value: 100, label: '19' },
        { value: 60, label: '20' },
        { value: 40, label: '21' },
        { value: 20, label: '22' },
    ];



    return (
        <ScrollView className="bg-white/90 p-4">
            {/* User profile section */}
            {/* <View className='flex flex-row justify-between items-center   mt-6'>
      
                <View className='flex flex-row items-center gap-x-2'>
                    <View>
                        <Avatar alt="user avatar" className='h-14 w-14' >
                            <AvatarImage source={{ uri: user.avatar }} />
                            <AvatarFallback>
                                <Text>User Avatar</Text>
                            </AvatarFallback>
                        </Avatar>

                    </View>
                    <View>
                        <Text variant="subhead" className='font-header'>Good morning ! </Text>
                        <View className='flex items-center flex-row gap-x-10'>

                            <Text variant="body" className="font-medium" >{`${user?.firstName} ${user?.lastName}`}</Text>
                        </View>
                    </View>
                </View>
        
                <View className='flex flex-row gap-x-2 '>

         
                </View>

            </View> */}



            <Text variant={"heading"} className='my-6'>Earnings</Text>
            {/* Income summary box */}
            <View className="bg-blue-100/20 rounded-lg p-4">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-foreground font-semibold">Total Income</Text>
                    <View className="flex-row items-center">
                        <Text className="text-foregrond mr-2">Total trips</Text>
                        <Text className="font-bold">45</Text>
                    </View>
                </View>
                <Text className="text-3xl font-bold mb-2">NGN 420,000</Text>

            </View>


            {/* Income trend chart */}
            <View>
                <View className="flex-row justify-between my-4">
                    <Text className="font-bold text-lg mb-5">Income Trend</Text>
                    {/* <Text className="text-blue-500">Last 7 days</Text> */}
                </View>
                <BarChart
                    data={barData}
                    // width={screenWidth - 202}
                    height={150}
                    barWidth={20}
                    spacing={20}
                    barBorderRadius={4}
                    frontColor="#007AFF"
                    yAxisThickness={0}
                    xAxisThickness={0}
                    hideRules
                    xAxisLabelTextStyle={{ color: '#134071', fontWeight: 500, textAlign: 'center' }}
                    yAxisTextStyle={{ color: '#134071', fontWeight: 600 }}
                    noOfSections={3}
                    maxValue={120}
                    yAxisLabelTexts={['0', '40k', '80k', '120k']}
                />
            </View>

            {/* Search input
            <View className="bg-gray-100 rounded-lg flex-row items-center p-3 mb-6">
                <Text className="text-gray-400 mr-2">🔍</Text>
                <TextInput
                    placeholder="Where are you going today ?"
                    className="flex-1"
                />
                <Text className="text-gray-400 ml-2">👤</Text>
            </View> */}

            {/* Recent location card */}
            {/* <View className="bg-blue-50 rounded-lg p-4 mb-6">
                <View className="flex-row items-center mb-2">
                    <Text className="text-blue-500 mr-2"></Text>
                    <Text className="font-bold">Mile 12 Bus station</Text>
                </View>
                <Text className="text-gray-500 ml-6">152, Adebowale House, Ikorodu-Ososun road, Lagos</Text>
                <Text className="text-blue-500 text-right text-sm">4 miles</Text>
            </View> */}

            <View className=' my-6 flex-row items-center gap-x-2'>
                <Button onPress={() => handleSelectTripSheet(true)} variant="ghost" size={"lg"} rounded="base" className=" flex-row justify-between items-center  bg-accent pl-0 flex-1" >
                    <Text variant={"smallTitle"} className='text-primary pl-3'>Begin a new trip</Text>
                    {/* <ArrowRight size={24} className="text-primary" /> */}


                </Button>
                <Button onPress={() => router.push({ pathname: "live/online" })} variant="ghost" size={"lg"} rounded="base" className=" flex-row justify-between items-center  bg-accent pl-0 flex-1" >
                    <Text variant={"smallTitle"} className='text-primary pl-3'>Schedule </Text>
                    {/* <ArrowRight size={24} className="text-primary" /> */}


                </Button>
            </View>

            <View className=" mb-4">
                <Text variant={"subhead"} className="font-semibold">Upcoming Schedules</Text>
                <View className='mt-4'>

                    <UpcomingSchedules />
                </View>
            </View>

            <AppBottomSheet ref={tripSheetRef} enableDynamicSizing enableContentPanningGesture={false} enablePanDownToClose={false} pressBehaviour='none'>
                <BottomSheetScrollView>
                    <View className='flex-row items-center my-2'>
                        <Button variant={"ghost"} onPress={() => handleSelectTripSheet(false)}>

                            <X className='text-foreground' size={28} />
                        </Button>
                        <Text className='flex-1 text-center' variant={"smallTitle"} > Choose trip type</Text>
                    </View>

                    <Button onPress={() => { router.push("/activity") }} variant={"ghost"} className='flex-row items-center gap-x-2 my-4'>
                        <View className='w-12 h-12 bg-blue-50 rounded-md flex-row items-center justify-center'>
                            <CalendarRange className="text-primary" size={32} />
                        </View>
                        <View>
                            <Text variant={"subhead"} className='font-semibold'>Scheduled trip</Text>
                            <Text>Start one of your previously scheduled trips</Text>

                        </View>
                    </Button>

                    <Button onPress={() => createTripSheetRef?.current?.present()} variant={"ghost"} className='flex-row items-center gap-x-2 my-4'>
                        <View className='w-12 h-12 bg-blue-50 rounded-md flex-row items-center justify-center'>
                            <Route className="text-primary" size={32} />
                        </View>
                        <View>
                            <Text variant={"subhead"} className='font-semibold'> New trip</Text>
                            <Text>Begin a new live ride to your destination</Text>
                        </View>
                    </Button>
                </BottomSheetScrollView>
            </AppBottomSheet>



            {/* create trip Sheet */}
            <Sheet ref={createTripSheetRef}
                snapPoints={["100%"]}
                // enableDismissOnClose={false}
                // enableDynamicSizing={true}
                enableContentPanningGesture={false}
                enablePanDownToClose={false}
                enableHandlePanningGesture={false}
            >
                <View className="pb-4 w-full">
                    <View className='flex flex-row items-center px-4 mt-4 '>
                        <Button variant={"ghost"} className='flex-row items-center justify-center' onPress={() => createTripSheetRef.current?.close()}>

                            <X size={24} className='text-foreground ml-auto' />
                        </Button>
                        <Text className="text-foreground font-semibold flex-1 text-center" variant="mediumTitle" >Filters </Text>
                    </View>
                    <View className='mt-3 gap-y-4 px-4'>
                        <ScheduleFilters />
                    </View>
                </View>
            </Sheet>



        </ScrollView>
    );
};

export default DashboardScreen;