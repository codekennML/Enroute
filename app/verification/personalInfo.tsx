import { ScrollView, View } from 'react-native';
import { Text } from "@/components/ui/text";
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
import { useForm, FieldValues } from 'react-hook-form';

import { calculateAge, personalInfoSchema } from "./schemas/index"
import { zodResolver } from '@hookform/resolvers/zod';
import Back from '@/components/ui/back';
import DynamicFieldComponent from '@/components/ui/dynamicField';


import { updateVerificationDataState } from '@/redux/slices/verification';
import { useAppDispatch } from '@/redux/hooks';
import { canProceed } from '@/lib/canProceed';


const inputList = [
    {
        id: 1,
        displayName: "First Name",
        name: "firstName",
        placeholder: "",
        options: {
            type: "text",
            schemaType: "string",
            required: true
        }
    },
    {
        id: 2,
        displayName: "Last Name",
        name: "lastName",
        options: {
            type: "text",
            schemaType: "string",
            required: true
        }
    },

    {
        id: 3,
        displayName: "Date of birth",
        name: "birthDate",
        options: {
            type: "date",
            schemaType: "string",
            required: true
        }
    },

    {
        id: 4,
        displayName: "Gender",
        name: "gender",
        options: {
            type: "select",
            options: [
                "Male",
                "Female"
            ],
            schemaType: "string",
            required: true
        }
    },

    {
        id: 5,
        displayName: "Street Name",
        name: "street",
        options: {
            type: "text",
            schemaType: "string",
            required: true
        },

    },
    {
        id: 6,
        displayName: "Apt. / Suite No.",
        name: "apartment",
        options: {
            type: "text",
            schemaType: "string",
            required: true
        }
    },
    {
        id: 7,
        displayName: "Home address",
        name: "address",
        options: {
            type: "text",
            schemaType: "string",
            required: true
        }

    }

];

const PersonalInfoStep = () => {

    const { handleSubmit, watch, control, formState: { errors, }, setError, setValue } = useForm(
        {
            resolver: zodResolver(personalInfoSchema),
            mode: "onChange",
            defaultValues: {
                gender: "Male",
                birthDate: "01/01/1970",
                street: "",
                apartment: "",
                firstName: "",
                lastName: "",
                address: ""
            }
        }
    );

    const watchedValues = watch()
    const dispatch = useAppDispatch()
    const [focusedInput, setFocusedInput] = useState<string | undefined>()

    useEffect(() => {

        if (watchedValues?.birthDate) {
            validateAndFormatDate(watchedValues.birthDate)
        }

    }, [watchedValues])


    const validateAndFormatDate = (text: string) => {
        const cleanText = text.replace(/[^\d]/g, '');
        let formatted = '';
        let error = '';

        if (cleanText.length > 0) {
            const day = parseInt(cleanText.substring(0, 2), 10);
            const month = parseInt(cleanText.substring(2, 4), 10);
            const year = cleanText.substring(4, 8);

            if (cleanText.length >= 2) {
                if (day > 31) {
                    error = "Invalid day";
                } else {
                    formatted += cleanText.substring(0, 2) + '/';
                }
            }

            if (cleanText.length >= 4 && !error) {
                if (month > 12) {
                    error = "Invalid month";
                } else {
                    formatted += cleanText.substring(2, 4) + '/';
                }
            }

            if (cleanText.length > 4 && !error) {
                formatted += year;
            }

            if (cleanText.length === 8 && !error) {
                const fullDate = new Date(parseInt(year, 10), month - 1, day);
                if (fullDate.getMonth() + 1 !== month || fullDate.getDate() !== day) {
                    error = "Invalid date";
                } else {
                    const age = calculateAge(`${year}-${month}-${day}`);
                    if (age < 18) {
                        error = "You must be at least 18 years old";
                    }
                }
            }
        }

        if (error) {
            setError("birthDate", {
                type: "random",
                message: error
            })
        }

        // return { formatted: formatted || cleanText, error };
    };

    const isValidFormData = canProceed(errors, watchedValues, inputList)



    const onSubmit = async (data: FieldValues) => {

        //Set the value  into state first    
        await dispatch(updateVerificationDataState({
            ...data
        }))

        router.push({
            pathname: "/verification/identity"
        })

    }

    return (
        <View className='flex-col justify-between h-full px-6 '>
            <View className='  flex-1 mt-[10%]'>
                <View>
                    <Back iconType='arrow' iconSize={24} />
                    <Text className='text-[24px] font-semibold text-left py-4'>Personal Information</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {inputList.map((inputData, index) => (
                        <View className='mt-1' key={inputData.displayName}>

                            <DynamicFieldComponent
                                key={inputData.id}
                                field={inputData}
                                control={control}
                                errors={errors}
                                setError={setError}
                                setValue={setValue}
                            />

                        </View>
                    ))}



                </ScrollView>
            </View>
            <View className='py-4'>
                <Button
                    // disabled={!isValidFormData} 
                    onPress={handleSubmit(onSubmit)} variant={"default"} size={"lg"} rounded="base"
                    className=' items-center justify-center'>
                    <Text variant={"smallTitle"} className=' font-semibold dark:text-white text-white'>Next</Text>
                </Button>
            </View>
        </View>
    );
};

export default PersonalInfoStep;
