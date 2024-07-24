import { View, } from 'react-native';
import React, { useState, useEffect, forwardRef, SetStateAction } from 'react';
import { Sheet, useSheetRef } from '../sheets';
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Button } from '../button';
import { Checkbox } from "@/components/ui/checkbox"
import { Text } from "../text"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { X, UserCog, Wallet, Luggage, PenLine, MessageSquare, Minus, Plus, UserPlus } from '@/lib/icons/icons';
import AddRider from './addRider';


interface TripInfoProps {

    closeSheet: () => void
    snapPoints: string[];
    type: string
}

// ForwardRef is typed to BottomSheetModal
const TripData = forwardRef<BottomSheetModal, TripInfoProps>(
    ({ snapPoints, closeSheet, type }, ref) => {

        const [checked, setChecked] = useState(false);
        const [sheetToOpen, setSheetToOpen] = useState<string>("")
        const addRiderSheetRef = useSheetRef()
        const sendDetailSheetRef = useSheetRef()
        const commentSheetRef = useSheetRef()
        const budgetSheetRef = useSheetRef()

        useEffect(() => {
            console.log("open", sheetToOpen)
            if (sheetToOpen) {

                switch (sheetToOpen) {
                    case "addRider":
                        addRiderSheetRef.current?.present();
                        break;
                    case "sendDetail":
                        sendDetailSheetRef.current?.present();
                        break;
                    case "comment":
                        commentSheetRef.current?.present();
                        break;
                    case "budget":
                        budgetSheetRef.current?.present();
                        break;
                    default:
                        break;
                }

            }

            if (!sheetToOpen) {
                addRiderSheetRef.current?.close();

            }
        }, [sheetToOpen])


        return (
            <>
                <Sheet ref={ref} snapPoints={snapPoints}>
                    <View className='h-full'>

                        <View className='flex flex-row justify-between items-center px-4'>

                            <Text variant={"mediumTitle"} className='flex-1 text-center'>{type === "ride" ? "Trip" : "Package"} details</Text>
                            <Button variant="ghost" onPress={closeSheet}>
                                <X size={24} className='text-slate-600/80' />
                            </Button>
                        </View>

                        <View className='flex flex-col h-full '>

                            {/*Add  Rider  Card */}
                            <View className='px-4 flex-1 '>

                                <Card className='mt-8 shadow-none border w-full rounded-md bg-transparent'>
                                    <CardContent className='max-w-full flex flex-row justify-between items-center '>

                                        <View className='flex flex-row items-center justify-center gap-x-3'>
                                            <View className='rounded'>
                                                <UserCog size="30" className='text-blue-900/60' />
                                            </View>
                                            <View>
                                                <CardHeader className='p-0 flex flex-row space-y-0'>
                                                    <View className=' '>

                                                        <CardTitle
                                                            className=' pt-2 flex flex-row justify-between' >

                                                            <Text variant="body" className=''>{type === "ride" ? "Add rider" : "Add recipient"}</Text>


                                                        </CardTitle>

                                                    </View>
                                                </CardHeader>

                                                <CardDescription>
                                                    {/* Here we go */}

                                                </CardDescription>

                                            </View>
                                        </View>
                                        <View className='  rounded-md'>
                                            <Button variant={"ghost"} onPress={() => setSheetToOpen("addRider")}>

                                                <UserPlus size={24} className='text-blue-800/80' />
                                            </Button>

                                        </View>

                                    </CardContent>
                                </Card>
                                {/* Luggage Card */}
                                {
                                    type === "ride" &&
                                    <Card className='mt-4 shadow-none border w-full rounded-md bg-transparent'>
                                        <CardContent className='max-w-full flex flex-row justify-between items-center '>

                                            <View className='flex flex-row items-center justify-center gap-x-3'>
                                                <View className='rounded'>
                                                    <Luggage size="30" className='text-blue-900/60' />
                                                </View>
                                                <View>
                                                    <CardHeader className='p-0 flex flex-row space-y-0'>
                                                        <View className=' '>

                                                            <CardTitle
                                                                className=' pt-2 flex flex-row justify-between' >

                                                                <Text variant="body" className=''>Do you have luggage ?</Text>


                                                            </CardTitle>

                                                        </View>
                                                    </CardHeader>

                                                    <CardDescription>
                                                        {/* Here we go */}

                                                    </CardDescription>

                                                </View>
                                            </View>
                                            <View>
                                                <Checkbox checked={checked} onCheckedChange={setChecked} />
                                            </View>

                                        </CardContent>
                                    </Card>
                                }




                                {/* Budget Card */}


                                {
                                    type === "package" && <Card className='mt-4 shadow-none border w-full rounded-md bg-transparent'>
                                        <CardContent className='max-w-full flex flex-row justify-between items-center '>

                                            <View className='flex flex-row items-center justify-center gap-x-3'>
                                                <View className='rounded'>
                                                    <Luggage size="30" className='text-blue-900/60' />
                                                </View>
                                                <View>
                                                    <CardHeader className='p-0 flex flex-row space-y-0'>
                                                        <View className=' '>

                                                            <CardTitle
                                                                className=' pt-2 flex flex-row justify-between' >

                                                                <Text variant="body" className=''>What are you sending ?</Text>


                                                            </CardTitle>

                                                        </View>
                                                    </CardHeader>

                                                    <CardDescription>
                                                        {/* Here we go */}

                                                    </CardDescription>

                                                </View>
                                            </View>
                                            <View>
                                                <PenLine size={18} className='text-blue-800/80' />
                                            </View>

                                        </CardContent>
                                    </Card>
                                }

                                {
                                    type === "package" && <Card className='mt-4 shadow-none border w-full rounded-md bg-transparent'>
                                        <CardContent className='max-w-full flex flex-row justify-between items-center '>

                                            <View className='flex flex-row items-center justify-center gap-x-3'>
                                                <View className='rounded'>
                                                    <MessageSquare size="30" className='text-blue-900/60' />
                                                </View>
                                                <View>
                                                    <CardHeader className='p-0 flex flex-row space-y-0'>
                                                        <View className=' '>

                                                            <CardTitle
                                                                className=' pt-2 flex flex-row justify-between' >

                                                                <Text variant="body" className=''>Comments or instructions ?</Text>


                                                            </CardTitle>

                                                        </View>
                                                    </CardHeader>

                                                    <CardDescription>
                                                        {/* Here we go */}

                                                    </CardDescription>

                                                </View>
                                            </View>
                                            <View className='flex flex-row items-center'>
                                                {/* <Text variant={"callout"} className='text-blue-600'>Edit</Text> */}
                                                <PenLine size={18} className='text-blue-800/80' />
                                            </View>

                                        </CardContent>
                                    </Card>

                                }

                                <Card className='mt-4 shadow-none border w-full rounded-md bg-transparent'>
                                    <CardContent className='max-w-full flex flex-row justify-between items-center '>

                                        <View className='flex flex-row items-center justify-center gap-x-3'>
                                            <View className='rounded'>
                                                <Wallet size="30" className='text-blue-900/60' />
                                            </View>
                                            <View>
                                                <CardHeader className='p-0 flex flex-row space-y-0'>
                                                    <View className=' '>

                                                        <CardTitle
                                                            className=' pt-2 flex flex-row justify-between' >

                                                            <Text variant="body" className=''>Suggest a budget ?</Text>


                                                        </CardTitle>

                                                    </View>
                                                </CardHeader>

                                                <CardDescription>
                                                    {/* Here we go */}

                                                </CardDescription>

                                            </View>
                                        </View>

                                        {/* Budget amount */}
                                        {/* <View className="flex flex-row items-center gap-x-3">
                                        <Button variant={"default"} rounded="base" className='h-8 w-8 flex justify-center items-center'>
                                            <Minus size={14} className='text-white' />
                                        </Button>
                                        <Text variant={"body"} className='text-blue-900/80 font-semibold  text-white'>5,000</Text>
                                        <Button variant={"default"} rounded="base" className='h-8 w-8 justify-center items-center'>
                                            <Plus size={14} className='text-white' />
                                        </Button>
                                    </View> */}
                                        <View className='flex flex-row items-center'>
                                            {/* <Text variant={"callout"} className='text-blue-600'>Edit</Text> */}
                                            <PenLine size={18} className='text-blue-800/80' />
                                        </View>

                                    </CardContent>
                                </Card>



                                <View className='flex flex-row items-center gap-x-2  mt-4'>
                                    <Checkbox checked={checked} onCheckedChange={setChecked} />
                                    <Text>
                                        {
                                            type === "ride" ? "Charter this vehicle instead" : "Express delivery for this package"
                                        }
                                    </Text>
                                </View>


                                {/* Search button  */}


                            </View>

                            <View className='text px-4 pb-10 '>
                                <View className='flex flex-row justify-between pb-4'>

                                    <Text variant={"smallTitle"}>
                                        Total
                                    </Text>
                                    <Text variant={"smallTitle"}>
                                        5,000
                                    </Text>

                                </View>

                                <Button variant={"default"} size="lg" rounded={"base"} onPress={() => console.log("Submit button")} className='max-w-full w-full flex flex-row justify-center items-center'>
                                    <Text variant="mediumTitle" className='font-bold text-white'  > Go </Text>
                                </Button>

                            </View>
                        </View>


                    </View>

                </Sheet>

                <AddRider ref={addRiderSheetRef} snapPoints={["60%"]} closeSheet={setSheetToOpen} />
            </>
        );
    }
);

TripData.displayName = 'TripData';

export default TripData;
