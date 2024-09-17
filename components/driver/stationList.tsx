// import { View } from 'react-native'
// import React from 'react'
// import { Button } from "@/components/ui/button"
// import Ionicons from '@expo/vector-icons/Ionicons'
// import { Text } from "@/components/ui/text"
// import { Separator } from '@/components/ui/seperator'
// import { COLOR_THEME } from '@/lib/constants'
// import { Location, Prediction } from '@/types/types'
// import { Compass, Landmark } from '@/lib/icons/icons'
// import { Skeleton } from '../ui/skeleton'
// import { isLoading } from 'expo-font'



// interface PredictionListProps {
//     prediction: Prediction | Location
//     isLast: boolean;
//     iconSize: number,
//     isLoading?: boolean
//     onPress: (value: Prediction | Location) => void
// }


// const SkeletonStationList = () => (
//     <View className="flex-row items-center p-2">
//         <Skeleton className="w-10 h-10 bg-slate-300 " />
//         <View className="ml-3 flex-1 ">
//             <Skeleton className="w-[90%] h-6 rounded" />
//             <Skeleton className="w-[80%] h-3 mt-2 rounded" />
//         </View>
//     </View>
// );




// export const StationList: React.FC<PredictionListProps> = ({ prediction, iconSize, onPress }) => {


//     return (
//         <Button className='w-full p-1 pl-1 rounded-md' variant={"ghost"} onPress={() => onPress(prediction)}   >
//             <View className='flex flex-row items-center justify-start gap-x-3 '>
//                 {/* Icon */}


//                 <View className='bg-muted dark:bg-transparent bg-gray-100 rounded-md  items-center flex flex-row justify-center'>

//                     <Landmark size={iconSize ?? 28} className="text-primary" />
//                 </View>


//                 {/* Icon end */}

//                 <View>
//                     {/* Name and location */}
//                     <View className=''>

//                         <Text variant="smallTitle" color="primary" className=' tracking-wide text-ellipsis overflow-hidden  font-medium '>
//                             {"structured_formatting" in prediction ? prediction?.structured_formatting?.main_text : prediction?.town}
//                         </Text>


//                     </View>
//                     <View className=''>
//                         <Text variant="body" color="primary" className='text-ellipsis overflow-hidden  '>
//                             {"structured_formatting" in prediction ? prediction?.structured_formatting?.secondary_text : `${prediction?.state, prediction?.country}`}
//                         </Text>

//                     </View>
//                 </View>


//             </View>


//         </Button>
//     )
// }


// interface TownProps {
//     predictions: (Prediction | Location)[]
//     isLoading: boolean
//     onPress: (value: Prediction | Location) => void
// }
// export const renderSkeletons = (count: number) => {
//     return Array(count).fill(0).map((_, index) => (
//         <SkeletonStationList key={`skeleton-${index}`} />
//     ));
// };

// const TownsList: React.FC<TownProps> = ({ predictions, isLoading, onPress }) => {


//     const renderComponents = (predictions: (Prediction | Location)[]) => {

//         if ("structured_formatting" in predictions[0]) {
//             return predictions?.length > 0 && predictions.map((prediction: Prediction, index: number) => (
//                 <View key={(prediction as Prediction).place_id} className=''>
//                     <StationList
//                         onPress={onPress}
//                         iconSize={24}
//                         prediction={prediction}
//                         isLoading={false}
//                         isLast={index === predictions.length - 1}
//                     />
//                 </View>
//             ))
//         }

//         else {
//             return predictions?.length > 0 && predictions.map((location: Location, index: number) => (
//                 <View key={(location as Location).placeId} className=''>
//                     <StationList
//                         onPress={onPress}
//                         iconSize={24}
//                         prediction={location}
//                         isLoading={false}
//                         isLast={index === predictions?.length - 1}
//                     />
//                 </View>
//             ))
//         }


//     }

//     return (
//         <View className='gap-y-1'>
//             {isLoading ? (
//                 renderSkeletons(4)  // Render 3 skeleton loaders while loading
//             ) :
//                 (renderComponents(predictions))
//             }
//         </View>
//     )

// }



// export default TownsList






import { View } from 'react-native'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Location, Prediction } from '@/types/types'
import { Landmark } from '@/lib/icons/icons'
import { Skeleton } from '../ui/skeleton'

export type PredictionOrLocation = Prediction | Location;

interface PredictionListProps {
    prediction: PredictionOrLocation
    isLast: boolean;
    iconSize: number,
    isLoading?: boolean
    showIcon?: boolean
    onPress: (value: PredictionOrLocation) => void
}

const SkeletonStationList = () => (
    <View className="flex-row items-center p-2">
        <Skeleton className="w-10 h-10 bg-slate-300 " />
        <View className="ml-3 flex-1 ">
            <Skeleton className="w-[90%] h-6 rounded" />
            <Skeleton className="w-[80%] h-3 mt-2 rounded" />
        </View>
    </View>
);

export const StationList: React.FC<PredictionListProps> = ({ prediction, iconSize, onPress, showIcon = true }) => {
    const isPrediction = 'structured_formatting' in prediction;
    const mainText = isPrediction ? prediction.structured_formatting.main_text : prediction.town;
    const secondaryText = isPrediction ? prediction.structured_formatting.secondary_text : `${prediction.state}, ${prediction.country}`;

    return (
        <Button className='w-full p-1 pl-1 rounded-md' variant={"ghost"} onPress={() => onPress(prediction)}>
            <View className='flex flex-row items-center justify-start gap-x-3 '>
                {
                    showIcon &&
                    <View className='bg-muted dark:bg-transparent bg-gray-100 rounded-md  items-center flex flex-row justify-center'>
                        <Landmark size={iconSize ?? 28} className="text-primary" />
                    </View>
                }
                <View>
                    <View className=''>
                        <Text variant="smallTitle" color="primary" className=' tracking-wide text-ellipsis overflow-hidden  font-medium '>
                            {mainText}
                        </Text>
                    </View>
                    <View className=''>
                        <Text variant="body" color="primary" className='text-ellipsis overflow-hidden  '>
                            {secondaryText}
                        </Text>
                    </View>
                </View>
            </View>
        </Button>
    )
}

interface TownProps {
    predictions: PredictionOrLocation[]
    isLoading: boolean
    onPress: (value: PredictionOrLocation) => void
}

export const renderSkeletons = (count: number) => {
    return Array(count).fill(0).map((_, index) => (
        <SkeletonStationList key={`skeleton-${index}`} />
    ));
};

const TownsList: React.FC<TownProps> = ({ predictions, isLoading, onPress }) => {

    // console.log(predictions)

    const renderComponents = (items: PredictionOrLocation[]) => {
        return items.length > 0 && items.map((item, index) => {
            const key = 'place_id' in item ? item.place_id : item.placeId;
            return (
                <View key={key} className=''>
                    <StationList
                        onPress={onPress}
                        iconSize={24}
                        prediction={item}
                        isLoading={false}
                        isLast={index === items.length - 1}
                    />
                </View>
            );
        });
    }

    return (
        <View className='gap-y-1'>
            {isLoading ? renderSkeletons(4) : renderComponents(predictions)}
        </View>
    )
}

export default TownsList