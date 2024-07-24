import { View } from 'react-native'
import React, { useState } from 'react'
import { LocateFixed, Luggage, MapPin, MessageSquare, PenLine, UserCog, UserPlus, Wallet, X } from "@/lib/icons/icons"
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { router } from 'expo-router'


const summary: React.FC<{ type: "inter" | "intra" | "courier" }> = ({ type }) => {

    const [checked, setChecked] = useState(false);

    return (
        <View className='h-full'>


            <View className='flex flex-col h-full '>
                <View className='px-4 '>
                    <Text className='text-[32px] font-semibold'>{`${type === "courier" ? "Package" : "Trip"}`}</Text>
                    <Text className='text-[28px] font-semibold '>Summary</Text>
                </View>
                {/*Add  Rider  Card */}
                <View className=' pl-2 pr-4 flex-1 mt-4 '>

                    <Card className='mt-2 shadow-none w-full rounded-md bg-transparent '>
                        <CardContent className='max-w-full flex flex-row justify-between items-center '>

                            <View className='flex flex-row items-center justify-center gap-x-3'>
                                <View className='rounded'>
                                    {/* <MapPin size="30" className='text-blue-900/60' /> */}
                                </View>
                                <View>
                                    <CardHeader className='p-0 flex flex-row space-y-0'>
                                        <View className=' '>

                                            <CardTitle
                                                className=' pt-2 flex flex-row justify-between' >

                                                <Text variant="body" className=''>Pickup location</Text>

                                            </CardTitle>

                                        </View>
                                    </CardHeader>

                                    <CardDescription>
                                        153, Adebowale House, Onipanu, Lagos.
                                    </CardDescription>

                                </View>
                            </View>
                            <View className='  rounded-md'>
                                <Button variant={"ghost"}
                                // onPress={() => setSheetToOpen("addRider")}
                                >

                                    <PenLine size={20} className='text-blue-800/80' />
                                </Button>

                            </View>

                        </CardContent>
                    </Card>

                    <Card className='mt-3 shadow-none w-full rounded-md bg-transparent '>
                        <CardContent className='max-w-full flex flex-row justify-between items-center '>

                            <View className='flex flex-row items-center justify-center gap-x-3'>
                                <View className='rounded'>
                                    {/* <LocateFixed size="30" className='text-blue-900/60' /> */}
                                </View>
                                <View>
                                    <CardHeader className='p-0 flex flex-row space-y-0'>
                                        <View className=' '>

                                            <CardTitle
                                                className=' pt-2 flex flex-row justify-between' >

                                                <Text variant="body" className=''>Destination</Text>

                                            </CardTitle>

                                        </View>
                                    </CardHeader>

                                    <CardDescription>
                                        153, Adebowale House, Onipanu, Lagos.
                                    </CardDescription>

                                </View>
                            </View>
                            <View className='  rounded-md'>
                                <Button variant={"ghost"}
                                // onPress={() => setSheetToOpen("addRider")}
                                >

                                    <PenLine size={20} className='text-blue-800/80' />
                                </Button>

                            </View>

                        </CardContent>
                    </Card>

                    <Card className='mt-3 shadow-none w-full rounded-md bg-transparent '>
                        <CardContent className='max-w-full flex flex-row justify-between items-center '>

                            <View className='flex flex-row items-center justify-center gap-x-3'>
                                <View className='rounded'>
                                    {/* <UserCog size="30" className='text-blue-900/60' /> */}
                                </View>
                                <View>
                                    <CardHeader className='p-0 flex flex-row space-y-0'>
                                        <View className=' '>

                                            <CardTitle
                                                className=' pt-2 flex flex-row justify-between' >

                                                <Text variant="body" className=''>{type !== "courier" ? "Add rider" : "Add recipient"}</Text>


                                            </CardTitle>

                                        </View>
                                    </CardHeader>

                                    <CardDescription>
                                        Udemeobong & 2 more

                                    </CardDescription>

                                </View>
                            </View>
                            <View className=''>
                                <Button variant={"ghost"}
                                // onPress={() => setSheetToOpen("addRider")}
                                >

                                    <UserCog size={24} className='text-blue-800/80' />
                                </Button>

                            </View>

                        </CardContent>
                    </Card>
                    {/* Luggage Card */}
                    {
                        type !== "courier" &&
                        <Card className='mt-3 shadow-none w-full rounded-md bg-transparent'>
                            <CardContent className='max-w-full flex flex-row justify-between items-center '>

                                <View className='flex flex-row items-center justify-center gap-x-3'>
                                    <View className='rounded'>
                                        {/* <Luggage size="30" className='text-blue-900/60' /> */}
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
                                            2kg boxes with a handbag

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
                        type === "courier" && <Card className='mt-4 shadow-none w-full rounded-md bg-transparent'>
                            <CardContent className='max-w-full flex flex-row justify-between items-center '>

                                <View className='flex flex-row items-center justify-center gap-x-3'>
                                    <View className='rounded'>
                                        {/* <Luggage size="30" className='text-blue-900/60' /> */}
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
                                            Anything can go here

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
                        type === "courier" && <Card className='mt-4 shadow-none border-b w-full rounded-md bg-transparent'>
                            <CardContent className='max-w-full flex flex-row justify-between items-center '>

                                <View className='flex flex-row items-center justify-center gap-x-3'>
                                    <View className='rounded'>
                                        {/* <MessageSquare size="30" className='text-blue-900/60' /> */}
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
                                            Package instructions & additional information

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

                    <Card className='mt-4 shadow-none   w-full rounded-md bg-transparent'>
                        <CardContent className='max-w-full flex flex-row justify-between items-center '>

                            <View className='flex flex-row items-center justify-center gap-x-3'>
                                <View className='rounded'>
                                    {/* <Wallet size="30" className='text-blue-900/60' /> */}
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
                                        NGN 5,000

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






                    {/* Search button  */}
                    <View className='flex flex-row items-center justify-start gap-x-2  mt-4 px-2'>
                        <Checkbox checked={checked} onCheckedChange={setChecked} />
                        <Text variant={"callout"} className='text-medium'>
                            {
                                type !== "courier" ? "Charter this vehicle instead ? " : "Express delivery for this package"
                            }
                        </Text>
                    </View>

                </View>

                <View className='text px-4 pb-10 '>
                    <View className='flex flex-row justify-between pb-4 pr-1'>

                        <Text variant={"mediumTitle"}>
                            Total
                        </Text>
                        <Text variant={"smallTitle"} >
                            NGN  5,000
                        </Text>

                    </View>

                    <Button variant={"default"} size="lg" rounded={"base"} onPress={() => router.push("driversList")} className='max-w-full w-full flex flex-row justify-center items-center px-0'>
                        <Text variant="mediumTitle" color={"none"} className='font-bold text-white '  > Go </Text>
                    </Button>

                </View>
            </View>


        </View>

    )
}

export default summary