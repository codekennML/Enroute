import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { router } from 'expo-router'

const names = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [focusedInput, setFocusedInput] = useState("")
    const firstNameRef = useRef<TextInput>(null)
    const lastNameRef = useRef<TextInput>(null)


    useEffect(() => {


        if (focusedInput === "firstName" || !focusedInput) {
            firstNameRef?.current?.focus()
        }

        if (focusedInput === "lastName") {
            lastNameRef?.current?.focus()
        }


    }, [focusedInput])


    const handleNameSubmit = () => {
        console.log({ firstName, lastName })
        // Add your name submission logic here
    }

    return (
        <View className="bg-white p-4 flex flex-col h-full">
            <View className='flex-1 h-full mt-10'>
                <Text variant="heading" className="text-foreground mb-2">You're almost there</Text>
                <Text variant="body" className="text-foreground mb-2 font-medium">
                    Please provide your first and last name.
                </Text>
                <View className={`mb-4 w-full`}>
                    <Input
                        ref={firstNameRef}
                        value={firstName}

                        className={` border-none border-0  h-14 bg-accent border-transparent font-medium text-[8px]  cursor:text-gray-500 text-muted-foreground px-2 py-1 ${focusedInput === "firstName" ? "border-2  border-blue-600" : ""} mt-4 placeholder:text-foreground`}
                        placeholder="First Name"
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

                    <Input
                        value={lastName}
                        ref={lastNameRef}


                        className={` border-none border-0  h-14 bg-accent border-transparent font-medium text-[8px]  cursor:text-gray-500 text-foreground px-2 py-1 ${focusedInput === "lastName" ? "border-2 placeholder : text-foreground border-blue-600" : ""} mt-4`}
                        placeholder="Last Name"
                        onFocus={() => setFocusedInput('lastName')}
                        onBlur={() => setFocusedInput("")}
                        // onSubmitEditing={(e) => handleDestinationSubmit(e.nativeEvent.text)}
                        // onChangeText={(text) => handleChange(text, "destination")}
                        aria-labelledbyledBy='Last Name Label'
                        aria-errormessage='Last Name error message'
                        style={{
                            fontSize: 14
                        }}
                    />

                </View>
                <View className='mt-1 items-center justify-end'>

                    <Button onPress={() => {
                        router.push({
                            // pathname: "/(auth)/login",
                            pathname: "/(auth)/names",
                            params: {
                                type: "rider"
                            }
                        })
                    }}
                        variant="default"
                        size="lg"
                        rounded="base"
                        className="w-full mb-2 flex flex-row justify-center items-center"
                    >
                        <Text variant={"subhead"} className='font-semibold text-white'> Finish</Text>
                    </Button>

                </View>
            </View>
        </View>
    )
}

export default names