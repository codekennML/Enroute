import { View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@/components/ui/text'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, ChevronDown, Sun, ArrowRight, MoonStar, X } from '@/lib/icons/icons'
import { Image } from 'react-native'
import { Button } from "@/components/ui/button"
import { COLOR_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import { Sheet, useSheetRef } from '@/components/ui/sheets'
import { router } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUserInfo } from '@/redux/slices/user'
// import { AutocompleteResponse, Prediction } from '@/types/types'
import { locations } from '@/components/constants/predictions'
import { addRideRiders, selectSearchInfo, setDestination, setOrigin, setTripType, updateOtherTripData } from '@/redux/slices/search'
import TownsList from '@/components/custom/stationList'
import { Location, Prediction } from '@/types/types'
import { AppBottomSheet, useAppBottomSheetRef } from '@/components/ui/BottomSheet'
import CustomDatePicker from '@/components/ui/date/datepicker'
import { selectNotificationInfo } from '@/redux/slices/notifications/app'
import useNotify from '@/lib/useNotify'
import { useUpdateUserMutation } from '@/redux/api/user'

type Service = {
    id: number,
    title: string
    subtitle: string
    type: "courier" | "ride" | "travel"
    image: string
}

const services: Service[] = [
    {
        id: 1,
        title: "Move in city ",
        type: "ride",
        subtitle: "Affordable ride along within your city ",
        image: "https://img.freepik.com/premium-vector/woman-driving-car-city-road-dashboard-interior-view-seen-map-tablet_142963-2182.jpg?size=626&ext=jpg&ga=GA1.1.1274777771.1721533660&semt=sph"

    },
    {
        id: 2,
        title: "Travel",
        type: "travel",
        subtitle: "Safe & dependable rides across state lines.",
        image: "https://img.freepik.com/premium-photo/couple-walking-boardwalk-with-palm-trees-man-carrying-suitcase_1252102-15420.jpg?uid=R157238230&ga=GA1.1.1274777771.1721533660&semt=ais_hybrid"

    },
    {
        id: 3,
        title: "Courier",
        type: "courier",
        subtitle: "Fast and secure package delivery 24/7",
        image: "https://img.freepik.com/premium-photo/man-holding-box-while-standing-front-pile-boxes-home-delivery-concept-generative-ai_1101683-1301.jpg?uid=R157238230&ga=GA1.1.1274777771.1721533660&semt=ais_hybrid"

    }
]



const index = () => {


    //Check if the user push id in db token === the current push id 

    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUserInfo)
    // const appNotification = useAppSelector(selectNotificationInfo)
    const tripInfo = useAppSelector(selectSearchInfo)
    const { when, type } = tripInfo
    // const [isLoading, setIsLoading] = useState(true);
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [predictions, setPredictions] = useState<Location[]>([])
    const { colorScheme, setColorScheme } = useColorScheme()


    const selectRideTypeSheetRef = useSheetRef();
    const datePickerSheetRef = useSheetRef()

    const [updateUser, { isLoading, isError: isUpdateUserError }] = useUpdateUserMutation()


    // useEffect(() => {

    //     const { deviceToken } = user

    //     if (appNotification.token !== deviceToken) {
    //         //update the user token on the update user endpoint 

    //         const userData = {
    //             _id: user._id,
    //             deviceToken: appNotification.token,

    //         }

    //         // dispatch(updateUser(userData).unwrap())

    //     }

    // }, [])




    useEffect(() => {
        //Set the current user as a rider

        // console.log(tripInfo?.riders, "INDEXXXXXS")

        if (tripInfo?.riders?.length === 0) {

            dispatch(addRideRiders([{ id: user._id, firstName: user?.firstName, lastName: user?.lastName, mobile: user.mobile, countryCode: user?.countryCode, added: true }]))
        }
    }, [])


    useEffect(() => {


        dispatch(setOrigin(locations[4]))

        setPredictions(locations.slice(0, 3))



    }, [locations])



    const closeRideTypeSheetRef = () => {
        if (selectRideTypeSheetRef) {
            selectRideTypeSheetRef?.current?.dismiss()
        }
    }

    const handleDatePickerSheetRef = (isOpen: boolean) => {

        if (isOpen && datePickerSheetRef) {
            // console.log(isOpen)
            datePickerSheetRef?.current?.present()
        }
        else {
            datePickerSheetRef?.current?.dismiss()
        }

    }

    const handleScheduleTrip = (tripType: "travel" | "courier" | "ride") => {

        dispatch(setTripType(tripType))
        handleDatePickerSheetRef(true)

    }

    const handleConfirmScheduleDate = (date: Date) => {

        setDatePickerOpen(false)
        // onDateChange(localDate);
        handleDatePickerSheetRef(false)

        const when = JSON.stringify(date)

        dispatch(updateOtherTripData({ when }))

        handleNavigation(type, true, true, false)
    };


    const handleTownSelect = (value: Location | Prediction) => {

        //this will always be a location
        dispatch(setDestination(value as Location))

        //This will dispatch the ride type and do the navigation
        handleNavigation("ride", false, false, true)

    }

    const handleNavigation = (rideType: string, isRideTypeDispatched: boolean = false, isScheduled?: boolean, needsDestination?: boolean) => {


        if (rideType !== "courier" && (!tripInfo?.riders || tripInfo?.riders?.length === 0)) {
            // console.log(tripInfo?.riders, "INDEXXXXXS")

            //Clear the state and set it to UserRideInfoType
            dispatch(setTripType("reset"))

            dispatch(addRideRiders([{ id: user._id, firstName: user?.firstName, lastName: user?.lastName, mobile: user.mobile, countryCode: user?.countryCode, added: true }]))
        }
        console.log(tripInfo, rideType, "Messi")
        // console.log(rideType)
        if (!isRideTypeDispatched && rideType) {
            dispatch(setTripType(rideType))
        }

        if (!isScheduled) {
            dispatch(updateOtherTripData({ when: "now" }))
        }

        if (!needsDestination) {
            dispatch(setDestination(undefined))
        }


        router.push({
            pathname: "/summary"
        })


    }

    return (
        <SafeAreaView className='mt-0 pt-0'>
            {/* <View>
                <Text className='text-[30px] font-bold px-4 my-2 '>Purple metro</Text>
            </View> */}
            <View className='flex flex-row justify-between items-center px-4  mt-4'>
                {/* Avatar Block */}
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

                            <Text variant="body" className="font-medium" >{`${user.firstName} ${user.lastName}`}</Text>
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
                    {/* <Button variant="secondary" size="icon" className='bg-transparent'  >
                        <Headset size={24} className='text-foreground' />
                    </Button> */}
                </View>

            </View>





            <View className='px-4'>
                {/* Search bar Block */}
                <View className='my-4'>

                    <Button variant="ghost" size="lg" className=" bg-blue-50 relative flex flex-row items-center justify-between pl-4 pr-2 rounded-full " onPress={() => handleNavigation("ride", false, false, false)}>
                        <View className='flex-row items-center gap-x-3'>

                            <Search size={24} color="#333333" className='font-bold dark:text-foreground ' />


                            <Text variant="subhead" color="primary"
                                className='font-semibold dark:text-foreground'>Where to  ?</Text>
                        </View>


                        <Button variant="default" size="sm" rounded="full" onPress={() => selectRideTypeSheetRef.current?.present()}
                            className='   flex flex-row items-center justify-between rounded-base gap-x-1 px-3.5 mr-2'
                        >
                            {/* <Users size={18} color={COLOR_THEME.light.background} /> */}
                            <Text variant="subhead" style={{
                                color: "white"
                            }} className='font-medium'  >City</Text>
                            <ChevronDown size={18} color={COLOR_THEME.light.background} />
                        </Button>

                    </Button>

                    {/* Bottom sheet for selecting ride type */}
                    <Sheet ref={selectRideTypeSheetRef}
                        snapPoints={["45%"]}
                        // enableDismissOnClose={false}
                        // enableDynamicSizing={true}
                        enableHandlePanningGesture={false}
                    >
                        <View className="pb-8 w-full">
                            <View className='flex flex-row items-center px-4'>
                                <Button variant={"ghost"} onPress={
                                    closeRideTypeSheetRef
                                } className='flex-row items-center justify-center'>

                                    <X size={24} className='text-foreground ml-auto' />
                                </Button>
                                <Text className="text-foreground font-semibold flex-1 text-center" variant="mediumTitle" >Plan your trip </Text>
                            </View>
                            <View className='mt-8 gap-y-4 px-4'>
                                {
                                    services.map((service: Service) => {
                                        return (
                                            <Button variant="ghost" key={service.id} className='' onPress={() => {


                                                selectRideTypeSheetRef?.current?.dismiss()

                                                handleNavigation(service.type, false, false, false)


                                            }}>
                                                <View className='pt-0.5 shadow-accent border border-input w-full rounded-md bg-blue-100/10'>
                                                    <View className='w-full flex-row items-start justify-between  '>
                                                        <View className=' p-1.5 pb-2  flex-row space-y-0 '>


                                                            <View className='flex-row justify-between items-center '>


                                                                <View className='flex-col  gap-x-2'>


                                                                    <Text variant="mediumTitle" className=''>{service.title}</Text>



                                                                    <Text>

                                                                        {service.subtitle}
                                                                    </Text>



                                                                </View>

                                                            </View>
                                                        </View>

                                                        <View className='mr-2 pt-1.5'>
                                                            <ArrowRight size={28} className='text-foreground/60' />

                                                        </View>

                                                    </View>
                                                </View>
                                            </Button>
                                        )
                                    }

                                    )
                                }

                            </View>
                        </View>
                    </Sheet>



                </View>


                {/*Bus Stations Block  */}

                <View className='gap-y-2'>

                    <TownsList onPress={handleTownSelect} predictions={predictions} isLoading={false} />

                </View>
            </View>




            {/* Image block*/}
            <View className=' mx-4 mt-4  bg-blue-50 rounded-lg h-[140px] '>

                <Button variant="ghost" className=' rounded-lg  flex flex-row items-start' onPress={() => handleNavigation("ride", false, false, false)}>
                    <View className='flex flex-col justify-between  w-3/5 pl-3 my-3 '>
                        <View className='flex-1 pt-2'>
                            <Text variant="largeTitle"

                                className='text-[22px] text-white ' >Navigate shared </Text>
                            <Text variant="largeTitle" className='text-[20px] text-white pt-2  '>routes together </Text>

                        </View>
                        <View className=''>
                            {/* <Text variant={"body"} className=' text-white '>Ride together, tribe forever </Text> */}
                            <View className='flex-row gap-x-2 items-center pr-4'>
                                <Text variant={"body"} className=' text-white font-semibold '>Find a  ride along</Text>
                                <ArrowRight size={16} className='text-foreground' />
                            </View>

                        </View>
                    </View>
                    <View className='rounded-md w-2/5 '>
                        <Image source={{ uri: "https://img.freepik.com/premium-vector/friends-drive-ride-car-together-driver-looking-road-holds-steering-wheel-passenger-navigates-by-digital-map-search-route-smartphone-people-inside-automobile-flat-vector-illustration_633472-2844.jpg?uid=R157238230&ga=GA1.2.1274777771.1721533660&semt=ais_hybrid" }}

                            resizeMode='cover' className='w-full h-[140px] rounded-r-lg ' />
                    </View>

                </Button>



            </View>


            <View className='px-4 py-0'>
                {/*Services  */}
                <View className=' my-2'>
                    <View className='py-2 flex flex-row justify-between items-center mb-3'>
                        <Text
                            variant="mediumTitle" color="secondary"
                            className='font-bold'>Reserve a ride along </Text>

                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 16 }}
                    >
                        {services.map((service: Service) => (
                            <View key={service.id} className='w-[200px] mr-4'>
                                <Button variant="ghost" onPress={() => handleScheduleTrip(service.type)}>
                                    <Card className='shadow-accent border-0 border-transparent'>
                                        <CardContent className='w-full'>
                                            <View>
                                                <Image source={{ uri: service.image }} className='w-full h-24 rounded-lg' resizeMode='cover' />
                                            </View>
                                            <CardTitle className='text-md flex flex-row justify-between pt-3'>
                                                <Text variant="subhead">{service.title}</Text>
                                            </CardTitle>
                                            <CardDescription className='text-[14px] text-foreground'>
                                                {service.subtitle}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </Button>
                            </View>
                        ))}
                    </ScrollView>
                    {/*Date Picker sheet ref   */}

                    <Sheet snapPoints={["50%"]} ref={datePickerSheetRef} enablePanDownToClose={false}>
                        <View className='flex-row  items-center justify-between px-4'>

                            <Button variant={"ghost"} onPress={() => handleDatePickerSheetRef(false)}>
                                <X className='text-foreground' size={30} />
                            </Button>
                            <Text
                                variant="mediumTitle" color="secondary"
                                className='font-bold flex-1 text-center'>When are you leaving ? </Text>
                        </View>

                        <CustomDatePicker handleSheetVisibility={handleDatePickerSheetRef} handleConfirm={handleConfirmScheduleDate} datePickerOpen={datePickerOpen} setDatePickerOpen={setDatePickerOpen} />
                    </Sheet>
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