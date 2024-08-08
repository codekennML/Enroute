import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { LatLng, Marker } from "react-native-maps";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

interface CustomMarkerProps {
    coordinates: LatLng;
    arrivalTime: number;
    userAvatar?: string;
}

const CustomUserMarker: React.FC<CustomMarkerProps> = ({ coordinates, arrivalTime, userAvatar }) => (
    <Marker coordinate={coordinates}>
        <TouchableOpacity className="">
            <View className="items-center">
                <View className="bg-[#0e7af5] px-3 py-2 rounded-xl mb-3">
                    <Text className="text-white font-bold text-sm">
                        Arrives in {arrivalTime} mins
                    </Text>
                </View>
                <View className="w-14 h-14 bg-[#0077AA] rounded-full justify-center items-center relative">
                    <Avatar
                        alt="user-avatar-location"
                        className="w-12 h-12 rounded-full absolute"
                    >
                        <AvatarImage source={{ uri: userAvatar }} />
                        <AvatarFallback>
                            <Text className="text-white text-lg">UA</Text>
                        </AvatarFallback>
                    </Avatar>
                    <View className="w-4 h-4 bg-[#0077AA] rounded-full absolute -bottom-1 right-0 border-2 border-white" />
                </View>
            </View>
        </TouchableOpacity>
    </Marker>
);

export default CustomUserMarker;
