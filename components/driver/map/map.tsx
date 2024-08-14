import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Circle, Marker, Camera, Region, MapViewProps, Polyline, LatLng } from 'react-native-maps';
import { mapStyle } from '@/assets/styles/map';
// import polylineDecoder from '@mapbox/polyline'
import { useSelector } from 'react-redux';
import user, { selectUserInfo } from '@/redux/slices/user';
import { selectSearchInfo } from '@/redux/slices/search';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
} from 'react-native-reanimated';
// import PulsingCircle from './circle';
// import ExpandingCircle from './circle';
// import Ripple from './circle';
import { Landmark, MapPin } from '@/lib/icons/icons';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import PolylineDecoder from "@mapbox/polyline"
import Ripple from './circle';
import CustomMarker from './customMarker';
import CustomUserMarker from './customUserMarker';




const polyline = "syuf@ib|Rc@OaAnCaA~Ce@vAMNUB[GkAa@kBs@UCc@Ia@KKTKNUb@sAfEIN]ZITARe@GgAMmCa@gAEs@EkEWqABmBAy@E_ASy@U]Gm@CkAOeAMs@@_BdFsAfEiApCECAB{OkB@a@{@Cw@C}@CyBFuBKmCSyBSmBK_Iw@qH}@sCu@s@Go@QGP{DSo`@iGabAs`@II?Be@a@u@eAs@s@qAiAiAiAq@y@e@m@Kc@?GUDEFGEd@wARcAv@cFNcA^}AZ_A~@mBhBkC_Ak@sG_FiJ}G"


type polylineArray = number[]

const { height } = Dimensions.get("window")

const Map = () => {

    const tripInfo = useSelector(selectSearchInfo)

    // const { origin, destination } = tripInfo
    const user = useSelector(selectUserInfo)

    //Trigger a directions api call here to get the overview polyline

    const [location, setLocation] = useState({ lat: 6.50666, lng: 3.26197 })
    const [destination, , setDestination] = useState({ lat: 6.5502799, lng: 3.274225 })


    const [polylineData, setPolylineData] = useState<polylineArray[]>([])




    useEffect(() => {

        const polylineData = PolylineDecoder.decode(polyline)

        console.log(polylineData[0], polylineData[polylineData.length - 1])

        setPolylineData([...polylineData, [6.5502799, 3.274255]])

    }, [polyline])


    const LATITUDE_DELTA = 0.0502
    const LONGITUDE_DELTA = LATITUDE_DELTA * 0.55

    const [state, setState] = useState({
        region: {
            latitude: 6.5066,
            longitude: 3.2621,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA

        }
    })

    const mapRef = useRef<MapView | null>(null);


    useEffect(() => {


        if (mapRef.current) {
            // Animate to show both origin and destination
            const edgePadding = { top: 250, right: 100, bottom: 250, left: 100 };

            mapRef.current.fitToCoordinates(
                [
                    { latitude: destination.lat, longitude: destination.lng },
                    { latitude: location.lat, longitude: location.lng }
                ],
                {
                    edgePadding,
                    animated: true
                }
            );
        }
    }, []);

    // const zoomIn = () => {
    //     mapRef.current?.getCamera().then((cam: Camera) => {
    //         if (cam.zoom !== undefined) {
    //             mapRef.current?.animateCamera({
    //                 ...cam,
    //                 zoom: cam.zoom + 1
    //             });
    //         }
    //     });
    // };

    // const zoomOut = () => {
    //     mapRef.current?.getCamera().then((cam: Camera) => {
    //         if (cam.zoom !== undefined) {
    //             mapRef.current?.animateCamera({
    //                 ...cam,
    //                 zoom: cam.zoom - 1
    //             });
    //         }
    //     });
    // };

    // const panTo = (latitude: number, longitude: number) => {
    //     const region: Region = {
    //         latitude,
    //         longitude,
    //         latitudeDelta: 0.06522,
    //         longitudeDelta: 0.06821,
    //     };
    //     mapRef.current?.animateToRegion(region);
    // };

    // const rotate = (degrees: number) => {
    //     mapRef.current?.getCamera().then((cam: Camera) => {
    //         mapRef.current?.animateCamera({
    //             ...cam,
    //             heading: (cam.heading || 0) + degrees
    //         });
    //     });
    // };
    return (
        <View style={styles.container} >
            <MapView
                style={{
                    flex: 1,
                    height: "100%",
                    width: "100%"
                }}
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                // onRegionChangeComplete={(region: Region) => setState({ region })}
                initialRegion={state.region}
                zoomEnabled={true}
                // showsUserLocation={true}
                scrollEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                // onRegionChange={(region) => setState({ region })}
                className={`h-full w-full`}
                customMapStyle={mapStyle}

            >


                <CustomMarker
                    coordinates={{ latitude: destination.lat, longitude: destination.lng }}
                    arrivalTime={10} // Replace with actual arrival time
                    userAvatar={user.avatar}

                />



                <CustomUserMarker coordinates={{ latitude: location.lat, longitude: location.lng }}
                    arrivalTime={10} />

                <Polyline

                    coordinates={polylineData.map((item) => ({ longitude: item[1], latitude: item[0] }))}
                    strokeColor="#007AFF"
                    fillColor="#007AFF"
                    strokeWidth={4}
                // strokeColor="#000"
                // strokeWidth={3} 
                />
                {/* <Ripple
                    location={location}
                /> */}


            </MapView>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",

    },

});







