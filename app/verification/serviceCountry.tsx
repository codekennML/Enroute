import { ScrollView, View } from 'react-native';
import { Text } from "@/components/ui/text";
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
import { Controller, useForm, FieldValues } from 'react-hook-form';

import { calculateAge, personalInfoSchema, serviceCountrySchema } from "./schemas/index"
import { zodResolver } from '@hookform/resolvers/zod';
import Back from '@/components/ui/back';
import DynamicFieldComponent from '@/components/ui/dynamicField';
import { useGetCountriesQuery, useLazyGetCountriesQuery } from '@/redux/api/country';
import { useGetStatesQuery, useLazyGetStateRequiredDocsQuery } from '@/redux/api/states';
import DynamicSelect from '@/components/ui/select/dynamic';
import { updateVerificationDataState } from '@/redux/slices/verification';
import { useAppDispatch } from '@/redux/hooks';
import * as z from "zod"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Separator } from '@/components/ui/seperator';
import { useAuth } from '@/lib/useAuth';
import { showToast } from '@/redux/slices/toast';
import { selectVerificationFields, updateVerificationFieldsState } from '@/redux/slices/verifyfields';
import { ROLES } from '@/lib/config/enum';
import { useSelector } from 'react-redux';


interface ApiGeoList { _id: string, name: string, [x: string]: string | unknown }



const ServiceCountryStep = () => {


    const schema = serviceCountrySchema

    const { roles } = useAuth()

    //Extend the service scehema to specify a service type so we can know the drivers service type
    if (roles === ROLES.DRIVER) schema.extend({
        service_type: z.enum(["ride_only", "ride_dispatch", "haulage", "dispatch"], {
            required_error: "Service type is required", invalid_type_error: "Service type must be a valid ride type info",
        })
    })

    const { handleSubmit, watch, control, formState: { errors, }, setError, setValue } = useForm(
        {
            resolver: zodResolver(serviceCountrySchema),
            mode: "onChange",
            defaultValues: {
                service_type: "ride_only",
                country: { _id: "", name: "" },
                state: { _id: "", name: "" },
            }

        }
    );

    const dispatch = useAppDispatch()
    const [states, setStates] = useState([])
    const [countries, setCountries] = useState([])
    const verificatonFields = useSelector(selectVerificationFields)
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>()
    const [fullCountryData, setFullCountryData] = useState<ApiGeoList[] | undefined>()
    const [selectedState, setSelectedState] = useState<string | undefined>()
    const [fullStateData, setFullStateData] = useState<ApiGeoList[] | undefined>()
    const [focusedInput, setFocusedInput] = useState<string | undefined>()

    const [triggerGetMoreFormData] = useLazyGetStateRequiredDocsQuery()

    const [skip, setSkip] = useState(false)

    const [triggerFetch,

    ] = useLazyGetCountriesQuery(

        )
    useEffect(() => {
        fetchCountry()
    }, [])

    const fetchCountry = async () => {
        const { data, error } = await triggerFetch(undefined)

        if (data?.length > 0) {
            setFullCountryData(data)
            const countriesData = data.map((country: ApiGeoList) => country.name)
            setCountries(countriesData)
        }
    }


    const { data: apiStates, isLoading: isStatesLoading, isError: isStatesError, isSuccess: isStatesSuccess } = useGetStatesQuery({
        country: selectedCountry
    }, {
        skip: !selectedCountry
    })


    useEffect(() => {
        setSkip(true)
    }, [])

    useEffect(() => {


        if (apiStates && isStatesSuccess) {


            if (apiStates.length > 0) {
                setFullStateData(apiStates)
                const statesData = apiStates.map((state: ApiGeoList) => state.name)
                setStates(statesData)
            }


        }

    }, [apiStates, isStatesSuccess])


    const serviceCountryValues = watch()

    const isValid = (value: string) => value !== undefined && value !== '' && value !== null

    const allFieldsFilled = isValid(serviceCountryValues.country._id) && isValid(serviceCountryValues.state._id)


    const handleOpenChange = (value: boolean, name: string) => {

        value ? setFocusedInput(name) : setFocusedInput(undefined)

    }

    const handleValueChange = (name: string, option?: { label: string, value: string },) => {


        switch (name) {

            case "country":

                fullCountryData?.forEach(country => {
                    if (country?.name === option?.value) {

                        dispatch(updateVerificationDataState({
                            country: {
                                _id: country?._id,
                                name: country?.name
                            }
                        }))
                        setValue(name, {
                            _id: country?._id,
                            name: country?.name
                        })

                        setSelectedCountry(country._id)

                    }
                })

                break

            case "state":

                fullStateData?.forEach(state => {
                    if (state?.name === option?.value) {

                        dispatch(updateVerificationDataState({
                            state: {
                                _id: state?._id,
                                name: state?.name
                            }
                        }))
                        setValue(name, {
                            _id: state?._id,
                            name: state?.name
                        })

                        setSelectedState(state._id)

                    }
                })
                break


            default:
                break

        }


    }


    const hasErrors = Object.keys(errors).length > 0 || !allFieldsFilled



    const onSubmit = async (data: FieldValues) => {


        await dispatch(updateVerificationDataState({
            ...data
        }))



        const { data: formData, error } = await triggerGetMoreFormData({
            id: data.state._id,
            serviceType: data.service_type,
            userRole: roles || 4536
        }).unwrap()


        if (error) {
            dispatch(showToast({
                message: "An unknown error has occurred. Pleae try again",
                notification: "danger",
                type: "foreground",
                title: ""
            }))
            return
        }


        const { vehicleDocs, areaRequiredDocs, serviceDocs } = formData[0]



        dispatch(updateVerificationFieldsState({
            vehicleDocs,
            areaRequiredDocs,
            serviceDocs
        }))


        //We need to call the api here to give us the dynamic data which we will use to set the rest of the form 

        router.push({
            pathname: "/verification/personalInfo"
        })

    }


    return (
        <View className='flex-col justify-between h-full px-6 '>
            <View className='  flex-1 mt-[10%]'>
                <View>
                    <Back iconType='arrow' iconSize={24} />
                    <Text className='text-[24px] font-semibold text-left py-4'>Let's Get Started</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View className='my-2'>
                        <Text className='font-medium pb-3 text-muted-foreground dark:text-foreground'>Country</Text>
                        <Controller name="country" control={control} render={({ field: { value } }) => (
                            <DynamicSelect options={countries || []} value={value} isFocused={focusedInput === "country"} onOpenChange={(value) => handleOpenChange(value, "country")} onValueChange={(option) => handleValueChange("country", option)} label='country' />
                        )} />
                    </View>


                    <View className='my-2'>
                        <Text className='font-medium pb-3 text-muted-foreground dark:text-foreground'>State</Text>
                        <Controller name="state" control={control} render={({ field: { value } }) => (
                            <DynamicSelect options={states || []} value={value} isFocused={focusedInput === "state"} onOpenChange={(value) => handleOpenChange(value, "state")} onValueChange={(option) => handleValueChange("state", option)} label='state' />
                        )} />
                    </View>



                    <View className='my-2'>
                        <Text className='font-medium pb-3 text-muted-foreground dark:text-foreground'>Service Type</Text>
                        <Controller name="service_type" control={control} render={({ field: { onChange, value } }) => {

                            return (<RadioGroup value={value} onValueChange={onChange} className='border rounded-lg border-slate-200 p-3 gap-2 '>
                                <View className='flex flex-row justify-between '>

                                    <View className='flex flex-col items-start gap-x-3'>

                                        <Text variant="body" className="text-foreground mb-1 font-medium">Ride only</Text>
                                        <Text variant="footnote" className="text-muted-foreground dark:text-muted-foreground mb-2 font-medium">Make pickups, schedule tag-alongs from the convenience of your car and home</Text>

                                    </View>
                                    <RadioGroupItem value='ride_only' aria-labelledby={`message_send_${value}`} />
                                </View>
                                <Separator className="bg-slate-200" />
                                <View className='flex flex-col justify-between items-start'>

                                    <View className='flex flex-row items-center justify-between gap-x-3'>

                                        <Text variant="body" className=" flex-1 text-foreground mb-1 font-medium">Ride & Deliver</Text>
                                        <RadioGroupItem value='ride_dispatch' aria-labelledby={`message_send_${value}`} />

                                    </View>

                                    <Text variant="footnote" className="text-muted-foreground dark:text-muted-foreground mb-2 font-medium">Make pickups, and  deliveries whenever, wherever</Text>

                                </View>

                                <Separator className="bg-slate-200" />
                                <View className='flex flex-col justify-between items-start'>

                                    <View className='flex flex-row items-start gap-x-3'>

                                        <Text variant="body" className="text-foreground dark:text-foreground mb-2 font-medium flex-1">Dispatch with a bike</Text>
                                        <RadioGroupItem value='dispatch' aria-labelledby={`message_send_${value}`} />
                                    </View>
                                    <Text variant="footnote" className="text-muted-foreground dark:text-muted-foreground mb-2 font-medium">Make deliveries with a scooter, a bike  or bicyle, its up to you.</Text>
                                </View>
                                <Separator className="bg-slate-200" />
                                <View className='flex flex-col justify-between items-start'>

                                    <View className='flex flex-row items-start gap-x-3'>

                                        <Text variant="body" className=" flex-1 text-foreground dark:text-foreground mb-2 font-medium">Haulage & Movers</Text>
                                        <RadioGroupItem value='haulage' aria-labelledby={`message_send_${value}`} />

                                    </View>

                                    <Text variant="footnote" className="text-muted-foreground dark:text-muted-foreground mb-2 font-medium">Move light-weight or heavy duty goods with all types of vans and trucks</Text>
                                </View>

                            </RadioGroup>)
                        }} />

                        {errors["service_type"] && <Text className="dark:text-destructive text-destructive pt-1">{errors["service_type"]?.message}</Text>}
                    </View>


                </ScrollView>
            </View>
            <View className='py-4'>
                <Button disabled={hasErrors} onPress={handleSubmit(onSubmit)} variant={"default"} size={"lg"} rounded="base"
                    className=' items-center justify-center'>
                    <Text variant={"smallTitle"} className=' font-semibold dark:text-white text-white'>Next</Text>
                </Button>
            </View>
        </View>
    );
};

export default ServiceCountryStep
