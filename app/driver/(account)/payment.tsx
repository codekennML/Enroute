import { View } from 'react-native'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

const payment = () => {
    return (
        <View className='flex-col h-full justify-between '>
            <View className=' px-4 flex-1 '>
                <View className=' mt-6 '>
                    <Text className='text-[28px] font-semibold text-foreground'>{`Your`}</Text>
                    <Text className='text-[24px] font-semibold text-foreground '>Payment methods</Text>
                </View>
                <View className='mt-3'>
                    <Text variant={"body"} className='text-foreground'>Add a functional debit or credit card to help us process your charges and commissions </Text>
                </View>

                <View className='mt-4'>
                    <View>
                        <Text variant="body" className='font-medium pb-2'>Card Number</Text>
                        <Input
                            // value={userDestinationName}
                            // ref={destinationInputRef}

                            className={`   h-12 border-2 font-medium text-[8px]  cursor:text-gray-500 text-muted-foreground px-2 py-1 border-blue-600 `}

                            // onFocus={() => handleFocus('destination')}
                            // onBlur={() => handleFocus(undefined)}
                            // onSubmitEditing={(e) => handleDestinationSubmit(e.nativeEvent.text)}
                            // onChangeText={(text) => handleChange(text, "destination")}
                            aria-labelledbyledBy='inputLabel'
                            aria-errormessage='inputError'
                            style={{
                                fontSize: 14
                            }}
                        />
                    </View>
                    <View className='flex-row items-center gap-x-4'>

                        <View className='flex-1 mt-3'>
                            <View>
                                <Text variant="body" className=' pb-2 font-medium'>Expiry </Text>
                                <Input
                                    // value={userDestinationName}
                                    // ref={destinationInputRef}
                                    placeholder='MM/YY'
                                    className={` h-12  border-2 font-medium text-[8px]  cursor:text-gray-500 text-muted-foreground px-2 py-1 border-blue-600 `}

                                    // onFocus={() => handleFocus('destination')}
                                    // onBlur={() => handleFocus(undefined)}
                                    // onSubmitEditing={(e) => handleDestinationSubmit(e.nativeEvent.text)}
                                    // onChangeText={(text) => handleChange(text, "destination")}
                                    aria-labelledbyledBy='inputLabel'
                                    aria-errormessage='inputError'
                                    style={{
                                        fontSize: 14
                                    }}
                                />

                            </View>

                        </View>
                        <View className='flex-1 mt-3'>
                            <Text variant="body" className='font-medium pb-2'>CVV</Text>
                            <Input
                                // value={userDestinationName}
                                // ref={destinationInputRef}

                                className={`  h-12  border-2 font-medium text-[8px]  cursor:text-gray-500 text-muted-foreground px-2 py-1 border-blue-600 `}

                                // onFocus={() => handleFocus('destination')}
                                // onBlur={() => handleFocus(undefined)}
                                // onSubmitEditing={(e) => handleDestinationSubmit(e.nativeEvent.text)}
                                // onChangeText={(text) => handleChange(text, "destination")}
                                aria-labelledbyledBy='inputLabel'
                                aria-errormessage='inputError'
                                style={{
                                    fontSize: 14
                                }}
                            />
                        </View>
                    </View>

                </View>
            </View>

            <View className='px-4 pb-6'>
                <Button variant={"default"} size={"lg"} rounded={"base"} className='flex-row items-center justify-center font-semibold'>
                    <Text>
                        Add Card
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default payment