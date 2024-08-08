import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { selectUserInfo } from '@/redux/slices/user';
import { Sun, MoonStar } from 'lucide-react-native';
import { colorScheme } from 'nativewind';
import React from 'react';
import { View, TextInput, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';
import { Text } from "@/components/ui/text"
import { useColorScheme } from '@/lib/useColorScheme';
import { Button } from "@/components/ui/button"
import { ArrowRight } from "@/lib/icons/icons"
import { Toggle } from '@/components/ui/toggle';
import UpcomingSchedules from '@/components/driver/homeSchedule';

const DashboardScreen = () => {

    const user = useSelector(selectUserInfo)
    const { colorScheme } = useColorScheme()


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
                {/* <Text className="text-green-500 text-sm">↑ 6.5% than last week</Text> */}

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

            <View className=' my-6'>
                <Button variant="outline" size={"lg"} rounded="base" className=" flex-row justify-between items-center border-blue-600" >
                    <Text variant={"mediumTitle"} className='text-primary'>Begin a new trip</Text>
                    <ArrowRight size={24} className="text-primary" />

                    {/* <Toggle /> */}
                </Button>
            </View>

            <View className=" mb-4">
                <Text className="font-bold text-lg">Upcoming Schedules</Text>
                <View className='mt-4'>

                    <UpcomingSchedules />
                </View>
            </View>


        </ScrollView>
    );
};

export default DashboardScreen;