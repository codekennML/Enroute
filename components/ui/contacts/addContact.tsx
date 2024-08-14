import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '../input'
import PhoneInput, { CountryCode } from 'react-native-phone-number-input'
import { friendSchema } from '@/app/rider/(verification)/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../button'
import { Text } from '../text'
import { X } from '@/lib/icons/icons'
import { PhoneNumberUtil } from 'google-libphonenumber';


export type AddContactFormData = z.infer<typeof friendSchema>

interface AddContactProps {
    onAddContact: (contact: AddContactFormData | null) => void;
    openModal?: Dispatch<SetStateAction<boolean>>
    title: string
    updateContact: (contact: Friend) => void
    contactToEdit?: Friend

}








const AddContact: React.FC<AddContactProps> = ({ onAddContact, openModal, title, contactToEdit, updateContact }) => {



    const [defaultValues, setDefaultValues] = useState({ firstName: "", lastName: "", mobile: "", countryCode: 234 })


    const [defaultCode, setDefaultCode] = useState<CountryCode>("NG")
    const phoneInputRef = useRef<PhoneInput>(null)


    const { control, watch, handleSubmit, formState: { errors }, setValue, reset } = useForm<AddContactFormData>({
        resolver: zodResolver(friendSchema),
        mode: "onChange",
        defaultValues
    })

    useLayoutEffect(() => {
        // console.log(contactToEdit, "Conatta")

        if (contactToEdit) {
            const phoneUtil = PhoneNumberUtil.getInstance();
            const parsedNo = phoneUtil.parse(`+${contactToEdit?.countryCode}${contactToEdit?.mobile}`, '');

            // console.log(parsedNo, "PARSED NO")

            if (parsedNo.hasNationalNumber()) {
                const nationalNumber = parsedNo.getNationalNumberOrDefault().toString();
                console.log(nationalNumber)
                const code = parsedNo.getCountryCodeOrDefault();
                console.log(code)
                const countryCode = phoneUtil.getRegionCodeForCountryCode(code) as CountryCode;
                console.log(countryCode)

                phoneInputRef.current?.setState({
                    code: code.toString(),
                    number: nationalNumber,
                    countryCode: countryCode,
                });


            }
        } else {
            phoneInputRef.current?.setState({
                code: "234",
                // number: nationalNumber,
                countryCode: "NG",
            });
        }


    }, [contactToEdit])

    useEffect(() => {

        if (contactToEdit) {

            reset(contactToEdit)
        }

    }, [contactToEdit])




    const onSubmit = (data: AddContactFormData) => {


        const phoneNumber = phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero()
        const callingCode = phoneInputRef.current?.getCallingCode()

        if (phoneNumber && callingCode) {

            if (contactToEdit) {
                //Update the contact data instead    

                updateContact({
                    ...data,
                    mobile: phoneNumber.number,
                    countryCode: parseInt(callingCode)
                })

            } else {
                onAddContact({
                    ...data,
                    // id: Date.now().toString(), // Generate a temporary ID
                    mobile: phoneNumber.number,
                    countryCode: parseInt(callingCode)
                })

            }

        } else {
            onAddContact(null)
        }

        if (openModal)
            openModal(false)


    }
    const onError = (data) => {
        console.log(data, "error")
    }
    const handleModalClose = () => {
        // onAddContact(null)
        if (openModal)
            openModal(false)

    }


    const hasErrors = Object.keys(errors).length > 0;

    const watchedValues = watch();

    // Check if all required fields have values
    const allFieldsFilled = Object.values(watchedValues).every(value => value !== undefined && value !== '');

    const canProceed = hasErrors && allFieldsFilled




    return (
        <View className='flex flex-col h-full justify-between mt-6 '>
            <View className='flex-1  '>
                <View className='flex-row pb-6 '>
                    <Button variant={"ghost"} onPress={handleModalClose}><X size={30} className='text-foreground' /></Button>
                    <Text className='flex-1 text-center' variant={"mediumTitle"}>{title}</Text>
                </View>
                <View className='flex flex-col space-y-3'>
                    <Text variant="subhead" className='font-medium pb-3'>First Name</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder=""
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                className={`h-12 px-3 border-2 font-medium ${errors.firstName ? "border-red-600" : 'border-gray-200'}`}
                            />
                        )}
                        name="firstName"
                    />
                    {errors.firstName && <Text className="text-red-600 text-sm mt-1">{errors.firstName.message}</Text>}
                </View>

                <View className='my-4'>
                    <Text variant="subhead" className='font-medium pb-2'>Last Name</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder=""
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                className={`h-12 border-2 px-3 font-medium ${errors.lastName ? "border-red-600" : 'border-gray-200'}`}
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
                                value={value?.toString()}
                                placeholder=' '
                                // defaultCode={defaultCode}
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
                                    placeholderTextColor: '#134071',
                                    value: value
                                    //   borderRadius: 8
                                }}
                                codeTextStyle={{
                                    color: "#134071",
                                    fontWeight: "600"
                                }}

                                textContainerStyle={{
                                    backgroundColor: "#fff",
                                    borderColor: errors.mobile?.message || errors.countryCode?.message ? "red" : "lightgray",
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
            <View className='pb-12 '>
                <Button onPress={() => {

                    const submitHandler = handleSubmit(onSubmit, onError)


                    submitHandler()

                }} variant={hasErrors || !allFieldsFilled ? "ghost" : "default"} size={"lg"} disabled={canProceed} rounded={"base"} className='flex-row items-center justify-center'>
                    <Text variant={"smallTitle"} className='font-semibold'>
                        {contactToEdit ? "Save" : "Add contact"}
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default AddContact