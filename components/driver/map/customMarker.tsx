
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { LatLng, Marker } from "react-native-maps"

interface CustomMarkerProps {
    coordinates: LatLng
    arrivalTime: number
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ coordinates, arrivalTime }) => (
    <Marker coordinate={coordinates}>
        <View className="items-center">
            <View className="bg-[#0e7af5] px-2 py-1 rounded-xl mb-2 text-white" >
                <Text className="text-white font-bold" style={{
                    color: "white"
                }}>
                    Arrive at 4:24 pm
                </Text>
            </View>
            <View className="w-6 h-6 rounded-full border-6 border-red-300 bg-blue-500/80 border-[4px]" />
        </View>
    </Marker>
);

export default CustomMarker