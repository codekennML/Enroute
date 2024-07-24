import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { router } from 'expo-router'

const names = () => {
    const [email, setemail] = useState('')


    const [focusedInput, setFocusedInput] = useState("")
    const emailRef = useRef<TextInput>(null)

    const handleEmailSubmit = () => {
        console.log(email)
        // Add your name submission logic here
    }

    return (
        <View className="bg-white p-4 flex flex-col h-full">
            <View className='flex-1 h-full mt-10 '>
                <Text variant="heading" className="text-foreground mb-2">Verify Your E-mail</Text>
                <Text variant="body" className="text-foreground mb-2 font-medium">
                    Please enter your email address
                </Text>
                <View className={`mb-4 w-full`}>
                    <Input
                        ref={emailRef}
                        value={email}
                        autoFocus={true}
                        className={` border-none border-0  h-14 bg-accent border-transparent font-medium text-[8px]  cursor:text-gray-500 text-muted-foreground px-2 py-1 ${focusedInput === "firstName" ? "border-2  border-blue-600" : ""} mt-4 placeholder:text-foreground`}
                        placeholder="E-mail"
                        onFocus={() => setFocusedInput('firstName')}
                        onBlur={() => setFocusedInput("")}
                        // onSubmitEditing={(e) => handleDestinationSubmit(e.nativeEvent.text)}
                        // onChangeText={(text) => handleChange(text, "destination")}
                        aria-labelledbyledBy='First Name Label'
                        aria-errormessage='Last Name errror message '
                        style={{
                            fontSize: 14
                        }}
                    />


                </View>

            </View>

            <View>

                <Text variant="callout" className="text-left text-gray-500 mb-4">
                    Enroute will not send anything without your consent.
                </Text>

                <Button variant="default" size={"lg"} rounded="base" className=" flex justify-center items-center text-white" onPress={() => {
                    router.push({
                        pathname: "/(auth)/confirmOTP",
                        params: {
                            coole: "string"
                        }
                    })
                }}>
                    <Text variant={"body"} className='text-white font-semibold'>  Continue</Text>
                </Button>
            </View>
        </View>
    )
}

export default names