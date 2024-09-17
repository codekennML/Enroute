import { View, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useSelector } from 'react-redux'
import Back from '@/components/ui/back'
import DynamicFieldComponent from '@/components/ui/dynamicField'
import { canProceed } from '@/lib/canProceed'
import { selectVerificationFields } from '@/redux/slices/verifyfields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FieldValues } from 'react-hook-form'
import { createDynamicSchema } from './identity'
import { processDates } from '@/lib/processDates'
import { getDateFieldPairs } from '@/lib/createDatePairs'
import { router } from 'expo-router'

const serviceDocs = () => {

    const { serviceDocs } = useSelector(selectVerificationFields)

    const schema = createDynamicSchema(serviceDocs)
    const dateFieldPairs = getDateFieldPairs(serviceDocs)

    const { handleSubmit, control, watch, formState: { errors }, setError, setValue, clearErrors } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema)
    })


    const watchedValues = watch();

    useEffect(() => {
        if (!watchedValues) return

        processDates(watchedValues, dateFieldPairs, setError, errors)

    }, [watchedValues])

    const isValidFormData = canProceed(errors, watchedValues, serviceDocs)



    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }

    return (
        <SafeAreaView>
            <View className="px-6  h-full justify-between ">
                <View className='flex-1'>
                    <View className='mt-[10%]'>
                        <Back iconType='arrow' iconSize={30} />
                        <Text className='text-[24px] font-semibold text-foreground pb-5 '>Service Documents </Text>
                    </View>
                    <ScrollView scrollEnabled={true} horizontal={false} showsVerticalScrollIndicator={false}>
                        <View className='flex flex-col gap-y-1'>

                            {serviceDocs.map((field) => (
                                <DynamicFieldComponent
                                    key={field.id}
                                    field={field}
                                    control={control}
                                    errors={errors}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    setValue={setValue}
                                />
                            ))}
                        </View>

                    </ScrollView>
                </View>
                <View className=' bg-white w-full pb-4'>
                    <Button size={"lg"} rounded="base" className='flex-row items-center justify-center' variant={"default"}
                        onPress={() => router.push("/verification/processing")}
                    // disabled={!isValidFormData}
                    //  onPress={handleSubmit(onSubmit)}
                    >
                        <Text variant={"smallTitle"} className='font-semibold'>Continue</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default serviceDocs