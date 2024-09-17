


import { View } from 'react-native'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Location, Prediction } from '@/types/types'
import { Landmark } from '@/lib/icons/icons'
import { Skeleton } from '../ui/skeleton'
import { LandPlot } from 'lucide-react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLOR_THEME } from '@/lib/constants'

export type PredictionOrLocation = Prediction | Location;

interface PredictionListProps {
    prediction: PredictionOrLocation
    isLast: boolean;
    iconSize: number,
    isLoading?: boolean
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

export const StationList: React.FC<PredictionListProps> = ({ prediction, iconSize, onPress }) => {

    const isPrediction = 'structured_formatting' in prediction;
    const mainText = isPrediction ? prediction.structured_formatting.main_text : prediction.name;
    const secondaryText = isPrediction ? prediction.structured_formatting.secondary_text : `${prediction.town?.name || ""}, ${prediction.state?.name || ""}, ${prediction.country?.name || ""}`;

    return (
        <Button className='w-full p-1 pl-1 rounded-md' variant={"ghost"} onPress={() => onPress(prediction)}>
            <View className='flex flex-row items-center justify-start gap-x-3 '>
                <View className=' bg-primary/5 rounded-md  items-center flex flex-row justify-center p-2 dark:bg-transparent'>
                    <Ionicons name='bus-outline' color={COLOR_THEME.light.foreground} size={24} />
                </View>
                <View>
                    <View className='flex-row items-center  justify-between'>
                        <Text variant="body" className=' tracking-wide text-ellipsis overflow-hidden  font-medium '>
                            {mainText}
                        </Text>
                        <Text variant="body" className=' tracking-wide text-ellipsis overflow-hidden  font-medium '>
                            {prediction?.distance}
                        </Text>
                    </View>
                    <View className=''>
                        <Text variant="callout" className='text-ellipsis overflow-hidden text-muted-foreground dark:text-muted-foreground pr-4'>
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

    const renderComponents = (items: PredictionOrLocation[]) => {
        return items.length > 0 ? items.map((item, index) => {
            const key = '_id' in item ? item._id : item.place_id;
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
        }) : <View className="my-2.5"><Text variant="body" className="font-medium">No place matching this request was found.Please try again.</Text></View>
    }

    return (
        <View className='gap-y-1'>
            {isLoading ? renderSkeletons(4) : renderComponents(predictions)}
        </View>
    )
}

export default TownsList