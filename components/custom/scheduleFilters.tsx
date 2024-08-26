import { Animated, ScrollView, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Text } from "../ui/text"
import { Toggle } from '../ui/toggle'
import { Slider } from '../ui/slider'
import { RadioGroup, RadioGroupItem } from '../ui/radiogroup'
import { Separator } from '../ui/seperator'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { scheduleFiltersSchema } from '@/app/verification/schemas'
import { Controller, useForm } from 'react-hook-form'
import { FadeIn } from 'react-native-reanimated'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown'
import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import { useGetAutoCompleteDataQuery } from '@/redux/api/maps'
import useDebounce from '@/lib/useDebounce'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '@/redux/slices/user'
import { Location } from '@/types/types'
import { StationList } from './stationList'
import { TextInput } from 'react-native-gesture-handler'

const ScheduleFilters = () => {

    // const [value, setValue] = useState('');
    const [focusedInput, setFocusedInput] = useState()
    const [checked, setChecked] = useState(true)
    const [isEnabled, setIsEnabled] = useState(false);
    const [isDestinationDdOpen, setIsDestinationDdOpen] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const dropDownRef = useRef<React.ElementRef<typeof DropdownMenuPrimitive.Trigger>>(null);


    const user = useSelector(selectUserInfo)
    const [canShowPredictions, setCanShowPredictions] = useState(false)
    // const [destination, setDestination] = useState("")

    const { control, watch, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(scheduleFiltersSchema),
        mode: "onChange",
        defaultValues: {
            seats: 1,
            distance: 10,
            type: "in-city",
            charter: false,
            destinationName: ""
        }
    })
    const watchedValues = watch()


    const debouncedDestination = useDebounce(watchedValues.destinationName)
    const [predictions, setPredictions] = useState<Location[]>([])

    const destinationNameRef = useRef<TextInput | null>(null)

    const autoCompleteQuery = useMemo(() => {

        if (debouncedDestination?.length > 1) {

            setCanShowPredictions(true)
            return {
                input: debouncedDestination,
                service: "schedule",
                role: 1

            }
        }

        return undefined

    }, [debouncedDestination])


    const { data: AutoCompleteData, isSuccess: AutoCompleteSuccess } = useGetAutoCompleteDataQuery(autoCompleteQuery, {

    })


    useEffect(() => {

        if (AutoCompleteData) {
            const parsed = JSON.parse(AutoCompleteData);

            if (parsed?.predictions) {
                setPredictions(prev => parsed.predictions);


            }
        }

    }, [AutoCompleteData, AutoCompleteSuccess])





    useEffect(() => {

        if (predictions?.length > 0 && debouncedDestination?.length > 1) {
            // setIsDestinationDdOpen(true)
            console.log("Seem")
            dropDownRef?.current?.open()
        } else {
            // setIsDestinationDdOpen(false)
            dropDownRef?.current?.close()
        }

    }, [predictions, debouncedDestination])

    const handleDestinationSelection = (destination: Location) => {
        setValue("destinationName", destination.name)
        setValue("destinationBodyWithName", destination)

    }

    const handleDestinationBlur = () => {

    }

    console.log(predictions)


    return (


        <ScrollView>
            <View >
                <Text variant="subhead" className='py-3 font-semibold mb-3'>Trip type</Text>

                <Controller name="type" control={control} render={({ field: { onChange, value } }) => {

                    return (<RadioGroup value={value} onValueChange={onChange} className='border rounded-lg border-slate-200 p-3 gap-2 bg-accent'>
                        <View className='flex flex-row justify-between '>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-1 font-medium">In-city</Text>
                            </View>
                            <RadioGroupItem value='in-city' aria-labelledby={`message_send_${value}`} />
                        </View>
                        <Separator className="bg-slate-200" />
                        <View className='flex flex-row justify-between'>

                            <View className='flex flex-row items-center gap-x-3'>

                                <Text variant="body" className="text-foreground mb-2 font-medium">Travel</Text>
                            </View>
                            <RadioGroupItem value='Travel' aria-labelledby={`message_send_${value}`} />

                        </View>

                    </RadioGroup>)
                }} />

            </View>

            <View>
                <Text variant="subhead" className='py-3 font-semibold my-3'>Destination</Text>

                <Controller control={control} name="destinationName" render={({ field: { onChange, value } }) => (
                    <View>
                        <Input
                            ref={destinationNameRef}
                            placeholder={value ? value : watchedValues?.type === "Travel" ? "Search a  state" : "Search a city"}

                            value={value} onChangeText={onChange}
                            className={`${focusedInput === "destination" ? "border-blue-600" : ""} bg-accent h-14 py-3 placeholder:text-foreground px-4 placeholder:text-sm placeholder:font-medium text-xs `} />
                    </View>
                )} />
            </View>

            <View className='relative'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild ref={dropDownRef} >

                        <Text className='absolute -top-2' ></Text>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full native:w-[92%]'>
                        <ScrollView>

                            {
                                predictions.map((prediction, index) => (

                                    <DropdownMenuItem key={index}>

                                        <StationList prediction={prediction} isLoading={false} iconSize={24} isLast={index === predictions.length - 1} onPress={handleDestinationSelection} />
                                    </DropdownMenuItem>
                                ))
                            }
                        </ScrollView>


                    </DropdownMenuContent>
                </DropdownMenu>
            </View>


            <View>
                <Text variant="subhead" className='mt-2 py-3 font-semibold'>Seats</Text>

                <Text className='text-center font-semibold'>{watchedValues.seats} {watchedValues?.seats === 1 ? "seat" : "seats"}</Text>
                <Controller name='seats' control={control} render={({ field: { onChange, value } }) => (

                    <Slider style={{ width: "100%", height: 30 }}
                        minimumValue={1}
                        maximumValue={50}
                        step={1}
                        onValueChange={onChange}
                        value={value}
                        minimumTrackTintColor={"#134071"}
                        maximumTrackTintColor={"#134071"}
                        thumbTintColor={"#134071"}
                    />

                )} />
                <View className=' flex-row items-center justify-between px-[5%]'>
                    <Text className='font-semibold'>01</Text>
                    <Text className='font-semibold'>50</Text>

                </View>

            </View>


            <View>
                <Text variant="subhead" className='py-3 font-semibold'>Distance</Text>
                <Text className='text-center font-semibold'>{watchedValues.distance}km</Text>
                <Controller name='distance' control={control} render={({ field: { onChange, value } }) => (

                    <Slider style={{ width: "90%", height: 30 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={25}
                        value={value}
                        onValueChange={onChange}
                        // minimumTrackTintColor={"red"}
                        // maximumTrackTintColor={"red"}
                        thumbTintColor="blue"
                        // minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"

                    />

                )} />

                <View className=' flex-row items-center justify-between px-[5%]'>
                    <Text className='font-semibold'>1km</Text>
                    <Text className='font-semibold'>25km</Text>

                </View>

            </View>


            <View className='flex-row items-center justify-between mt-3'>
                <Text variant="subhead" className='py-3 font-semibold'>Charter</Text>
                <Toggle trackColor={{ false: '#EEEEEE', true: '#F4F4F5' }} thumbColor={"#007AFF"} onValueChange={toggleSwitch}
                    value={isEnabled} />
            </View>



            <View className='mb-2 py-3'>


                <View className='flex flex-row items-center gap-2' >
                    <Button variant="ghost" rounded="base" className="bg-muted mt-5 flex-1" >
                        <Text className='text-center py-3 font-medium' variant="body">Cancel</Text>
                    </Button>
                    <Button variant="default" rounded="base" className=" mt-5 flex-1">
                        <Text variant={"body"} color={"light"} className=' text-white text-center py-3 font-medium'>Apply</Text>
                    </Button>
                </View >
            </View>


        </ScrollView>





    )
}

export default ScheduleFilters