import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { LatLng, Marker } from "react-native-maps";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface CustomMarkerProps {
    coordinates: LatLng;
    arrivalTime: number;
    userAvatar?: string;
}

const CustomUserMarker: React.FC<CustomMarkerProps> = ({ coordinates, arrivalTime, userAvatar }) => (
    <Marker coordinate={coordinates}>
        <TouchableOpacity className="">
            <View className="items-center">
                {/* <View className="bg-[#0e7af5] px-3 py-2 rounded-xl mt-3">
                    <Text className="text-white font-bold text-sm" style={{
                        color: "white"
                    }}>
                        Arrives in {arrivalTime} mins
                    </Text>
                </View> */}
                {/* <View className="w-10 h-10 bg-[#0077AA] rounded-full justify-center items-center relative"> */}
                {/* <Avatar
                        alt="user-avatar-location"
                        className="w-8 h-8 rounded-full absolute"
                    >
                        <AvatarImage source={{ uri: userAvatar }} />
                        <AvatarFallback>
                            <Text className="text-white text-lg">UA</Text>
                        </AvatarFallback>
                    </Avatar> */}
                <View className="w-6 h-6 bg-primary rounded-full  -bottom-1 right-0 border-[4px] border-white" />
                {/* </View> */}

            </View>
        </TouchableOpacity>
    </Marker>
);

export default CustomUserMarker;
