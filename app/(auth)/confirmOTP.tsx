import { View } from 'react-native'
import React, { useState } from 'react'
import { Text } from '@/components/ui/text'
import OTPInput from '@/components/ui/otp'
import { Button } from '@/components/ui/button'
import { router } from 'expo-router'

const index = () => {


    const [canRequestAnotherOTP, setCanRequestAnotherOTP] = useState(true)

    const handleOTPConfirmation = (value: string) => {
        console.log(value)
        router.push({
            pathname: "/(tabs)/"
        })
    }

    return (
        <View className=" bg-white p-4  flex flex-col h-full">
            <View className='flex-1 h-full mt-10'>
                <Text variant="heading" className="text-foreground mb-2">{`Hello, Kennaya`}</Text>
                <Text variant="body" className="text-foreground mb-2 font-medium">
                    Please enter your verification code to login.
                </Text>



                <View className={`mb-4 w-full mt-3 `} >
                    <OTPInput length={4} onComplete={handleOTPConfirmation} />
                </View>

                <View className='mt-1  items-center justify-end'>
                    <Button variant={"ghost"} size={"sm"} disabled={!canRequestAnotherOTP} className={` my-1 flex flex-row items-center justify-center rounded-md p-1.5`}>
                        <Text variant={"callout"} className={`font-medium px-0 ${canRequestAnotherOTP ? "text-white" : "text-foreground/60"} `}>Resend code in 54s</Text>
                    </Button>

                    <Button variant={"ghost"} className=' py-3 mb-4'>

                        <Text variant='body' className='underline font-medium' >Changed your mobile? </Text>
                    </Button>
                </View>
            </View>

        </View>
    )
}

export default index
