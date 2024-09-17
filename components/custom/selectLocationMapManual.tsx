import React, { Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Circle, Marker, Camera, Region, MapViewProps } from 'react-native-maps';
import { Dimensions, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Sheet, useSheetRef } from '@/components/ui/sheets';
import { mapStyle } from "@/assets/styles/map"
import { Text } from "@/components/ui/text"

import { Button } from '@/components/ui/button';
import { ArrowLeft, X, Search } from '@/lib/icons/icons'
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectSearchInfo, setDestination, setOrigin } from '@/redux/slices/search';
import { BottomSheetScrollView, } from '@gorhom/bottom-sheet';

import { AppBottomSheet, useAppBottomSheetRef } from '@/components/ui/BottomSheet';

import Animated, { useAnimatedReaction, useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
;
import CustomMarker from '../driver/map/customMarker';
import useLocation from '@/lib/useLocation';
import { useLazyGetGeocodedLocationQuery } from '@/redux/api/maps';
import { useAppDispatch } from '@/redux/hooks';
import { PredictionOrLocation } from './stationList';
import { Location } from '@/types/types';
import { renderSkeletons } from '../driver/stationList';

interface LocalePickerProps {
    setIsManualLocationPickerOpen: Dispatch<SetStateAction<boolean>>
    openParentLocateModal: Dispatch<SetStateAction<boolean>>
    focusedInput: "origin" | "destination" | null
}



const useDebounce = (callback, delay) => {
    const timer = useRef(null);

    const debouncedFunction = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedFunction;
};

const useThrottle = (callback, limit) => {
    const lastCall = useRef(0);

    return useCallback((...args) => {
        const now = Date.now();
        if (now - lastCall.current >= limit) {
            lastCall.current = now;
            callback(...args);
        }
    }, [callback, limit]);
};




const LocalePicker: React.FC<LocalePickerProps> = ({ setIsManualLocationPickerOpen, focusedInput, openParentLocateModal }) => {

    const dispatch = useAppDispatch()
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [triggerGeocode] = useLazyGetGeocodedLocationQuery()
    const animatedPosition = useSharedValue(0)
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>()
    const userRideInfo = useSelector(selectSearchInfo)
    const [isMapReady, setIsMapReady] = useState(false)

    const { type, origin, destination } = userRideInfo

    useEffect(() => {
        setIsInitialLoad(false)
    }, [])



    const { width, height } = Dimensions.get('window');

    const ASPECT_RATIO = width / height;

    const { location } = useLocation()

    const LATITUDE_DELTA = 0.01;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const SPACE = 0.01;
    // const LATITUDE_DELTA = 0.0100
    // const LONGITUDE_DELTA = LATITUDE_DELTA * 0.5

    const [state, setState] = useState({
        region: {
            latitude: location?.lat!,
            longitude: location?.lng!,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA

        }
    })

    const data = {
        latitude: selectedLocation?.coordinates[1] || location?.lat!,
        longitude: selectedLocation?.coordinates[0] || location?.lng!
    }



    console.log(data, "DATA")
    const [markerPosition, setMarkerPosition] = useState({
        latitude: selectedLocation?.coordinates[0] || location?.lat!,
        longitude: selectedLocation?.coordinates[1] || location?.lng!
    })


    useEffect(() => {
        let updatedLocation = origin;  // Default to origin

        if (focusedInput === "destination") {
            updatedLocation = destination || origin;  // Default to origin if destination is not set
        }

        if (!updatedLocation?.coordinates || !location?.lat || !location?.lng) {
            return;  // Avoid setting state if coordinates are undefined
        }

        setSelectedLocation(updatedLocation);

        // Update map region
        setState(prev => ({
            region: {
                ...prev.region,
                latitude: updatedLocation.coordinates[0] || location.lat,
                longitude: updatedLocation.coordinates[1] || location.lng
            }
        }));

        // Update marker position
        setMarkerPosition({
            latitude: updatedLocation.coordinates[0] || location.lat,
            longitude: updatedLocation.coordinates[1] || location.lng
        });

        setIsMapReady(true);  // Mark the map as ready when we have valid coordinates
    }, [focusedInput, origin, destination, location]);





    const mapRef = useRef<MapView | null>(null);



    const handleLocationSelect = async (location: { longitude: number, latitude: number }) => {

        const { error, data } = await triggerGeocode({
            type: focusedInput!,
            isManual: true,
            coordinates: [location.longitude, location.latitude],
        })

        const parsed = JSON.parse(data as string);
        if (parsed?.results?.results?.length > 0) {
            const placeData = parsed?.results?.results
            let state: string = "";
            let country: string = "";
            let city: string = "";

            placeData[0]?.address_components.forEach((item: Record<string, string>) => {
                if (item.types.includes("administrative_area_level_2")) {
                    city = item.long_name;
                }
                if (item.types.includes("administrative_area_level_1")) {
                    state = item.long_name;
                }
                if (item.types.includes("country")) {
                    country = item.long_name;
                }
            });

            const locationInfo = {
                name: placeData[0].formatted_address,
                placeId: placeData[0].place_id,
                coordinates: [placeData[0].geometry.location.lat,
                placeData[0].geometry.location.lng] as [number, number],
                state: { name: state, _id: undefined },
                town: { name: city, _id: undefined },
                country: { name: country, _id: undefined }
            }
            console.log(locationInfo, "localeInfo")

            setSelectedLocation(locationInfo)

        }
    }

    const handleRegionChange = (mapData: { latitude: number; longitude: number; }) => {
        setMarkerPosition({
            latitude: mapData.latitude,
            longitude: mapData.longitude
        })
    }

    const handleRegionChangeComplete = async (region: Region) => {

        setState({ region: region })

        if (isInitialLoad) return


        // Call geocode function
        await handleLocationSelect({ latitude: region.latitude, longitude: region.longitude })
    };

    // Debounce handleRegionChange for 1 second
    const debouncedHandleRegionChange = useDebounce(handleRegionChangeComplete, 3000);
    const throttledHandleRegionChange = useThrottle(handleRegionChange, 250);


    const confirmLocationSelection = () => {
        console.log("Pressed")

        if (focusedInput === "origin") {
            dispatch(setOrigin(selectedLocation))

        } else {
            dispatch(setDestination(selectedLocation))
        }

        setTimeout(() => {
            //Give a delay so the redux state update before the modal/modals is/are closed
            console.log(origin?.name, destination?.name, "POZZ")
            if (origin?.name && destination?.name) {
                //Close the two modals
                openParentLocateModal(false)
                setIsManualLocationPickerOpen(false)

            } else {
                setIsManualLocationPickerOpen(false)
            }

        }, 200)

    }



    const LocaleMapRef = useAppBottomSheetRef() //This is a bottomSheet


    const animatedMapHeight = useAnimatedStyle(() => {
        return {
            height: animatedPosition.value - 10

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

                    {
                        isMapReady && markerPosition.latitude && markerPosition.longitude && (
                            <MapView

                                style={{
                                    flex: 1,
                                    height: "100%",
                                    width: "100%"
                                }}
                                ref={mapRef}
                                provider={PROVIDER_GOOGLE}
                                onRegionChange={throttledHandleRegionChange}
                                showsUserLocation={true}
                                onRegionChangeComplete={debouncedHandleRegionChange}
                                initialRegion={state.region}
                                zoomEnabled={true}
                                scrollEnabled={true}
                                pitchEnabled={true}
                                rotateEnabled={true}
                                className={`h-full w-full`}
                                customMapStyle={mapStyle}
                            >
                                {markerPosition.latitude && markerPosition.longitude && (

                                    <Marker
                                        coordinate={markerPosition}
                                        image={require("../../assets/images/mappin.png")}
                                    />)}

                            </MapView>)
                    }

                </View>
            </Animated.View>

            <Button variant="ghost" className='absolute top-8 left-6 w-10 h-10 rounded-full shadow-md flex items-center justify-center z-5 bg-white  '

                onPress={() => setIsManualLocationPickerOpen(false)}
            >

                <ArrowLeft size={18} className='text-foreground p-3' />

            </Button>


            <AppBottomSheet
                // onChange={handleSheetChanges}
                ref={LocaleMapRef}
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

                    <View className='pt-1 pb-6'>

                        {
                            selectedLocation?.name ?
                                <View>
                                    <View className='flex items-center justify-center'>
                                        <Text className='font-semibold' variant={"smallTitle"}>Choose your location </Text>
                                        <Text className='text-muted-foreground dark:text-muted-foreground'>Drag the map to move the pin</Text>
                                    </View>

                                    <Button variant={"ghost"} className='my-4 p-3 bg-accent rounded-md mx-2 px-3 tr'>
                                        <Text className='text-center truncate' variant={"subhead"}> {selectedLocation?.town?._id ? `${selectedLocation?.name}, ${selectedLocation?.town?.name ?? ""} ${selectedLocation?.country?.name ?? ""}` : `${selectedLocation?.name}`}</Text>
                                    </Button>

                                    <View>
                                        <Button variant={"default"} size={"lg"} className='flex flex-row items-center justify-center' onPress={confirmLocationSelection}>
                                            <Text className='dark:text-white font-medium' >Set Destination</Text>
                                        </Button>
                                    </View>

                                </View>
                                :
                                renderSkeletons(3)
                        }



                    </View>

                </BottomSheetScrollView>

            </AppBottomSheet>



        </View>


    )

}

export default LocalePicker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: "relative"
    },

})