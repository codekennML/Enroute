import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Circle, Marker, Camera, Region, MapViewProps } from 'react-native-maps';
import { Dimensions, Modal, ScrollView, StyleSheet, View, Image } from 'react-native';
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
import DestinationDrive from '@/components/custom/drivingDestination';
import CancelRide from '@/components/custom/cancelRide';
import { AppBottomSheet, useAppBottomSheetRef } from '@/components/ui/BottomSheet';
import Map from "@/components/driver/map/map"
import DriverArrived from '@/components/custom/driverArrived';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedReaction, useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import * as SecureStore from "expo-secure-store"
import ChatScreen from '@/components/ui/chat/chat';
import CustomUserMarker from '@/components/driver/map/customUserMarker';
import CustomMarker from '@/components/driver/map/customMarker';
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

    const { width, height } = Dimensions.get('window');



    const [showLoader, setShowLoader] = useState(true)
    const [passengersList, setPassengersList] = useState<typeof passengers>(passengers)
    const [openPassengerModal, setOpenPassengerModal] = useState(false)
    const [acceptedOffer, setAcceptedOffer] = useState<OfferCardProps>()
    const tripInfo = useSelector(selectSearchInfo)
    const offers = useSelector(selectAllOffers)
    const notification = useSelector(notificationMessage)
    const { type, origin, destination } = tripInfo
    const [isChatModalOpen, setIsChatModalOpen] = useState(false)
    const [canAddOffer, setCanAddOffer] = useState(true)
    const [sheetMainText, setSheetMainText] = useState("")
    const [sheetSubtitle, setSheetSubtitle] = useState("")


    const [sheetScreenToRender, setSheetScreenToRender] = useState("raiseFare")


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
        console.log(canAddOffer)
        if (acceptedOffer && canAddOffer) {
            //Empty the offers state 
            setCanAddOffer(false)



            dispatch(removeAllOffers())

            //Send ws message to driver 
            dispatch(sendMessage({
                type: "accept_price",
                payload: {
                    message: {
                        tripId: acceptedOffer?.tripId,
                        rideId: tripInfo.rideId,
                        driverId: acceptedOffer?.driverId,
                        topic: "ride_price_accepted",
                        // type: tripInfo.type,
                        driverPushId: acceptedOffer?.driverPushId
                    }
                }
            }))


            setSheetScreenToRender("driverIncoming")




            //setScreenToRemder with driver incoming , then store the state in secure store , as well as the accepted offer if any 
        }

        if (!acceptedOffer && !notification?.value) {
            setSheetMainText("Looking for cars nearby")
            setSheetSubtitle("Please wait while we find a suitable and comfortable ride along for your journey ")
            setShowLoader(true)
            setSheetScreenToRender("raiseFare")

        }

        if (offers?.length > 0) {
            setSheetMainText(`Review ride offers`)
            setSheetSubtitle("Please review the offers received from drivers around you and select a suitable one.")
            // setSheetScreenToRender("")
            // setSnapTo(10)
            setShowLoader(false)
        }

        if (acceptedOffer && notification?.value === "driver_arrived") {
            setSheetMainText("Your driver has arrived")
            setSheetSubtitle("Please reach out to your driver for faster pickups so you do not delay other riders")
            setSheetScreenToRender("driverArrived")
            setShowLoader(false)
        }

        if (notification?.value === "ongoing_ride") {
            setSheetMainText("Driving to destination")
            setSheetSubtitle("You are on your way now.")
            setSheetScreenToRender("drivingToDestination")
            setShowLoader(false)
        }



        // setSheetMainText("")
        // setShowLoader(false)
        // setSheetScreenToRender("driverArrived")




        //store the accepted offer in async storage 
    }, [acceptedOffer, notification, offers])

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.085;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


    const [state, setState] = useState({
        region: {
            latitude: destination?.coordinates[0]!,
            longitude: destination?.coordinates[1]!,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA

        }
    })

    const mapRef = useRef<MapView | null>(null);

    console.log(destination, origin, "WEXLER")

    // useEffect(() => {


    //     if (mapRef.current) {
    //         // Animate to show both origin and destination
    //         const edgePadding = { top: 150, right: 50, bottom: 50, left: 50 };

    //         mapRef.current.fitToCoordinates(
    //             [
    //                 { latitude: destination?.coordinates[0]!, longitude: destination?.coordinates[1]! },
    //                 { latitude: origin?.coordinates[0]!, longitude: origin?.coordinates[1]! }
    //             ],
    //             {
    //                 edgePadding,
    //                 animated: true
    //             }
    //         );
    //     }
    // }, []);




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
            height: animatedPosition.value - 10
            // height: "100%"
        };
    });
    const animatedPriceCardHeight = useAnimatedStyle(() => {
        console.log(animatedPosition.value, "vERSTYSYYS", screenHeight)
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
                        // height: "100%",
                        zIndex: 0,
                        top: 0,
                        width: "100%",
                    },
                    animatedMapHeight
                ]}
            >
                <View className='flex-1 relative'>


                    <MapView

                        style={{
                            flex: 1,
                            height: "100%",
                            width: "100%"
                        }}
                        ref={mapRef}
                        zoomEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={state.region}
                        className={`h-full w-full`}
                        customMapStyle={mapStyle}
                    >
                        <Marker
                            coordinate={{ latitude: destination?.coordinates[0], longitude: destination?.coordinates[1] }}
                        >
                            <View className=''>

                                <Image source={require("../assets/images/mappin.png")} style={styles.markerImage} />
                                <View className=" bg-primary px-2 py-1 rounded-xl text-white mt-2 " >
                                    <Text variant={"callout"} className="text-white dark:text-white font-medium" style={{
                                        color: "white"
                                    }}>

                                        Arrive at 4:24pm
                                    </Text>
                                </View>


                            </View>
                            {/* <View>


                        </View> */}



                            {/* 
                        <CustomMarker coordinate={{ latitude: destination?.coordinates[0], longitude: destination?.coordinates[1] }} arrivalTime={10} /> */}
                        </Marker>


                    </MapView>


                </View>
            </Animated.View>

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
                containerStyle={{
                    borderTopLeftRadius: 20,
                }}
                handleIndicatorStyle={{
                    backgroundColor: "light-gray",
                    padding: 0,
                    margin: 0,

                }} style={{
                    zIndex: 12,
                    borderTopLeftRadius: 20,

                }}

                animatedPosition={animatedPosition}
                backgroundStyle={{ borderRadius: 10, borderTopLeftRadius: 20, }}
                animateOnMount={false}

            >

                <BottomSheetScrollView className='w-full px-4' style={{
                    flex: 0,
                    minHeight: "100%",

                }} >

                    <>



                        {sheetScreenToRender === "raiseFare" &&
                            <View className='w-full flex flex-row  items-center '>
                                <View className="flex-1 text-center">
                                    <Text variant={'subhead'} className='text-[18px] text-center text-primary font-semibold'>

                                        {sheetMainText}

                                    </Text>
                                    <Text variant={"callout"} className='font-medium text-center mt-2 px-2 text-muted-foreground dark:text-muted-foregound'>{sheetSubtitle}</Text>
                                </View>



                            </View>

                        }

                        {

                            sheetScreenToRender === "raiseFare" &&
                            <View>
                                <RaiseFare />
                            </View>
                        }
                        {
                            showLoader &&
                            <View className='mb-0'>

                                <View>
                                    <HorizontalLoader onDismiss={() => setShowLoader(false)} />
                                </View>
                            </View>
                        }

                        {
                            sheetScreenToRender === "driverIncoming" && <DriverIncoming timeToArrival={6} carName={'Mercedes Benz GLE 450'} licensePlate={'MA53G7'} openPassengersSheet={openPassengersSheet} openCancelRideSheet={openCancelRideSheet} openChatModal={setIsChatModalOpen} />
                        }


                        {
                            // Driver arrived
                            sheetScreenToRender === "driverArrived" && <DriverArrived timeToArrival={6} carName={'Mercedes Benz GLE 450'} licensePlate={'MA53G7'} openPassengersSheet={openPassengersSheet} openCancelRideSheet={openCancelRideSheet} openChatModal={setIsChatModalOpen} />

                        }

                        {
                            //Driving to destination

                            sheetScreenToRender === "drivingToDestination" && <DestinationDrive />
                        }

                        {
                            // OPEN PASSENGER MODAL

                            <Sheet ref={passengerSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false} pressBehaviour='none' style={{
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
                                    <View >
                                        <Passenger passengers={passengers} />
                                    </View>

                                </BottomSheetScrollView>
                            </Sheet>

                        }

                        {
                            // Cancel ride sheet ref 
                            <Sheet ref={cancelRideSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false} pressBehaviour='none' style={{
                                // marginHorizontal: 16, // Adjust margin as needed
                                marginBottom: 12,
                                borderRadius: 16,
                            }}>
                                <View className=' mt-5 px-4 fixed'>
                                    <View className='flex-row items-center'>
                                        <Button variant={"ghost"} onPress={() => openCancelRideSheet(false)}>
                                            <X size={28} className='text-foreground' />
                                        </Button>

                                    </View>
                                </View>

                                <View >
                                    <CancelRide closeSheet={openCancelRideSheet} />
                                </View>


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
    markerImage: {
        width: 45,
        height: 60,
        marginLeft: 30
    },

});