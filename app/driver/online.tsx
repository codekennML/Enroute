import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Circle, Marker, Camera, Region, MapViewProps } from 'react-native-maps';
import { Dimensions, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Sheet, useSheetRef } from '@/components/ui/sheets';
import { mapStyle } from "@/assets/styles/map"
import { Text } from "@/components/ui/text"
import HorizontalLoader from '@/components/ui/loader/horizontal';
import { Button } from '@/components/ui/button';
import { ChevronDownCircle, ChevronUpCircle, ArrowLeft, X, Search } from '@/lib/icons/icons'
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectSearchInfo } from '@/redux/slices/search';
import { BottomSheetScrollView, } from '@gorhom/bottom-sheet';
import DriverPriceCard, { OfferCardProps } from '@/components/custom/driverPriceCard';
import RaiseFare from '@/components/custom/raiseFare';
import { nanoid } from '@reduxjs/toolkit';
import { selectAllOffers, removeAllOffers, addOffer } from '@/redux/slices/offers';
import { sendMessage } from '@/redux/slices/websocket';
import { useAppDispatch } from '@/redux/hooks';
import { notificationMessage } from '@/redux/slices/wsNotifications';
import DriverIncoming from '@/components/custom/driverIncoming';
import Passenger from '@/components/ui/modals/PassengersList';
import { passengers } from '@/components/constants/passengers';
import axios from 'axios';
import DestinationDrive from '@/components/driver/destinationDrive';
import CancelRide from '@/components/custom/cancelRide';
import { AppBottomSheet, useAppBottomSheetRef } from '@/components/ui/BottomSheet';
import Map from "@/components/driver/map/map"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedReaction, useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import * as SecureStore from "expo-secure-store"
import ChatScreen from '@/components/ui/chat/chat';
import RequestMain from '@/components/driver/requestMain';
import PassengerList from '@/components/driver/modal/passengers';
// import HorizontalLoader from '@/components/ui/loader/horizontal';

const sampleOffers: OfferCardProps[] = [
    {
        id: '1',
        driverPushId: 'push1',
        availableSeats: 3,
        driverName: 'John Doe',
        driverId: 'driver1',
        tripId: 'trip1',
        driverAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        arrivalTime: Date.now() + 900000, // 15 minutes from now
        trips: 150,
        rating: 4.7,
        destination: 'Lekki Phase 1, Etiosa, Lagos, Nigeria',
        amount: 15.50,
        carType: 'Mercedes Benz GLK 450',
        // expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        estimatedArrivalTimeInMinutes: 15,
        currency: 'USD',
        ridersCount: 1
    },
    {
        id: '2',
        availableSeats: 2,
        driverName: 'Jane Smith',
        driverId: 'driver2',
        tripId: 'trip2',
        driverAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        arrivalTime: Date.now() + 1200000, // 20 minutes from now
        trips: 200,
        rating: 4.9,
        amount: 18.75,
        destination: "Onipanu, Etiosa, Lagos, Nigeria",
        carType: "Honda Accord",
        // expiresAt: new Date(Date.now() + 3600000),
        estimatedArrivalTimeInMinutes: 20,
        currency: 'USD'
    },
    {
        id: '3',
        driverPushId: 'push1',
        availableSeats: 3,
        driverName: 'John Doe',
        driverId: 'driver1',
        tripId: 'trip1',
        driverAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        arrivalTime: Date.now() + 900000, // 15 minutes from now
        trips: 150,
        rating: 4.7,
        destination: 'Lekki Phase 1, Etiosa, Lagos, Nigeria',
        amount: 15.50,
        carType: 'Mercedes Benz GLK 450',
        // expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        estimatedArrivalTimeInMinutes: 15,
        currency: 'USD',
        ridersCount: 1
    },
    {
        id: '4',
        availableSeats: 2,
        driverName: 'Jane Smith',
        driverId: 'driver2',
        tripId: 'trip2',
        driverAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        arrivalTime: Date.now() + 1200000, // 20 minutes from now
        trips: 200,
        rating: 4.9,
        amount: 18.75,
        destination: "Onipanu, Etiosa, Lagos, Nigeria",
        carType: "Honda Accord",
        // expiresAt: new Date(Date.now() + 3600000),
        estimatedArrivalTimeInMinutes: 20,
        currency: 'USD'
    }, {
        id: '5',
        driverPushId: 'push1',
        availableSeats: 3,
        driverName: 'John Doe',
        driverId: 'driver1',
        tripId: 'trip1',
        driverAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        arrivalTime: Date.now() + 900000, // 15 minutes from now
        trips: 150,
        rating: 4.7,
        destination: 'Lekki Phase 1, Etiosa, Lagos, Nigeria',
        amount: 15.50,
        carType: 'Mercedes Benz GLK 450',
        // expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        estimatedArrivalTimeInMinutes: 15,
        currency: 'USD',
        ridersCount: 1
    },
    {
        id: '6',
        availableSeats: 2,
        driverName: 'Jane Smith',
        driverId: 'driver2',
        tripId: 'trip2',
        driverAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        arrivalTime: Date.now() + 1200000, // 20 minutes from now
        trips: 200,
        rating: 4.9,
        amount: 18.75,
        destination: "Onipanu, Etiosa, Lagos, Nigeria",
        carType: "Honda Accord",
        // expiresAt: new Date(Date.now() + 3600000),
        estimatedArrivalTimeInMinutes: 20,
        currency: 'USD'
    },


];

const { height: screenHeight } = Dimensions.get('window');


const rideLive = () => {

    const dispatch = useAppDispatch()

    const animatedPosition = useSharedValue(0)



    const [showLoader, setShowLoader] = useState(true)
    const [passengersList, setPassengersList] = useState<typeof passengers>(passengers)
    // const [openPassengerModal, setOpenPassengerModal] = useState(false)
    const [acceptedOffer, setAcceptedOffer] = useState<OfferCardProps>()
    const userRideInfo = useSelector(selectSearchInfo)
    const offers = useSelector(selectAllOffers)
    const notification = useSelector(notificationMessage)
    const { type } = userRideInfo
    const [isChatModalOpen, setIsChatModalOpen] = useState(false)
    const [canAddOffer, setCanAddOffer] = useState(true)
    const [sheetMainText, setSheetMainText] = useState("")
    const [sheetSubtitle, setSheetSubtitle] = useState("")


    const [sheetScreenToRender, setSheetScreenToRender] = useState("raiseFare")


    const driverListSheetRef = useAppBottomSheetRef() //This is a bottomSheet
    const driverBottomSheetRef = useSheetRef()
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

    // useEffect(() => {
    //     console.log(canAddOffer)
    //     if (acceptedOffer && canAddOffer) {
    //         //Empty the offers state 
    //         setCanAddOffer(false)



    //         dispatch(removeAllOffers())

    //         //Send ws message to driver 
    //         dispatch(sendMessage({
    //             type: "accept_price",
    //             payload: {
    //                 message: {
    //                     tripId: acceptedOffer?.tripId,
    //                     rideId: userRideInfo.rideId,
    //                     driverId: acceptedOffer?.driverId,
    //                     topic: "ride_price_accepted",
    //                     // type: userRideInfo.type,
    //                     driverPushId: acceptedOffer?.driverPushId
    //                 }
    //             }
    //         }))


    //         setSheetScreenToRender("driverIncoming")




    //         //setScreenToRemder with driver incoming , then store the state in secure store , as well as the accepted offer if any 
    //     }

    //     if (!acceptedOffer && !notification?.value) {
    //         setSheetMainText("Looking for cars nearby")
    //         setSheetSubtitle("Please wait while we find a suitable and comfortable ride along for your journey ")
    //         setShowLoader(true)
    //         setSheetScreenToRender("raiseFare")

    //     }

    //     if (offers?.length > 0) {
    //         setSheetMainText(`Review ride offers`)
    //         setSheetSubtitle("Please review the offers received from drivers around you and select a suitable one.")
    //         // setSheetScreenToRender("")
    //         // setSnapTo(10)
    //         setShowLoader(false)
    //     }

    //     if (acceptedOffer && notification?.value === "driver_arrived") {
    //         setSheetMainText("Your driver has arrived")
    //         setSheetSubtitle("Please reach out to your driver for faster pickups so you do not delay other riders")
    //         setSheetScreenToRender("driverArrived")
    //         setShowLoader(false)
    //     }

    //     if (notification?.value === "ongoing_ride") {
    //         setSheetMainText("Driving to destination")
    //         setSheetSubtitle("You are on your way now.")
    //         setSheetScreenToRender("drivingToDestination")
    //         setShowLoader(false)
    //     }



    //     // setSheetMainText("")
    //     // setShowLoader(false)
    //     // setSheetScreenToRender("driverArrived")




    //     //store the accepted offer in async storage 
    // }, [acceptedOffer, notification, offers])


    // useEffect(() => {
    //     let currentIndex = 0;
    //     let intervalId;

    //     const addDriverOffer = () => {
    //         if (canAddOffer) {
    //             dispatch(addOffer(sampleOffers[currentIndex]));
    //             currentIndex = (currentIndex + 1) % sampleOffers.length;
    //         } else {
    //             clearInterval(intervalId); // Clear interval if canAddOffer becomes false
    //         }
    //     };

    //     if (canAddOffer) {
    //         intervalId = setInterval(addDriverOffer, 5000); // 5 seconds
    //     }

    //     // Cleanup function to clear the interval when the component unmounts or canAddOffer changes
    //     return () => clearInterval(intervalId);
    // }, [canAddOffer, dispatch]);

    const animatedStyles = useAnimatedStyle(() => {
        console.log(animatedPosition.value)
        return {
            top: animatedPosition.value - 50
        };
    });

    const animatedMapHeight = useAnimatedStyle(() => {
        // console.log(animatedPosition.value, "vERSTYSYYS", screenHeight)
        return {
            // height: animatedPosition.value - 10 
            height: "100%"
        };
    });
    const animatedPriceCardHeight = useAnimatedStyle(() => {
        // console.log(animatedPosition.value, "vERSTYSYYS", screenHeight)
        return {
            height: animatedPosition.value - 70
        };
    });

    return (
        <View style={{ position: "relative", flex: 1 }}>
            <Animated.View

                style={[
                    {
                        position: "absolute",
                        // flex: 1,
                        zIndex: 0,
                        top: 0,
                        width: "100%",
                        // height: "100%"
                    },
                    animatedMapHeight
                ]}
            >
                {/* <Map /> */}
            </Animated.View>

            <Button variant="ghost" className='absolute top-10 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center z-5 bg-white  '

                onPress={() => {
                    router?.canGoBack() ? router.back() : router.push({
                        pathname: "/driver/(tabs)",
                        params: {
                            type
                        }
                    })
                }}
            >

                <ArrowLeft size={18} className='text-foreground p-3' />

            </Button>


            <Animated.View className=' absolute top-24 shadow-sm  overflow-scroll  w-full bg-transparent' style={[
                {

                    zIndex: 2
                },
                animatedPriceCardHeight
            ]
            }>



                <ScrollView horizontal={false} >

                    <View className='px-4'>
                        <RequestMain />
                    </View>

                </ScrollView>


            </Animated.View>



            <AppBottomSheet
                // onChange={handleSheetChanges}
                ref={driverListSheetRef}
                detached
                enablePanDownToClose={false}
                backdropOpacity={0}
                enableDynamicSizing={true}
                enableHandlePanningGesture={true}
                enableContentPanningGesture={true}
                pressBehaviour='none'
                enableTouchThrough={true}
                containerStyle={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}
                handleIndicatorStyle={{
                    backgroundColor: "light-gray",
                    padding: 0,
                    margin: 0
                }} style={{
                    zIndex: 12,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
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
                        <DestinationDrive openPassengerModal={openPassengersSheet} />


                        {
                            // OPEN PASSENGER MODAL

                            <Sheet ref={passengerSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false}
                                enableContentPanningGesture={false} pressBehaviour='none' enableOverDrag={false} style={{
                                    // marginHorizontal: 16, // Adjust margin as needed
                                    marginBottom: 12,
                                    borderRadius: 16,


                                }}>
                                <View className=' my-5 px-4 fixed'>
                                    <View className='flex-row items-center'>
                                        <Button variant={"ghost"} onPress={() => openPassengersSheet(false)}>
                                            <X size={24} className='text-foreground' />
                                        </Button>
                                        <Text variant={"mediumTitle"} className='flex-1 text-center '>
                                            Riders on this trip
                                        </Text>
                                    </View>
                                </View>

                                <BottomSheetScrollView>
                                    <View>
                                        <PassengerList passengers={passengers} />
                                    </View>

                                </BottomSheetScrollView>
                            </Sheet>

                        }




                    </>

                </BottomSheetScrollView>

            </AppBottomSheet>



        </View>


    )

}

export default rideLive

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: "relative"
    },

});