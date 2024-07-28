import Back from "@/components/ui/back";
import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import DynamicFieldComponent from "@/components/ui/dynamicField";
import { useForm } from "react-hook-form";
import { router } from "expo-router";




const VehicleDataArray = [
    {
        id: "vehicle_name",
        name: "vehicle_name",
        displayName: "Name of vehicle",
        placeholder: "e.g Mercedes",
        options: {
            type: "text",

            schemaType: "string"
        },
    },
    {
        id: "vehicle_model",
        name: "vehicle_model",
        displayName: "Vehicle model",
        placeholder: "e.g GL450",
        options: {
            type: "text",

            schemaType: "string"
        },
    },
    {
        id: "vehicle_year",
        name: "vehicle_year",
        displayName: "Vehicle year",
        placeholder: "e.g 2015",
        options: {
            type: "text",

            schemaType: "string"
        },
    },
    {
        id: "vehicle_license",
        name: "vehicle_license",
        displayName: "License Plate",
        placeholder: "e.g MLK459T",
        options: {
            type: "text",

            schemaType: "string"
        },
    },

    {
        id: "vehicle_seats",
        name: "vehicle_license",
        displayName: "No of seats",
        placeholder: "e.g 4",
        options: {
            type: "number",

            schemaType: "number"
        },
    },
    {
        id: "vehicle_type",
        name: "vehicle_type",
        displayName: "Vehicle Type",
        // placeholder: "e.g 4",
        options: {
            type: "select",
            options: [
                "Bike",
                "Car",
                "Bus",
                "Van",
                "Truck"
            ],
            schemaType: "string",
        },
    },

    {
        id: "vehicle_exterior_color",
        name: "vehicle_exterior_color",
        displayName: "Vehicle color -  Exterior",
        placeholder: "e.g Red",
        options: {
            type: "text",
            schemaType: "string"
        },
    },

    {
        id: "vehicle_interior_color",
        name: "vehicle_interior_color",
        displayName: "Vehicle color -  Interior",
        placeholder: "e.g Red",
        options: {
            type: "text",
            schemaType: "string"
        },
    },


    {
        id: "vehicle_exterior_front",
        name: "vehicle_exterior_front",
        displayName: "Vehicle Image - Front Exterior ",
        placeholder: "",
        options: {
            type: "image",
            schemaType: "string"
        }
    },
    {
        id: "vehicle_exterior_back",
        name: "vehicle_exterior_back",
        displayName: "Vehicle Image - Back Exterior ",
        placeholder: "",
        options: {
            type: "image",
            schemaType: "string"
        }
    },
    {
        id: "vehicle_exterior_left",
        name: "vehicle_exterior_left",
        displayName: "Vehicle Image - Left Exterior ",
        placeholder: "",
        options: {
            type: "image",
            schemaType: "string"
        }
    },

    {
        id: "vehicle_exterior_right",
        name: "vehicle_exterior_right",
        displayName: "Vehicle Image - Right Exterior ",
        placeholder: "",
        options: {
            type: "image",
            schemaType: "string"
        }
    },


    {
        id: "vehicle_interior_front",
        name: "vehicle_interior_front",
        displayName: "Vehicle Image - Front Interior ",
        placeholder: "",
        info: "Ensure to capture the driver and passenger seats properly ",
        options: {
            type: "image",
            schemaType: "string"
        }
    },

    {
        id: "vehicle_interior_left",
        name: "vehicle_interior_left",
        displayName: "Vehicle Image - Interior Backseats  ",
        placeholder: "",
        options: {

            type: "image",
            schemaType: "string"
        }
    },


]

const VehicleData = () => {


    const { control, watch, formState: { errors } } = useForm({

    })


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

    const handleSubmitVehicleData = () => {
        router.push({
            pathname: "/(verification)/vehicle/inspection"
        })
    }

    return (
        <SafeAreaView>
            <View className="px-6  h-full justify-between ">
                <View className='flex-1'>
                    <View className='mt-[10%] '>
                        <Back />
                        <Text className='text-[24px] font-semibold text-foreground pb-5 text-center'>Vehicle Information </Text>
                    </View>
                    <ScrollView scrollEnabled={true} horizontal={false} showsVerticalScrollIndicator={false}>
                        <View className='flex flex-col gap-y-1'>

                            {VehicleDataArray.map((field) => (
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
                    <Button size={"lg"} rounded="base" className='flex-row items-center justify-center' variant={"default"} disabled={hasErrors || !!allFieldsFilled} onPress={handleSubmitVehicleData}>
                        <Text variant={"smallTitle"} className='font-semibold'>Continue</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default VehicleData

