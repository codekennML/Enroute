import { Dimensions, Modal, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LocateFixed, Luggage, MapPin, MessageSquare, PenLine, UserCog, UserPlus, Wallet, X } from "@/lib/icons/icons"
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { router, useLocalSearchParams } from 'expo-router'
import { Sheet, useSheetRef } from '@/components/ui/sheets'
import SearchLocate from '@/components/custom/search'
import AddContact from '@/components/ui/contacts/addContact'
import RiderList from '@/components/custom/addRider'
import CustomTextArea from '@/components/custom/CustomTextArea'
import { Input } from '@/components/ui/input'
import SummaryCard from '@/components/custom/summaryCard'
import { useSelector } from 'react-redux'
import { addRideRiders, selectSearchInfo, updateOtherTripData } from '@/redux/slices/search'
import { format } from 'date-fns'
import { BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { packageInfoSchema, tripInfoSchema } from './(verification)/schemas'
import { selectUserInfo } from '@/redux/slices/user'
import { useAppDispatch } from '@/redux/hooks'
import { ZodSchema } from 'zod'


const summaryInfo = [
    {
        id: 1,
        name: "destination",
        isModal: true,
        type: ["courier", "ride", "travel"],
        title: "Destination",
        subtitle: "Pick-up location to destination",
        sheetName: "locationSearch",

    },



    {
        id: 2,
        name: "busStopName",
        isModal: false,
        type: ["ride", "travel"],
        title: "Add your bus stop",
        subtitle: "e.g CMS Bus stop",
        sheetName: "stopSheet",

    },

    {
        id: 3,
        name: "riders",
        type: ["ride", "travel"],
        title: "Add a rider",
        subtitle: "Add riders for this ride",
        sheetName: "addRider",

    },
    {
        id: 4,
        type: ["courier"],
        name: "recipient",
        title: "Add recipient",
        subtitle: "Name of recipient",
        sheetName: "addRider",
    },
    {
        id: 5,
        type: ["travel", "ride"],
        name: "luggage",
        title: "Do you have luggage ? ",
        subtitle: "No luggage added",
        sheetName: "luggage",
    },

    {
        id: 6,
        type: ["courier"],
        name: "description",
        title: "What are you sending ?",
        subtitle: "Package description",
        sheetName: "packageDetails",

    },
    {
        id: 7,
        type: ["courier"],
        name: "comments",
        title: "Comments or instructions",
        subtitle: "Package instructions",
        sheetName: "packageComments",

    },
    {
        id: 8,
        type: ["courier", "ride", "travel"],
        name: "budget",
        title: "Suggest a budget",
        subtitle: "5000",
        sheetName: "suggestBudget",

    }

]

export type summaryInfo = typeof summaryInfo[0]

const summary = () => {



    const dispatch = useAppDispatch()

    const budgetInputRef = useRef<TextInput | null>(null)
    const luggageRef = useRef<TextInput | null>(null)
    const packageDescriptionRef = useRef<TextInput | null>(null)
    const busStopInputRef = useRef<TextInput | null>(null)
    const commentRef = useRef<TextInput | null>(null)

    const summarySheetRef = useSheetRef()

    const [isLocationSearchModalOpen, setIsLocationSearchModalOpen] = useState(false)

    const tripInfo = useSelector(selectSearchInfo)
    const { type, when } = tripInfo

    const userInfo = useSelector(selectUserInfo)

    const [validationSchema, setValidationSchema] = useState<ZodSchema>(tripInfoSchema)


    useEffect(() => {
        if (type === "courier") {
            setValidationSchema(packageInfoSchema)
        }
    }, [type])



    const checkboxField = type === "courier" ? "express" : "charter"

    const { control, watch, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(validationSchema),
        mode: "onChange",
        // defaultValues: tripInfo
    })


    useEffect(() => {
        reset(tripInfo)
    }, [tripInfo])



    const watchedValues = watch();


    const canProceed = () => {

        let nonRequiredValues = []

        if (type === "courier") {
            nonRequiredValues = ["express", "when"]


        } else {
            nonRequiredValues = ["luggage", "charter", "when"]
        }




        const allRequiredFieldsFilled = Object.entries(watchedValues).every(([key, value]) => {
            // Skip non-required fields
            if (nonRequiredValues.includes(key)) return true;
            return value !== undefined && value !== '' && value !== null;
        });


        return allRequiredFieldsFilled;


    }

    const hasErrors = Object.keys(errors).length > 1 || !canProceed()


    // console.log(errors, typeof errors)
    const [sheetToOpen, setSheetToOpen] = useState<string | null>(null)

    const handleSheetToOpen = (sheet: string | null) => {

        if (sheet && sheet !== "locationSearch") {
            setSheetToOpen(sheet)
            summarySheetRef?.current?.present()

            if (sheet === "suggestBudget" || sheet === "stopSheet") {

                setTimeout(() => {

                    switch (sheet) {
                        case "suggestBudget":
                            budgetInputRef?.current?.focus()
                            break

                        case "stopSheet":
                            busStopInputRef?.current?.focus()
                            break

                        default: break

                    }


                }, 500)
            }
        }

        if (sheet === 'locationSearch') {
            setIsLocationSearchModalOpen(true)
        }

        if (!sheet) {
            summarySheetRef?.current?.close()
        }

    }

    const handleSaveValue = (key: string) => {

        if (Object.keys(watchedValues).includes(key)) {
            dispatch(updateOtherTripData({
                [key]: watchedValues[key]
            }))
        }

    }

    const budget = "riders" in tripInfo && tripInfo?.riders?.length && tripInfo?.riders[0]?.added ? tripInfo?.riders?.length * tripInfo.budget : "riders" in tripInfo && tripInfo?.riders?.length && !tripInfo[0]?.added ? (tripInfo?.riders?.length - 1) * tripInfo.budget : tripInfo?.budget

    console.log(errors)
    const validateAndSubmit = (data: typeof tripInfo) => {

        console.log(data, "AEWWTTTTETTETE")
        try {

            //Extract the type and remove the id from riders  

            if ("riders" in data) {
                const accountOwnerData = data.riders[0]
                const ridersWithoutId = data.riders.slice(1, -1).map(rider => ({ ...rider, id: undefined }))
                data = {
                    ...data,
                    riders: [accountOwnerData, ...ridersWithoutId]
                }
            }

            router.push({
                pathname: "/rideLive"
            })

            // console.log(data, "DATA");
            // Add your form submission logic here
        } catch (error) {
            console.error('Form submission error:', error);
        }

        console.log(data)

    }



    const onError = (error) => {


    }

    // console.log(allFieldsFilled, "asllField")



    // console.log(type, "OGECHH")
    return (
        <View className='h-full'>


            <View className='flex flex-col h-full '>
                <View className='px-4 '>
                    <View className=''>
                        <Text className='text-[28px] font-semibold'>{`${type === "courier" ? "Package" : "Trip"}`}</Text>
                        <Text className='text-[24px] font-semibold '>Information</Text>

                    </View>

                </View>

                <View className=' mt-2 my-0.5 flex-row justify-start px-4'>
                    {when && when !== "now" && <Text variant={"smallTitle"} className='font-semibold text-primary'>Scheduled  - {format(new Date(JSON.parse(when)), "EEE MMM d")}</Text>}
                </View>
                {/*Add  Rider  Card */}
                <View className=' pl-4 pr-4 flex-1 mt-1 '>

                    {
                        <>
                            {summaryInfo.map(summary =>
                                summary.type.includes(type)
                                    ? <SummaryCard key={summary.id} summary={summary} handleSheetToOpen={handleSheetToOpen} />
                                    : null
                            )}
                        </>
                    }

                    {/* Search button  */}
                    <View >

                        <Controller
                            name={checkboxField}
                            control={control}
                            render={({ field: { onChange, value } }) => (

                                <View className='flex flex-row items-center justify-start gap-x-2  mt-4'>


                                    <Checkbox checked={value as boolean} onCheckedChange={onChange} />
                                    <Text variant={"callout"} className='font-medium text-foreground'>
                                        {
                                            type !== "courier" ? "Charter this vehicle instead ? " : "Express delivery for this package"
                                        }
                                    </Text>
                                </View>)
                            } />

                        {
                            // @ts-expect-error ts-error
                            errors[checkboxField] && <Text>{errors[checkboxField].message}</Text>}

                    </View>

                </View>

                <View className='text px-4 pb-4 '>
                    <View className='flex flex-row justify-between pb-8 pr-1'>

                        <Text variant={"mediumTitle"}>
                            Total
                        </Text>
                        <Text variant={"mediumTitle"} >
                            {`${userInfo?.country?.currency} ${budget}`}
                        </Text>

                    </View>

                    <Button variant={"default"} size="lg" rounded={"base"} onPress={handleSubmit(validateAndSubmit, onError)} disabled={hasErrors} className='max-w-full w-full flex flex-row justify-center items-center px-0'>
                        <Text variant="mediumTitle" color={"light"} className='font-bold text-white '  > Go </Text>
                    </Button>

                </View>
            </View>

            {/* Bottom sheet Modal */}

            {/* LocationSearchModal Runnig this component in a bottom sheet will have onblur causing all sorts of issues -  might be skill issues on my part, perhaps you can do better when you see this*/}
            {isLocationSearchModalOpen &&

                <Modal
                    visible={isLocationSearchModalOpen}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setIsLocationSearchModalOpen(false)}
                >
                    <View style={{
                        flex: 1,
                        // justifyContent: 'center'
                        //   , 
                        alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <View style={{
                            backgroundColor: 'white', paddingHorizontal: 0, paddingTop: 10
                            , borderRadius: 0, width: '100%', height: "100%"
                        }}>
                            <View className={`flex-1 h-screen py-4`}>
                                <View className='px-4 flex-row items-center mb-4'>
                                    <Button variant={"ghost"} className='' onPress={() => { setIsLocationSearchModalOpen(false) }}>
                                        <X className='text-foreground' size={28} />
                                    </Button>
                                    <Text variant={"mediumTitle"} className='font-semibold flex-1 text-center'> {type !== "courier" ? "Your route" : "Package route"} </Text>
                                </View>
                                <View className=''>


                                    <SearchLocate openModal={setIsLocationSearchModalOpen} />
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal >
            }


            <Sheet ref={summarySheetRef}
                enableDynamicSizing
                // snapPoints={["90%"]}
                enablePanDownToClose={false}
                enableOverDrag={false}
                enableContentPanningGesture={false}
                pressBehaviour='none' >
                <BottomSheetScrollView scrollEnabled={false}

                >

                    {
                        sheetToOpen === "stopSheet" &&
                        <View className='px-6 flex-col justify-betweeen flex-1 '>
                            <View className='flex-row items-center mb-4 '>
                                <Button variant={"ghost"} onPress={() => handleSheetToOpen(null)}>
                                    <X className='text-foreground' size={32} />
                                </Button>
                                <Text variant={"mediumTitle"} className='flex-1 text-center my-4'>
                                    Your bus stop
                                </Text>
                            </View>
                            <Text variant={"smallTitle"} className='font-semibold text-sm pb-3'>What is the name of your bus stop ?</Text>

                            <View className='flex flex-row items-center mt-3 max-w-full relative mb-3 '>

                                <Controller
                                    name="busStopName"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            ref={busStopInputRef}
                                            value={value}
                                            autoFocus={true}
                                            className='border-gray-300   text-center py-3  pr-8  text-lg font-semibold placeholdr:text-sm placeholder:text-foreground/70 justify-center flex-1'
                                            placeholder='e.g CMS Bus Station'
                                            onChangeText={onChange}
                                        />
                                    )}
                                />



                                {/* </BottomSheetView> */}
                            </View>
                            {errors["busStopName"] ? <Text className="text-destructive" variant={"footnote"}>{errors["busStopName"].message}</Text> : <Text className='mt-1 text-xs'>A known landmark or structure , if you do not know</Text>}
                            <View className=' py-6 '>
                                <Button size={"default"} rounded={"base"} className='flex-row items-center justify-center' onPress={() => {

                                    handleSaveValue("busStopName")
                                    handleSheetToOpen(null)
                                }
                                }
                                >
                                    <Text variant={"smallTitle"} color={"light"}>Save</Text>
                                </Button>
                            </View>
                        </View>
                    }


                    {
                        sheetToOpen === "addRider" &&
                        <View className='flex-1'>
                            <View className='flex-row items-center px-4'>
                                <Button className='' variant={"ghost"} onPress={() => handleSheetToOpen(null)}>
                                    <X className='text-foreground ' size={32} />
                                </Button>
                                <Text variant={"mediumTitle"} className='flex-1 text-center  text-foreground'> {type === "courier" ? "Add recipient" : "Add riders"}</Text>

                            </View>
                            <View className='px-6 my-3'>
                                <Text className='py-1'>{type === "courier" ? "Provide essential information about the package's destination and receiver to complete your shipping request accurately." : "Discover new routes, share exciting adventures, and create lasting memories with your companions."}</Text>
                            </View>

                            <RiderList closeAddRiderSheet={handleSheetToOpen} />
                        </View>

                    }
                    {
                        sheetToOpen === "luggage" && <View className='px-4'>
                            <View className='flex-col justify-between h-full'>


                                <View>


                                    <View className='flex-row  '>
                                        <Button variant={"ghost"} onPress={() => handleSheetToOpen(null)}>
                                            <X className='text-foreground' size={32} />
                                        </Button>
                                        <Text variant={"mediumTitle"} className='flex-1 text-center'>
                                            Luggage Details
                                        </Text>
                                    </View>
                                    <View>

                                        <Controller
                                            name="luggage"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <CustomTextArea
                                                    ref={luggageRef}
                                                    value={value}
                                                    onChange={onChange}
                                                    placeholder='2kg boxes and a handbag'
                                                    inputTitle='Describe your luggage'
                                                    inputSubtitle='Inform your driver about your luggage to guarantee sufficient space and a smooth pickup experience.'

                                                />
                                            )}
                                        />
                                    </View>
                                </View>
                                <Button variant={"default"} size="default" rounded={"base"} className='max-w-full w-full flex flex-row justify-center items-center px-0  my-4' onPress={() => {
                                    handleSaveValue("luggage")
                                    handleSheetToOpen(null)
                                }
                                } >
                                    <Text variant="smallTitle" color={"light"} className=' text-white '  > Save</Text>
                                </Button>

                            </View>


                        </View>
                    }
                    {
                        sheetToOpen === "packageDetails" &&
                        <View className='flex-col justify-between h-full px-4'>


                            <View>


                                <View className='flex-row  '>
                                    <Button variant={"ghost"} onPress={() => handleSheetToOpen(null)}>
                                        <X className='text-foreground' size={32} />
                                    </Button>
                                    <Text variant={"mediumTitle"} className='flex-1 text-center'>
                                        Package Description
                                    </Text>
                                </View>
                                <View>

                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <CustomTextArea
                                                ref={packageDescriptionRef}
                                                inputSubtitle='We strongly advise against sending contraband or illegal items'
                                                value={value as string}
                                                onChange={onChange}
                                                placeholder='Groceries and School books'
                                                inputTitle='What are you sending'

                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <Button variant={"default"} size="default" rounded={"base"} onPress={() => {

                                handleSaveValue("description")
                                handleSheetToOpen(null)
                            }
                            } className='max-w-full w-full flex flex-row justify-center items-center px-0  my-4'>
                                <Text variant="smallTitle" color={"light"} className=' text-white '  > Save</Text>
                            </Button>

                        </View>


                    }
                    {
                        sheetToOpen === "packageComments" &&

                        <View className='flex-col justify-between h-full px-4'>


                            <View>


                                <View className='flex-row  '>
                                    <Button variant={"ghost"} onPress={() => handleSheetToOpen(null)}>
                                        <X className='text-foreground' size={32} />
                                    </Button>
                                    <Text variant={"mediumTitle"} className='flex-1 text-center'>
                                        Package Comments
                                    </Text>
                                </View>
                                <View>

                                    <Controller
                                        name="comments"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <CustomTextArea
                                                ref={commentRef}
                                                value={value}
                                                onChange={onChange}
                                                inputSubtitle='e.g Please use the doorbell at the door'
                                                inputTitle='Instructions or comments for driver'
                                                placeholder="Your instructions"

                                            />
                                        )}
                                    />

                                </View>
                            </View>
                            <Button variant={"default"} size="default" rounded={"base"} onPress={() => {

                                handleSaveValue("comments")
                                handleSheetToOpen(null)
                            }
                            } className='max-w-full w-full flex flex-row justify-center items-center px-0  my-4'>
                                <Text variant="smallTitle" color={"light"} className=' text-white '  > Save</Text>
                            </Button>

                        </View>


                    }

                    {
                        sheetToOpen === "suggestBudget" &&
                        <View className='px-6 flex-col justify-betweeen flex-1 '>
                            <View className='flex-row items-center mb-8 '>
                                <Button variant={"ghost"} onPress={() => handleSheetToOpen(null)}>
                                    <X className='text-foreground' size={32} />
                                </Button>
                                <Text variant={"mediumTitle"} className='flex-1 text-center'>
                                    Suggest a budget
                                </Text>
                            </View>
                            <Text variant={"smallTitle"} className='font-semibold'>What is your budget ?</Text>

                            <View className='flex flex-row items-center my-8 max-w-full relative '>
                                <Text className='text-foreground/60 absolute top-[5%] left-3 z-10' variant={"heading"}>{userInfo?.country?.currency}</Text>


                                <Controller
                                    name="budget"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            ref={budgetInputRef}
                                            value={value}
                                            inputMode='numeric'
                                            className='border-0   border-b-2 border-slate-200 text-center pb-2  pl-20 pr-8 mx-3 text-2xl font-semibold placeholder:text-2xl placeholder:text-foreground/70 justify-center flex-1'
                                            placeholder={"3000"}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />



                            </View>
                            {errors["budget"] && <Text className="text-destructive" variant={"footnote"}>{errors["budget"].message}</Text>}
                            <View className=' py-6 mt-4 '>
                                <Button size={"default"} rounded={"base"} className='flex-row items-center justify-center' onPress={() => {

                                    handleSaveValue("budget")
                                    handleSheetToOpen(null)
                                }
                                }  >
                                    <Text variant={"smallTitle"} color={"light"}>Save</Text>
                                </Button>
                            </View>
                        </View>
                    }


                </BottomSheetScrollView>


            </Sheet>

        </View>

    )
}

export default summary