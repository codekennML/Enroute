import { View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { selectSearchInfo, updateOtherTripData } from '@/redux/slices/search'
import { useAppDispatch } from '@/redux/hooks'
import { Text } from "@/components/ui/text"
import { removeAllOffers } from '@/redux/slices/offers'
import { selectUserInfo } from '@/redux/slices/user'

const RaiseFare = () => {

    const tripInfo = useSelector(selectSearchInfo)
    const user = useSelector(selectUserInfo)
    const [hasAcceptedOffer, setHasAcceptedOffer] = useState(false)
    const [offers, setOffers] = useState([])

    const { budget: userBudget, riders, origin, destination, ...rest } = tripInfo

    const [prevBudget, setPrevBudget] = useState<number>(userBudget ? userBudget : 300)
    const [budget, setBudget] = useState<number>(userBudget ? userBudget : 300)

    const dispatch = useAppDispatch()
    const value = 100


    const updateBudget = async (op: string) => {

        console.log(op)
        if (budget === 300 && op !== "add") return

        // const newBudget =  op === "add" ? budget + 100 : prev - 100
        setBudget(prev => op === "add" ? prev + 100 : prev - 100)

        //resend request to available drivers
    }

    console.log(prevBudget, budget, typeof prevBudget, typeof userBudget)
    const raiseFare = () => {

        dispatch(updateOtherTripData({
            ...rest,
            budget
        }))


        setPrevBudget(budget)

        dispatch(removeAllOffers())
    }

    return (
        <View className='px-4 py-4'>
            <View className='flex flex-row items-center justify-start gap-x-2  rounded-md'>
                <Button size={'sm'} onPress={() => updateBudget("sub")} rounded="base" className='bg-muted px-5 items-center justify-center flex flex-row  ws-max h-10 '>
                    <Text variant={'subhead'} className=' text-[18px] font-semibold text-white'>- 100</Text>
                </Button>
                <View className='flex-1 justify-center items-center px-3'>
                    <Text className='text-[20px] font-semibold text-center'>{user?.country?.currency} {budget}</Text>
                </View>
                <Button variant="ghost" size={'sm'} onPress={() => updateBudget("add")} rounded="base" className='bg-primary px-6 items-center justify-center flex flex-row  ws-max h-10'>
                    <Text variant={"subhead"} className=' font-semibold text-white' style={{ color: "white" }}>+ 100</Text>
                </Button>
            </View>

            <Button disabled={prevBudget === budget} onPress={raiseFare} size="sm" variant="default" rounded="base" className={`${prevBudget !== userBudget ? "bg-primary" : "bg-accent"} items-center justify-center flex flex-row p-2 bg-primary mt-8 disabled:bg-accent h-12 `} >
                <Text variant="body" className={`${prevBudget !== userBudget ? "text-white dark:text-white" : "dark:text-muted-foreground text-foreground"}`}>{budget < prevBudget ? "Decrease budget" : "Raise budget"}</Text>
            </Button>
        </View>
    )
}

export default RaiseFare



