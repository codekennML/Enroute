import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@/components/ui/text'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, ChevronDown, Star, Users, Sun, Home, BriefcaseBusiness, Ellipsis, Headset, Plane, ArrowRight, MoonStar, X } from '@/lib/icons/icons'
import { Image } from 'react-native'
import StationList from '@/components/custom/stationList'
import { Button } from "@/components/ui/button"
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import { Sheet, useSheetRef } from '@/components/ui/sheets'
import { router } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUserInfo } from '@/redux/slices/user'
import { AutocompleteResponse, Prediction } from '@/types/types'
import { predictions as stations } from '@/components/constants/predictions'
import { setTripType } from '@/redux/slices/search'

type Service = {
    id: number,
    title: string
    subtitle: string
    type: "intra" | "inter" | "courier"
    image: string
}

const services: Service[] = [
    {
        id: 1,
        title: "In-city",
        type: "intra",
        subtitle: "Lorem ipsum dole leoeorel",
        image: require("../../assets/images/car.png")

    },
    {
        id: 2,
        title: "State lines",
        type: "inter",
        subtitle: "Lorem ipsum dole leoeorel",
        image: require("../../assets/images/package.png")

    },
    {
        id: 3,
        title: "Courier",
        type: "courier",
        subtitle: "Lorem ipsum dole leoeorel",
        image: require("../../assets/images/car.png")

    }
]



const index = () => {
    const user = useAppSelector(selectUserInfo)
    const [predictions, setPredictions] = useState<Prediction[]>([])
    const selectRideTypeSheetRef = useSheetRef();
    const { colorScheme, setColorScheme } = useColorScheme()


    useEffect(() => {
        setPredictions(stations)
    }, [stations])

    const dispatch = useAppDispatch()


    return (
        <SafeAreaView className='mt-0 pt-0'>
            {/* <View>
                <Text className='text-[35px] font-bold'>Enroute</Text>
            </View> */}


            <View className='flex flex-row justify-between items-center px-4 mt-4'>
                {/* Avatar Block */}
                <View className='flex flex-row items-center gap-x-2'>
                    <View>
                        <Avatar alt="user avatar" className='h-12 w-12' >
                            <AvatarImage source={{ uri: user.avatar }} />
                            <AvatarFallback>
                                <Text>User Avatar</Text>
                            </AvatarFallback>
                        </Avatar>

                    </View>
                    <View>
                        <Text variant="subhead" className='font-semibold'>Anita Vernon </Text>
                        <View className='flex items-center flex-row gap-x-10'>

                            <Text variant="caption1" className="font-medium" >{`${user?.state?.name}, ${user?.country?.name}`}</Text>
                        </View>
                    </View>
                </View>
                {/* Help icon block */}
                <View className='flex flex-row gap-x-2 '>

                    {
                        colorScheme === "dark" ?
                            <Button onPress={() => setColorScheme("light")} variant="secondary" size={"icon"} className='bg-transparent' >
                                <Sun size={24} className='dark:text-foreground ' />
                            </Button> :
                            <Button onPress={() => setColorScheme("dark")} variant="secondary" size={"icon"} className='bg-transparent' >
                                <MoonStar size={24} className='dark:text-foreground' />
                            </Button>
                    }
                    <Button variant="secondary" size="icon" className='bg-transparent'  >
                        <Headset size={24} className='text-foreground' />
                    </Button>
                </View>

            </View>

            {/* Image block*/}
            <View className=' mt-4 h-[20%]  rounded-full px-4'>
                <LinearGradient
                    // Background Linear Gradient
                    // colors={['#007AFF', '#2D87EA', '#2380E6', '#3E90E9']}
                    colors={['#EEEFFF', '#E2E4FE']}
                    start={{ x: 0, y: 0 }}
                    className='rounded-md h-full'
                    style={{ borderRadius: 10 }}
                >
                    <View className='px-4 rounded-lg mt-2 flex flex-row items-center'>
                        <View className='flex flex-col justify-between items-center'>
                            <View>
                                <Text variant="largeTitle"

                                    className='text-[22px] text-white ' >Heading  out ?</Text>
                                <Text variant="largeTitle" className='text-[25px] text-white  '>Get a ride along ?</Text>

                            </View>
                            <View className=''>
                                <Text variant={"body"} className=' text-white '>Yes, find me a ride along</Text>

                            </View>
                        </View>
                        <View>
                            <Image source={require('../../assets/images/clock.png')}

                                resizeMode='contain' />
                        </View>

                    </View>

                </LinearGradient>

            </View>
            <View className='px-4 py-0'>
                {/*Services  */}
                <View className=' my-2'>
                    <View className='py-2 flex flex-row justify-between items-center mt-2'>
                        <Text
                            variant="smallTitle" color="secondary"
                            className='font-bold'>Reserve a ride along </Text>
                        <Text variant="footnote" className=' text-primary font-medium'>How to schedule ?</Text>
                    </View>
                    <View className='flex flex-row justify-between items-center mt-2'>
                        {
                            services.map((service: Service) => {
                                return (
                                    <View key={service.id} className='w-[32%]' >
                                        <Card className='pt-2 shadow-accent border-0  border-transparent bg-accent'>
                                            <CardContent className='max-w-full'>

                                                <CardTitle
                                                    className='text-md pt-4 flex flex-row justify-between' >
                                                    <Text variant="footnote">{service.title}</Text>

                                                </CardTitle>

                                                <CardDescription>
                                                    {/* {service.subtitle} */}

                                                </CardDescription>

                                            </CardContent>
                                        </Card>
                                    </View>
                                )
                            }

                            )
                        }

                    </View>

                </View>

                {/* Search bar Block */}
                <View className='my-4'>

                    <Button variant="default" size="lg" className="bg-accent relative flex flex-row items-center justify-between pl-4 pr-2 rounded-lg " onPress={() => {
                        dispatch(setTripType("intra"))
                        router.push
                            ({
                                pathname: "/search",
                                params: {
                                    type: "intra",
                                    user: user._id
                                }
                            })
                    }}>
                        <View className='flex-row items-center gap-x-3'>

                            <Search size={24} color="#333333" className='font-bold dark:text-foreground ' />


                            <Text variant="subhead" color="primary"
                                className='font-semibold dark:text-foreground'>Where to  ?</Text>
                        </View>


                        <Button variant="default" size="sm" rounded="full" onPress={() => selectRideTypeSheetRef.current?.present()}
                            className='flex flex-row items-center justify-between rounded-full gap-x-1 px-4 '
                        >
                            <Users size={18} color={COLOR_THEME.light.background} />
                            {/* <Text variant="caption2" className='font-medium'  >Share</Text> */}
                            <ChevronDown size={18} color={COLOR_THEME.light.background} />
                        </Button>

                    </Button>

                    {/* Bottom sheet for selecting ride type */}
                    <Sheet ref={selectRideTypeSheetRef} snapPoints={["50%"]}>
                        <View className="pb-8 w-full">
                            <View className='flex flex-row items-center px-4'>
                                <Text className="text-foreground font-semibold flex-1 text-center" variant="mediumTitle" >Plan your trip </Text>
                                <X size={24} className='text-foreground ml-auto' />
                            </View>
                            <View className='  mt-3 gap-y-4 px-4'>
                                {
                                    services.map((service: Service) => {
                                        return (
                                            <Button key={service.id} className='' onPress={() => {
                                                dispatch(setTripType(service.type))

                                                selectRideTypeSheetRef?.current?.dismiss()

                                                router.push({
                                                    pathname: "/search",
                                                    params: {
                                                        user: user._id,
                                                        type: service.type
                                                    }
                                                })
                                            }}>
                                                <Card className='pt-2 shadow-accent border border-input w-full rounded-md bg-transparent'>
                                                    <CardContent className='max-w-full'>
                                                        <CardHeader className='p-0 flex flex-row space-y-0'>
                                                            <View className='flex flex-row gap-x-3 items-start justify-start '>

                                                                <View className=" h-12 w-12 rounded-md bg-blue-600" >

                                                                </View>
                                                                <CardTitle
                                                                    className=' pt-2 flex flex-row justify-between' >
                                                                    <Text variant="body" className=''>{service.title}</Text>
                                                                    {/* <ArrowRight size={24} color={'#333333'} /> */}

                                                                </CardTitle>

                                                            </View>
                                                        </CardHeader>

                                                        <CardDescription>
                                                            {service.subtitle}

                                                        </CardDescription>

                                                    </CardContent>
                                                </Card>
                                            </Button>
                                        )
                                    }

                                    )
                                }

                            </View>
                        </View>
                    </Sheet>

                    <ScrollView
                        contentContainerStyle={{
                            marginTop: 12,

                            // flex: 1,
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 6
                        }}

                    >
                        <Button

                            variant="outline" size="badge" rounded="full"
                            className='flex flex-row items-center justify-between rounded-md gap-x-1 px-4 w-max dark:border '
                        >
                            <Home size={18} className='text-gray-600/80' />
                            <Text variant={"tiny"} className='text-gray-600 font-medium' style={{ fontSize: 14 }}>Home</Text>

                        </Button>

                        <Button variant="outline" size="badge" rounded="full"
                            className='flex flex-row items-center justify-between rounded-md gap-x-1 px-4 w-max   dark:border'
                        >
                            <BriefcaseBusiness size={18} className='text-gray-600/80' />
                            <Text variant={"tiny"} className='text-gray-600 font-medium' style={{ fontSize: 14 }}>Work</Text>

                        </Button>
                        <Button variant="outline" size="badge" rounded="full"
                            className='flex flex-row items-center justify-between rounded-md gap-x-1 px-4 w-max dark:border'
                        >
                            <Plane size={18} className='text-gray-600/80' />
                            <Text variant={"tiny"} className='text-gray-600 font-medium' style={{ fontSize: 14 }}>Airport</Text>

                        </Button>
                        <Button variant="outline" size="badge" rounded="full"
                            className='flex flex-row items-center justify-between rounded-md gap-x-1 px-4 w-max dark:border  '
                        >
                            <Ellipsis size={18} className='text-gray-600/80' />
                            <Text variant={"tiny"} className='text-gray-600 font-medium' style={{ fontSize: 14 }}>More</Text>

                        </Button>

                    </ScrollView>


                </View>


                {/*Bus Stations Block  */}

                <View className='gap-y-2'>
                    {
                        predictions.map((prediction: Prediction, index: number) => {
                            return (
                                <View key={prediction.place_id} className='mt-1' >
                                    <StationList iconSize={24} prediction={prediction}
                                        isLast={index === predictions.length - 1} />
                                </View>
                            )
                        }

                        )
                    }


                </View>

                <View>


                </View>
                <View>


                </View>
                <View>


                </View>

            </View >
        </SafeAreaView >
    )
}

export default index