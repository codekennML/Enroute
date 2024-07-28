import React, { Dispatch, SetStateAction, useRef } from 'react'
import { View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '../input'
import PhoneInput from 'react-native-phone-number-input'
import { friendSchema } from '@/app/(verification)/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../button'
import { Text } from '../text'
import { X } from '@/lib/icons/icons'

export type AddContactFormData = z.infer<typeof friendSchema>

interface AddContactProps {
    onAddContact: (contact: AddContactFormData | null) => void;
    openModal: Dispatch<SetStateAction<boolean>>
}

const AddContact: React.FC<AddContactProps> = ({ onAddContact, openModal }) => {
    const { control, watch, handleSubmit, formState: { errors }, setValue } = useForm<AddContactFormData>({
        resolver: zodResolver(friendSchema),
        mode: "onChange"
    })

    const phoneInputRef = useRef<PhoneInput>(null)

    const onSubmit = (data: AddContactFormData) => {

        console.log(data, "Submitted")

        const phoneNumber = phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero()
        const callingCode = phoneInputRef.current?.getCallingCode()

        if (phoneNumber && callingCode) {
            onAddContact({
                ...data,
                // id: Date.now().toString(), // Generate a temporary ID
                mobile: phoneNumber.number,
                countryCode: parseInt(callingCode)
            })
        } else {
            onAddContact(null)
        }
    }
    const onError = (data) => {
        console.log(data, "error")
    }
    const handleModalClose = () => {
        // onAddContact(null)
        openModal(false)
    }

    // const friends = watch("mobile")
    // console.log(friends, "friends")

    const hasErrors = Object.keys(errors).length > 0;
    // Watch all the values in the form
    const watchedValues = watch();

    // Check if all required fields have values
    const allFieldsFilled = Object.values(watchedValues).every(value => value !== undefined && value !== '');


    return (
        <View className='flex flex-col h-full justify-between '>
            <View className='flex-1  '>
                <View className='flex-row pb-6 '>
                    <Button variant={"ghost"} onPress={handleModalClose}><X size={30} className='text-foreground' /></Button>
                    <Text className='flex-1 text-center' variant={"heading"} >New Contact</Text>
                </View>
                <View className='flex flex-col space-y-3'>
                    <Text variant="subhead" className='font-semibold pb-3'>First Name</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder=""
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                className={`h-12 px-3 border-2 font-medium ${errors.firstName ? "border-red-600" : 'border-blue-600'}`}
                            />
                        )}
                        name="firstName"
                    />
                    {errors.firstName && <Text className="text-red-600 text-sm mt-1">{errors.firstName.message}</Text>}
                </View>

                <View className='my-4'>
                    <Text variant="subhead" className='font-semibold pb-2'>Last Name</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder=""
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                className={`h-12 border-2 px-3 font-medium ${errors.lastName ? "border-red-600" : 'border-blue-600'}`}
                            />
                        )}
                        name="lastName"
                    />
                    {errors.lastName && <Text className="text-red-600 text-sm mt-1">{errors.lastName.message}</Text>}
                </View>

                <View>
                    <Text variant="subhead" className='font-semibold pb-2'>Phone number</Text>
                    <Controller
                        control={control}
                        name="mobile"
                        render={({ field: { onChange, value } }) => (
                            <PhoneInput
                                ref={phoneInputRef}
                                defaultValue={value?.toString()}
                                placeholder='8123456782'
                                defaultCode="NG"
                                layout="first"
                                onChangeText={(text: string) => {
                                    onChange(text)
                                }}
                                onChangeFormattedText={(text: string) => {
                                    console.log(text, phoneInputRef?.current?.getCallingCode())
                                    const callingCode = phoneInputRef.current?.getCallingCode()
                                    if (callingCode) {
                                        setValue('countryCode', parseInt(callingCode))
                                    }
                                }}
                                countryPickerProps={{
                                    withFilter: true,
                                    withAlphaFilter: false,
                                    withCallingCode: true,


                                    theme: {
                                        fontSize: 16,
                                        primaryColor: "#134071",
                                        primaryColorVariant: "#f1f5f9",
                                        onBackgroundTextColor: '#134071',
                                        fontWeight: "600",


                                    },
                                    containerButtonStyle: {
                                        // padding: 10
                                    },

                                    filterProps: {
                                        backgroundColor: "transparent",
                                        borderBottomColor: "#134071",
                                        borderBottomWidth: 2,
                                        padding: 10
                                        // borderRadius: 3,

                                        // marginVertical: 3
                                    },
                                    closeButtonImageStyle: {
                                        fontSize: 30,
                                        color: "#2563eb",
                                        marginLeft: "auto"
                                    }


                                }}

                                textInputStyle={{
                                    width: "100%",
                                    color: "#134071",
                                    fontWeight: "600",
                                    // backgroundColor: "#f5f4f5"



                                }}

                                // placeholderTextColor="pink"
                                containerStyle={{
                                    // backgroundColor: '#f3e474',
                                    // borderWidth: 1,
                                    borderRadius: 8,
                                    width: "100%"

                                }}
                                countryPickerButtonStyle={{
                                    backgroundColor: "transparent",
                                    // width: "100%"
                                }}
                                flagButtonStyle={{
                                    backgroundColor: "transparent",
                                    // width: "100%"
                                    borderRightWidth: 1,
                                    borderColor: '#f1f4f5'

                                }}
                                textInputProps={{
                                    inputMode: "numeric",
                                    placeholderTextColor: '#134071'
                                    //   borderRadius: 8
                                }}
                                codeTextStyle={{
                                    color: "#134071",
                                    fontWeight: "600"
                                }}

                                textContainerStyle={{
                                    backgroundColor: "#f5f4f5",
                                    borderColor: errors.mobile?.message || errors.countryCode?.message ? "red" : "#2563eb",
                                    borderRadius: 8,
                                    borderWidth: 2,
                                    paddingVertical: 8,
                                    // height: 24,

                                    width: "100%"
                                }}
                                // disabled={disabled}
                                // withDarkTheme
                                withShadow={false}

                            />
                        )}
                    />
                    {errors.mobile && <Text className="text-red-600 text-sm mt-1">{errors.mobile.message}</Text>}
                    {errors.mobile && <Text className="text-red-600 text-sm mt-1">{errors?.countryCode?.message}</Text>}
                </View>
            </View>
            <View className='pb-6 '>
                <Button onPress={() => {
                    //Is submitting 
                    console.log(hasErrors, "Hagsg")
                    console.log(allFieldsFilled, "teyeyege")
                    const submitHandler = handleSubmit(onSubmit, onError)

                    //Calling submit handler
                    submitHandler()
                    console.log(hasErrors, "7ubdjfjf")
                    console.log(allFieldsFilled, "ndid84")
                    // handleSubmit(onSubmit)
                }} variant={hasErrors || !allFieldsFilled ? "ghost" : "default"} size={"lg"} disabled={hasErrors || !allFieldsFilled} rounded={"base"} className='flex-row items-center justify-center'>
                    <Text variant={"smallTitle"} className='font-bold'>
                        Add Contact
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default AddContact