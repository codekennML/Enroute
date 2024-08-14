import React, { useState, useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import { Star, MapPin, DollarSign, Car, Clock } from 'lucide-react-native';
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Input } from '../ui/input';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const NewFinalizedRideCard = ({ request }) => {

    return (
        <View className="bg-white rounded-xl shadow-lg p-3 m-1">
            <View
                className='flex-row items-center justify-betweeen   '
            >
                <Text className='font-semibold my-3 flex-1 text-primary' variant={"smallTitle"} >Pickup confirmed</Text>
                {/* <View className="flex-row items-center"> */}
                <Text variant={"mediumTitle"} className="ml-1 text-primary font-semibold" style={{ color: "#007AFF" }}>{request.estimatedDuration} mins </Text>
                {/* </View> */}
            </View>

            <View className="flex-row justify-start items-center my-1">
                <View className="flex-row items-center mb-4">
                    <Image
                        source={{ uri: request.passengerPhoto }}
                        className="w-12 h-12 rounded-full mr-3"
                    />
                    <View>
                        <Text variant="body" className=" font-semibold ">{request.passengerName}</Text>
                        <View className="flex-row items-center">
                            <Star size={14} color="#FFD700" />
                            <Text variant={"subhead"} className="ml-1  font-semibold">{request.passengerRating}</Text>
                        </View>
                    </View>
                </View>

            </View>


            <View className="mb-1">
                <View className="flex-row items-center mb-2">
                    <View className='h-3 w-3 border-2 border-primary rounded-full'></View>
                    <Text className="ml-2 font-medium flex-1">{request.pickupLocation}</Text>
                </View>
                <View className="flex-row items-center">
                    <View className='h-3 w-3 border-2 border-destructive rounded-full'></View>
                    <Text className="ml-2 flex-1  text-primary font-medium">{request.dropoffLocation}</Text>
                </View>
            </View>

            {/* <View className="flex-row-reverse justify-between items-center my-2.5 border-y py-2 border-slate-200">
                <View className="flex-row items-center">
                    <Text className="font-semibold text-[#134071]">3 seats</Text>
                </View>

                <View className="flex-row items-center">
                    <Text className="font-semibold text-[#134071]">No luggage</Text>
                </View>




            </View> */}



            <View className="flex-row justify-between gap-x-4 mt-4 mb-1">
                <Button
                    // onPress={onDecline}
                    // size={"sm"}
                    className="bg-accent rounded-lg h-10 px-6 flex-1 items-center justify-center"
                >
                    <Text variant={"body"} color={"tertiary"} className="text-destructive font-semibold">Close</Text>
                </Button>
                <Button

                    // onPress={onAccept}

                    className=" rounded-lg h-10  px-6 flex-1 items-center justify-center "
                >
                    <Text variant={"body"} color={"tertiary"} className="text-white font-semibold" style={{ color: "#fff" }}>View</Text>
                </Button>
            </View>
        </View>
    );
};

export default NewFinalizedRideCard