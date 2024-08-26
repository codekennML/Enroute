import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from "@/components/ui/text"
import { useForm, } from "react-hook-form"

import { DynamicField } from './multistep'
import Back from '@/components/ui/back'
import { Button } from '@/components/ui/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicFieldComponent from '@/components/ui/dynamicField'
import { router } from 'expo-router'


const dynamicFields: DynamicField[] = [
    {
        id: 1,
        name: "id_type",
        displayName: "ID document",
        options: {
            type: "select",
            options: [
                "National ID Card",
                "International Passport"
            ],
            schemaType: "string"
        }
    },

    {
        id: 2,
        name: "id_number",
        displayName: "Identification Number",
        options: {
            type: "number",

            schemaType: "string"
        },
    },

    {
        id: 5,
        name: "id_issued_at",
        displayName: "Issue date",
        options: {
            type: "date",

            schemaType: "string"
        },
    },

    {
        id: 6,
        name: "id_expires_at",
        displayName: "Expiry date",
        options: {
            type: "date",

            schemaType: "string"
        },
    },
    {
        id: 3,
        name: "id_image_back",
        displayName: "Identification Image - Back",
        options: {
            type: "image",

            schemaType: "string"
        },
    },

    {
        id: 4,
        name: "id_image_back",
        displayName: "Identification Image - Front",
        options: {
            type: "image",
            schemaType: "string"
        }
    },



]



const IdentityVerificationStep: React.FC<{ dynamicFields: DynamicField[] }> = ({ dynamicFields }) => {

    //    const [schema, setSchema ] = useState()

    // const schema = useCallback(() => {

    //     let schemaSheet = {}

    //     const schema = dynamicFields.map(field=> {
    //         schemaSheet[]
    //     })

    // },[])


    const { control, watch, formState: { errors } } = useForm({

    })

    const [valuesComplete, setValuesComplete] = useState(false)

    const hasErrors = Object.keys(errors).length > 0;
    // Watch all the values in the form
    const watchedValues = watch();

    // Check if all required fields have values


    // useEffect(() => {

    //     console.log(allFieldsFilled)
    //     if (allFieldsFilled) setValuesComplete(true)
    // }, [watchedValues])

    const allFieldsFilled = Object.values(watchedValues).every(Boolean);
    console.log(watchedValues)

    const handleSubmitDocuments = () => {
        router.push({
            pathname: "/verification/emergency"
        })
    }

    return (
        <SafeAreaView>
            <View className="px-6  h-full justify-between ">
                <View className='flex-1'>
                    <View className='mt-4'>
                        <Back iconType='arrow' iconSize={30} />
                        <Text className='text-[22px] font-semibold text-foreground pb-5 '>Your Documents </Text>
                    </View>
                    <ScrollView scrollEnabled={true} horizontal={false} showsVerticalScrollIndicator={false}>
                        <View className='flex flex-col gap-y-3'>

                            {dynamicFields.map((field) => (
                                <DynamicFieldComponent
                                    key={field.id}
                                    field={field}
                                    control={control}
                                    errors={errors}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View className=' bg-white w-full pb-4'>
                    <Button size={"lg"} rounded="base" className='flex-row items-center justify-center' variant={"default"} disabled={hasErrors || !!allFieldsFilled} onPress={handleSubmitDocuments}>
                        <Text variant={"smallTitle"} className='font-semibold'>Continue</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const DynamicGeo = () => {
    return <>
        <IdentityVerificationStep dynamicFields={dynamicFields} />
    </>
}

export default DynamicGeo