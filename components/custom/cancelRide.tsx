import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import PhoneInput from 'react-native-phone-number-input';
import { Separator } from "@/components/ui/seperator"
import { MessageSquare } from "@/lib/icons/icons"
import { router } from 'expo-router';

interface CancelRideSheetProps {
    closeSheet: (isOpen: boolean) => void
}

const CancelRide: React.FC<CancelRideSheetProps> = ({
    closeSheet
}) => {

    // const [sendMethod, setSendMethod] = useState('sms');

    const [channel, setChannel] = React.useState('SMS');

    const [value, setValue] = useState('');

    return (
        <View className="  p-4  flex flex-col justify-between bg-white h-full">
            <View className='flex-1 bg-white  mt-2'>
                <Text variant="heading" className="text-foreground mb-2">What went wrong</Text>
                <Text variant="body" className="text-foreground mb-6 font-medium">
                    Select a reason for cancellation. This will help us improve our platform for your next use
                </Text>

                <View className='mt-4 pr-2'>
                    <RadioGroup value={value} onValueChange={setValue} className='gap-3'>
                        <View className='flex flex-row justify-between '>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-1 font-medium">Accidental request </Text>
                            </View>
                            <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />
                        </View>
                        <Separator className="bg-slate-200" />
                        <View className='flex flex-row justify-between'>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-2 font-medium">Wait time is too long</Text>
                            </View>
                            <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />

                        </View>
                        <Separator className="bg-slate-200" />
                        <View className='flex flex-row justify-between '>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-1 font-medium">Unidentified persons in vehicle </Text>
                            </View>
                            <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />
                        </View>
                        <Separator className="bg-slate-200" />
                        <View className='flex flex-row justify-between '>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-1 font-medium">Driver requested to go offline</Text>
                            </View>
                            <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />
                        </View>
                        <Separator className="bg-slate-200" />
                        <View className='flex flex-row justify-between '>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-1 font-medium">Driver requested for more money</Text>
                            </View>
                            <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />
                        </View>
                        <Separator className="bg-slate-200" />
                        <View className='flex flex-row justify-between '>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-1 font-medium">Price is too high</Text>
                            </View>
                            <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />
                        </View>
                        <Separator className="bg-slate-200" />
                        <View className='flex flex-row justify-between '>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-1 font-medium">Driver not going my way</Text>
                            </View>
                            <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />
                        </View>
                        <Separator className="bg-slate-200" />
                        <View className='flex flex-row justify-between '>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-1 font-medium">Other</Text>
                            </View>
                            <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />
                        </View>

                    </RadioGroup>
                </View>
            </View>
            <View className='pb-12'>


                <Button variant="destructive" size={"lg"} rounded="base" className=" flex justify-center items-center text-white" onPress={() => {
                    closeSheet(false)
                    console.log("Here")
                    // TODO Dispatch the action to set the cancellation reason
                    router.push({
                        pathname: "/(tabs)/",
                        params: {
                            coole: "string"
                        }
                    })
                }}>
                    <Text variant={"body"} className='text-white font-semibold'> Cancel</Text>
                </Button>
            </View>
        </View>
    );
};

export default CancelRide