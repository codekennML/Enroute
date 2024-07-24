import React from 'react';
import { View, Image } from 'react-native';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button"

const RideSummary = () => {
    return (
        <View className="bg-white p-4 rounded-lg">
            <View className='flex-row justify-between items-center'>
                <View className=" mb-4">
                    <Text className='text-[28px] font-header'>Ride</Text>
                    <Text className='text-[24px] font-header'>Summary</Text>
                </View>
                <View>

                    <Text className="text-green-500 text-sm">Wed, July 31</Text>
                    <Text className="text-green-500 text-sm font-semibold">Completed</Text>
                </View>
            </View>

            <View className='bg-accent h-[180px] w-full rounded-base mb-4'>

            </View>

            <View className="mb-4">
                <View className="flex-row items-center mb-2">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    <Text className="flex-1 text-sm">153, Adebowale house, Ikorodu-Ososun Rd, Lagos</Text>
                </View>
                <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    <Text className="flex-1 text-sm">Murtala Muhammad local airport</Text>
                </View>
            </View>

            <View><Text variant={"smallTitle"} className='font-bold'> Trip details</Text></View>

            <View className=" py-2">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500 text-sm">Driver</Text>
                    <Text className="text-sm">Anita Vernon</Text>
                </View>
                <View className="flex-row justify-between mb-2 ">
                    <Text className="text-gray-500 text-sm">Trip Identifier</Text>
                    <Text className="text-sm">#233489fnuew03</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500 text-sm">Price</Text>
                    <Text className="text-sm">NGN 1200</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500 text-sm">Discount</Text>
                    <Text className="text-sm">NGN 100</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500 text-sm font-bold">Paid with</Text>
                    <Text className="text-sm font-bold">Cash</Text>
                </View>
            </View>



            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-gray-500 text-sm">Passengers</Text>
                <Image
                    source={{ uri: 'https://example.com/passenger-avatar.png' }}
                    className="w-6 h-6 rounded-full"
                />
            </View>

            <Button
                variant="default"
                rounded="base"
                className="mt-4 justify-center  items-center flex-row p-3"
            >
                <Text variant={"subhead"} className='text-center font-semibold'>Rebook</Text>
            </Button>
        </View>
    );
};

export default RideSummary;