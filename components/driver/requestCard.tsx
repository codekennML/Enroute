import React, { useState, useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import { Star, MapPin, DollarSign, Car, Clock } from 'lucide-react-native';
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Input } from '../ui/input';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const IncomingRideRequestCard = ({ request, onAccept, onDecline }) => {

    const [timeLeft, setTimeLeft] = useState(15);
    // const [fare, setFare] = useState(request)

    const { control, watch, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: "onChange",
        defaultValues: {
            "budget": request.estimatedFare
        }
    })
    const fareRef = useRef(request.estimatedFare)


    const watchedValues = watch()


    const modifyFare = (op: string) => {

        if (op === "add") {
            setValue("budget", `${parseInt(watchedValues.budget) + 100} `)
        }
        if (op === "sub") {
            setValue("budget", `${parseInt(watchedValues.budget) - 100}`)
        }
    }

    const isValidPrice = !(parseInt(watchedValues.budget) - 100 < fareRef?.current) && watchedValues.budget >= (fareRef?.current)

    const handleBlur = () => {
        if (!isValidPrice) {
            setValue("budget", fareRef?.current)
        }
    }

    console.log(isValidPrice, watchedValues.budget)


    // useEffect(() => {
    //     setFare(request.estimatedFare)
    // }, [])


    console.log(request)

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setTimeLeft((prevTime) => {
    //             if (prevTime <= 1) {
    //                 clearInterval(timer);
    //                 onDecline();
    //                 return 0;
    //             }
    //             return prevTime - 1;
    //         });
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, [onDecline]);

    return (
        <View className="bg-white rounded-xl shadow-lg p-4 m-2">
            <View className="flex-row justify-between items-center mb-2">
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
                <View>

                    <View className="bg-primary rounded-full p-2">
                        <Text className="text-white font-bold" style={{ color: "#fff" }}>{timeLeft}s</Text>
                    </View>
                </View>
            </View>


            <View className="flex-row-reverse justify-between items-center mb-4">
                <View className="flex-row items-center">
                    <Text className="font-semibold text-[#134071]">3 seats</Text>
                </View>

                <View className="flex-row items-center">
                    <Text className="font-semibold text-[#134071]">No luggage</Text>
                </View>

                <View className="flex-row items-center">
                    <Text className="ml-1 text-[#134071] font-semibold">{request.estimatedDuration} mins </Text>
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

            <View className="flex-row-reverse justify-between items-center mb-4">
                {/* <View className="flex-row items-center">
                    <Text className="text-lg font-bold text-[#134071]">{}</Text>
                </View> */}

                {/* <View className="flex-row items-center">
                    <Text className="ml-1 text-[#134071]">{request.estimatedDuration} mins away</Text>
                </View> */}
            </View>

            <View className='flex-row items-center justify-between gap-x-4 mb-3'>
                <View>
                    <Button onPress={() => modifyFare("sub")} variant={"ghost"} disabled={!isValidPrice} className={`justify-center items-center px-2 h-9 bg-accent disabled:text-primary/40`} rounded="base" size="sm">
                        <Text className='font-semibold' variant={"smallTitle"}>- 100</Text>
                    </Button>
                </View>
                <View className='flex-1'>
                    <Controller
                        name="budget"
                        control={control}
                        render={({ field: { onChange, value } }) =>

                            <Input className={`h-10 bg-accent text-center font-bold text-primary `}
                                onBlur={handleBlur}
                                inputMode='numeric'
                                value={value} onChangeText={onChange} />
                        } />

                </View>
                <View>
                    <Button onPress={() => modifyFare("add")} variant={"ghost"} className={`justify-center items-center px-2 h-9 bg-accent`} rounded="base" size="sm">
                        <Text className='font-semibold' variant={"smallTitle"}>+ 100</Text>
                    </Button>
                </View>
            </View>

            <View className="flex-row justify-between gap-x-4 my-2">
                <Button
                    onPress={onDecline}
                    // size={"sm"}
                    className="bg-accent rounded-lg py-3 px-6 flex-1 items-center justify-center"
                >
                    <Text variant={"body"} color={"tertiary"} className="text-destructive font-semibold">Decline</Text>
                </Button>
                <Button
                    // onPress={() => modifyFare("add")}
                    onPress={onAccept}
                    // size={"sm"}
                    className=" rounded-lg py-3 px-6 flex-1 items-center justify-center "
                >
                    <Text variant={"body"} color={"tertiary"} className="text-white font-semibold" style={{ color: "#fff" }}>Send rate</Text>
                </Button>
            </View>
        </View>
    );
};

export default IncomingRideRequestCard;