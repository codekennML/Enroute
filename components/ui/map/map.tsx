import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Circle, Marker, Camera, Region, MapViewProps } from 'react-native-maps';
import { mapStyle } from '@/assets/styles/map';

// interface MapProps {
//     sheetPosition: number
// }

const { height } = Dimensions.get("window")

const Map = () => {


    // console.log(sheetPosition, '')

    const [location, setLocation] = useState({ lat: 6.5066, lng: 3.2621 })
    const [state, setState] = useState({
        region: {
            latitude: 6.5066,
            longitude: 3.2621,
            latitudeDelta: 0.00862,
            longitudeDelta: 0.0074,
        }
    })


    const mapRef = useRef<MapView | null>(null);



    const zoomIn = () => {
        mapRef.current?.getCamera().then((cam: Camera) => {
            if (cam.zoom !== undefined) {
                mapRef.current?.animateCamera({
                    ...cam,
                    zoom: cam.zoom + 1
                });
            }
        });
    };

    const zoomOut = () => {
        mapRef.current?.getCamera().then((cam: Camera) => {
            if (cam.zoom !== undefined) {
                mapRef.current?.animateCamera({
                    ...cam,
                    zoom: cam.zoom - 1
                });
            }
        });
    };

    const panTo = (latitude: number, longitude: number) => {
        const region: Region = {
            latitude,
            longitude,
            latitudeDelta: 0.06522,
            longitudeDelta: 0.06821,
        };
        mapRef.current?.animateToRegion(region);
    };

    const rotate = (degrees: number) => {
        mapRef.current?.getCamera().then((cam: Camera) => {
            mapRef.current?.animateCamera({
                ...cam,
                heading: (cam.heading || 0) + degrees
            });
        });
    };
    return (
        <View style={styles.container} >
            <MapView
                style={{
                    flex: 1,
                    height: "100%",
                    width: "100%"
                }}
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete={(region: Region) => setState({ region })}
                initialRegion={state.region}
                zoomEnabled={true}
                showsUserLocation={true}
                scrollEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                onRegionChange={(region) => setState({ region })}
                className={`h-full w-full`}
                customMapStyle={mapStyle}

            >
                <Circle center={{ latitude: location.lat, longitude: location.lng }} strokeWidth={1}
                    strokeColor="rgba(0, 0, 255, 0.5)"
                    fillColor="rgba(0, 0, 255, 0.2)"// Use rgba for transparency
                    radius={300} />


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

