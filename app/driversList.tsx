import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Circle, Marker, Camera, Region, MapViewProps } from 'react-native-maps';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Sheet, useSheetRef } from '@/components/ui/sheets';
import { mapStyle } from "@/assets/styles/map"
import { Text } from "@/components/ui/text"
import HorizontalLoader from '@/components/ui/loader/horizontal';
import { Button } from '@/components/ui/button';
import { ChevronDownCircle, ChevronUpCircle, ArrowLeft, X, Search } from '@/lib/icons/icons'
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectSearchInfo } from '@/redux/slices/search';
import { BottomSheetBackdropProps, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import DriverPriceCard, { OfferCardProps } from '@/components/custom/driverPriceCard';
import RaiseFare from '@/components/custom/raiseFare';
import { nanoid } from '@reduxjs/toolkit';
import { selectAllOffers, removeAllOffers } from '@/redux/slices/offers';
import { sendMessage } from '@/redux/slices/websocket';
import { useAppDispatch } from '@/redux/hooks';
import { notificationMessage } from '@/redux/slices/wsNotifications';
import DriverIncoming from '@/components/custom/driverIncoming';
import Passenger from '@/components/ui/modals/PassengersList';
import { passengers } from '@/components/constants/passengers';
import axios from 'axios';
import DestinationDrive from '@/components/custom/drivingDestination';
import CancelRide from '@/components/custom/cancelRide';
import { AppBottomSheet, useAppBottomSheetRef } from '@/components/ui/BottomSheet';
import Map from "@/components/ui/map/map"
import DriverArrived from '@/components/custom/driverArrived';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedReaction, useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
// import HorizontalLoader from '@/components/ui/loader/horizontal';




const driverCardSample = {
    id: nanoid(),
    availableSeats: 3,
    driverName: "John Doe",
    driverId: "driver123",
    tripId: "trip456",
    driverAvatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-H_w3fKHSyDYw8N7EGgaNQHaHm%26pid%3DApi%26h%3D160&f=1&ipt=f33c4f3359dbefd5bc530ff10d5554f3a78fdf1e534aeb22369ec9616733fa08&ipo=images",
    arrivalTime: 1627489200, // Unix timestamp in seconds
    trips: 120,
    rating: 4.8,
    destination: "153 , Obafemi Awolowo Way, Victoria Island, Lagos, Nigeria",
    amount: 2550,
    carType: "Sedan",
    expiresAt: new Date("2024-08-01T10:00:00Z"), // ISO 8601 date string
    estimatedArrivalTimeInMinutes: 15,
    currency: "NGN",
    ridersCount: 2
};

const { height } = Dimensions.get('window');


const drivers = () => {

    const dispatch = useAppDispatch()

    const animatedPosition = useSharedValue(0)


    const handleSheetChanges = useCallback((index: number) => {
        animatedPosition.value = index;
    }, [])

    // const [snapTo, setSnapTo] = useState(5)
    // const snapPoints = useMemo(() => [`${snapTo}%`, "50%", "90%"], [snapTo]);
    const [showLoader, setShowLoader] = useState(true)
    const [passengersList, setPassengersList] = useState<typeof passengers>(passengers)
    const [openPassengerModal, setOpenPassengerModal] = useState(false)
    const [acceptedOffer, setAcceptedOffer] = useState<OfferCardProps | null>()
    const UserRideInfo = useSelector(selectSearchInfo)
    const offers = useSelector(selectAllOffers)
    const notification = useSelector(notificationMessage)
    const { type } = UserRideInfo
    const [sheetMainText, setSheetMainText] = useState("")
    const [sheetScreenToRender, setSheetScreenToRender] = useState("")


    const driverListSheetRef = useAppBottomSheetRef() //This is a bottomSheet
    const passengerSheetRef = useSheetRef() //This is a modal
    const cancelRideSheetRef = useSheetRef() //This is a modal

    const openPassengersSheet = (isOpen: boolean) => {
        if (isOpen) {
            passengerSheetRef?.current?.present()
        } else {
            passengerSheetRef?.current?.dismiss()
        }
    }


    const openCancelRideSheet = (isOpen: boolean) => {
        if (isOpen) {
            cancelRideSheetRef?.current?.present()
        } else {
            cancelRideSheetRef?.current?.dismiss()
        }
    }

    useEffect(() => {
        driverListSheetRef?.current?.expand()
    }, [])

    useEffect(() => {


        if (acceptedOffer) {
            //Empty the offers state 
            dispatch(removeAllOffers())

            //Send ws message to driver 
            dispatch(sendMessage({
                type: "accept_price",
                payload: {
                    message: {
                        tripId: acceptedOffer?.tripId,
                        rideId: UserRideInfo.rideId,
                        driverId: acceptedOffer?.driverId,
                        topic: "ride_price_accepted",
                        type: UserRideInfo.type,
                        driverPushId: acceptedOffer?.driverPushId
                    }
                }
            }))
            //
        }

        if (!acceptedOffer && !notification?.value) {
            setSheetMainText("Looking for cars nearby")
            setSheetScreenToRender("raiseFare")

        }

        if (offers?.length > 0) {
            setSheetMainText(`Review ${offers?.length} offers`)
            setSheetScreenToRender("")
            // setSnapTo(10)
            setShowLoader(false)
        }

        if (acceptedOffer && notification?.value === "driver_arrived") {
            setSheetMainText("Your driver has arrived")
            setSheetScreenToRender("driverArrived")
            setShowLoader(false)
        }

        if (notification?.value === "ongoing_ride") {
            setSheetMainText("Driving to destination")
            setSheetScreenToRender("drivingToDestination")
            setShowLoader(false)
        }

        // if (sheetScreenToRender !== "raiseFare") {
        //     setSnapTo(50)
        // }

        setSheetMainText("")
        setShowLoader(false)
        setSheetScreenToRender("driverArrived")




        //store the accepted offer in async storage 
    }, [acceptedOffer, notification, offers])





    const animatedStyles = useAnimatedStyle(() => {
        console.log(animatedPosition.value)
        return {
            top: animatedPosition.value - 50
        };
    });


    console.log("Mixer")

    return (
        <View style={{ position: "relative", flex: 1 }}>
            <View className='absolute flex-1 z-0 top-0 left-0 h-full w-full bg-fuchsia-400/20'>

                <Map />
            </View>

            <Button variant="ghost" className='absolute top-10 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center z-5 bg-white  '

                onPress={() => {
                    router?.canGoBack() ? router.back() : router.push({
                        pathname: "/search",
                        params: {
                            type
                        }
                    })
                }}
            >

                <ArrowLeft size={18} className='text-foreground p-3' />

            </Button>

            {/* Drivers prices */}
            {/* <View className=' absolute top-16 shadow-sm z-5 w-full' style={{
                position: 'absolute',
                top: "10%"
            }}>


                {offers?.length > 0 && (
                    <ScrollView horizontal={false} >
                        {offers.map((offer) => (
                            <View key={offer.id} className='px-4'>
                                <DriverPriceCard {...offer} />
                            </View>
                        ))}
                    </ScrollView>
                )}

            </View> */}
            {/* <View className=' bg-green-300 '>
                <>
                </> */}





            <Animated.View style={[{
                backgroundColor: "", flexDirection: "row", justifyContent: "space-between", alignItems: "center", position: "absolute", width: '100%', // Span the entire width
                padding: 4, // Add padding for spacing
                paddingRight: 16,
                paddingLeft: 0,
                zIndex: 10,

            }, animatedStyles]}>
                <Text style={{

                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: 16,
                    padding: 16,
                    letterSpacing: 0.69, // 0.69px
                    color: '#5F6368'
                }} className='font-roboto'>
                    Google
                </Text>
                <View className='bg-white h-10 w-10 rounded-full flex-row items-center  justify-center'>
                    <Search size={24} className='text-primary' />
                </View>
            </Animated.View>

            <AppBottomSheet
                // onChange={handleSheetChanges}
                ref={driverListSheetRef}
                enablePanDownToClose={false}
                backdropOpacity={0}
                enableDynamicSizing={true}
                enableHandlePanningGesture={true}
                enableContentPanningGesture={true}
                pressBehaviour='none'
                enableTouchThrough={true}

                handleIndicatorStyle={{
                    // display: "none",
                    backgroundColor: "red",
                    padding: 0,
                    margin: 0
                }}
                animatedPosition={animatedPosition}
                backgroundStyle={{ borderRadius: 10 }}
                animateOnMount={false}

            >

                <BottomSheetScrollView className='w-full px-4' style={{
                    flex: 0,
                    minHeight: "100%",

                }} >


                    <>
                        {/* {sheetScreenToRender === "raiseFare" && 
                        <View className='w-full flex flex-row  items-center '>
                            <View className="flex-1 text-center">
                                <Text variant={'smallTitle'} className='text-[18px] text-center'>

                                    {sheetMainText}

                                </Text>
                            </View>


                            <View>
                                <Button variant={"ghost"} onPress={() => { snapTo > 20 ? setSnapTo(10) : setSnapTo(30) }} >
                                    {snapTo < 30 ? <ChevronUpCircle size={24} className="text-foreground " /> : <ChevronDownCircle size={24} className="text-foreground " />
                                    }
                                </Button>

                            </View>


                        </View>
                        
                        } */}
                        {/* {
                            showLoader &&
                            <View className='my-3'>

                                <View>
                                    <HorizontalLoader onDismiss={() => setShowLoader(false)} />
                                </View>
                            </View>
                        } */}
                        {/* {

                            sheetScreenToRender === "raiseFare" && <View>
                                <RaiseFare />
                            </View>
                        } */}
                        {/* <DriverIncoming timeToArrival={6} carName={'Mercedes Benz GLE 450'} licensePlate={'MA53G7'} openPassengersSheet={openPassengersSheet} openCancelRideSheet={openCancelRideSheet} /> */}
                        {
                            //Driver arrived
                            <DriverArrived timeToArrival={6} carName={'Mercedes Benz GLE 450'} licensePlate={'MA53G7'} openPassengersSheet={openPassengersSheet} openCancelRideSheet={openCancelRideSheet} />

                            // <RaiseFare />

                        }

                        {/* {
                            //Driving to destination
                            <DestinationDrive />
                        } */}

                        {
                            // OPEN PASSENGER MODAL


                            // <Sheet ref={passengerSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false} pressBehaviour='none' style={{
                            //     // marginHorizontal: 16, // Adjust margin as needed
                            //     marginBottom: 12,
                            //     borderRadius: 16,
                            // }}>
                            //     <View className=' mt-5 px-4 fixed'>
                            //         <View className='flex-row items-center'>
                            //             <Button variant={"ghost"} onPress={() => openPassengersSheet(false)}>
                            //                 <X size={28} className='text-foreground' />
                            //             </Button>
                            //             <Text variant={"heading"} className='flex-1 text-center '>
                            //                 Your fellow riders
                            //             </Text>
                            //         </View>
                            //     </View>
                            //     <BottomSheetScrollView>
                            //         <View >
                            //             <Passenger passengers={passengers} />
                            //         </View>

                            //     </BottomSheetScrollView>
                            // </Sheet>

                        }

                        {
                            // Cancel ride sheet ref 
                            // <Sheet ref={cancelRideSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false} pressBehaviour='none' style={{
                            //     // marginHorizontal: 16, // Adjust margin as needed
                            //     marginBottom: 12,
                            //     borderRadius: 16,
                            // }}>
                            //     <View className=' mt-5 px-4 fixed'>
                            //         <View className='flex-row items-center'>
                            //             <Button variant={"ghost"} onPress={() => openCancelRideSheet(false)}>
                            //                 <X size={28} className='text-foreground' />
                            //             </Button>

                            //         </View>
                            //     </View>

                            //     <View >
                            //         <CancelRide closeSheet={openCancelRideSheet} />
                            //     </View>


                            // </Sheet>

                        }

                    </>

                </BottomSheetScrollView>

            </AppBottomSheet>
            {/* </View> */}


        </View>


    )

}

export default drivers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: "relative"
    },

});