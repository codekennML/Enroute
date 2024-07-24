import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { selectSearchInfo, updateOtherTripData } from '@/redux/slices/search'
import { useAppDispatch } from '@/redux/hooks'

const RaiseFare = () => {

    const tripInfo = useSelector(selectSearchInfo)
    const [hasAcceptedOffer, setHasAcceptedOffer] = useState(false)
    const [offers, setOffers] = useState([])
    const { budget, riders, origin, destination, ...rest } = tripInfo

    const dispatch = useAppDispatch()
    const value = 100


    // const  

    const updateBudget = async (op: string) => {
        if (budget <= 200) return

        dispatch(updateOtherTripData({
            ...rest,
            budget: op === "add" ? budget + 100 : budget - 100
        }))
    }

    return (
        <View className='px-4'>
            <View className='flex flex-row items-center justify-start gap-x-2  rounded-md'>
                <Button onPress={() => updateBudget("add")} rounded="base" className='flex-1 items-center  justify-center bg-muted flex flex-row p-2' style={{

                }}>
                    <Text className='text-[20px] font-medium'>- 100</Text>
                </Button>
                <View className='flex-1 justify-center items-center px-3'>
                    <Text className='text-[20px] font-semibold text-center'> NGN {budget}</Text>
                </View>
                <Button onPress={() => updateBudget("sub")} rounded="base" className=' p-2 items-center justify-center flex flex-row  ws-max'>
                    <Text className='text-[20px] font-medium text-white'>+ 100</Text>
                </Button>
            </View>

            <Button variant="default" rounded="base" className=' items-center justify-center flex flex-row p-2 bg-primary mt-4' >
                <Text variant="body" className=' font-medium text-white'>Raise fare</Text>
            </Button>
        </View>
    )
}

export default RaiseFare