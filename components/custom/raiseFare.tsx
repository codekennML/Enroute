import { View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { selectSearchInfo, updateOtherTripData } from '@/redux/slices/search'
import { useAppDispatch } from '@/redux/hooks'
import { Text } from "@/components/ui/text"
import { removeAllOffers } from '@/redux/slices/offers'

const RaiseFare = () => {

    const tripInfo = useSelector(selectSearchInfo)
    const [hasAcceptedOffer, setHasAcceptedOffer] = useState(false)
    const [offers, setOffers] = useState([])

    const { budget: userBudget, riders, origin, destination, ...rest } = tripInfo

    const [prevBudget, setPrevBudget] = useState<number>(userBudget ? userBudget : 300)
    const [budget, setBudget] = useState<number>(userBudget ? userBudget : 300)

    const dispatch = useAppDispatch()
    const value = 100


    // const  

    const updateBudget = async (op: string) => {

        console.log(op)
        if (budget === 300 && op !== "add") return

        // const newBudget =  op === "add" ? budget + 100 : prev - 100
        setBudget(prev => op === "add" ? prev + 100 : prev - 100)

        //resend request to available drivers
    }

    console.log(prevBudget, budget)
    const raiseFare = () => {

        dispatch(updateOtherTripData({
            ...rest,
            budget
        }))


        setPrevBudget(budget)

        dispatch(removeAllOffers())
    }

    return (
        <View className='px-4 py-10'>
            <View className='flex flex-row items-center justify-start gap-x-2  rounded-md'>
                <Button size={'sm'} onPress={() => updateBudget("sub")} rounded="base" className='bg-muted px-5 items-center justify-center flex flex-row  ws-max h-12 '>
                    <Text variant={'subhead'} className=' text-[18px] font-semibold text-white'>- 100</Text>
                </Button>
                <View className='flex-1 justify-center items-center px-3'>
                    <Text className='text-[25px] font-semibold text-center'>  {budget}</Text>
                </View>
                <Button size={'sm'} onPress={() => updateBudget("add")} rounded="base" className='bg-primary px-6 items-center justify-center flex flex-row  ws-max h-12'>
                    <Text variant={"subhead"} className=' font-semibold text-white'>+ 100</Text>
                </Button>
            </View>

            <Button disabled={prevBudget === budget} onPress={raiseFare} size="lg" variant="default" rounded="base" className={`${prevBudget === userBudget ? "bg-accent" : "bg-primary"} items-center justify-center flex flex-row p-2 bg-primary mt-8 disabled:bg-accent `} >
                <Text variant="body" className=' font-semibold text-white'>{budget < prevBudget ? "Decrease budget" : "Raise budget"}</Text>
            </Button>
        </View>
    )
}

export default RaiseFare



