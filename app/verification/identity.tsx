import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from "@/components/ui/text"
import { Controller, FieldValue, FieldValues, useForm, } from "react-hook-form"

import { DynamicField } from './multistep'
import Back from '@/components/ui/back'
import { Button } from '@/components/ui/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicFieldComponent from '@/components/ui/dynamicField'
import { router } from 'expo-router'
import { useGetCountriesQuery } from '@/redux/api/country'
import { useGetStateRequiredDocsQuery, useGetStatesQuery } from '@/redux/api/states'
import DynamicSelect from '@/components/ui/select/dynamic'
import * as z from "zod"
import { useSelector } from 'react-redux'
import { selectVerificationInfo } from '@/redux/slices/verification'
import { useAuth } from '@/lib/useAuth'
import { ROLES } from '@/lib/config/enum'
import { zodResolver } from '@hookform/resolvers/zod'
import { createDatePairValidationSchema, dateSchema, ageSchema, createImageSchema } from './schemas'
import { canProceed } from '@/lib/canProceed'
import { selectVerificationFields } from '@/redux/slices/verifyfields'
import { SchemaDefinition } from '@/types/types'
import { processDates } from '@/lib/processDates'
import { getDateFieldPairs } from '@/lib/createDatePairs'




const IdentityVerificationStep: React.FC<{ dynamicFields: DynamicField[], validationSchema: z.ZodSchema }> = ({ dynamicFields, validationSchema }) => {

    const { handleSubmit, control, watch, formState: { errors }, setError, setValue, clearErrors } = useForm({
        resolver: zodResolver(validationSchema),
        mode: "onChange",
        defaultValues: dynamicFields.reduce((acc, field) => {
            acc[field.name] = ''; // Default empty value for each field
            return acc;
        }, {})
    })

    const watchedValues = watch()

    const dateFieldPairs = getDateFieldPairs(dynamicFields)


    useEffect(() => {
        if (!watchedValues) return; // Ensure watchedValues exist before proceeding

        processDates(watchedValues, dateFieldPairs, setError, errors)

        // Loop through each pair of issue and expiry date field
    }, [watchedValues, setError, dateFieldPairs]);


    const isValidFormData = canProceed(errors, watchedValues, dynamicFields)
    const handleSubmitDocuments = (data: FieldValues) => {


        router.push({
            pathname: "/verification/vehicleData"
        })
    }

    const onError = (data: FieldValues) => {
        console.log(data, "Error Data")
    }



    return (
        // <SafeAreaView>
        <View className="px-6  h-full justify-between ">
            <View className='flex-1'>
                <View className='mt-2'>
                    <Back iconType='arrow' iconSize={24} />
                    <Text className='text-[24px] font-semibold text-foreground pb-5 mt-4 '>Your Documents </Text>
                </View>
                <ScrollView scrollEnabled={true} horizontal={false} showsVerticalScrollIndicator={false}>
                    <View className='flex flex-col gap-y-3'>

                        {dynamicFields.map((field) => (
                            <DynamicFieldComponent
                                key={field.name}
                                field={field}
                                control={control}
                                errors={errors}
                                setError={setError}
                                clearErrors={clearErrors}
                                setValue={setValue}
                            />
                        ))}
                    </View>
                    <View className=' bg-white w-full pb-4'>
                        <Button size={"lg"} rounded="base" className='flex-row items-center justify-center' variant={"default"}
                            onPress={() => router.push("/verification/vehicleData")}
                        // disabled={!isValidFormData} 
                        // onPress={handleSubmit(handleSubmitDocuments)}
                        >
                            <Text variant={"smallTitle"} className='font-semibold dark:text-white text-white'>Continue</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>

        </View>
        // </SafeAreaView>
    );
}




export const createDynamicSchema = (fields: SchemaDefinition[]) => {



    const shape: Record<string, z.ZodTypeAny> = {};
    // const dateFieldPairs = getDateFieldPairs(fields);

    fields.forEach((field) => {
        switch (field.options.schemaType) {
            case 'string':
                if (field.options.type === 'image') {
                    shape[field.name] = z.string()
                } else if (field.options.type === 'date') {
                    shape[field.name] = dateSchema

                } else {
                    shape[field.name] = z
                        .string({
                            required_error: `A valid ${field.displayName.toLowerCase()} is required`,
                        })
                        .min(2, `Please enter a valid ${field.displayName.toLowerCase()}`);
                }
                break;
            case 'number':
                shape[field.name] = z.number({
                    required_error: `A valid ${field.displayName.toLowerCase()} is required`,
                });
                break;
            case 'date':
                shape[field.name] = dateSchema;
                break;
            default:
                shape[field.name] = z.unknown();
        }
    });

    const schema = z.object(shape)

    // .passthrough().superRefine((data, ctx) => {
    //     console.log('Date validation function called with data:', data);

    //     for (const { issue, expiry } of dateFieldPairs) {
    //         const issueDateStr = data[issue];
    //         const expiryDateStr = data[expiry];

    //         console.log(`Processing pair: ${issue} (${issueDateStr}) and ${expiry} (${expiryDateStr})`);

    //         if (!issueDateStr || !expiryDateStr) {
    //             console.log('Missing date value(s)');
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `Both ${issue} and ${expiry} must be provided`,
    //                 path: [issue, expiry],
    //             });
    //             continue;
    //         }

    //         const issueDate = parse(issueDateStr, 'dd/MM/yyyy', new Date());
    //         const expiryDate = parse(expiryDateStr, 'dd/MM/yyyy', new Date());

    //         if (!isValid(issueDate) || !isValid(expiryDate)) {
    //             console.log('Invalid date format');
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `Invalid date format for ${issue} or ${expiry}`,
    //                 path: [issue, expiry],
    //             });
    //             continue;
    //         }

    //         const issuePlusThreeMonths = addMonths(issueDate, 3);
    //         if (!isAfter(expiryDate, issuePlusThreeMonths)) {
    //             console.log(`Expiry date ${expiryDateStr} is not at least 3 months after issue date ${issueDateStr}`);
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `${expiry} must be at least 3 months after ${issue}`,
    //                 path: [expiry],
    //             });
    //         }
    //     }
    // });
    // const dateValidationSchema = z.object({}).


    // const schema = z.intersection(baseSchema, dateValidationSchema);



    // superRefine((data, ctx) => {
    //     console.log('Refine function called with data:', data);
    //     for (const { issue, expiry } of dateFieldPairs) {
    //         const issueDateStr = data[issue];
    //         const expiryDateStr = data[expiry];

    //         console.log(`Processing pair: ${issue} (${issueDateStr}) and ${expiry} (${expiryDateStr})`);

    //         if (!issueDateStr || !expiryDateStr) {
    //             console.log('Missing date value(s)');
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `Both ${issue} and ${expiry} must be provided`,
    //                 path: [issue, expiry],
    //             });
    //             continue;
    //         }

    //         const issueDate = parse(issueDateStr, 'dd/MM/yyyy', new Date());
    //         const expiryDate = parse(expiryDateStr, 'dd/MM/yyyy', new Date());

    //         if (!isValid(issueDate) || !isValid(expiryDate)) {
    //             console.log('Invalid date format');
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `Invalid date format for ${issue} or ${expiry}`,
    //                 path: [issue, expiry],
    //             });
    //             continue;
    //         }

    //         const issuePlusThreeMonths = addMonths(issueDate, 3);
    //         if (!isAfter(expiryDate, issuePlusThreeMonths)) {
    //             console.log(`Expiry date ${expiryDateStr} is not at least 3 months after issue date ${issueDateStr}`);
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `${expiry} must be at least 3 months after ${issue}`,
    //                 path: [expiry],
    //             });
    //         }
    //     }
    // });





    // console.log('Validating test data...');
    // const result = schema.safeParse(testData);
    // console.log('Validation result:', result);

    return schema;


};


const DynamicGeo = () => {


    const { areaRequiredDocs } = useSelector(selectVerificationFields)

    const schema = createDynamicSchema(areaRequiredDocs)


    return <SafeAreaView>
        <>
            {
                areaRequiredDocs && <IdentityVerificationStep dynamicFields={areaRequiredDocs}
                    validationSchema={schema}
                />
            }
        </>
    </SafeAreaView>


}

export default DynamicGeo