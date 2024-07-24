import { View } from 'react-native'
import React from 'react'
import { Button } from "@/components/ui/button"
import Ionicons from '@expo/vector-icons/Ionicons'
import { Text } from "@/components/ui/text"
import { Separator } from '@/components/ui/seperator'
import { COLOR_THEME } from '@/lib/constants'
import { Prediction } from '@/types/types'


interface PredictionListProps {
    prediction: Prediction;
    isLast: boolean;
    iconSize: number
}

const StationList: React.FC<PredictionListProps> = ({ prediction, isLast, iconSize }) => {
    return (
        <View className='w-full  '>
            <View className='flex flex-row items-center justify-start gap-x-3 '>
                {/* Icon */}

                <View className='bg-muted dark:bg-transparent  rounded-md  items-center flex flex-row justify-center'>
                    <Ionicons name="bus" size={iconSize ?? 24} color={"#007AFF"} className='text-gray-600/80' />
                </View>

                {/* Icon end */}

                <View>
                    {/* Name and location */}
                    <View className=''>
                        <Text variant="body" color="primary" className='text-ellipsis overflow-hidden  font-medium '>
                            {prediction.structured_formatting.main_text}
                        </Text>

                    </View>
                    <View className=''>
                        <Text variant="callout" color="primary" className='text-ellipsis overflow-hidden  '>
                            {prediction.structured_formatting.secondary_text}
                        </Text>

                    </View>
                </View>


            </View>


        </View>
    )
}

export default StationList