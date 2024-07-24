import { View, Text } from 'react-native'
import React from 'react'

const payment = () => {
    return (
        <View>
            <>
                <View className='px-4  mt-4'>
                    <Text className='text-[28px] font-semibold'>{`Your`}</Text>
                    <Text className='text-[24px] font-semibold '>Payment Methods</Text>
                </View>
            </>
        </View>
    )
}

export default payment