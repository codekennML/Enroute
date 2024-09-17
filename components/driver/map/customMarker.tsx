
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { LatLng, MapMarkerProps, Marker } from "react-native-maps"

interface CustomMarkerProps {
    arrivalTime: number
}

const CustomMarker: React.FC<CustomMarkerProps & MapMarkerProps> = ({ coordinate, arrivalTime, ...props }) => (
    <Marker coordinate={coordinate}  {...props}>
        <View className="items-center">
            <View className="bg-primary px-2 py-1 rounded-xl text-white " >
                <Text variant={"caption1"} className="text-white font-bold" style={{
                    color: "white"
                }}>

                    Arrive at 4:24pm
                </Text>
            </View>
            {/* <View className="w-6 h-6 rounded-full   border-white bg-pink-600 border-[6px]" /> */}

            {/* <View className="relative  items-center justify-center">
                <View className="h-12 w-12 bg-white border-[16px] border-primary rounded-full">

                </View>
                <View className="h-5 w-[4] bg-primary">

                </View>
            </View> */}
        </View>
    </Marker>
);

export default CustomMarker