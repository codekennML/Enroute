import { ScrollView, View } from 'react-native';
import { Text } from "@/components/ui/text";
import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
import { useFormContext, Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { personalInfoSchema } from "./schemas/index"
import { zodResolver } from '@hookform/resolvers/zod';
import Back from '@/components/ui/back';
import DynamicFieldComponent from '@/components/ui/dynamicField';

const inputList = [
    {
        id: 1,
        displayName: "First Name",
        name: "firstName",
        placeholder: "",
        options: {
            type: "text",
            schemaType: "string"
        }
    },
    {
        id: 2,
        displayName: "Last Name",
        name: "lastName",
        options: {
            type: "text",
            schemaType: "string"
        }
    },

    {
        id: 3,
        displayName: "Date of birth",
        name: "birthName",
        options: {
            type: "text",
            schemaType: "string"
        }

    }, {
        id: 4,
        displayName: "Gender",
        name: "gender",
        options: {
            type: "select",
            options: [
                "Male",
                "Female"
            ],
            schemaType: "string"
        }
    },
    {
        id: 5,
        displayName: "Apt. / Suite No.",
        name: "apartment",
        options: {
            type: "text",
            schemaType: "string"
        }
    },


    {
        id: 6,
        displayName: "Street Name",
        name: "street",
        options: {
            type: "text",
            schemaType: "string"
        }
    },
    {
        id: 7,
        displayName: "Home address",
        name: "address",
        options: {
            type: "text",
            schemaType: "string"
        }

    }


];

const PersonalInfoStep = () => {
    // const { control, formState: { errors } } = useFormContext();
    const { register, handleSubmit, control, formState: { errors } } = useForm(
        { resolver: zodResolver(personalInfoSchema) }
    );

    const firstInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef?.current?.focus();
        }
    }, []);

    return (
        <View className='flex-col justify-between h-full px-6 '>
            <View className='  flex-1 mt-[10%]'>
                <View>
                    <Back iconType='arrow' iconSize={30} />
                    <Text className='text-[22px] font-semibold text-left pb-4'>Personal Information </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {inputList.map((inputData, index) => (
                        <View className='mt-1' key={inputData.displayName}>


                            <DynamicFieldComponent
                                key={inputData.id}
                                field={inputData}
                                control={control}
                                errors={errors}
                            />

                        </View>
                    ))}
                </ScrollView>
            </View>
            <View className='py-4'>
                <Button onPress={() => router.push({
                    pathname: "/verification/identity"
                })} variant={"default"} size={"lg"} rounded="base"
                    className=' items-center justify-center'>
                    <Text variant={"smallTitle"} className=' font-semibold'>Next</Text>
                </Button>
            </View>
        </View>
    );
};

export default PersonalInfoStep;
